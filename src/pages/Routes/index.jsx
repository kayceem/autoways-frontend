import { Route, Routes } from "react-router-dom";
import Home from "../Home";
import Contact from "../Contact";
import Navbar from "../../components/common/NavBar";

const PageRoutes = () => {
    return (
        <div>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/contact" element={<Contact />} />
            </Routes>
        </div>
    );
};

export default PageRoutes;
