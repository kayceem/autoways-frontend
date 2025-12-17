import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import {
    HeroImage,
    AboutUs,
    ContactInfo,
    Location,
    Product,
    Brand,
    Partner,
    Client,
    NewsArticle,
    Testimonial,
    AboutUsDetailed,
    CSRInitiative,
    CSRHero,
    SisterCompany,
    SparePart,
    SparePartsService,
    SparePartsStats,
    SparePartsContact
} from './schema.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_FILE_PATH = path.join(__dirname, 'data.json');

// ==================== UTILITY FUNCTIONS ====================
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

// Check if data.json exists
const checkDataFileExists = async () => {
    try {
        await fs.access(DATA_FILE_PATH);
        return true;
    } catch {
        return false;
    }
};

// Read data from data.json
const readDataFile = async () => {
    const data = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    return JSON.parse(data);
};

// Write data to data.json
const writeDataFile = async (data) => {
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
};

// Fetch all data from database
const fetchAllDataFromDB = async () => {
    const [
        heroImages,
        aboutUs,
        contactInfo,
        locations,
        products,
        brands,
        partners,
        clients,
        newsArticles,
        testimonials,
        aboutUsDetailed,
        csrInitiatives,
        csrHero,
        sisterCompanies,
        spareParts,
        sparePartsServices,
        sparePartsStats,
        sparePartsContact
    ] = await Promise.all([
        HeroImage.find(),
        AboutUs.find(),
        ContactInfo.find(),
        Location.find(),
        Product.find(),
        Brand.find(),
        Partner.find(),
        Client.find(),
        NewsArticle.find(),
        Testimonial.find(),
        AboutUsDetailed.find(),
        CSRInitiative.find(),
        CSRHero.find(),
        SisterCompany.find(),
        SparePart.find(),
        SparePartsService.find(),
        SparePartsStats.find(),
        SparePartsContact.find()
    ]);

    return {
        heroImages,
        aboutUs,
        contactInfo,
        locations,
        products,
        brands,
        partners,
        clients,
        newsArticles,
        testimonials,
        aboutUsDetailed,
        csrInitiatives,
        csrHero,
        sisterCompanies,
        spareParts,
        sparePartsServices,
        sparePartsStats,
        sparePartsContact
    };
};

// ==================== GET ALL DATA ====================
export const getAllData = asyncHandler(async (req, res) => {
    const fileExists = await checkDataFileExists();

    if (fileExists) {
        const data = await readDataFile();
        return res.json({
            success: true,
            cached: true,
            data
        });
    }

    const data = await fetchAllDataFromDB();
    await writeDataFile(data);

    res.json({
        success: true,
        cached: false,
        data
    });
});

// ==================== REFRESH CACHE ====================
export const refreshCache = asyncHandler(async (req, res) => {
    const data = await fetchAllDataFromDB();
    await writeDataFile(data);

    res.json({
        success: true,
        message: 'Cache refreshed successfully',
        data
    });
});

// ==================== HERO IMAGE ROUTES ====================
export const createHeroImage = asyncHandler(async (req, res) => {
    const heroImage = await HeroImage.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: heroImage
    });
});

export const updateHeroImage = asyncHandler(async (req, res) => {
    const heroImage = await HeroImage.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!heroImage) {
        return res.status(404).json({ success: false, error: 'Hero image not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: heroImage
    });
});

export const deleteHeroImage = asyncHandler(async (req, res) => {
    const heroImage = await HeroImage.findByIdAndDelete(req.params.id);
    if (!heroImage) {
        return res.status(404).json({ success: false, error: 'Hero image not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Hero image deleted successfully'
    });
});

// ==================== ABOUT US ROUTES ====================
export const createAboutUs = asyncHandler(async (req, res) => {
    const aboutUs = await AboutUs.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: aboutUs
    });
});

export const updateAboutUs = asyncHandler(async (req, res) => {
    const aboutUs = await AboutUs.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!aboutUs) {
        return res.status(404).json({ success: false, error: 'About us not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: aboutUs
    });
});

export const deleteAboutUs = asyncHandler(async (req, res) => {
    const aboutUs = await AboutUs.findByIdAndDelete(req.params.id);
    if (!aboutUs) {
        return res.status(404).json({ success: false, error: 'About us not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'About us deleted successfully'
    });
});

// ==================== CONTACT INFO ROUTES ====================
export const createContactInfo = asyncHandler(async (req, res) => {
    const contactInfo = await ContactInfo.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: contactInfo
    });
});

export const updateContactInfo = asyncHandler(async (req, res) => {
    const contactInfo = await ContactInfo.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!contactInfo) {
        return res.status(404).json({ success: false, error: 'Contact info not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: contactInfo
    });
});

