import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Eagerly loaded - all public pages
import Home from "../Home";
import Contact from "../Contact";
import BrandLanding from "../BrandLanding";
import ProductType from "../ProductType";
import ProductDetails from "../ProductDetails";
import NewsMedia from "../NewsMedia";
import Testimonials from "../Testimonials";
import AboutUs from "../AboutUs";
import CSR from "../CSR";
import SisterCompanies from "../SisterCompanies";
import SisterCompaniesLanding from "../SisterCompanies/SisterCompaniesLanding";
import SparesParts from "../SparesParts";
import Gallery from "../Gallery";
import Careers from "../Careers";
import NotFound from "../NotFound";
import { PrivacyPolicy, TermsAndConditions } from "../Legal";
import Navbar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import ScrollToTop from "../../components/common/ScrollToTop";
import ProtectedRoute from "../../components/common/ProtectedRoute";
import LoadingSpinner from "../../components/common/Loading";

// Lazy loaded
const Locations = lazy(() => import("../Locations"));
const AdminLogin = lazy(() => import("../Admin/Login"));
const AdminRoutes = lazy(() => import("../Admin/AdminRoutes"));

const PageRoutes = () => {
    return (
        <Routes>
            {/* Admin Routes - Lazy loaded as single chunk */}
            <Route path="/admin/login" element={
                <Suspense fallback={<LoadingSpinner />}>
                    <AdminLogin />
                </Suspense>
            } />
            <Route
                path="/admin/*"
                element={
                    <ProtectedRoute>
                        <Suspense fallback={<LoadingSpinner />}>
                            <AdminRoutes />
                        </Suspense>
                    </ProtectedRoute>
                }
            />

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
                            <Route path="/locations" element={
                                <Suspense fallback={<LoadingSpinner />}>
                                    <Locations />
                                </Suspense>
                            } />
                            <Route path="/news" element={<NewsMedia />} />
                            <Route path="/testimonials" element={<Testimonials />} />
                            <Route path="/about" element={<AboutUs />} />
                            <Route path="/csr" element={<CSR />} />
                            <Route path="/sister-companies" element={<SisterCompanies />} />
                            <Route path="/sister-companies/:companySlug" element={<SisterCompaniesLanding />} />
                            <Route path="/spare-parts" element={<SparesParts />} />
                            <Route path="/gallery" element={<Gallery />} />
                            <Route path="/careers" element={<Careers />} />
                            <Route path="/privacy" element={<PrivacyPolicy />} />
                            <Route path="/terms" element={<TermsAndConditions />} />
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
