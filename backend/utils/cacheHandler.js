
const logger = require('../utils/logger');
const { readDataFile, writeDataFile, checkDataFileExists } = require('../utils/fileHandler');
const schemas = require('../database/schema');
const memoryCache = new Map();
const CACHE_KEY = 'allData';
const CACHE_TTL = 10 * 60 * 60 * 1000;

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
        gallery,
        careers
    ] = await Promise.all([
        schemas.HeroImage.find(),
        schemas.AboutUs.find(),
        schemas.ContactInfo.find(),
        schemas.Location.find(),
        schemas.Product.find(),
        schemas.Brand.find(),
        schemas.Partner.find(),
        schemas.Client.find(),
        schemas.NewsArticle.find(),
        schemas.Testimonial.find(),
        schemas.CSRInitiative.find(),
        schemas.CSRHero.find(),
        schemas.SisterCompany.find(),
        schemas.SparePart.find(),
        schemas.Customer.find().populate('tickets'),
        schemas.Gallery.find(),
        schemas.Career.find()
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
        customers,
        gallery,
        careers
    };
};

const getFromMemoryCache = () => {
    const cached = memoryCache.get(CACHE_KEY);
    if (!cached) return null;

    if (Date.now() > cached.expiresAt) {
        memoryCache.delete(CACHE_KEY);
        return null;
    }

    return cached.data;
};

const setMemoryCache = (data) => {
    memoryCache.set(CACHE_KEY, {
        data,
        expiresAt: Date.now() + CACHE_TTL
    });
};

const clearMemoryCache = () => {
    memoryCache.delete(CACHE_KEY);
};

const refreshCacheInBackground = async (refresh = false) => {
    try {
        clearMemoryCache(); 
        const data = await fetchAllDataFromDB();
        await writeDataFile(data);
        setMemoryCache(data);
    } catch (error) {
        logger.error('Error refreshing cache:', error);
    }
    if (refresh) return data;
};

const getData = async () => {
    const memoryCached = getFromMemoryCache();
    if (memoryCached) {
        return { data: memoryCached, source: 'memory' };  
    }

    const fileExists = await checkDataFileExists();
    if (fileExists) {
        const data = await readDataFile();
        setMemoryCache(data);
        return { data, source: 'file' };
    }

    const data = await fetchAllDataFromDB();
    await writeDataFile(data);
    setMemoryCache(data);
    return { data, source: 'database' };
}

module.exports = {
    getData,
    refreshCacheInBackground,
    clearMemoryCache,
    setMemoryCache
};