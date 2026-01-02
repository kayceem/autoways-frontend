// SEO Configuration for Autoways
const seoConfig = {
  // Site Information
  siteName: 'Autoways',
  siteUrl: 'https://autoways.com.np',
  defaultTitle: 'Autoways Nepal | Premium Automotive Solutions',
  defaultDescription: 'Autoways is the leading distributor of Bull machines in Nepal and dealer for Toyota, Eicher, Komatsu, Dongfeng, XCMG, and Ather. Discover trucks, buses, construction equipment, and electric vehicles.',
  defaultKeywords:  'autoways nepal, bull nepal, toyota nepal, construction vehicle nepal, bull machines, bull machines nepal, bull nepal, bull pokhara, dozer nepal, loader nepal, eicher trucks, komatsu nepal, construction equipment nepal, electric vehicles nepal, ather nepal, automotive nepal, vehicles nepal',

  // Default OG Image (Autoways Logo)
  defaultOGImage: '/autoways-text-logo.webp',
  ogImageWidth: '1200',
  ogImageHeight: '630',

  // Company Information
  company: {
    name: 'Autoways Pvt. Ltd.',
    legalName: 'Autoways Private Limited',
    foundingDate: '1995',
    address: 'Kathmandu, Nepal',
    telephone: '+977-01-5921699',
    email: 'info@autoways.com.np',
  },

  // Social Media
  social: {
    facebook: 'https://www.facebook.com/p/Autoways-Pvt-Ltd-100063602169558/',
  },

  // Locale
  locale: 'en_NP',
  language: 'en',
  region: 'NP',

  // Brand Colors
  themeColor: '#059743',

  // Structured Data - Organization
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Corporation',
    name: 'Autoways Pvt. Ltd.',
    alternateName: 'Autoways Nepal',
    url: 'https://autoways.com.np',
    logo: 'https://autoways.com.np/autoways-logo.webp',
    description: 'Leading distributor of Bull machines and dealer of automotive brands in Nepal',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NP',
      addressRegion: 'Bagmati',
      addressLocality: 'Kathmandu',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+977-01-5921699',
      contactType: 'customer service',
      areaServed: 'NP',
      availableLanguage: ['en', 'ne'],
    },
    sameAs: [
      'https://www.facebook.com/p/Autoways-Pvt-Ltd-100063602169558/',
    ],
  },
};

export default seoConfig;
