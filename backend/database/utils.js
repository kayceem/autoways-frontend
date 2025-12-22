const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const unlink = promisify(fs.unlink);
const readdir = promisify(fs.readdir);

const ASSETS_DIR = path.join(__dirname, '..', 'assets');


/**
 * Clean filename to be filesystem-safe
 */
const cleanFileName = (name) => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
};

/**
 * Extract base64 data and extension from data URI
 */
const parseBase64 = (dataUri) => {
  const matches = dataUri.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 data');
  }

  const mimeType = matches[1];
  const base64Data = matches[2];
  
  // Get extension from MIME type
  const ext = mimeType.split('/')[1].split('+')[0];
  
  return { base64Data, ext, mimeType };
};

/**
 * Save image to filesystem
 */
const saveImage = async (base64Image, brandName, productName, index) => {
  try {
    const { base64Data, ext } = parseBase64(base64Image);
    
    const cleanBrand = cleanFileName(brandName);
    const cleanProduct = cleanFileName(productName);
    
    // Create directory path
    const imageDir = path.join(ASSETS_DIR, 'images', 'brand', cleanBrand);
    await mkdir(imageDir, { recursive: true });
    
    // Create filename
    const fileName = `${cleanProduct}_${index}.${ext}`;
    const filePath = path.join(imageDir, fileName);
    
    // Write file
    const buffer = Buffer.from(base64Data, 'base64');
    await writeFile(filePath, buffer);
    
    // Return relative path for database
    return `/assets/images/brand/${cleanBrand}/${fileName}`;
  } catch (error) {
    logger.error('Error saving image:', error);
    throw new Error(`Failed to save image: ${error.message}`);
  }
};

/**
 * Save PDF to filesystem
 */
const savePDF = async (base64PDF, brandName, productName, type) => {
  try {
    if (!base64PDF) return null;
    
    const { base64Data } = parseBase64(base64PDF);
    
    const cleanBrand = cleanFileName(brandName);
    const cleanProduct = cleanFileName(productName);
    
    // Create directory path
    const pdfDir = path.join(ASSETS_DIR, 'pdf', 'brand', cleanBrand, cleanProduct);
    await mkdir(pdfDir, { recursive: true });
    
    // Create filename based on type (brochure or specs)
    const fileName = type === 'brochure' ? 'brochure.pdf' : 'specs.pdf';
    const filePath = path.join(pdfDir, fileName);
    
    // Write file
    const buffer = Buffer.from(base64Data, 'base64');
    await writeFile(filePath, buffer);
    
    // Return relative path for database
    return `/assets/pdf/brand/${cleanBrand}/${cleanProduct}/${fileName}`;
  } catch (error) {
    logger.error('Error saving PDF:', error);
    throw new Error(`Failed to save PDF: ${error.message}`);
  }
};

/**
 * Delete image from filesystem
 */
const deleteImage = async (imagePath) => {
  try {
    if (!imagePath) return;
    
    const fullPath = path.join(__dirname, '..', imagePath);
    
    if (fs.existsSync(fullPath)) {
      await unlink(fullPath);
    }
  } catch (error) {
    logger.error('Error deleting image:', error);
    // Don't throw error for cleanup operations
  }
};

/**
 * Delete PDF from filesystem
 */
const deletePDF = async (pdfPath) => {
  try {
    if (!pdfPath) return;
    
    const fullPath = path.join(__dirname, '..', pdfPath);
    
    if (fs.existsSync(fullPath)) {
      await unlink(fullPath);
    }
  } catch (error) {
    logger.error('Error deleting PDF:', error);
    // Don't throw error for cleanup operations
  }
};

/**
 * Delete all product files
 */
