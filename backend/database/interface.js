const fs = require('fs/promises');
const path = require('path');
const logger = require('../utils/logger');

const {
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
    CSRInitiative,
    CSRHero,
    SisterCompany,
    SparePart,
    Customer,
    CustomerTicket
} = require('./schema.js');

const {
    processProductFiles,
    deleteProductFiles,
    deleteImage,
    deletePDF,
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
    deleteSparePartFiles,
} = require('./utils.js');

const DATA_FILE_PATH = path.join(__dirname, '..', 'assets', 'data.json');
const BASE_CHANGES_DIR = path.join(__dirname, '..', 'logs', 'data');

try {
    fs.mkdir(BASE_CHANGES_DIR, { recursive: true }).catch((err) => {
        logger.error('Error creating data changes directory:', err);
    });
    fs.mkdir(path.dirname(DATA_FILE_PATH), { recursive: true }).catch((err) => {
        logger.error('Error creating data changes directory:', err);
    });
} catch (error) {
    logger.error('Error creating data changes directory:', error);
}
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
    try {
        const oldData = await readDataFile().catch(() => null);
        if (oldData) {
            const changesFilePath = path.join(BASE_CHANGES_DIR, `${Date.now()}.json`);
            await fs.writeFile(changesFilePath, JSON.stringify(oldData, null, 2), 'utf-8');
            }
     } catch (error) {
        logger.error('Error reading old data.json file:', error);       
    }
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
        csrInitiatives,
        csrHero,
        sisterCompanies,
        spareParts,
        customers,
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
        CSRInitiative.find(),
        CSRHero.find(),
        SisterCompany.find(),
        SparePart.find(),
        Customer.find().populate('tickets')
    ]);

    const csr = {
        initiatives : csrInitiatives,
        hero : csrHero,
    }
    let logos = {};
    try {
        logos = [...brands, ...sisterCompanies].reduce((acc, item) => {
            if (item.slug && item.logo) {
                acc[item.slug] = item.logo;
            }
            return acc;
        }, {});
    } catch (error) {
        logger.error('Error processing logos:', error);
    }
    return {
        logos,
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
        csr,
        sisterCompanies,
        spareParts,
        customers
    };
};

// ==================== GET ALL DATA ====================
const getAllData = asyncHandler(async (req, res) => {
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
const refreshCache = asyncHandler(async (req, res) => {
    const data = await fetchAllDataFromDB();
    await writeDataFile(data);

    res.json({
        success: true,
        message: 'Cache refreshed successfully',
        data
    });
});

// ==================== HERO IMAGE GET ROUTES ====================
const getHeroImages = asyncHandler(async (req, res) => {
    const { limit, skip, sort } = req.query;
    const query = HeroImage.find();

    if (skip) query.skip(parseInt(skip));
    if (limit) query.limit(parseInt(limit));
    if (sort) query.sort(sort);

    const heroImages = await query;
    const total = await HeroImage.countDocuments();

    res.json({
        success: true,
        data: heroImages,
        total,
        count: heroImages.length
    });
});

const getHeroImageById = asyncHandler(async (req, res) => {
    const heroImage = await HeroImage.findById(req.params.id);
    if (!heroImage) {
        return res.status(404).json({ success: false, error: 'Hero image not found' });
    }
    res.json({
        success: true,
        data: heroImage
    });
});

// ==================== ABOUT US GET ROUTES ====================
const getAboutUs = asyncHandler(async (req, res) => {
    const { limit, skip, sort } = req.query;
    const query = AboutUs.find();

    if (skip) query.skip(parseInt(skip));
    if (limit) query.limit(parseInt(limit));
    if (sort) query.sort(sort);

    const aboutUs = await query;
    const total = await AboutUs.countDocuments();

    res.json({
        success: true,
        data: aboutUs,
        total,
        count: aboutUs.length
    });
});

const getAboutUsById = asyncHandler(async (req, res) => {
    const aboutUs = await AboutUs.findById(req.params.id);
    if (!aboutUs) {
        return res.status(404).json({ success: false, error: 'About us not found' });
    }
    res.json({
        success: true,
        data: aboutUs
    });
});

// ==================== CONTACT INFO GET ROUTES ====================
const getContactInfo = asyncHandler(async (req, res) => {
    const { limit, skip, sort } = req.query;
    const query = ContactInfo.find();

    if (skip) query.skip(parseInt(skip));
    if (limit) query.limit(parseInt(limit));
    if (sort) query.sort(sort);

    const contactInfo = await query;
    const total = await ContactInfo.countDocuments();

    res.json({
        success: true,
        data: contactInfo,
        total,
        count: contactInfo.length
    });
});

const getContactInfoById = asyncHandler(async (req, res) => {
    const contactInfo = await ContactInfo.findById(req.params.id);
    if (!contactInfo) {
        return res.status(404).json({ success: false, error: 'Contact info not found' });
    }
    res.json({
        success: true,
        data: contactInfo
    });
});

// ==================== LOCATION GET ROUTES ====================
const getLocations = asyncHandler(async (req, res) => {
    const { limit, skip, sort } = req.query;
    const query = Location.find();

    if (skip) query.skip(parseInt(skip));
    if (limit) query.limit(parseInt(limit));
    if (sort) query.sort(sort);

    const locations = await query;
    const total = await Location.countDocuments();

    res.json({
        success: true,
        data: locations,
        total,
        count: locations.length
    });
});

const getLocationById = asyncHandler(async (req, res) => {
    const location = await Location.findById(req.params.id);
    if (!location) {
        return res.status(404).json({ success: false, error: 'Location not found' });
    }
    res.json({
        success: true,
        data: location
    });
});

// ==================== PRODUCT GET ROUTES ====================
const getProducts = asyncHandler(async (req, res) => {
    const { limit, skip, sort, brand, category, type, id } = req.query;
    const filter = {};

    if (id) filter._id = id;
    if (brand) filter.brand = brand;
    if (category) filter.category = category;
    if (type) filter.type = type;

    const query = Product.find(filter);

    if (skip) query.skip(parseInt(skip));
    if (limit) query.limit(parseInt(limit));
    if (sort) query.sort(sort);

    const products = await query;
    const total = await Product.countDocuments(filter);

    res.json({
        success: true,
        data: products,
        total,
        count: products.length
    });
});

const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    if (!product) {
        return res.status(404).json({ success: false, error: 'Product not found' });
    }
    res.json({
        success: true,
        data: product
    });
});