export const deleteContactInfo = asyncHandler(async (req, res) => {
    const contactInfo = await ContactInfo.findByIdAndDelete(req.params.id);
    if (!contactInfo) {
        return res.status(404).json({ success: false, error: 'Contact info not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Contact info deleted successfully'
    });
});

// ==================== LOCATION ROUTES ====================
export const createLocation = asyncHandler(async (req, res) => {
    const location = await Location.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: location
    });
});

export const updateLocation = asyncHandler(async (req, res) => {
    const location = await Location.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!location) {
        return res.status(404).json({ success: false, error: 'Location not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: location
    });
});

export const deleteLocation = asyncHandler(async (req, res) => {
    const location = await Location.findByIdAndDelete(req.params.id);
    if (!location) {
        return res.status(404).json({ success: false, error: 'Location not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Location deleted successfully'
    });
});

// ==================== PRODUCT ROUTES ====================
export const createProduct = asyncHandler(async (req, res) => {
    const product = await Product.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: product
    });
});

export const updateProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: product
    });
});

export const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Product deleted successfully'
    });
});

// ==================== BRAND ROUTES ====================
export const createBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: brand
    });
});

export const updateBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!brand) {
        return res.status(404).json({ success: false, error: 'Brand not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: brand
    });
});

export const deleteBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
        return res.status(404).json({ success: false, error: 'Brand not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Brand deleted successfully'
    });
});

// ==================== PARTNER ROUTES ====================
export const createPartner = asyncHandler(async (req, res) => {
    const partner = await Partner.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: partner
    });
});

export const updatePartner = asyncHandler(async (req, res) => {
    const partner = await Partner.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!partner) {
        return res.status(404).json({ success: false, error: 'Partner not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: partner
    });
});

export const deletePartner = asyncHandler(async (req, res) => {
    const partner = await Partner.findByIdAndDelete(req.params.id);
    if (!partner) {
        return res.status(404).json({ success: false, error: 'Partner not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Partner deleted successfully'
    });
});

// ==================== CLIENT ROUTES ====================
export const createClient = asyncHandler(async (req, res) => {
    const client = await Client.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: client
    });
});

export const updateClient = asyncHandler(async (req, res) => {
    const client = await Client.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!client) {
        return res.status(404).json({ success: false, error: 'Client not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: client
    });
});

export const deleteClient = asyncHandler(async (req, res) => {
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
        return res.status(404).json({ success: false, error: 'Client not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Client deleted successfully'
    });
});

// ==================== NEWS ARTICLE ROUTES ====================
export const createNewsArticle = asyncHandler(async (req, res) => {
    const newsArticle = await NewsArticle.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: newsArticle
    });
});

export const updateNewsArticle = asyncHandler(async (req, res) => {
    const newsArticle = await NewsArticle.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!newsArticle) {
        return res.status(404).json({ success: false, error: 'News article not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: newsArticle
    });
});

export const deleteNewsArticle = asyncHandler(async (req, res) => {
    const newsArticle = await NewsArticle.findByIdAndDelete(req.params.id);
    if (!newsArticle) {
        return res.status(404).json({ success: false, error: 'News article not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'News article deleted successfully'
    });
});

// ==================== TESTIMONIAL ROUTES ====================
export const createTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await Testimonial.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: testimonial
    });
});

export const updateTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await Testimonial.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!testimonial) {
        return res.status(404).json({ success: false, error: 'Testimonial not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: testimonial
    });
});

export const deleteTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
        return res.status(404).json({ success: false, error: 'Testimonial not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Testimonial deleted successfully'
    });
});

// ==================== ABOUT US DETAILED ROUTES ====================
export const createAboutUsDetailed = asyncHandler(async (req, res) => {
    const aboutUsDetailed = await AboutUsDetailed.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: aboutUsDetailed
    });
});

export const updateAboutUsDetailed = asyncHandler(async (req, res) => {
    const aboutUsDetailed = await AboutUsDetailed.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!aboutUsDetailed) {
        return res.status(404).json({ success: false, error: 'About us detailed not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: aboutUsDetailed
    });
});

export const deleteAboutUsDetailed = asyncHandler(async (req, res) => {
    const aboutUsDetailed = await AboutUsDetailed.findByIdAndDelete(req.params.id);
    if (!aboutUsDetailed) {
        return res.status(404).json({ success: false, error: 'About us detailed not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'About us detailed deleted successfully'
    });
});

// ==================== CSR INITIATIVE ROUTES ====================
export const createCSRInitiative = asyncHandler(async (req, res) => {
    const csrInitiative = await CSRInitiative.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: csrInitiative
    });
});

export const updateCSRInitiative = asyncHandler(async (req, res) => {
    const csrInitiative = await CSRInitiative.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!csrInitiative) {
        return res.status(404).json({ success: false, error: 'CSR initiative not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: csrInitiative
    });
});

