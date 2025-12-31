import seoConfig from '../../config/seoConfig';
import { sanitizeMetaDescription, generateCanonicalUrl } from '../../utils/seoHelpers';

/**
 * SEO Component - React 19 Native Metadata
 * Manages all SEO-related meta tags for a page using React 19's native document metadata support
 *
 * @param {Object} props
 * @param {string} props.title - Page title (will append "| Autoways" automatically)
 * @param {string} props.description - Meta description
 * @param {string} props.keywords - Meta keywords (comma-separated)
 * @param {string} props.image - OG image URL (defaults to Autoways logo)
 * @param {string} props.url - Canonical URL path
 * @param {string} props.type - OG type (default: "website")
 * @param {boolean} props.noindex - Add noindex directive (default: false)
 * @param {string} props.author - Content author
 * @param {string} props.publishDate - Article publish date (ISO format)
 */
const SEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website',
  noindex = false,
  author,
  publishDate,
}) => {
  // Generate full title with site name
  const fullTitle = title
    ? `${title} | ${seoConfig.siteName}`
    : seoConfig.defaultTitle;

  // Use provided description or fallback to default
  const metaDescription = description
    ? sanitizeMetaDescription(description)
    : seoConfig.defaultDescription;

  // Use provided keywords or fallback to default
  const metaKeywords = keywords || seoConfig.defaultKeywords;

  // Generate OG image URL
  const ogImage = image
    ? (image.startsWith('http') ? image : `${seoConfig.siteUrl}${image}`)
    : `${seoConfig.siteUrl}${seoConfig.defaultOGImage}`;

  // Generate canonical URL
  const canonicalUrl = url
    ? generateCanonicalUrl(url, seoConfig.siteUrl)
    : seoConfig.siteUrl;

  // Robots directive
  const robots = noindex ? 'noindex, nofollow' : 'index, follow';

  return (
    <>
      {/* Basic Meta Tags - React 19 native metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <meta name="keywords" content={metaKeywords} />
      <meta name="robots" content={robots} />
      {author && <meta name="author" content={author} />}

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph Tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={seoConfig.ogImageWidth} />
      <meta property="og:image:height" content={seoConfig.ogImageHeight} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={seoConfig.siteName} />
      <meta property="og:locale" content={seoConfig.locale} />

      {/* Article-specific OG tags */}
      {type === 'article' && publishDate && (
        <>
          <meta property="article:published_time" content={publishDate} />
          {author && <meta property="article:author" content={author} />}
        </>
      )}

      {/* Twitter Card Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={ogImage} />

      {/* Language & Region */}
      <meta httpEquiv="content-language" content={seoConfig.language} />
      <meta name="geo.region" content={seoConfig.region} />
    </>
  );
};

export default SEO;
