import config from '../config';

/**
 * Converts a relative asset path to a full URL using the backend base URL
 * @param {string} path - The asset path (e.g., "/assets/images/brands/eicher/eicher-hero.jpg")
 * @returns {string} - The full asset URL (e.g., "http://localhost:5000/assets/images/brands/eicher/eicher-hero.jpg")
 */
export const getAssetUrl = (path) => {
  if (!path) return '';

  // If path is already a full URL (starts with http:// or https://), return as is
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }

  // If path is a data URL (base64), return as is
  if (path.startsWith('data:')) {
    return path;
  }

  // Remove leading slash if present to avoid double slashes
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;

  // Combine backend base URL with the asset path
  return `${config.assetsBaseUrl}/${cleanPath}`;
};

/**
 * Recursively transforms all asset URLs in an object/array
 * This function looks for common asset field names and transforms their values
 * @param {any} data - The data to transform
 * @returns {any} - The transformed data with full asset URLs
 */
export const transformAssetUrls = (data) => {
  if (!data) return data;

  // Asset field names to look for
  const assetFields = [
    'image', 'images', 'video', 'videos',
    'thumbnail', 'thumbnails', 'defaultImage',
    'hero_images', 'logo', 'icon'
  ];

  // Handle arrays
  if (Array.isArray(data)) {
    return data.map(item => transformAssetUrls(item));
  }

  // Handle objects
  if (typeof data === 'object' && data !== null) {
    const transformed = {};

    for (const [key, value] of Object.entries(data)) {
      // If this is an asset field with a string value, transform it
      if (assetFields.includes(key) && typeof value === 'string') {
        transformed[key] = getAssetUrl(value);
      }
      // If it's an asset field with an array value, transform each item
      else if (assetFields.includes(key) && Array.isArray(value)) {
        transformed[key] = value.map(item =>
          typeof item === 'string' ? getAssetUrl(item) : transformAssetUrls(item)
        );
      }
      // Otherwise, recursively transform nested objects/arrays
      else {
        transformed[key] = transformAssetUrls(value);
      }
    }

    return transformed;
  }

  // Return primitive values as is
  return data;
};
