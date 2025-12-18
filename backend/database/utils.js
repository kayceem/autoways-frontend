import fs from 'fs';
import path from 'path';
import { promisify } from 'util';
import { fileURLToPath } from 'url';


const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);
const unlink = promisify(fs.unlink);
const readdir = promisify(fs.readdir);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
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
export const saveImage = async (base64Image, brandName, productName, index) => {
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
    console.error('Error saving image:', error);
    throw new Error(`Failed to save image: ${error.message}`);
  }
};

/**
 * Save PDF to filesystem
 */
export const savePDF = async (base64PDF, brandName, productName, type) => {
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
    console.error('Error saving PDF:', error);
    throw new Error(`Failed to save PDF: ${error.message}`);
  }
};

/**
 * Delete image from filesystem
 */
export const deleteImage = async (imagePath) => {
  try {
    if (!imagePath) return;
    
    const fullPath = path.join(__dirname, '..', imagePath);
    
    if (fs.existsSync(fullPath)) {
      await unlink(fullPath);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    // Don't throw error for cleanup operations
  }
};

/**
 * Delete PDF from filesystem
 */
export const deletePDF = async (pdfPath) => {
  try {
    if (!pdfPath) return;
    
    const fullPath = path.join(__dirname, '..', pdfPath);
    
    if (fs.existsSync(fullPath)) {
      await unlink(fullPath);
    }
  } catch (error) {
    console.error('Error deleting PDF:', error);
    // Don't throw error for cleanup operations
  }
};

/**
 * Delete all product files
 */
export const deleteProductFiles = async (brandName, productName, images, brochureUrl, specSheetUrl) => {
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
    console.error('Error deleting product files:', error);
  }
};

/**
 * Process product data and save files
 */
export const processProductFiles = async (productData) => {
  const { name: productName, brand: brandName, images, brochureUrl, specSheetUrl } = productData;
  
  try {
    // Process images
    const savedImagePaths = [];
    if (images && images.length > 0) {
      for (let i = 0; i < images.length; i++) {
        const image = images[i];
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
    
    // Process brochure
    let savedBrochurePath = brochureUrl;
    if (brochureUrl && brochureUrl.startsWith('data:')) {
      savedBrochurePath = await savePDF(brochureUrl, brandName, productName, 'brochure');
    }
    
    // Process spec sheet
    let savedSpecSheetPath = specSheetUrl;
    if (specSheetUrl && specSheetUrl.startsWith('data:')) {
      savedSpecSheetPath = await savePDF(specSheetUrl, brandName, productName, 'specs');
    }
    
    return {
      ...productData,
      images: savedImagePaths,
      brochureUrl: savedBrochurePath,
      specSheetUrl: savedSpecSheetPath
    };
  } catch (error) {
    console.error('Error processing product files:', error);
    throw error;
  }
};
