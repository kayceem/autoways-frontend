import { useMemo, useCallback } from 'react';
import { getAssetUrl, transformAssetUrls } from '../../utils/assetUrl';
import config from '../../config';

/**
 * Custom hook for handling asset URLs
 * Provides utilities to convert relative asset paths to full URLs
 *
 * @returns {Object} Asset URL utilities
 * @property {Function} getUrl - Convert a single asset path to full URL
 * @property {Function} transformUrls - Transform all asset URLs in an object/array
 * @property {string} assetsBaseUrl - The base URL for assets
 *
 * @example
 * const { getUrl, transformUrls, assetsBaseUrl } = useAssetUrl();
 *
 * // Convert single URL
 * const imageUrl = getUrl("/assets/images/logo.png");
 * // Result: "http://localhost:5000/assets/images/logo.png"
 *
 * // Transform object with multiple asset fields
 * const data = {
 *   image: "/assets/image.jpg",
 *   images: ["/assets/img1.jpg", "/assets/img2.jpg"]
 * };
 * const transformed = transformUrls(data);
 */
export const useAssetUrl = () => {
  // Memoize the base URL
  const assetsBaseUrl = useMemo(() => config.assetsBaseUrl, []);

  // Memoize the getUrl function to prevent recreating on every render
  const getUrl = useCallback((path) => getAssetUrl(path), []);

  // Memoize the transformUrls function
  const transformUrls = useCallback((data) => transformAssetUrls(data), []);

  return {
    getUrl,
    transformUrls,
    assetsBaseUrl,
  };
};

export default useAssetUrl;