const deleteProductFiles = async (brandName, productName, images, brochureUrl, specSheetUrl) => {
  try {
    // Delete images
    if (images && images.length > 0) {
      await Promise.all(images.map(img => deleteImage(img)));
    }
    
    // Delete PDFs
    if (brochureUrl) await deletePDF(brochureUrl);
    if (specSheetUrl) await deletePDF(specSheetUrl);
    
    // Try to remove empty directories
    const cleanBrand = cleanFileName(brandName);
    const cleanProduct = cleanFileName(productName);
    
    const pdfDir = path.join(ASSETS_DIR, 'pdf', 'brand', cleanBrand, cleanProduct);
    const imageDir = path.join(ASSETS_DIR, 'images', 'brand', cleanBrand);
    
    // Remove directories if empty
    try {
      if (fs.existsSync(pdfDir)) {
        const pdfFiles = await readdir(pdfDir);
        if (pdfFiles.length === 0) {
          fs.rmdirSync(pdfDir);
        }
      }
    } catch (err) {
      // Directory not empty or doesn't exist
    }
  } catch (error) {
    logger.error('Error deleting product files:', error);
  }
};

/**
 * Generic save image function with custom directory path
 */
const saveImageGeneric = async (base64Image, dirPath, fileName) => {
  try {
    const { base64Data, ext } = parseBase64(base64Image);

    // Create directory path
    const imageDir = path.join(ASSETS_DIR, 'images', dirPath);
    await mkdir(imageDir, { recursive: true });

    // Create filename
    const fullFileName = `${fileName}.${ext}`;
    const filePath = path.join(imageDir, fullFileName);

    // Write file
    const buffer = Buffer.from(base64Data, 'base64');
    await writeFile(filePath, buffer);

    // Return relative path for database
    return `/assets/images/${dirPath}/${fullFileName}`;
  } catch (error) {
    logger.error('Error saving image:', error);
    throw new Error(`Failed to save image: ${error.message}`);
  }
};
const saveVideoGeneric = async (base64Video, dirPath, fileName) => {
  try {
    const { base64Data, ext } = parseBase64(base64Video);

    // Create directory path
    const videoDir = path.join(ASSETS_DIR, 'videos', dirPath);
    await mkdir(videoDir, { recursive: true });

    // Create filename
    const fullFileName = `${fileName}.${ext}`;
    const filePath = path.join(videoDir, fullFileName);

    // Write file
    const buffer = Buffer.from(base64Data, 'base64');
    await writeFile(filePath, buffer);

    // Return relative path for database
    return `/assets/videos/${dirPath}/${fullFileName}`;
  } catch (error) {
    logger.error('Error saving video:', error);
    throw new Error(`Failed to save video: ${error.message}`);
  }
};

/**
 * Process product data and save files
 * Only processes fields that are present in productData to support partial updates
 */
const processProductFiles = async (productData) => {
  try {
    const result = { ...productData };

    // Get required fields for file paths
    const productName = productData.name;
    const brandName = productData.brand;
    if (!productName || !brandName) {
      throw new Error('Product name and brand are required for processing files');
    }

    // Process images only if present
    if (productData.images !== undefined) {
      const savedImagePaths = [];
      if (productData.images && productData.images.length > 0) {
        for (let i = 0; i < productData.images.length; i++) {
          const image = productData.images[i];
          // Check if it's base64 data
          if (image.startsWith('data:')) {
            const savedPath = await saveImage(image, brandName, productName, i);
            savedImagePaths.push(savedPath);
          } else {
            // Already a path, keep it
            savedImagePaths.push(image);
          }
        }
      }
      result.images = savedImagePaths;
    }

    // Process brochure only if present
    if (productData.brochureUrl !== undefined) {
      if (productData.brochureUrl && productData.brochureUrl.startsWith('data:')) {
        result.brochureUrl = await savePDF(productData.brochureUrl, brandName, productName, 'brochure');
      }
    }

    // Process spec sheet only if present
    if (productData.specSheetUrl !== undefined) {
      if (productData.specSheetUrl && productData.specSheetUrl.startsWith('data:')) {
        result.specSheetUrl = await savePDF(productData.specSheetUrl, brandName, productName, 'specs');
      }
    }

    return result;
  } catch (error) {
    logger.error('Error processing product files:', error);
    throw error;
  }
};

