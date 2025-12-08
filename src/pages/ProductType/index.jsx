import { Link, useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import ProductCard from "../../components/common/ProductCard";
import {
    Filter,
    Grid3x3,
    List,
    SlidersHorizontal,
    ChevronDown,
} from "lucide-react";
import useProductTypeQuery from "../../hooks/useProductTypeQuery";
import LoadingSpinner from "../../components/common/Loading";
import "./index.css";
const ProductTypePage = () => {
    const { brand, type } = useParams();
    const location = useLocation();
    const typeName = location.state?.typeName || type;
    const { data, isLoading, error } = useProductTypeQuery(brand, type);
    const [viewMode, setViewMode] = useState("grid");
    const [sortBy, setSortBy] = useState("name");

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-primary">
                <div className="text-error font-light text-2xl">
                    Failed to load products
                </div>
            </div>
        );
    }
    console.log("Product Type Data:", data);

    return (
        <div className={`min-h-screen bg-primary`}>
            {/* Hero Header Section */}
            <section
                className={`relative bg-gradient-to-br from-primary via-primary to-accent/10 border-b border-secondary/20`}
            >
                <div className="max-w-7xl mx-auto px-6 py-20">
                    {/* Breadcrumb */}
                    <div
                        className={`flex items-center gap-2 text-secondary/60 text-sm mb-6 font-light`}
                    >
                        <span>Shop</span>
                        <ChevronDown size={16} className="rotate-[-90deg]" />
                        {/* <span className="capitalize">{brand}</span> */}
                        <Link
                            to={`/shop/${brand}`}
                            className="hover:underline capitalize"
                        >
                            {brand}
                        </Link>
                        <ChevronDown size={16} className="rotate-[-90deg]" />
                        <span
                            className={`capitalize text-accent font-bold`}
                        >
                            {typeName}
                        </span>
                    </div>

                    {/* Title Section */}
                    <div className="flex items-end justify-between">
                        <div>
                            <h1
                                className={`font-bold text-7xl text-secondary mb-4 capitalize`}
                            >
                                {typeName}
                            </h1>
                            <p
                                className={`font-light text-2xl text-secondary/80 max-w-2xl`}
                            >
                                Discover our premium collection of {typeName}{" "}
                                vehicles, engineered for excellence
                            </p>
                        </div>

                        {/* Product Count Badge */}
                        {/* <div className={`bg-accent px-6 py-3 rounded-full`}>
              <span className={`font-bold text-secondary text-2xl`}>
                {data?.length || 0}
              </span>
              <span className={`font-light text-secondary text-lg ml-2`}>Vehicles</span>
            </div> */}
                    </div>
                </div>

                {/* Decorative Elements */}
                <div
                    className={`absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl`}
                />
                <div
                    className={`absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl`}
                />
            </section>

            {/* Filter & Sort Bar */}
            <section
                className={`sticky top-0 z-40 bg-secondary/95 backdrop-blur-lg border-b border-primary/10 shadow-lg`}
            >
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-end">
                        {/* Left - Filters */}
                        {/* <div className="flex items-center gap-4">
              <button className={`flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-accent hover:text-primary text-primary rounded-lg transition-all duration-300 font-bold`}>
                <SlidersHorizontal size={18} />
                <span>Filters</span>
              </button>
              
              <button className={`flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-accent hover:text-primary text-primary rounded-lg transition-all duration-300 font-bold`}>
                <Filter size={18} />
                <span>Price Range</span>
              </button>
            </div> */}

                        {/* Right - View Mode & Sort */}
                        <div className="flex items-center gap-4">
                            {/* Sort Dropdown */}
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className={`px-4 py-2 bg-primary/10 text-primary rounded-lg font-bold cursor-pointer hover:bg-accent hover:text-primary transition-all duration-300 outline-none`}
                            >
                                <option value="name">Name</option>
                                <option value="price-low">
                                    Price: Low to High
                                </option>
                                <option value="price-high">
                                    Price: High to Low
                                </option>
                                <option value="newest">Newest</option>
                            </select>

                            {/* View Mode Toggle */}
                            <div
                                className={`flex items-center gap-2 bg-primary rounded-lg p-1 text-secondary`}
                            >
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`p-2 rounded transition-all duration-300 ${
                                        viewMode === "grid"
                                            ? `text-primary`
                                            : `text-secondary/50 hover:bg-primary/20`
                                    }`}
                                >
                                    <Grid3x3 size={20} />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`p-2 rounded transition-all duration-300 ${
                                        viewMode === "list"
                                            ? `text-primary`
                                            : `text-secondary/50 hover:bg-primary/20`
                                    }`}
                                >
                                    <List size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Products Grid Section */}
            <section className="py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    {data.length > 0 ? (
                        <div
                            className={`grid ${
                                viewMode === "grid"
                                    ? "grid-cols-3 gap-8"
                                    : "grid-cols-1 gap-6"
                            } transition-all duration-500`}
                        >
                            {data.map((product, index) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    brandName={brand}
                                    className="animate-fade-in-up"
                                    style={{
                                        animationDelay: `${index * 100}ms`,
                                    }}
                                />
                            ))}
                        </div>
                    ) : (
                        // Empty State
                        <div className="text-center py-32">
                            <div
                                className={`w-32 h-32 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6`}
                            >
                                <Grid3x3
                                    size={64}
                                    className={`text-accent/50`}
                                />
                            </div>
                            <h3
                                className={`font-bold text-3xl text-secondary mb-4`}
                            >
                                No Vehicles Available
                            </h3>
                            <p
                                className={`font-light text-secondary/60 text-lg`}
                            >
                                We're currently updating our {typeName} collection.
                                Check back soon!
                            </p>
                        </div>
                    )}
                </div>
            </section>

            {/* Bottom CTA Section */}
            <section
                className={`bg-gradient-to-t from-accent/5 to-transparent py-20 px-6`}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <h2
                        className={`font-bold text-4xl text-secondary mb-4`}
                    >
                        Can't Find What You're Looking For?
                    </h2>
                    <p
                        className={`font-light text-secondary/80 text-lg mb-8`}
                    >
                        Our team is ready to help you find your perfect vehicle
                    </p>
                    <button
                        className={`bg-accent text-secondary px-8 py-4 rounded-lg font-bold text-lg hover:bg-primary hover:text-accent border-2 border-accent transition-all duration-300 transform hover:scale-105`}
                    >
                        Contact Our Experts
                    </button>
                </div>
            </section>
        </div>
    );
};

export default ProductTypePage;
