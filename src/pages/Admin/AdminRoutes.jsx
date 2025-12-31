import { Route, Routes } from "react-router-dom";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminDashboard from "./Dashboard";
import BrandAdmin from "./BrandAdmin";
import ProductsAdmin from "./Products";
import ProductTypesAdmin from "./ProductTypes";
import HeroImagesAdmin from "./HeroImages";
import AboutUsAdmin from "./AboutUs";
import ContactInfoAdmin from "./ContactInfo";
import LocationsAdmin from "./Locations";
import CSRInitiativesAdmin from "./CSRInitiatives";
import CSRHeroAdmin from "./CSRHero";
import NewsMediaAdmin from "./NewsMedia";
import SparePartsAdmin from "./SpareParts";
import SisterCompaniesAdmin from "./SisterCompanies";
import CustomerAdmin from "./Customer";
import TestimonialsAdmin from "./Testimonials";
import GalleryAdmin from "./Gallery";
import CareersAdmin from "./Careers";

const AdminRoutes = () => {
    return (
        <Routes>
            <Route element={<AdminLayout />}>
                <Route path="" element={<AdminDashboard />} />
                <Route path="customers" element={<CustomerAdmin />} />
                <Route path="brands" element={<BrandAdmin />} />
                <Route path="products" element={<ProductsAdmin />} />
                <Route path="product-types" element={<ProductTypesAdmin />} />
                <Route path="hero-images" element={<HeroImagesAdmin />} />
                <Route path="about-us" element={<AboutUsAdmin />} />
                <Route path="contact-info" element={<ContactInfoAdmin />} />
                <Route path="locations" element={<LocationsAdmin />} />
                <Route path="testimonials" element={<TestimonialsAdmin />} />
                <Route path="csr-initiatives" element={<CSRInitiativesAdmin />} />
                <Route path="csr-hero" element={<CSRHeroAdmin />} />
                <Route path="news-media" element={<NewsMediaAdmin />} />
                <Route path="spare-parts" element={<SparePartsAdmin />} />
                <Route path="sister-companies" element={<SisterCompaniesAdmin />} />
                <Route path="gallery" element={<GalleryAdmin />} />
                <Route path="careers" element={<CareersAdmin />} />
            </Route>
        </Routes>
    );
};

export default AdminRoutes;
