import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import Contact from "../Contact";
import BrandLanding from "../BrandLanding";
import ProductType from "../ProductType";
import Locations from "../Locations";
import NewsMedia from "../NewsMedia";
import Testimonials from "../Testimonials";
import AboutUs from "../AboutUs";
import CSR from "../CSR";
import SisterCompanies from "../SisterCompanies";
import SparesParts from "../SparesParts";
import Navbar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
import ScrollToTop from "../../components/common/ScrollToTop";

const PageRoutes = () => {
    return (
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
                <Route path="/spares-parts" element={<SparesParts />} />
                <Route path="/shop/:brand" element={<BrandLanding />} />
                <Route path="/shop/:brand/:type" element={<ProductType />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default PageRoutes;