// ==================== BRAND GET ROUTES ====================
const getBrands = asyncHandler(async (req, res) => {
    const { limit, skip, sort } = req.query;
    const query = Brand.find();

    if (skip) query.skip(parseInt(skip));
    if (limit) query.limit(parseInt(limit));
    if (sort) query.sort(sort);

    const brands = await query;
    const total = await Brand.countDocuments();

    res.json({
        success: true,
        data: brands,
        total,
        count: brands.length
    });
});

const getBrandById = asyncHandler(async (req, res) => {
    const brand = await Brand.findById(req.params.id);
    if (!brand) {
        return res.status(404).json({ success: false, error: 'Brand not found' });
    }
    res.json({
        success: true,
        data: brand
    });
});

// ==================== PARTNER GET ROUTES ====================
const getPartners = asyncHandler(async (req, res) => {
    const { limit, skip, sort, category } = req.query;
    const filter = {};

    if (category) filter.category = category;

    const query = Partner.find(filter);

    if (skip) query.skip(parseInt(skip));
    if (limit) query.limit(parseInt(limit));
    if (sort) query.sort(sort);

    const partners = await query;
    const total = await Partner.countDocuments(filter);

    res.json({
        success: true,
        data: partners,
        total,
        count: partners.length
    });
});

const getPartnerById = asyncHandler(async (req, res) => {
    const partner = await Partner.findById(req.params.id);
    if (!partner) {
        return res.status(404).json({ success: false, error: 'Partner not found' });
    }
    res.json({
        success: true,
        data: partner
    });
});

// ==================== CLIENT GET ROUTES ====================
const getClients = asyncHandler(async (req, res) => {
    const { limit, skip, sort } = req.query;
    const query = Client.find();

    if (skip) query.skip(parseInt(skip));
    if (limit) query.limit(parseInt(limit));
    if (sort) query.sort(sort);

    const clients = await query;
    const total = await Client.countDocuments();

    res.json({
        success: true,
        data: clients,
        total,
        count: clients.length
    });
});

const getClientById = asyncHandler(async (req, res) => {
    const client = await Client.findById(req.params.id);
    if (!client) {
        return res.status(404).json({ success: false, error: 'Client not found' });
    }
    res.json({
        success: true,
        data: client
    });
});

// ==================== NEWS ARTICLE GET ROUTES ====================
const getNewsArticles = asyncHandler(async (req, res) => {
    const { limit, skip, sort, featured, category } = req.query;
    const filter = {};

    if (featured !== undefined) filter.featured = featured === 'true';
    if (category) filter.category = category;

    const query = NewsArticle.find(filter);

    if (skip) query.skip(parseInt(skip));
    if (limit) query.limit(parseInt(limit));
    if (sort) query.sort(sort);

    const newsArticles = await query;
    const total = await NewsArticle.countDocuments(filter);

    res.json({
        success: true,
        data: newsArticles,
        total,
        count: newsArticles.length
    });
});