export const deleteCSRInitiative = asyncHandler(async (req, res) => {
    const csrInitiative = await CSRInitiative.findByIdAndDelete(req.params.id);
    if (!csrInitiative) {
        return res.status(404).json({ success: false, error: 'CSR initiative not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'CSR initiative deleted successfully'
    });
});

// ==================== CSR HERO ROUTES ====================
export const createCSRHero = asyncHandler(async (req, res) => {
    const csrHero = await CSRHero.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: csrHero
    });
});

export const updateCSRHero = asyncHandler(async (req, res) => {
    const csrHero = await CSRHero.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!csrHero) {
        return res.status(404).json({ success: false, error: 'CSR hero not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: csrHero
    });
});

export const deleteCSRHero = asyncHandler(async (req, res) => {
    const csrHero = await CSRHero.findByIdAndDelete(req.params.id);
    if (!csrHero) {
        return res.status(404).json({ success: false, error: 'CSR hero not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'CSR hero deleted successfully'
    });
});

// ==================== SISTER COMPANY ROUTES ====================
export const createSisterCompany = asyncHandler(async (req, res) => {
    const sisterCompany = await SisterCompany.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: sisterCompany
    });
});

export const updateSisterCompany = asyncHandler(async (req, res) => {
    const sisterCompany = await SisterCompany.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!sisterCompany) {
        return res.status(404).json({ success: false, error: 'Sister company not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: sisterCompany
    });
});

export const deleteSisterCompany = asyncHandler(async (req, res) => {
    const sisterCompany = await SisterCompany.findByIdAndDelete(req.params.id);
    if (!sisterCompany) {
        return res.status(404).json({ success: false, error: 'Sister company not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Sister company deleted successfully'
    });
});

// ==================== SPARE PART ROUTES ====================
export const createSparePart = asyncHandler(async (req, res) => {
    const sparePart = await SparePart.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: sparePart
    });
});

export const updateSparePart = asyncHandler(async (req, res) => {
    const sparePart = await SparePart.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!sparePart) {
        return res.status(404).json({ success: false, error: 'Spare part not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: sparePart
    });
});

export const deleteSparePart = asyncHandler(async (req, res) => {
    const sparePart = await SparePart.findByIdAndDelete(req.params.id);
    if (!sparePart) {
        return res.status(404).json({ success: false, error: 'Spare part not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Spare part deleted successfully'
    });
});

// ==================== SPARE PARTS SERVICE ROUTES ====================
export const createSparePartsService = asyncHandler(async (req, res) => {
    const sparePartsService = await SparePartsService.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: sparePartsService
    });
});

export const updateSparePartsService = asyncHandler(async (req, res) => {
    const sparePartsService = await SparePartsService.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!sparePartsService) {
        return res.status(404).json({ success: false, error: 'Spare parts service not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: sparePartsService
    });
});

export const deleteSparePartsService = asyncHandler(async (req, res) => {
    const sparePartsService = await SparePartsService.findByIdAndDelete(req.params.id);
    if (!sparePartsService) {
        return res.status(404).json({ success: false, error: 'Spare parts service not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Spare parts service deleted successfully'
    });
});

// ==================== SPARE PARTS STATS ROUTES ====================
export const createSparePartsStats = asyncHandler(async (req, res) => {
    const sparePartsStats = await SparePartsStats.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: sparePartsStats
    });
});

export const updateSparePartsStats = asyncHandler(async (req, res) => {
    const sparePartsStats = await SparePartsStats.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!sparePartsStats) {
        return res.status(404).json({ success: false, error: 'Spare parts stats not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: sparePartsStats
    });
});

export const deleteSparePartsStats = asyncHandler(async (req, res) => {
    const sparePartsStats = await SparePartsStats.findByIdAndDelete(req.params.id);
    if (!sparePartsStats) {
        return res.status(404).json({ success: false, error: 'Spare parts stats not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Spare parts stats deleted successfully'
    });
});

// ==================== SPARE PARTS CONTACT ROUTES ====================
export const createSparePartsContact = asyncHandler(async (req, res) => {
    const sparePartsContact = await SparePartsContact.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: sparePartsContact
    });
});

export const updateSparePartsContact = asyncHandler(async (req, res) => {
    const sparePartsContact = await SparePartsContact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!sparePartsContact) {
        return res.status(404).json({ success: false, error: 'Spare parts contact not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        data: sparePartsContact
    });
});

export const deleteSparePartsContact = asyncHandler(async (req, res) => {
    const sparePartsContact = await SparePartsContact.findByIdAndDelete(req.params.id);
    if (!sparePartsContact) {
        return res.status(404).json({ success: false, error: 'Spare parts contact not found' });
    }
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Spare parts contact deleted successfully'
    });
});

// ==================== HELPER FUNCTION ====================
const refreshCacheInBackground = async () => {
    try {
        const data = await fetchAllDataFromDB();
        await writeDataFile(data);
    } catch (error) {
        console.error('Error refreshing cache:', error);
    }
};
