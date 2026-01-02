const fsp = require('fs').promises;
const path = require('path');
const sharp = require('sharp');
const logger = require('../utils/logger');
const { randomUUID, createHash } = require('crypto');

const ASSETS_DIR = path.join(__dirname, '..', 'assets');

// Default image sizes for different use cases
const IMAGE_SIZES = {
  hero: { width: 1600, height: 900, fit: 'cover' },
  thumbnail: { width: 400, height: 300, fit: 'cover' },
  logo: { width: 600, height: 600, fit: 'inside', withoutEnlargement: false },
  portrait: { width: 600, height: 800, fit: 'cover' },
  gallery: { width: 1200, height: 800, fit: 'cover' },
  default: { width: 1600, height: 900, fit: 'cover' }
};

/**
 * Generate a short fingerprint hash from buffer content
 * Uses first 8 characters of SHA-256 hash for cache-busting
 */
const generateFingerprint = (buffer) => {
  return createHash('sha256').update(buffer).digest('hex').slice(0, 8);
};

/**
 * Clean filename to be filesystem-safe
 */
const cleanFileName = (name) => {
  if (!name || typeof name !== 'string') {
    return randomUUID().slice(0, 12);
  }
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
};


/**
 * Check if file was replaced between old and new paths
 */
const wasReplaced = (oldPath, newPath) => oldPath && newPath && oldPath !== newPath;

/**
 * Find images in oldArray that are not present in newArray
 * Compares by image path - if old image path not in new array, it was replaced/removed
 * If newArray is undefined, the field wasn't changed - return empty (no deletions)
 * If newArray is empty array [], all items were removed - return all old images
 */
const getReplacedArrayFiles = (oldArray, newArray, isImageArray = false) => {
  const getImage = isImageArray ? (item) => item : (item) => item?.image;
  if (!oldArray?.length) return [];
  if (newArray === undefined) return [];

  const oldImages = oldArray.map(getImage).filter(Boolean);
  if (!newArray.length) return oldImages;

  const newImagesSet = new Set(newArray.map(getImage).filter(Boolean));
  const replaced = [];

  for (const oldImage of oldImages) {
    if (!newImagesSet.has(oldImage)) {
      replaced.push(oldImage);
    }
  }

  return replaced;
};

/**
 * Extract base64 data and extension from data URI
 */