const getNewsArticleById = asyncHandler(async (req, res) => {
    const newsArticle = await NewsArticle.findById(req.params.id);
    if (!newsArticle) {
        return res.status(404).json({ success: false, error: 'News article not found' });
    }
    res.json({
        success: true,
        data: newsArticle
    });
});

// ==================== TESTIMONIAL GET ROUTES ====================
const getTestimonials = asyncHandler(async (req, res) => {
    const { limit, skip, sort, minRating } = req.query;
    const filter = {};

    if (minRating) filter.rating = { $gte: parseInt(minRating) };

    const query = Testimonial.find(filter);

    if (skip) query.skip(parseInt(skip));
    if (limit) query.limit(parseInt(limit));
    if (sort) query.sort(sort);

    const testimonials = await query;
    const total = await Testimonial.countDocuments(filter);

    res.json({
        success: true,
        data: testimonials,
        total,
        count: testimonials.length
    });
});

const getTestimonialById = asyncHandler(async (req, res) => {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
        return res.status(404).json({ success: false, error: 'Testimonial not found' });
    }
    res.json({
        success: true,
        data: testimonial
    });
});

// ==================== CSR INITIATIVE GET ROUTES ====================
const getCSRInitiatives = asyncHandler(async (req, res) => {
    const { limit, skip, sort } = req.query;
    const query = CSRInitiative.find();

    if (skip) query.skip(parseInt(skip));
    if (limit) query.limit(parseInt(limit));
    if (sort) query.sort(sort);

    const csrInitiatives = await query;
    const total = await CSRInitiative.countDocuments();

    res.json({
        success: true,
        data: csrInitiatives,
        total,
        count: csrInitiatives.length
    });
});

const getCSRInitiativeById = asyncHandler(async (req, res) => {
    const csrInitiative = await CSRInitiative.findById(req.params.id);
    if (!csrInitiative) {
        return res.status(404).json({ success: false, error: 'CSR initiative not found' });
    }
    res.json({
        success: true,
        data: csrInitiative
    });
});

// ==================== CSR HERO GET ROUTES ====================
const getCSRHero = asyncHandler(async (req, res) => {
    const { limit, skip, sort } = req.query;
    const query = CSRHero.find();

    if (skip) query.skip(parseInt(skip));
    if (limit) query.limit(parseInt(limit));
    if (sort) query.sort(sort);

    const csrHero = await query;
    const total = await CSRHero.countDocuments();

    res.json({
        success: true,
        data: csrHero,
        total,
        count: csrHero.length
    });
});

const getCSRHeroById = asyncHandler(async (req, res) => {
    const csrHero = await CSRHero.findById(req.params.id);
    if (!csrHero) {
        return res.status(404).json({ success: false, error: 'CSR hero not found' });
    }
    res.json({
        success: true,
        data: csrHero
    });
});

// ==================== SISTER COMPANY GET ROUTES ====================
const getSisterCompanies = asyncHandler(async (req, res) => {
    const { limit, skip, sort } = req.query;
    const query = SisterCompany.find();

    if (skip) query.skip(parseInt(skip));
    if (limit) query.limit(parseInt(limit));
    if (sort) query.sort(sort);

    const sisterCompanies = await query;
    const total = await SisterCompany.countDocuments();

    res.json({
        success: true,
        data: sisterCompanies,
        total,
        count: sisterCompanies.length
    });
});

const getSisterCompanyById = asyncHandler(async (req, res) => {
    const sisterCompany = await SisterCompany.findById(req.params.id);
    if (!sisterCompany) {
        return res.status(404).json({ success: false, error: 'Sister company not found' });
    }
    res.json({
        success: true,
        data: sisterCompany
    });
});

// ==================== SPARE PART GET ROUTES ====================
const getSpareParts = asyncHandler(async (req, res) => {
    const { limit, skip, sort, category, inStock } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (inStock !== undefined) filter.inStock = inStock === 'true';

    const query = SparePart.find(filter);

    if (skip) query.skip(parseInt(skip));
    if (limit) query.limit(parseInt(limit));
    if (sort) query.sort(sort);

    const spareParts = await query;
    const total = await SparePart.countDocuments(filter);

    res.json({
        success: true,
        data: spareParts,
        total,
        count: spareParts.length
    });
});

const getSparePartById = asyncHandler(async (req, res) => {
    const sparePart = await SparePart.findById(req.params.id);
    if (!sparePart) {
        return res.status(404).json({ success: false, error: 'Spare part not found' });
    }
    res.json({
        success: true,
        data: sparePart
    });
});


