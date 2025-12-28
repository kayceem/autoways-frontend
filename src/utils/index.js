import config from "../config";

export const getBrandData = (brands, brandName) => {
    const brand = brands?.find(b => b.name.toLowerCase() === brandName.toLowerCase());
    return brand ? brand : null;
}

export const getTypeNameFromSlug = (brands, brandName, typeSlug) => {
    const brandData = getBrandData(brands, brandName);
    if (!brandData) return null;
    const type = brandData.productTypes?.find(t => t.type.toLowerCase() === typeSlug.toLowerCase());
    return type ? type.name : null;
}
export const getProductsBrandType = (products, brandName, typeSlug) => {
    const filteredProducts = products?.filter(p =>
        p.brand.toLowerCase() === brandName.toLowerCase() &&
        p.type.toLowerCase() === typeSlug.toLowerCase()
    );
    return filteredProducts ? filteredProducts : [];
}

export const getBrandTypeData = (brands, brand, type) => {
    const brandData = getBrandData(brands, brand);  
    const typeProducts = brandData
    return typeProducts ? typeProducts : null;
}

export const getProductData = (products, id) => {
    const product = products?.find(p => p._id === id);
    return product ? product : null;
}

export const assetUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    if (!path.startsWith("/assets/")) return path;
    return `${config.assetUrl}${path}`;
}

export const getSisterCompanyData = (sisterCompanies, companySlug) => {
    const company = sisterCompanies?.find(c => c.slug === companySlug);
    return company ? company : null;
}

export const capitalizeWords = (str) => {
  return str.replace(/\b\w/g, char => char.toUpperCase());
}