/**
 * Process hero image files
 */
const processHeroImageFiles = async (heroImageData) => {
  try {
    const { image, title } = heroImageData;

    let savedImagePath = image;
    if (image && image.startsWith('data:')) {
      const cleanTitle = cleanFileName(title);
      savedImagePath = await saveImageGeneric(image, 'hero', `hero_${cleanTitle}_${Date.now()}`);
    }

    return {
      ...heroImageData,
      image: savedImagePath
    };
  } catch (error) {
    logger.error('Error processing hero image files:', error);
    throw error;
  }
};

/**
 * Delete hero image files
 */
const deleteHeroImageFiles = async (imagePath) => {
  try {
    if (imagePath) await deleteImage(imagePath);
  } catch (error) {
    logger.error('Error deleting hero image files:', error);
  }
};

/**
 * Process product type files (within Brand)
 */
const processProductTypeFiles = async (productTypeData, brandName) => {
  try {
    const { image, type } = productTypeData;

    let savedImagePath = image;
    if (image && image.startsWith('data:')) {
      const cleanBrand = cleanFileName(brandName);
      const cleanType = cleanFileName(type);
      savedImagePath = await saveImageGeneric(image, `brands/${cleanBrand}/product-types`, cleanType);
    }

    return {
      ...productTypeData,
      image: savedImagePath
    };
  } catch (error) {
    logger.error('Error processing product type files:', error);
    throw error;
  }
};

/**
 * Process brand files
 * Only processes fields that are present in brandData to support partial updates
 */
const processBrandFiles = async (brandData) => {
  try {
    const result = { ...brandData };

    // Get brand name for file paths (required field)
    const brandName = brandData.name;
    if (!brandName) {
      throw new Error('Brand name is required for processing files');
    }
    const cleanBrand = cleanFileName(brandName);

    // Process hero image only if present
    if (brandData.heroImage !== undefined) {
      if (brandData.heroImage && brandData.heroImage.startsWith('data:')) {
        result.heroImage = await saveImageGeneric(brandData.heroImage, `brands/${cleanBrand}`, 'hero');
      }
    }

    // Process logo only if present
    if (brandData.logo !== undefined) {
      if (brandData.logo && brandData.logo.startsWith('data:')) {
        result.logo = await saveImageGeneric(brandData.logo, `brands/${cleanBrand}`, 'logo');
      }
    }

    // Process video only if present
    if (brandData.video !== undefined) {
      if (brandData.video && brandData.video.startsWith('data:')) {
        result.video = await saveVideoGeneric(brandData.video, `brands/${cleanBrand}`, 'video');
      }
    }

    // Process additional images only if present
    if (brandData.images !== undefined) {
      const savedImagePaths = [];
      if (brandData.images && brandData.images.length > 0) {
        for (let i = 0; i < brandData.images.length; i++) {
          const image = brandData.images[i];
          if (image.startsWith('data:')) {
            const savedPath = await saveImageGeneric(image, `brands/${cleanBrand}`, `image_${i}`);
            savedImagePaths.push(savedPath);
          } else {
            savedImagePaths.push(image);
          }
        }
      }
      result.images = savedImagePaths;
    }

    return result;
  } catch (error) {
    logger.error('Error processing brand files:', error);
    throw error;
  }
};

/**
 * Delete brand files
 */
const deleteBrandFiles = async (heroImage, logo, images, productType, video) => {
  try {
    if (heroImage) await deleteImage(heroImage);
    if (logo) await deleteImage(logo);

    if (images && images.length > 0) {
      await Promise.all(images.map(img => deleteImage(img)));
    }
    if (productType) {
      await deleteImage(productType.image);
    }
    if (video) await deleteVideo(video);

  } catch (error) {
    logger.error('Error deleting brand files:', error);
  }
};