// ==================== HERO IMAGE ROUTES ====================
const createHeroImage = asyncHandler(async (req, res) => {
    const processedData = await processHeroImageFiles(req.body);
    const heroImage = await HeroImage.create(processedData);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: heroImage
    });
});

const updateHeroImage = asyncHandler(async (req, res) => {
    let heroImage = await HeroImage.findById(req.params.id);
    if (!heroImage) {
        return res.status(404).json({ success: false, error: 'Hero image not found' });
    }

    const oldImage = heroImage.image;
    const processedData = await processHeroImageFiles(req.body);

    heroImage = await HeroImage.findByIdAndUpdate(
        req.params.id,
        processedData,
        { new: true, runValidators: true }
    );

    if (oldImage && oldImage !== processedData.image) {
        await deleteHeroImageFiles(oldImage);
    }

    await refreshCacheInBackground();
    res.json({
        success: true,
        data: heroImage
    });
});

const deleteHeroImage = asyncHandler(async (req, res) => {
    const heroImage = await HeroImage.findByIdAndDelete(req.params.id);
    if (!heroImage) {
        return res.status(404).json({ success: false, error: 'Hero image not found' });
    }

    await deleteHeroImageFiles(heroImage.image);
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Hero image deleted successfully'
    });
});

// ==================== ABOUT US ROUTES ====================
const createAboutUs = asyncHandler(async (req, res) => {
    let processedData;
    try {
        processedData = await processAboutUsFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }
    const aboutUs = await AboutUs.create(processedData);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: aboutUs
    });
});

const updateAboutUs = asyncHandler(async (req, res) => {
    let aboutUs = await AboutUs.findById(req.params.id);
    if (!aboutUs) {
        return res.status(404).json({ success: false, error: 'About us not found' });
    }

    const oldData = aboutUs.toObject();
    let processedData;
    try {
        processedData = await processAboutUsFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }

    aboutUs = await AboutUs.findByIdAndUpdate(
        req.params.id,
        processedData,
        { new: true, runValidators: true }
    );

    // Clean up old files that are no longer used
    // await deleteAboutUsFiles(oldData);

    await refreshCacheInBackground();
    res.json({
        success: true,
        data: aboutUs
    });
});

const deleteAboutUs = asyncHandler(async (req, res) => {
    const aboutUs = await AboutUs.findByIdAndDelete(req.params.id);
    if (!aboutUs) {
        return res.status(404).json({ success: false, error: 'About us not found' });
    }

    await deleteAboutUsFiles(aboutUs.toObject());
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'About us deleted successfully'
    });
});

// ==================== CONTACT INFO ROUTES ====================
const createContactInfo = asyncHandler(async (req, res) => {
    const contactInfo = await ContactInfo.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: contactInfo
    });
});

