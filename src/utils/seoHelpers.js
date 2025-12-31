/**
 * SEO Helper Functions
 * Utilities for SEO optimization across the application
 */

/**
 * Sanitize and truncate meta description to optimal length
 * @param {string} description - The description text
 * @param {number} maxLength - Maximum length (default: 160)
 * @returns {string} Sanitized description
 */
export const sanitizeMetaDescription = (description, maxLength = 160) => {
  if (!description) return '';

  // Remove HTML tags
  const stripped = description.replace(/<[^>]*>/g, '');

  // Trim whitespace
  const trimmed = stripped.trim();

  // Truncate if too long
  if (trimmed.length <= maxLength) {
    return trimmed;
  }

  // Find last complete word within limit
  const truncated = trimmed.substring(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0
    ? truncated.substring(0, lastSpace) + '...'
    : truncated + '...';
};

/**
 * Generate descriptive alt text for images
 * @param {string} name - Primary name/title
 * @param {string} context - Additional context
 * @returns {string} Alt text
 */
export const generateImageAlt = (name, context = '') => {
  if (!name) return '';

  const parts = [name];
  if (context) parts.push(context);

  return parts.join(' - ');
};

/**
 * Extract and generate keywords from content
 * @param {string} content - Content to extract keywords from
 * @param {number} maxKeywords - Maximum number of keywords
 * @returns {string} Comma-separated keywords
 */
export const generateKeywords = (content, maxKeywords = 10) => {
  if (!content) return '';

  // Common words to exclude
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'should',
    'could', 'may', 'might', 'can', 'this', 'that', 'these', 'those'
  ]);

  // Extract words (3+ characters, alphanumeric only)
  const words = content
    .toLowerCase()
    .replace(/<[^>]*>/g, '') // Remove HTML
    .match(/\b[a-z]{3,}\b/g) || [];

  // Count word frequency
  const frequency = {};
  words.forEach(word => {
    if (!stopWords.has(word)) {
      frequency[word] = (frequency[word] || 0) + 1;
    }
  });

  // Sort by frequency and take top keywords
  const keywords = Object.entries(frequency)
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word);

  return keywords.join(', ');
};

/**
 * Generate breadcrumb structured data
 * @param {Array} breadcrumbs - Array of {name, url} objects
 * @returns {Object} BreadcrumbList schema
 */
export const generateBreadcrumbSchema = (breadcrumbs) => {
  if (!breadcrumbs || breadcrumbs.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

/**
 * Get optimal OG image dimensions
 * @param {string} imageUrl - Image URL
 * @returns {Object} {width, height} dimensions
 */
export const getOptimalOGImageSize = () => {
  return {
    width: '1200',
    height: '630',
  };
};

/**
 * Generate canonical URL
 * @param {string} path - Page path
 * @param {string} baseUrl - Base URL (default from window.location)
 * @returns {string} Full canonical URL
 */
export const generateCanonicalUrl = (path, baseUrl) => {
  const base = baseUrl || `${window.location.protocol}//${window.location.host}`;
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${base}${cleanPath}`;
};

/**
 * Generate Product schema
 * @param {Object} product - Product data
 * @returns {Object} Product schema
 */
export const generateProductSchema = (product) => {
  if (!product) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.shortDescription || product.fullDescription,
    image: product.images?.[0] || '',
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
  };

  if (product.price) {
    schema.offers = {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'NPR',
      availability: 'https://schema.org/InStock',
    };
  }

  return schema;
};

/**
 * Generate Article schema
 * @param {Object} article - Article data
 * @returns {Object} Article schema
 */
export const generateArticleSchema = (article) => {
  if (!article) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.image || article.featuredImage,
    datePublished: article.publishDate || article.date,
    dateModified: article.updatedAt || article.publishDate || article.date,
    author: {
      '@type': 'Person',
      name: article.author || 'Autoways',
    },
    publisher: {
      '@type': 'Organization',
      name: 'Autoways Pvt. Ltd.',
      logo: {
        '@type': 'ImageObject',
        url: 'https://autoways.com.np/autoways-logo.svg',
      },
    },
  };
};

/**
 * Generate LocalBusiness schema
 * @param {Object} location - Location data
 * @returns {Object} LocalBusiness schema
 */
export const generateLocalBusinessSchema = (location) => {
  if (!location) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: location.name || 'Autoways Service Center',
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city || 'Kathmandu',
      addressRegion: 'Bagmati',
      addressCountry: 'NP',
    },
  };

  if (location.phone) {
    schema.telephone = location.phone;
  }

  if (location.position && location.position.length === 2) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: location.position[0],
      longitude: location.position[1],
    };
  }

  return schema;
};

/**
 * Generate Review/Rating aggregate schema
 * @param {Array} reviews - Array of reviews
 * @returns {Object} AggregateRating schema
 */
export const generateAggregateRatingSchema = (reviews) => {
  if (!reviews || reviews.length === 0) return null;

  const totalRating = reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
  const avgRating = totalRating / reviews.length;

  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: avgRating.toFixed(1),
    reviewCount: reviews.length,
    bestRating: '5',
    worstRating: '1',
  };
};

/**
 * Capitalize first letter of each word
 * @param {string} str - String to capitalize
 * @returns {string} Capitalized string
 */
export const capitalizeWords = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};

/**
 * Generate slug from string
 * @param {string} str - String to slugify
 * @returns {string} Slug
 */
export const generateSlug = (str) => {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
};