/**
 * Process news article files
 */
const processNewsArticleFiles = async (newsArticleData) => {
  try {
    const { image, title } = newsArticleData;

    let savedImagePath = image;
    if (image && image.startsWith('data:')) {
      const cleanTitle = cleanFileName(title);
      savedImagePath = await saveImageGeneric(image, 'news', `news_${cleanTitle}_${Date.now()}`);
    }

    return {
      ...newsArticleData,
      image: savedImagePath
    };
  } catch (error) {
    logger.error('Error processing news article files:', error);
    throw error;
  }
};

/**
 * Delete news article files
 */
const deleteNewsArticleFiles = async (imagePath) => {
  try {
    if (imagePath) await deleteImage(imagePath);
  } catch (error) {
    logger.error('Error deleting news article files:', error);
  }
};

/**
 * Process testimonial files
 */
const processTestimonialFiles = async (testimonialData) => {
  try {
    const { image, name } = testimonialData;

    let savedImagePath = image;
    if (image && image.startsWith('data:')) {
      const cleanName = cleanFileName(name);
      savedImagePath = await saveImageGeneric(image, 'testimonials', `testimonial_${cleanName}_${Date.now()}`);
    }

    return {
      ...testimonialData,
      image: savedImagePath
    };
  } catch (error) {
    logger.error('Error processing testimonial files:', error);
    throw error;
  }
};

/**
 * Delete testimonial files
 */
const deleteTestimonialFiles = async (imagePath) => {
  try {
    if (imagePath) await deleteImage(imagePath);
  } catch (error) {
    logger.error('Error deleting testimonial files:', error);
  }
};

/**
 * Process about us files
 * Only processes fields that are present in aboutUsData to support partial updates
 */
const processAboutUsFiles = async (aboutUsData) => {
  try {
    const result = { ...aboutUsData };

    // Process main image only if present
    if (aboutUsData.image !== undefined) {
      if (aboutUsData.image && aboutUsData.image.startsWith('data:')) {
        result.image = await saveImageGeneric(aboutUsData.image, 'about', `about_main_${Date.now()}`);
      }
    }

    // Process milestones only if present
    if (aboutUsData.milestones !== undefined) {
      const processedMilestones = [];
      if (aboutUsData.milestones && aboutUsData.milestones.length > 0) {
        for (let i = 0; i < aboutUsData.milestones.length; i++) {
          const milestone = aboutUsData.milestones[i];
          let milestoneImage = milestone.image;
          if (milestoneImage && milestoneImage.startsWith('data:')) {
            milestoneImage = await saveImageGeneric(milestoneImage, 'about/milestones', `milestone_${milestone.year}_${i}`);
          }
          processedMilestones.push({ ...milestone, image: milestoneImage });
        }
      }
      result.milestones = processedMilestones;
    }

    // Process chairman message only if present
    if (aboutUsData.chairman_message !== undefined) {
      let chairmanImage = aboutUsData.chairman_message?.image;
      if (chairmanImage && chairmanImage.startsWith('data:')) {
        chairmanImage = await saveImageGeneric(chairmanImage, 'about/leadership', 'chairman');
      }
      result.chairman_message = aboutUsData.chairman_message ? { ...aboutUsData.chairman_message, image: chairmanImage } : aboutUsData.chairman_message;
    }

    // Process MD message only if present
    if (aboutUsData.md_message !== undefined) {
      let mdImage = aboutUsData.md_message?.image;
      if (mdImage && mdImage.startsWith('data:')) {
        mdImage = await saveImageGeneric(mdImage, 'about/leadership', 'md');
      }
      result.md_message = aboutUsData.md_message ? { ...aboutUsData.md_message, image: mdImage } : aboutUsData.md_message;
    }

    // Process team only if present
    if (aboutUsData.team !== undefined) {
      const processedTeam = [];
      if (aboutUsData.team && aboutUsData.team.length > 0) {
        for (const member of aboutUsData.team) {
          let memberImage = member.image;
          if (memberImage && memberImage.startsWith('data:')) {
            const cleanName = cleanFileName(member.name || 'member');
            memberImage = await saveImageGeneric(memberImage, 'about/team', `team_${cleanName}_${member.id}`);
          }
          processedTeam.push({ ...member, image: memberImage });
        }
      }
      result.team = processedTeam;
    }

    // Process certifications only if present
    if (aboutUsData.certifications !== undefined) {
      const processedCertifications = [];
      if (aboutUsData.certifications && aboutUsData.certifications.length > 0) {
        for (const cert of aboutUsData.certifications) {
          let certImage = cert.image;
          if (certImage && certImage.startsWith('data:')) {
            certImage = await saveImageGeneric(certImage, 'about/certifications', `cert_${cert.id}`);
          }
          processedCertifications.push({ ...cert, image: certImage });
        }
      }
      result.certifications = processedCertifications;
    }

    // Process awards only if present
    if (aboutUsData.awards !== undefined) {
      const processedAwards = [];
      if (aboutUsData.awards && aboutUsData.awards.length > 0) {
        for (const award of aboutUsData.awards) {
          let awardImage = award.image;
          if (awardImage && awardImage.startsWith('data:')) {
            awardImage = await saveImageGeneric(awardImage, 'about/awards', `award_${award.id}`);
          }
          processedAwards.push({ ...award, image: awardImage });
        }
      }
      result.awards = processedAwards;
    }

    return result;
  } catch (error) {
    logger.error('Error processing about us files:', error);
    throw error;
  }
};

