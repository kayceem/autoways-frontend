import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/common/Loading";
import { getSisterCompanyData, assetUrl } from "../../../utils";
import { useContent } from "../../../context/globalContext";
import { Mail, Phone, Globe } from "lucide-react";
const SisterCompaniesLanding = () => {
    const { companySlug } = useParams();
    const navigate = useNavigate();
    const { content, isLoading, error } = useContent();

    if (isLoading) {
        return <LoadingSpinner />;
    }

    if (error) {
        window.location.href = "/not-found";
        return null;
    }

    const companyData = getSisterCompanyData(content?.sisterCompanies, companySlug);

    if (!companyData) {
        window.location.href = "/not-found";
        return null;
    }

    return (
        <div className="min-h-screen bg-primary">
            {/* Hero Section */}
            <section className="relative h-[300px] lg:h-[600px] flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 bg-secondary">
                    {companyData?.image && (
                        <img
                            src={assetUrl(companyData.image)}
                            alt={companyData.name}
                            className="w-full h-full object-cover opacity-90"
                            loading="eager"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-primary" />
                </div>

                {/* Hero Content */}
                <div className="relative z-10 text-center px-4 lg:px-6 max-w-5xl">
                    {/* Company Logo */}
                    {companyData?.logo && (
                        <div className="flex justify-center mb-6">
                            <img
                                src={assetUrl(companyData.logo)}
                                alt={`${companyData.name} logo`}
                                className="h-24 lg:h-32 w-auto bg-white p-4 rounded-2xl shadow-2xl"
                            />
                        </div>
                    )}

                    {/* Company Name */}
                    {/* <h1 className="text-4xl lg:text-6xl font-bold text-secondary bg-primary rounded-2xl animate-fade-in-up">
                        {companyData.name}
                    </h1> */}

                    {/* Tagline */}
                    {companyData?.tagline && (
                        <p className="text-xl lg:text-3xl text-white font-semibold italic mb-4 animate-fade-in-up-delay">
                            {companyData.tagline}
                        </p>
                    )}
                </div>
            </section>

            {/* Description Section */}
            <section className="py-10 lg:py-16 px-4 lg:px-6 bg-dark">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-6 text-center">
                        About {companyData.name}
                    </h2>
                    <div className="w-16 lg:w-24 h-1 bg-accent mx-auto mb-8" />
                    <p className="text-secondary text-lg lg:text-xl leading-relaxed opacity-90 text-center text-justify">
                        {companyData.description}
                    </p>
                </div>
            </section>

            {/* Services Section */}
            {companyData?.services && companyData.services.length > 0 && (
                <section className="py-10 lg:py-16 px-4 lg:px-6">
                    <div className="max-w-6xl mx-auto">
                        <div className="text-center mb-8 lg:mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
                                Our Services
                            </h2>
                            <div className="w-16 lg:w-24 h-1 bg-accent mx-auto" />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {companyData.services.map((service, index) => (
                                <div
                                    key={index}
                                    className="bg-dark rounded-xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex items-start gap-3">
                                        <svg
                                            className="w-6 h-6 text-accent flex-shrink-0 mt-1"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        <span className="text-secondary text-lg">{service}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* Contact Section */}
            {companyData?.contact && (
                <section className="py-10 lg:py-16 px-4 lg:px-6 bg-dark">
                    <div className="max-w-4xl mx-auto">
                        <div className="text-center mb-8 lg:mb-12">
                            <h2 className="text-3xl lg:text-4xl font-bold text-secondary mb-4">
                                Get in Touch
                            </h2>
                            <div className="w-16 lg:w-24 h-1 bg-accent mx-auto" />
                        </div>

                        <div className="bg-primary rounded-2xl p-8 lg:p-12 shadow-2xl">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                                {/* Email */}
                                {companyData.contact.email && (
                                    <a
                                        href={`mailto:${companyData.contact.email}`}
                                        className="flex flex-col items-center gap-3 p-6 bg-dark rounded-xl hover:bg-accent hover:text-dark transition-all duration-300 group"
                                    >
                                        <Mail className="w-10 h-10 text-accent-2 group-hover:text-accent-2 transition-colors" />
                                        <div className="text-center">
                                            {/* <p className="text-secondary group-hover:text-dark font-semibold mb-1">Email</p> */}
                                            <p className="text-secondary group-hover:text-dark text-sm">{companyData.contact.email}</p>
                                        </div>
                                    </a>
                                )}

                                {/* Phone */}
                                {companyData.contact.phone && (
                                    <a
                                        href={`tel:${companyData.contact.phone}`}
                                        className="flex flex-col items-center gap-3 p-6 bg-dark rounded-xl hover:bg-accent hover:text-dark transition-all duration-300 group"
                                    >
                                        <Phone className="w-10 h-10 text-accent-2 group-hover:text-accent-2 transition-colors" />
                                        <div className="text-center">
                                            {/* <p className="text-secondary group-hover:text-dark font-semibold mb-1">Phone</p> */}
                                            <p className="text-secondary group-hover:text-dark text-sm">{companyData.contact.phone}</p>
                                        </div>
                                    </a>
                                )}

                                {/* Website */}
                                {companyData.contact.website && (
                                    <a
                                        href={`https://${companyData.contact.website}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex flex-col items-center gap-3 p-6 bg-dark rounded-xl hover:bg-accent hover:text-dark transition-all duration-300 group"
                                    >
                                        <Globe className="w-10 h-10 text-accent-2 group-hover:text-accent-2 transition-colors" />
                                        <div className="text-center">
                                            {/* <p className="text-secondary group-hover:text-dark font-semibold mb-1">Website</p> */}
                                            <p className="text-secondary group-hover:text-dark text-sm">{companyData.contact.website}</p>
                                        </div>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {/* Back to Sister Companies */}
            <section className="py-10 px-4 lg:px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <button
                        onClick={() => navigate('/sister-companies')}
                        className="inline-flex items-center gap-2 px-8 py-4 bg-accent text-dark font-bold rounded-lg hover:bg-opacity-90 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                        All Sister Companies
                    </button>
                </div>
            </section>
        </div>
    );
};

export default SisterCompaniesLanding;