const updateContactInfo = asyncHandler(async (req, res) => {
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

const deleteContactInfo = asyncHandler(async (req, res) => {
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
const createLocation = asyncHandler(async (req, res) => {
    const location = await Location.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: location
    });
});

const updateLocation = asyncHandler(async (req, res) => {
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

const deleteLocation = asyncHandler(async (req, res) => {
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
const createProduct = asyncHandler(async (req, res) => {
  // Process and save files
    let processedData;
    try {
        processedData = await processProductFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }
  
  // Create product with file paths
  const product = await Product.create(processedData);
  
  await refreshCacheInBackground();
  
  res.status(201).json({
    success: true,
    data: product
  });
});

const updateProduct = asyncHandler(async (req, res) => {
  let product = await Product.findById(req.params.id);
  
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  // Store old file paths for cleanup
  const oldImages = product.images || [];
  const oldBrochure = product.brochureUrl;
  const oldSpecSheet = product.specSheetUrl;
  
  // Process new files
    let processedData;
    try {
        processedData = await processProductFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }
  
  // Update product
  product = await Product.findByIdAndUpdate(
    req.params.id,
    processedData,
    { new: true, runValidators: true }
  );
  
  // Clean up old files that are no longer used
  const newImages = processedData.images || [];
  const removedImages = oldImages.filter(img => !newImages.includes(img));
  
  if (removedImages.length > 0) {
    await Promise.all(removedImages.map(img => deleteImage(img)));
  }
  
  if (oldBrochure && oldBrochure !== processedData.brochureUrl) {
    await deletePDF(oldBrochure);
  }
  
  if (oldSpecSheet && oldSpecSheet !== processedData.specSheetUrl) {
    await deletePDF(oldSpecSheet);
  }
  
  await refreshCacheInBackground();
  
  res.status(200).json({
    success: true,
    data: product
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);
  
  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }
  
  // Delete all associated files
  await deleteProductFiles(
    product.brand,
    product.name,
    product.images,
    product.brochureUrl,
    product.specSheetUrl
  );
  
  // Delete product from database
  await product.deleteOne();
  
  await refreshCacheInBackground();
  
  res.status(200).json({
    success: true,
    data: {}
  });
});


// ==================== BRAND ROUTES ====================
const createBrand = asyncHandler(async (req, res) => {
    let processedData;
    try {
        processedData = await processBrandFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }
    const brand = await Brand.create(processedData);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: brand
    });
});

const updateBrand = asyncHandler(async (req, res) => {
    let brand = await Brand.findById(req.params.id);
    if (!brand) {
        return res.status(404).json({ success: false, error: 'Brand not found' });
    }

    const oldHeroImage = brand.heroImage;
    const oldLogo = brand.logo;
    const oldVideo = brand.video || null;
    const oldImages = brand.images || [];

    let processedData;
    try {
        processedData = await processBrandFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }

    brand = await Brand.findByIdAndUpdate(
        req.params.id,
        processedData,
        { new: true, runValidators: true }
    );

    // Clean up old files that are no longer used
    if (oldHeroImage && oldHeroImage !== processedData.heroImage) {
        await deleteBrandFiles(oldHeroImage, null, [],  null, null);
    }
    if (oldLogo && oldLogo !== processedData.logo) {
        await deleteBrandFiles(null, oldLogo, [], null, null);
    }
    if (oldVideo && oldVideo !== processedData.video) {
        await deleteBrandFiles(null, null, [], null, oldVideo);
    }
    if (oldImages.length > 0) {
        const newImages = processedData.images || [];
        const removedImages = oldImages.filter(img => !newImages.includes(img));
        if (removedImages.length > 0) {
            await deleteBrandFiles(null, null, removedImages, null, null);
        }
    }

    await refreshCacheInBackground();
    res.json({
        success: true,
        data: brand
    });
});

const deleteBrand = asyncHandler(async (req, res) => {
    const brand = await Brand.findByIdAndDelete(req.params.id);
    if (!brand) {
        return res.status(404).json({ success: false, error: 'Brand not found' });
    }

    await deleteBrandFiles(brand.heroImage, brand.logo, brand.images, brand.productTypes, brand.video);
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Brand deleted successfully'
    });
});

// ==================== PRODUCT TYPE ROUTES (within Brand) ====================
const getProductTypes = asyncHandler(async (req, res) => {
    const { brandId } = req.query;

    let brands;
    if (brandId) {
        const brand = await Brand.findById(brandId);
        if (!brand) {
            return res.status(404).json({ success: false, error: 'Brand not found' });
        }
        brands = [brand];
    } else {
        brands = await Brand.find();
    }

    const productTypes = brands.flatMap(brand =>
        (brand.productTypes || []).map(type => ({
            ...type.toObject(),
            brandId: brand._id,
            brandName: brand.name,
            brandKey: brand.brandKey
        }))
    );

    res.json({
        success: true,
        data: productTypes,
        total: productTypes.length,
        count: productTypes.length
    });
});

const createProductType = asyncHandler(async (req, res) => {
    const { brandId, name, type, image } = req.body;

    if (!brandId || !name || !type || !image) {
        return res.status(400).json({
            success: false,
            error: 'brandId, name, type, and image are required'
        });
    }

    const brand = await Brand.findById(brandId);
    if (!brand) {
        return res.status(404).json({ success: false, error: 'Brand not found' });
    }

    const existingType = brand.productTypes.find(pt => pt.type === type || pt.name === name);
    if (existingType) {
        return res.status(400).json({
            success: false,
            error: 'Product type with this name or type already exists in this brand'
        });
    }

    let processedData;
    try {
        processedData = await processProductTypeFiles({ name, type, image }, brand.name);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }
    
    brand.productTypes.push(processedData);
    await brand.save();
    await refreshCacheInBackground();

    const createdType = brand.productTypes[brand.productTypes.length - 1];
    res.status(201).json({
        success: true,
        data: {
            ...createdType.toObject(),
            brandId: brand._id,
            brandName: brand.name,
            brandKey: brand.brandKey
        }
    });
});

const updateProductType = asyncHandler(async (req, res) => {
    const { brandId, oldType, name, type, image } = req.body;

    if (!brandId || !oldType) {
        return res.status(400).json({
            success: false,
            error: 'brandId and oldType are required'
        });
    }

    const brand = await Brand.findById(brandId);
    if (!brand) {
        return res.status(404).json({ success: false, error: 'Brand not found' });
    }

    const typeIndex = brand.productTypes.findIndex(pt => pt.type === oldType);
    if (typeIndex === -1) {
        return res.status(404).json({ success: false, error: 'Product type not found' });
    }

    if (type && type !== oldType) {
        const duplicateType = brand.productTypes.find((pt, idx) => idx !== typeIndex && pt.type === type);
        if (duplicateType) {
            return res.status(400).json({
                success: false,
                error: 'Product type with this type already exists in this brand'
            });
        }
    }

    let processedData;
    try {
        processedData = await processProductTypeFiles({
        name: name || brand.productTypes[typeIndex].name,
        type: type || brand.productTypes[typeIndex].type,
        image: image || brand.productTypes[typeIndex].image
    }, brand.name);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }

    if (name) brand.productTypes[typeIndex].name = processedData.name;
    if (type) brand.productTypes[typeIndex].type = processedData.type;
    if (image) brand.productTypes[typeIndex].image = processedData.image;

    await brand.save();
    await refreshCacheInBackground();

    res.json({
        success: true,
        data: {
            ...brand.productTypes[typeIndex].toObject(),
            brandId: brand._id,
            brandName: brand.name,
            brandKey: brand.brandKey
        }
    });
});

const deleteProductType = asyncHandler(async (req, res) => {
    const { brandId, type } = req.body;

    if (!brandId || !type) {
        return res.status(400).json({
            success: false,
            error: 'brandId and type are required'
        });
    }

    const brand = await Brand.findById(brandId);
    if (!brand) {
        return res.status(404).json({ success: false, error: 'Brand not found' });
    }

    const typeIndex = brand.productTypes.findIndex(pt => pt.type === type);
    if (typeIndex === -1) {
        return res.status(404).json({ success: false, error: 'Product type not found' });
    }

    const productType = brand.productTypes[typeIndex];
    if (productType) {
        await deleteBrandFiles(null, null, [], productType, null);
    }
    brand.productTypes.splice(typeIndex, 1);
    
    await brand.save();
    await refreshCacheInBackground();

    res.json({
        success: true,
        message: 'Product type deleted successfully'
    });
});

// ==================== PARTNER ROUTES ====================
const createPartner = asyncHandler(async (req, res) => {
    const partner = await Partner.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: partner
    });
});