/**
 * Delete about us files
 */
const deleteAboutUsFiles = async (aboutUsData) => {
  try {
    const { image, milestones, chairman_message, md_message, team, certifications, awards } = aboutUsData;

    if (image) await deleteImage(image);

    if (milestones) {
      await Promise.all(milestones.map(m => m.image ? deleteImage(m.image) : Promise.resolve()));
    }

    if (chairman_message?.image) await deleteImage(chairman_message.image);
    if (md_message?.image) await deleteImage(md_message.image);

    if (team) {
      await Promise.all(team.map(m => m.image ? deleteImage(m.image) : Promise.resolve()));
    }

    if (certifications) {
      await Promise.all(certifications.map(c => c.image ? deleteImage(c.image) : Promise.resolve()));
    }

    if (awards) {
      await Promise.all(awards.map(a => a.image ? deleteImage(a.image) : Promise.resolve()));
    }
  } catch (error) {
    logger.error('Error deleting about us files:', error);
  }
};

/**
 * Process CSR initiative files
 */
const processCSRInitiativeFiles = async (csrInitiativeData) => {
  try {
    const { image, title } = csrInitiativeData;

    let savedImagePath = image;
    if (image && image.startsWith('data:')) {
      const cleanTitle = cleanFileName(title);
      savedImagePath = await saveImageGeneric(image, 'csr/initiatives', `initiative_${cleanTitle}_${Date.now()}`);
    }

    return {
      ...csrInitiativeData,
      image: savedImagePath
    };
  } catch (error) {
    logger.error('Error processing CSR initiative files:', error);
    throw error;
  }
};

/**
 * Delete CSR initiative files
 */
const deleteCSRInitiativeFiles = async (imagePath) => {
  try {
    if (imagePath) await deleteImage(imagePath);
  } catch (error) {
    logger.error('Error deleting CSR initiative files:', error);
  }
};

/**
 * Process CSR hero files
 */
