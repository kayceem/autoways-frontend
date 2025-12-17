import config from "../config";

export const getBrandData = (brands, brandName) => {
    const brand = brands[brandName];
    return brand ? brand : null;
}

export const getBrandTypeData = (brands, brand, type) => {
    const brandData = getBrandData(brands, brand);  
    const typeProducts = brandData.products[type];
    return typeProducts ? typeProducts : null;
}

export const getProductData = (brands, brand, typeSlug, id) => {
    const type = typeSlug.replace(/-/g, '_');
    console.log("Looking for Brand:", brand, "Type:", type, "ID:", id);
    const typeData = getBrandTypeData(brands, brand, type);
    if (!typeData) return null;
    console.log("Type Data:", typeData);
    console.log("Searching for Product ID:", id);   
    const product = typeData.find(product => product.id === id);
    return product ? product : null;
}

export const assetUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${config.assetUrl}${path}`;
}
