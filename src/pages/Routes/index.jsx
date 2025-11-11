import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import Contact from "../Contact";
import BrandLanding from "../BrandLanding";
import ProductType from "../ProductType";
import Navbar from "../../components/common/NavBar";
import Footer from "../../components/common/Footer";
const PageRoutes = () => {
    return (
        <div>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/shop/:brand" element={<BrandLanding />} />
                <Route path="/shop/:brand/:type" element={<ProductType />} />
            </Routes>
            <Footer />
        </div>
    );
};

export default PageRoutes;
