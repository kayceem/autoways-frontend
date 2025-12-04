import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import Contact from "../Contact";
import BrandLanding from "../BrandLanding";
import ProductType from "../ProductType";
import Locations from "../Locations";
import NewsMedia from "../NewsMedia";
import Testimonials from "../Testimonials";
import AboutUs from "../AboutUs";
import Navbar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
const PageRoutes = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/locations" element={<Locations />} />
                <Route path="/news" element={<NewsMedia />} />
                <Route path="/testimonials" element={<Testimonials />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/shop/:brand" element={<BrandLanding />} />
                <Route path="/shop/:brand/:type" element={<ProductType />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default PageRoutes;
