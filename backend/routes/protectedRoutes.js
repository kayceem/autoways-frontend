const express = require('express');
const authMiddleware = require('../middleware/auth');
const {
  refreshCache,
  getHeroImages,
  getHeroImageById,
  createHeroImage,
  updateHeroImage,
  deleteHeroImage,
  getAboutUs,
  getAboutUsById,
  createAboutUs,
  updateAboutUs,
  deleteAboutUs,
  getContactInfo,
  getContactInfoById,
  createContactInfo,
  updateContactInfo,
  deleteContactInfo,
  getLocations,
  getLocationById,
  createLocation,
  updateLocation,
  deleteLocation,
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getBrands,
  getBrandById,
  createBrand,
  updateBrand,
  deleteBrand,
  getProductTypes,
  createProductType,
  updateProductType,
  deleteProductType,
  getPartners,
  getPartnerById,
  createPartner,
  updatePartner,
  deletePartner,
  getClients,
  getClientById,
  createClient,
  updateClient,
  deleteClient,
  getNewsArticles,
  getNewsArticleById,
  createNewsArticle,
  updateNewsArticle,
  deleteNewsArticle,
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getCSRInitiatives,
  getCSRInitiativeById,
  createCSRInitiative,
  updateCSRInitiative,
  deleteCSRInitiative,
  getCSRHero,
  getCSRHeroById,
  createCSRHero,
  updateCSRHero,
  deleteCSRHero,
  getSisterCompanies,
  getSisterCompanyById,
  createSisterCompany,
  updateSisterCompany,
  deleteSisterCompany,
  getSpareParts,
  getSparePartById,
  createSparePart,
  updateSparePart,
  deleteSparePart,
  getCustomers,
  getGalleries,
  createGallery,
  deleteGallery,
  getCareers,
  createCareer,
  updateCareer,
  deleteCareer
} = require('../database/interface');

const router = express.Router();

// Apply auth middleware to all routes in this file
router.use(authMiddleware);

// Refresh cache
router.post('/data/refresh', refreshCache);

// Hero Images routes
router.get('/hero-images', getHeroImages);
router.get('/hero-images/:id', getHeroImageById);
router.post('/hero-images', createHeroImage);
router.patch('/hero-images/:id', updateHeroImage);
router.delete('/hero-images/:id', deleteHeroImage);

// About Us routes
router.get('/about-us', getAboutUs);
router.get('/about-us/:id', getAboutUsById);
router.post('/about-us', createAboutUs);
router.patch('/about-us/:id', updateAboutUs);
router.delete('/about-us/:id', deleteAboutUs);

// Contact Info routes
router.get('/contact-info', getContactInfo);
router.get('/contact-info/:id', getContactInfoById);
router.post('/contact-info', createContactInfo);
router.patch('/contact-info/:id', updateContactInfo);
router.delete('/contact-info/:id', deleteContactInfo);

// Location routes
router.get('/locations', getLocations);
router.get('/locations/:id', getLocationById);
router.post('/locations', createLocation);
router.patch('/locations/:id', updateLocation);
router.delete('/locations/:id', deleteLocation);

// Product routes
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.post('/products', createProduct);
router.patch('/products/:id', updateProduct);
router.delete('/products/:id', deleteProduct);

// Brand routes
router.get('/brands', getBrands);
router.get('/brands/:id', getBrandById);
router.post('/brands', createBrand);
router.patch('/brands/:id', updateBrand);
router.delete('/brands/:id', deleteBrand);

// Product Type routes
router.get('/product-types', getProductTypes);
router.post('/product-types', createProductType);
router.patch('/product-types', updateProductType);
router.delete('/product-types', deleteProductType);

// Partner routes
router.get('/partners', getPartners);
router.get('/partners/:id', getPartnerById);
router.post('/partners', createPartner);
router.patch('/partners/:id', updatePartner);
router.delete('/partners/:id', deletePartner);

// Client routes
router.get('/clients', getClients);
router.get('/clients/:id', getClientById);
router.post('/clients', createClient);
router.patch('/clients/:id', updateClient);
router.delete('/clients/:id', deleteClient);

// News Article routes
router.get('/news-articles', getNewsArticles);
router.get('/news-articles/:id', getNewsArticleById);
router.post('/news-articles', createNewsArticle);
router.patch('/news-articles/:id', updateNewsArticle);
router.delete('/news-articles/:id', deleteNewsArticle);

// Testimonial routes
router.get('/testimonials', getTestimonials);
router.get('/testimonials/:id', getTestimonialById);
router.post('/testimonials', createTestimonial);
router.patch('/testimonials/:id', updateTestimonial);
router.delete('/testimonials/:id', deleteTestimonial);

// CSR Initiative routes
router.get('/csr-initiatives', getCSRInitiatives);
router.get('/csr-initiatives/:id', getCSRInitiativeById);
router.post('/csr-initiatives', createCSRInitiative);
router.patch('/csr-initiatives/:id', updateCSRInitiative);
router.delete('/csr-initiatives/:id', deleteCSRInitiative);

// CSR Hero routes
router.get('/csr-hero', getCSRHero);
router.get('/csr-hero/:id', getCSRHeroById);
router.post('/csr-hero', createCSRHero);
router.patch('/csr-hero/:id', updateCSRHero);
router.delete('/csr-hero/:id', deleteCSRHero);

// Sister Company routes
router.get('/sister-companies', getSisterCompanies);
router.get('/sister-companies/:id', getSisterCompanyById);
router.post('/sister-companies', createSisterCompany);
router.patch('/sister-companies/:id', updateSisterCompany);
router.delete('/sister-companies/:id', deleteSisterCompany);

// Spare Part routes
router.get('/spare-parts', getSpareParts);
router.get('/spare-parts/:id', getSparePartById);
router.post('/spare-parts', createSparePart);
router.patch('/spare-parts/:id', updateSparePart);
router.delete('/spare-parts/:id', deleteSparePart);

// Customer routes
router.get('/customers', getCustomers);

// Gallery routes
router.get('/gallery', getGalleries);
router.post('/gallery', createGallery);
router.delete('/gallery/:id', deleteGallery);

// Career routes
router.get('/careers', getCareers);
router.post('/careers', createCareer);
router.patch('/careers/:id', updateCareer);
router.delete('/careers/:id', deleteCareer);

module.exports = router;
