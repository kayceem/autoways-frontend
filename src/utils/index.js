import config from "../config";
import { useContent } from "../context/globalContext";

export const getBrandData = (brandName) => {
    const { allData } = useContent();
    const brand = allData.brands.find(
        (b) => b.name.toLowerCase() === brandName.toLowerCase()
    );
    return brand ? brand : null;
}


export const assetUrl = (path) => {
    if (!path) return "";
    if (path.startsWith("http")) return path;
    return `${config.assetUrl}${path}`;
}