const updatePartner = asyncHandler(async (req, res) => {
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

const deletePartner = asyncHandler(async (req, res) => {
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
const createClient = asyncHandler(async (req, res) => {
    const client = await Client.create(req.body);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: client
    });
});

const updateClient = asyncHandler(async (req, res) => {
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

const deleteClient = asyncHandler(async (req, res) => {
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
const createNewsArticle = asyncHandler(async (req, res) => {
    let processedData;
    try {
        processedData = await processNewsArticleFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }

    const newsArticle = await NewsArticle.create(processedData);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: newsArticle
    });
});

const updateNewsArticle = asyncHandler(async (req, res) => {
    let newsArticle = await NewsArticle.findById(req.params.id);
    if (!newsArticle) {
        return res.status(404).json({ success: false, error: 'News article not found' });
    }

    const oldImage = newsArticle.image;

    let processedData;
    try {
        processedData = await processNewsArticleFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }

    newsArticle = await NewsArticle.findByIdAndUpdate(
        req.params.id,
        processedData,
        { new: true, runValidators: true }
    );

    if (oldImage && oldImage !== processedData.image) {
        await deleteNewsArticleFiles(oldImage);
    }

    await refreshCacheInBackground();
    res.json({
        success: true,
        data: newsArticle
    });
});

const deleteNewsArticle = asyncHandler(async (req, res) => {
    const newsArticle = await NewsArticle.findByIdAndDelete(req.params.id);
    if (!newsArticle) {
        return res.status(404).json({ success: false, error: 'News article not found' });
    }

    await deleteNewsArticleFiles(newsArticle.image);
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'News article deleted successfully'
    });
});

// ==================== TESTIMONIAL ROUTES ====================
const createTestimonial = asyncHandler(async (req, res) => {
    try {
        processedData = await processTestimonialFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }

    const testimonial = await Testimonial.create(processedData);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: testimonial
    });
});

const updateTestimonial = asyncHandler(async (req, res) => {
    let testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) {
        return res.status(404).json({ success: false, error: 'Testimonial not found' });
    }

    const oldImage = testimonial.image;
    let processedData;
    try {
        processedData = await processTestimonialFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }


    testimonial = await Testimonial.findByIdAndUpdate(
        req.params.id,
        processedData,
        { new: true, runValidators: true }
    );

    if (oldImage && oldImage !== processedData.image) {
        await deleteTestimonialFiles(oldImage);
    }

    await refreshCacheInBackground();
    res.json({
        success: true,
        data: testimonial
    });
});