const parseBase64 = (dataUri) => {
  const matches = dataUri.match(/^data:([A-Za-z0-9-+\/\.]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 data');
  }

  const mimeType = matches[1];
  const base64Data = matches[2];
  const ext = mimeType.split('/')[1]?.split('+')[0];

  if (!ext) {
    throw new Error('Invalid MIME type format');
  }

  return { base64Data, ext, mimeType };
};

/**
 * Check if value is base64 data URI
 */
const isBase64 = (value) => {
  return typeof value === 'string' && value.startsWith('data:');
};

/**
 * Delete file from filesystem (unified delete for images, PDFs, videos)
 */
const deleteFile = async (filePath) => {
  if (!filePath) return;

  try {
    const fullPath = path.join(__dirname, '..', filePath);
    await fsp.access(fullPath);
    await fsp.unlink(fullPath);
  } catch (error) {
    if (error.code !== 'ENOENT') {
      logger.error('Error deleting file:', { filePath, error: error.message });
    }
  }
};

/**
 * Delete multiple files in parallel
 */
const deleteFiles = async (filePaths) => {
  if (!filePaths || !Array.isArray(filePaths)) return;
  await Promise.all(filePaths.filter(Boolean).map(deleteFile));
};

/**
 * Save image to filesystem with WebP conversion and fingerprinting
 *
 * @param {string} base64Image - Base64 encoded image data
 * @param {string} dirPath - Directory path relative to assets/images/
 * @param {string} fileName - Base filename (without extension)
 * @param {object|string} sizeConfig - Size preset name or custom config { width, height, fit, withoutEnlargement }
 * @returns {string} Relative path for database storage
 */
const saveImage = async (base64Image, dirPath, fileName, sizeConfig = null) => {
  try {
    const { base64Data } = parseBase64(base64Image);
    const buffer = Buffer.from(base64Data, 'base64');

    // Get size configuration
    const size = typeof sizeConfig === 'string'
      ? IMAGE_SIZES[sizeConfig] || IMAGE_SIZES.default
      : sizeConfig;

    // Create directory
    const imageDir = path.join(ASSETS_DIR, 'images', dirPath);
    await fsp.mkdir(imageDir, { recursive: true });

    // Process image with sharp
    let sharpInstance = sharp(buffer);

    if (size) {
      sharpInstance = sharpInstance.resize(size.width, size.height, {
        fit: size.fit || 'cover',
        position: 'center',
        withoutEnlargement: size.withoutEnlargement !== false
      });
    }

    const compressedBuffer = await sharpInstance
      .webp({ quality: 82, effort: 6, smartSubsample: true })
      .toBuffer();

    // Generate fingerprint and save
    const fingerprint = generateFingerprint(compressedBuffer);
    const fullFileName = `${fileName}.${fingerprint}.webp`;
    const filePath = path.join(imageDir, fullFileName);

    await fsp.writeFile(filePath, compressedBuffer);

    return `/assets/images/${dirPath}/${fullFileName}`;
  } catch (error) {
    logger.error('Error saving image:', { dirPath, fileName, error: error.message });
    throw new Error(`Failed to save image: ${error.message}`);
  }
};

/**
 * Save PDF to filesystem with fingerprinting
 */
const savePDF = async (base64PDF, dirPath, fileName) => {
  if (!base64PDF) return null;

  try {
    const { base64Data } = parseBase64(base64PDF);
    const buffer = Buffer.from(base64Data, 'base64');

    const pdfDir = path.join(ASSETS_DIR, 'pdf', dirPath);
    await fsp.mkdir(pdfDir, { recursive: true });

    const fingerprint = generateFingerprint(buffer);
    const fullFileName = `${fileName}.${fingerprint}.pdf`;
    const filePath = path.join(pdfDir, fullFileName);

    await fsp.writeFile(filePath, buffer);

    return `/assets/pdf/${dirPath}/${fullFileName}`;
  } catch (error) {
    logger.error('Error saving PDF:', { dirPath, fileName, error: error.message });
    throw new Error(`Failed to save PDF: ${error.message}`);
  }
};

/**
 * Save video to filesystem with fingerprinting
 */
const saveVideo = async (base64Video, dirPath, fileName) => {
  if (!base64Video || typeof base64Video !== 'string') {
    throw new Error('Invalid video data');
  }

  try {
    const { base64Data, ext } = parseBase64(base64Video);
    const buffer = Buffer.from(base64Data, 'base64');

    const videoDir = path.join(ASSETS_DIR, 'videos', dirPath);
    await fsp.mkdir(videoDir, { recursive: true });

    const fingerprint = generateFingerprint(buffer);
    const fullFileName = `${fileName}.${fingerprint}.${ext}`;
    const filePath = path.join(videoDir, fullFileName);

    await fsp.writeFile(filePath, buffer);

    return `/assets/videos/${dirPath}/${fullFileName}`;
  } catch (error) {
    logger.error('Error saving video:', { dirPath, fileName, error: error.message });
    throw new Error(`Failed to save video: ${error.message}`);
  }
};

/**
 * Process a single image field - saves if base64, returns existing path otherwise
 */
const processImageField = async (image, dirPath, fileName, sizeConfig = null) => {
  if (!image) return image;
  if (!isBase64(image)) return image;
  return saveImage(image, dirPath, fileName, sizeConfig);
};

/**
 * Process an array of images in parallel
 */
const processImageArray = async (images, dirPath, fileNamePrefix, sizeConfig = null) => {
  if (!images || !Array.isArray(images) || images.length === 0) return [];

  return Promise.all(
    images.map((image, index) =>
      processImageField(image, dirPath, `${fileNamePrefix}_${index}`, sizeConfig)
    )
  );
};

// ============================================================================
// Entity-specific processors
// ============================================================================

/**
 * Process product files
 */
const processProductFiles = async (productData) => {
  const { name: productName, brand: brandName } = productData;
  if (!productName || !brandName) {
    throw new Error('Product name and brand are required');
  }

  const cleanBrand = cleanFileName(brandName);
  const cleanProduct = cleanFileName(productName);
  const result = { ...productData };

  // Process images in parallel
  if (productData.images !== undefined) {
    result.images = await processImageArray(
      productData.images,
      `brand/${cleanBrand}`,
      cleanProduct
    );
  }

  // Process PDFs in parallel
  const pdfPromises = [];
  if (productData.brochureUrl !== undefined && isBase64(productData.brochureUrl)) {
    pdfPromises.push(
      savePDF(productData.brochureUrl, `brand/${cleanBrand}/${cleanProduct}`, 'brochure')
        .then(path => { result.brochureUrl = path; })
    );
  }
  if (productData.specSheetUrl !== undefined && isBase64(productData.specSheetUrl)) {
    pdfPromises.push(
      savePDF(productData.specSheetUrl, `brand/${cleanBrand}/${cleanProduct}`, 'specs')
        .then(path => { result.specSheetUrl = path; })
    );
  }
  await Promise.all(pdfPromises);

  return result;
};

/**
 * Delete product files
 */
const deleteProductFiles = async (files) => {
  if (!files || !Array.isArray(files)) return;
  await deleteFiles(files);
};

/**
 * Process hero image files
 */
const processHeroImageFiles = async (heroImageData) => {
  const { image, title } = heroImageData;
  const cleanTitle = cleanFileName(title);

  return {
    ...heroImageData,
    image: await processImageField(image, 'hero', `hero_${cleanTitle}_${Date.now()}`, 'hero')
  };
};

/**
 * Delete hero image files
 */
const deleteHeroImageFiles = async (imagePath) => deleteFile(imagePath);

/**
 * Process product type files
 */
const processProductTypeFiles = async (productTypeData, brandName) => {
  const { image, type } = productTypeData;
  const cleanBrand = cleanFileName(brandName);
  const cleanType = cleanFileName(type);

  return {
    ...productTypeData,
    image: await processImageField(image, `brand/${cleanBrand}/product-types`, cleanType)
  };
};

/**
 * Process brand files
 */
const processBrandFiles = async (brandData) => {
  const { name: brandName } = brandData;
  if (!brandName) {
    throw new Error('Brand name is required');
  }

  const cleanBrand = cleanFileName(brandName);
  const dirPath = `brand/${cleanBrand}`;
  const result = { ...brandData };

  // Process all media in parallel
  const promises = [];

  if (brandData.heroImage !== undefined && isBase64(brandData.heroImage)) {
    promises.push(
      saveImage(brandData.heroImage, dirPath, 'hero', 'hero')
        .then(path => { result.heroImage = path; })
    );
  }

  if (brandData.logo !== undefined && isBase64(brandData.logo)) {
    promises.push(
      saveImage(brandData.logo, dirPath, 'logo', 'logo')
        .then(path => { result.logo = path; })
    );
  }

  if (brandData.video !== undefined) {
    if (isBase64(brandData.video)) {
      promises.push(
        saveVideo(brandData.video, dirPath, 'video')
          .then(path => { result.video = path; })
      );
    } else if (brandData.video === '' || brandData.video === null) {
      result.video = '';
    }
  }

  if (brandData.images !== undefined) {
    promises.push(
      processImageArray(brandData.images, dirPath, 'image')
        .then(paths => { result.images = paths; })
    );
  }

  await Promise.all(promises);
  return result;
};

/**
 * Delete brand files - only deletes files that have been replaced
 * If newData is not provided (delete operation), deletes all files
 */
const deleteBrandFiles = async (oldData, newData) => {
  const filesToDelete = [];

  if (!newData) {
    // Delete operation - delete all files
    if (oldData.heroImage) filesToDelete.push(oldData.heroImage);
    if (oldData.logo) filesToDelete.push(oldData.logo);
    if (oldData.video) filesToDelete.push(oldData.video);
    if (oldData.images?.length) filesToDelete.push(...oldData.images);
    if (oldData.productTypes?.length) {
      filesToDelete.push(...oldData.productTypes.map(pt => pt.image).filter(Boolean));
    }
  } else {
    // Update operation - only delete replaced files
    if (wasReplaced(oldData.heroImage, newData.heroImage)) {
      filesToDelete.push(oldData.heroImage);
    }
    if (wasReplaced(oldData.logo, newData.logo)) {
      filesToDelete.push(oldData.logo);
    }
    if (wasReplaced(oldData.video, newData.video)) {
      filesToDelete.push(oldData.video);
    }

    // Check images array - delete old images not in new array
    filesToDelete.push(
      ...getReplacedArrayFiles(oldData.images, newData.images, isImageArray=true)
    );

    // Check product types array - delete replaced images
    filesToDelete.push(
      ...getReplacedArrayFiles(oldData.productTypes, newData.productTypes)
    );


  }

  await deleteFiles(filesToDelete);
};

/**
 * Process news article files
 */
const processNewsArticleFiles = async (newsArticleData) => {
  const { image, title } = newsArticleData;
  const cleanTitle = cleanFileName(title);

  return {
    ...newsArticleData,
    image: await processImageField(image, 'news', `news_${cleanTitle}_${Date.now()}`)
  };
};

/**
 * Delete news article files
 */
const deleteNewsArticleFiles = async (imagePath) => deleteFile(imagePath);

/**
 * Process gallery files
 */
const processGalleryFiles = async (galleryData) => {
  const { image } = galleryData;

  return {
    ...galleryData,
    image: await processImageField(image, 'gallery', `gallery_${Date.now()}`, 'gallery')
  };
};

/**
 * Delete gallery files
 */
const deleteGalleryFiles = async (imagePath) => deleteFile(imagePath);

/**
 * Process testimonial files
 */
const processTestimonialFiles = async (testimonialData) => {
  const { image, video, name } = testimonialData;
  const cleanName = cleanFileName(name);
  const timestamp = Date.now();
  const result = { ...testimonialData };

  const promises = [];

  if (isBase64(image)) {
    promises.push(
      saveImage(image, 'testimonials', `testimonial_${cleanName}_${timestamp}`)
        .then(path => { result.image = path; })
    );
  }

  if (isBase64(video)) {
    promises.push(
      saveVideo(video, 'testimonials', `testimonial_${cleanName}_${timestamp}`)
        .then(path => { result.video = path; })
    );
  }

  await Promise.all(promises);
  return result;
};

/**
 * Delete testimonial files
 */
const deleteTestimonialFiles = async (files) => {
    if (!files || !Array.isArray(files)) return;
    await deleteFiles(files);
};

/**
 * Process about us files
 */
const processAboutUsFiles = async (aboutUsData) => {
  const result = { ...aboutUsData };
  const promises = [];

  // Main image
  if (aboutUsData.image !== undefined && isBase64(aboutUsData.image)) {
    promises.push(
      saveImage(aboutUsData.image, 'about', `about_main_${Date.now()}`, 'hero')
        .then(path => { result.image = path; })
    );
  }

  // Milestones - process in parallel
  if (aboutUsData.milestones?.length > 0) {
    promises.push(
      Promise.all(
        aboutUsData.milestones.map(async (milestone, i) => ({
          ...milestone,
          image: await processImageField(
            milestone.image,
            'about/milestones',
            `milestone_${milestone.year}_${i}`,
            { width: 800, height: 600, fit: 'cover' }
          )
        }))
      ).then(milestones => { result.milestones = milestones; })
    );
  }

  // Leadership images
  if (aboutUsData.chairman_message?.image !== undefined && isBase64(aboutUsData.chairman_message.image)) {
    promises.push(
      saveImage(aboutUsData.chairman_message.image, 'about/leadership', 'chairman', 'portrait')
        .then(path => {
          result.chairman_message = { ...aboutUsData.chairman_message, image: path };
        })
    );
  }

  if (aboutUsData.md_message?.image !== undefined && isBase64(aboutUsData.md_message.image)) {
    promises.push(
      saveImage(aboutUsData.md_message.image, 'about/leadership', 'md', 'portrait')
        .then(path => {
          result.md_message = { ...aboutUsData.md_message, image: path };
        })
    );
  }

  // Team members - process in parallel
  if (aboutUsData.team?.length > 0) {
    promises.push(
      Promise.all(
        aboutUsData.team.map(async (member) => ({
          ...member,
          image: await processImageField(
            member.image,
            'about/team',
            `team_${cleanFileName(member.name || 'member')}_${member.id}`
          )
        }))
      ).then(team => { result.team = team; })
    );
  }

  // Certifications - process in parallel
  if (aboutUsData.certifications?.length > 0) {
    promises.push(
      Promise.all(
        aboutUsData.certifications.map(async (cert) => ({
          ...cert,
          image: await processImageField(cert.image, 'about/certifications', `cert_${cert.id}`)
        }))
      ).then(certs => { result.certifications = certs; })
    );
  }

  // Awards - process in parallel
  if (aboutUsData.awards?.length > 0) {
    promises.push(
      Promise.all(
        aboutUsData.awards.map(async (award) => ({
          ...award,
          image: await processImageField(award.image, 'about/awards', `award_${award.id}`)
        }))
      ).then(awards => { result.awards = awards; })
    );
  }

  await Promise.all(promises);
  return result;
};

/**
 * Delete about us files - only deletes files that have been replaced
 * If processedData is not provided (delete operation), deletes all files
 */
const deleteAboutUsFiles = async (oldData, processedData) => {
  const filesToDelete = [];
  // If no processedData, delete all files (delete operation)
  if (!processedData) {
    const { image, milestones, chairman_message, md_message, team, certifications, awards } = oldData;
    filesToDelete.push(
      image,
      chairman_message?.image,
      md_message?.image,
      ...(milestones?.map(m => m.image) || []),
      ...(team?.map(m => m.image) || []),
      ...(certifications?.map(c => c.image) || []),
      ...(awards?.map(a => a.image) || [])
    );
  } else {
    // Update operation - only delete replaced files
    if (wasReplaced(oldData.image, processedData.image)) {
      filesToDelete.push(oldData.image);
    }
    if (wasReplaced(oldData.chairman_message?.image, processedData.chairman_message?.image)) {
      filesToDelete.push(oldData.chairman_message.image);
    }
    if (wasReplaced(oldData.md_message?.image, processedData.md_message?.image)) {
      filesToDelete.push(oldData.md_message.image);
    }

    // Check arrays for replaced files
    filesToDelete.push(
      ...getReplacedArrayFiles(oldData.milestones, processedData.milestones),
      ...getReplacedArrayFiles(oldData.team, processedData.team),
      ...getReplacedArrayFiles(oldData.certifications, processedData.certifications),
      ...getReplacedArrayFiles(oldData.awards, processedData.awards)
    );
  }

  await deleteFiles(filesToDelete);
};

/**
 * Process CSR initiative files
 */
const processCSRInitiativeFiles = async (csrInitiativeData) => {
  const { image, title } = csrInitiativeData;
  const cleanTitle = cleanFileName(title);

  return {
    ...csrInitiativeData,
    image: await processImageField(image, 'csr/initiatives', `initiative_${cleanTitle}_${Date.now()}`)
  };
};

/**
 * Delete CSR initiative files
 */
const deleteCSRInitiativeFiles = async (imagePath) => deleteFile(imagePath);

/**
 * Process CSR hero files
 */
const processCSRHeroFiles = async (csrHeroData) => {
  const { image, title } = csrHeroData;
  const cleanTitle = cleanFileName(title);

  return {
    ...csrHeroData,
    image: await processImageField(image, 'csr/hero', `csr_hero_${cleanTitle}_${Date.now()}`, 'hero')
  };
};

/**
 * Delete CSR hero files
 */
const deleteCSRHeroFiles = async (imagePath) => deleteFile(imagePath);

/**
 * Process sister company files
*/
const processClientFiles = async (clientData) => {
    const { name } = clientData;
    if (!name) {
        throw new Error('Client name is required');
    }
    
    const cleanName = cleanFileName(name);
    const result = { ...clientData };
    const promises = [];
    
    if (clientData.logo !== undefined && isBase64(clientData.logo)) {
        promises.push(
            saveImage(clientData.logo, 'clients', `${cleanName}_logo`, 'logo')
            .then(path => { result.logo = path; })
        );
    }
    
    await Promise.all(promises);
    return result;
};

/**
 * Delete CSR hero files
 */
const deleteClientFiles = async (logoPath) => deleteFile(logoPath);

/**
 * Process sister company files
 */
const processSisterCompanyFiles = async (sisterCompanyData) => {
  const { name } = sisterCompanyData;
  if (!name) {
    throw new Error('Sister company name is required');
  }

  const cleanName = cleanFileName(name);
  const result = { ...sisterCompanyData };
  const promises = [];

  if (sisterCompanyData.logo !== undefined && isBase64(sisterCompanyData.logo)) {
    promises.push(
      saveImage(sisterCompanyData.logo, 'sister-companies', `${cleanName}_logo`, 'logo')
        .then(path => { result.logo = path; })
    );
  }

  if (sisterCompanyData.image !== undefined && isBase64(sisterCompanyData.image)) {
    promises.push(
      saveImage(sisterCompanyData.image, 'sister-companies', `${cleanName}_image`, 'hero')
        .then(path => { result.image = path; })
    );
  }

  await Promise.all(promises);
  return result;
};

/**
 * Delete sister company files
 */
const deleteSisterCompanyFiles = async (files) => {
  if (files && files.length > 0) {
    await deleteFiles(files);
  } 
};

/**
 * Process spare part files
 */
const processSparePartFiles = async (sparePartData) => {
  const result = { ...sparePartData };
  const promises = [];

  if (sparePartData.image !== undefined && isBase64(sparePartData.image)) {
    promises.push(
      saveImage(sparePartData.image, 'spare-parts', `spare_main_${Date.now()}`)
        .then(path => { result.image = path; })
    );
  }

  if (sparePartData.parts?.length > 0) {
    promises.push(
      Promise.all(
        sparePartData.parts.map(async (part) => ({
          ...part,
          image: await processImageField(part.image, 'spare-parts/parts', `part_${part.partId}`)
        }))
      ).then(parts => { result.parts = parts; })
    );
  }

  await Promise.all(promises);
  return result;
};

/**
 * Delete spare part files - only deletes files that have been replaced
 * If newData is not provided (delete operation), deletes all files
 */
const deleteSparePartFiles = async (oldData, newData) => {
  const filesToDelete = [];
  if (wasReplaced(oldData?.image, newData?.image)) {
      filesToDelete.push(oldData.image);
  }
    // Check parts array for replaced files
    filesToDelete.push(
      ...getReplacedArrayFiles(oldData.parts, newData.parts)
    );


  await deleteFiles(filesToDelete);
}
// ============================================================================
// Exports
// ============================================================================

module.exports = {
  // Core utilities
  saveImage,
  savePDF,
  saveVideo,
  deleteFile,
  deleteFiles,
  cleanFileName,
  isBase64,
  IMAGE_SIZES,

  // Entity processors
  processProductFiles,
  deleteProductFiles,
  processHeroImageFiles,
  deleteHeroImageFiles,
  processProductTypeFiles,
  processBrandFiles,
  deleteBrandFiles,
  processNewsArticleFiles,
  deleteNewsArticleFiles,
  processGalleryFiles,
  deleteGalleryFiles,
  processTestimonialFiles,
  deleteTestimonialFiles,
  processAboutUsFiles,
  deleteAboutUsFiles,
  processCSRInitiativeFiles,
  deleteCSRInitiativeFiles,
  processCSRHeroFiles,
  deleteCSRHeroFiles,
  processSisterCompanyFiles,
  deleteSisterCompanyFiles,
  processSparePartFiles,
  deleteSparePartFiles,
  processClientFiles,
  deleteClientFiles
};