const processCSRHeroFiles = async (csrHeroData) => {
  try {
    const { image, title } = csrHeroData;

    let savedImagePath = image;
    if (image && image.startsWith('data:')) {
      const cleanTitle = cleanFileName(title);
      savedImagePath = await saveImageGeneric(image, 'csr/hero', `csr_hero_${cleanTitle}_${Date.now()}`);
    }

    return {
      ...csrHeroData,
      image: savedImagePath
    };
  } catch (error) {
    logger.error('Error processing CSR hero files:', error);
    throw error;
  }
};

/**
 * Delete CSR hero files
 */
const deleteCSRHeroFiles = async (imagePath) => {
  try {
    if (imagePath) await deleteImage(imagePath);
  } catch (error) {
    logger.error('Error deleting CSR hero files:', error);
  }
};

/**
 * Process sister company files
 * Only processes fields that are present in sisterCompanyData to support partial updates
 */
const processSisterCompanyFiles = async (sisterCompanyData) => {
  try {
    const result = { ...sisterCompanyData };

    // Get name for file paths (required field)
    const name = sisterCompanyData.name;
    if (!name) {
      throw new Error('Sister company name is required for processing files');
    }
    const cleanName = cleanFileName(name);

    // Process logo only if present
    if (sisterCompanyData.logo !== undefined) {
      if (sisterCompanyData.logo && sisterCompanyData.logo.startsWith('data:')) {
        result.logo = await saveImageGeneric(sisterCompanyData.logo, 'sister-companies', `${cleanName}_logo`);
      }
    }

    // Process image only if present
    if (sisterCompanyData.image !== undefined) {
      if (sisterCompanyData.image && sisterCompanyData.image.startsWith('data:')) {
        result.image = await saveImageGeneric(sisterCompanyData.image, 'sister-companies', `${cleanName}_image`);
      }
    }

    return result;
  } catch (error) {
    logger.error('Error processing sister company files:', error);
    throw error;
  }
};

/**
 * Delete sister company files
 */
const deleteSisterCompanyFiles = async (logo, image) => {
  try {
    if (logo) await deleteImage(logo);
    if (image) await deleteImage(image);
  } catch (error) {
    logger.error('Error deleting sister company files:', error);
  }
};

/**
 * Process spare part files
 * Only processes fields that are present in sparePartData to support partial updates
 */
const processSparePartFiles = async (sparePartData) => {
  try {
    const result = { ...sparePartData };

    // Process main image only if present
    if (sparePartData.image !== undefined) {
      if (sparePartData.image && sparePartData.image.startsWith('data:')) {
        result.image = await saveImageGeneric(sparePartData.image, 'spare-parts', `spare_main_${Date.now()}`);
      }
    }

    // Process parts images only if present
    if (sparePartData.parts !== undefined) {
      const processedParts = [];
      if (sparePartData.parts && sparePartData.parts.length > 0) {
        for (const part of sparePartData.parts) {
          let partImage = part.image;
          if (partImage && partImage.startsWith('data:')) {
            partImage = await saveImageGeneric(partImage, 'spare-parts/parts', `part_${part.partId}`);
          }
          processedParts.push({ ...part, image: partImage });
        }
      }
      result.parts = processedParts;
    }

    return result;
  } catch (error) {
    logger.error('Error processing spare part files:', error);
    throw error;
  }
};

/**
 * Delete spare part files
 */
const deleteSparePartFiles = async (image, parts) => {
  try {
    if (image) await deleteImage(image);

    if (parts && parts.length > 0) {
      await Promise.all(parts.map(p => p.image ? deleteImage(p.image) : Promise.resolve()));
    }
  } catch (error) {
    logger.error('Error deleting spare part files:', error);
  }
};

// Export all functions
module.exports = {
  saveImage,
  savePDF,
  deleteImage,
  deletePDF,
  deleteProductFiles,
  processProductFiles,
  processHeroImageFiles,
  deleteHeroImageFiles,
  processProductTypeFiles,
  processBrandFiles,
  deleteBrandFiles,
  processNewsArticleFiles,
  deleteNewsArticleFiles,
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
  deleteSparePartFiles
};
