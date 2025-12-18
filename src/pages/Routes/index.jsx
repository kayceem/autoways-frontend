import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import Contact from "../Contact";
import BrandLanding from "../BrandLanding";
import ProductType from "../ProductType";
import ProductDetails from "../ProductDetails";
import Locations from "../Locations";
import NewsMedia from "../NewsMedia";
import Testimonials from "../Testimonials";
import AboutUs from "../AboutUs";
import CSR from "../CSR";
import SisterCompanies from "../SisterCompanies";
// import SparesParts from "../SparesParts";
import NotFound from "../NotFound";
import Navbar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import ScrollToTop from "../../components/common/ScrollToTop";

// Admin imports
import AdminLogin from "../Admin/Login";
import AdminLayout from "../../components/admin/AdminLayout";
import AdminDashboard from "../Admin/Dashboard";
import ProductsAdmin from "../Admin/Products";
import ProductTypesAdmin from "../Admin/ProductTypes";
import HeroImagesAdmin from "../Admin/HeroImages";
import AboutUsAdmin from "../Admin/AboutUs";
import ContactInfoAdmin from "../Admin/ContactInfo";
import LocationsAdmin from "../Admin/Locations";
import CSRInitiativesAdmin from "../Admin/CSRInitiatives";
import NewsMediaAdmin from "../Admin/NewsMedia";
import ProtectedRoute from "../../components/common/ProtectedRoute";

const PageRoutes = () => {
    return (
        <Routes>
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
                path="/admin/*"
                element={
                    <ProtectedRoute>
                        <AdminLayout />
                    </ProtectedRoute>
                }
            >
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="products" element={<ProductsAdmin />} />
                <Route path="product-types" element={<ProductTypesAdmin />} />
                <Route path="hero-images" element={<HeroImagesAdmin />} />
                <Route path="about-us" element={<AboutUsAdmin />} />
                <Route path="contact-info" element={<ContactInfoAdmin />} />
                <Route path="locations" element={<LocationsAdmin />} />
                <Route path="csr-initiatives" element={<CSRInitiativesAdmin />} />
                <Route path="news-media" element={<NewsMediaAdmin />} />
            </Route>

            {/* Public Routes */}
            <Route
                path="*"
                element={
                    <div>
                        <Navbar />
                        <ScrollToTop />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route path="/locations" element={<Locations />} />
                            <Route path="/news" element={<NewsMedia />} />
                            <Route path="/testimonials" element={<Testimonials />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/csr" element={<CSR />} />
                            <Route path="/sister-companies" element={<SisterCompanies />} />
                            {/* <Route path="/spares-parts" element={<SparesParts />} /> */}
                            <Route path="/shop/:brand" element={<BrandLanding />} />
                            <Route path="/shop/:brand/:typeSlug" element={<ProductType />} />
                            <Route path="/shop/:brand/:typeSlug/:id" element={<ProductDetails />} />
                            <Route path="*" element={<NotFound />} />
                        </Routes>
                        <Footer />
                    </div>
                }
            />
        </Routes>
    );
};

export default PageRoutes;