const deleteTestimonial = asyncHandler(async (req, res) => {
    const testimonial = await Testimonial.findByIdAndDelete(req.params.id);
    if (!testimonial) {
        return res.status(404).json({ success: false, error: 'Testimonial not found' });
    }

    await deleteTestimonialFiles(testimonial.image);
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Testimonial deleted successfully'
    });
});

// ==================== CSR INITIATIVE ROUTES ====================
const createCSRInitiative = asyncHandler(async (req, res) => {
    let processedData;
    try {
        processedData = await processCSRInitiativeFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }

    const csrInitiative = await CSRInitiative.create(processedData);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: csrInitiative
    });
});

const updateCSRInitiative = asyncHandler(async (req, res) => {
    let csrInitiative = await CSRInitiative.findById(req.params.id);
    if (!csrInitiative) {
        return res.status(404).json({ success: false, error: 'CSR initiative not found' });
    }

    const oldImage = csrInitiative.image;

    let processedData;
    try {
        processedData = await processCSRInitiativeFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }

    csrInitiative = await CSRInitiative.findByIdAndUpdate(
        req.params.id,
        processedData,
        { new: true, runValidators: true }
    );

    if (oldImage && oldImage !== processedData.image) {
        await deleteCSRInitiativeFiles(oldImage);
    }

    await refreshCacheInBackground();
    res.json({
        success: true,
        data: csrInitiative
    });
});

const deleteCSRInitiative = asyncHandler(async (req, res) => {
    const csrInitiative = await CSRInitiative.findByIdAndDelete(req.params.id);
    if (!csrInitiative) {
        return res.status(404).json({ success: false, error: 'CSR initiative not found' });
    }

    await deleteCSRInitiativeFiles(csrInitiative.image);
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'CSR initiative deleted successfully'
    });
});

// ==================== CSR HERO ROUTES ====================
const createCSRHero = asyncHandler(async (req, res) => {
    let processedData;
    try {
        processedData = await processCSRHeroFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }
    const csrHero = await CSRHero.create(processedData);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: csrHero
    });
});

const updateCSRHero = asyncHandler(async (req, res) => {
    let csrHero = await CSRHero.findById(req.params.id);
    if (!csrHero) {
        return res.status(404).json({ success: false, error: 'CSR hero not found' });
    }

    const oldImage = csrHero.image;
    let processedData;
    try {
        processedData = await processCSRHeroFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }

    csrHero = await CSRHero.findByIdAndUpdate(
        req.params.id,
        processedData,
        { new: true, runValidators: true }
    );

    if (oldImage && oldImage !== processedData.image) {
        await deleteCSRHeroFiles(oldImage);
    }

    await refreshCacheInBackground();
    res.json({
        success: true,
        data: csrHero
    });
});

const deleteCSRHero = asyncHandler(async (req, res) => {
    const csrHero = await CSRHero.findByIdAndDelete(req.params.id);
    if (!csrHero) {
        return res.status(404).json({ success: false, error: 'CSR hero not found' });
    }

    await deleteCSRHeroFiles(csrHero.image);
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'CSR hero deleted successfully'
    });
});

// ==================== SISTER COMPANY ROUTES ====================
const createSisterCompany = asyncHandler(async (req, res) => {
    let processedData;
    try {
        processedData = await processSisterCompanyFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }
    const sisterCompany = await SisterCompany.create(processedData);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: sisterCompany
    });
});

const updateSisterCompany = asyncHandler(async (req, res) => {
    let sisterCompany = await SisterCompany.findById(req.params.id);
    if (!sisterCompany) {
        return res.status(404).json({ success: false, error: 'Sister company not found' });
    }

    const oldLogo = sisterCompany.logo;
    const oldImage = sisterCompany.image;
    let processedData;
    try {
        processedData = await processSisterCompanyFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }

    sisterCompany = await SisterCompany.findByIdAndUpdate(
        req.params.id,
        processedData,
        { new: true, runValidators: true }
    );

    if (oldLogo && oldLogo !== processedData.logo) {
        await deleteSisterCompanyFiles(oldLogo, null);
    }
    if (oldImage && oldImage !== processedData.image) {
        await deleteSisterCompanyFiles(null, oldImage);
    }

    await refreshCacheInBackground();
    res.json({
        success: true,
        data: sisterCompany
    });
});

const deleteSisterCompany = asyncHandler(async (req, res) => {
    const sisterCompany = await SisterCompany.findByIdAndDelete(req.params.id);
    if (!sisterCompany) {
        return res.status(404).json({ success: false, error: 'Sister company not found' });
    }

    await deleteSisterCompanyFiles(sisterCompany.logo, sisterCompany.image);
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Sister company deleted successfully'
    });
});

// ==================== SPARE PART ROUTES ====================
const createSparePart = asyncHandler(async (req, res) => {
    let processedData;
    try {
        processedData = await processSparePartFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }
    const sparePart = await SparePart.create(processedData);
    await refreshCacheInBackground();
    res.status(201).json({
        success: true,
        data: sparePart
    });
});

const updateSparePart = asyncHandler(async (req, res) => {
    let sparePart = await SparePart.findById(req.params.id);
    if (!sparePart) {
        return res.status(404).json({ success: false, error: 'Spare part not found' });
    }

    const oldImage = sparePart.image;
    const oldParts = sparePart.parts || [];
    let processedData;
    try {
        processedData = await processSparePartFiles(req.body);
    } catch (error) {
        return res.status(400).json({ 
            success: false, 
            error: `Error processing files`
        });
    }

    sparePart = await SparePart.findByIdAndUpdate(
        req.params.id,
        processedData,
        { new: true, runValidators: true }
    );

    // Clean up old files that are no longer used
    if (oldImage && oldImage !== processedData.image) {
        await deleteSparePartFiles(oldImage, []);
    }

    await refreshCacheInBackground();
    res.json({
        success: true,
        data: sparePart
    });
});

const deleteSparePart = asyncHandler(async (req, res) => {
    const sparePart = await SparePart.findByIdAndDelete(req.params.id);
    if (!sparePart) {
        return res.status(404).json({ success: false, error: 'Spare part not found' });
    }

    await deleteSparePartFiles(sparePart.image, sparePart.parts);
    await refreshCacheInBackground();
    res.json({
        success: true,
        message: 'Spare part deleted successfully'
    });
});

const getCustomers = asyncHandler(async (req, res) => {
    const customer = await Customer.findAll();
    res.json({
        success: true,
        data: customer
    });
});

const createCustomerUtil = async (customerData, ticketData) => {
    try {
        const customer = await Customer.findOneAndUpdate(
            { email: customerData.email },
            { $set: customerData },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );
        if (ticketData) {
            await CustomerTicket.create({
                customerId: customer._id,
                ...ticketData
            });
        }
    } catch (error) {
        logger.error('Error creating customer:', error);
    }
};


// ==================== HELPER FUNCTION ====================
const refreshCacheInBackground = async () => {
    try {
        const data = await fetchAllDataFromDB();
        await writeDataFile(data);
    } catch (error) {
        logger.error('Error refreshing cache:', error);
    }
};

// ==================== EXPORTS ====================
module.exports = {
    getAllData,
    refreshCache,
    getHeroImages,
    getHeroImageById,
    getAboutUs,
    getAboutUsById,
    getContactInfo,
    getContactInfoById,
    getLocations,
    getLocationById,
    getProducts,
    getProductById,
    getBrands,
    getBrandById,
    getPartners,
    getPartnerById,
    getClients,
    getClientById,
    getNewsArticles,
    getNewsArticleById,
    getTestimonials,
    getTestimonialById,
    getCSRInitiatives,
    getCSRInitiativeById,
    getCSRHero,
    getCSRHeroById,
    getSisterCompanies,
    getSisterCompanyById,
    getSpareParts,
    getSparePartById,
    createHeroImage,
    updateHeroImage,
    deleteHeroImage,
    createAboutUs,
    updateAboutUs,
    deleteAboutUs,
    createContactInfo,
    updateContactInfo,
    deleteContactInfo,
    createLocation,
    updateLocation,
    deleteLocation,
    createProduct,
    updateProduct,
    deleteProduct,
    createBrand,
    updateBrand,
    deleteBrand,
    getProductTypes,
    createProductType,
    updateProductType,
    deleteProductType,
    createPartner,
    updatePartner,
    deletePartner,
    createClient,
    updateClient,
    deleteClient,
    createNewsArticle,
    updateNewsArticle,
    deleteNewsArticle,
    createTestimonial,
    updateTestimonial,
    deleteTestimonial,
    createCSRInitiative,
    updateCSRInitiative,
    deleteCSRInitiative,
    createCSRHero,
    updateCSRHero,
    deleteCSRHero,
    createSisterCompany,
    updateSisterCompany,
    deleteSisterCompany,
    createSparePart,
    updateSparePart,
    deleteSparePart,
    getCustomers,
    createCustomerUtil
};
