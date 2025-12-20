import { Link } from 'react-router-dom';
import { assetUrl } from '../../../utils';

const PartnersSection = ({ partnersArray = [], className = '' }) => {
  // Convert partners object to array

  return (
    <section className={`py-10 lg:py-20 px-4 lg:px-6 bg-primary ${className}`}>
      <div className="w-full mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8 lg:mb-16">
          <h2 className="text-2xl lg:text-4xl font-bold text-secondary mb-3 lg:mb-4">
            Our Sister Companies
          </h2>
          <p className="text-sm lg:text-lg text-secondary max-w-2xl mx-auto px-4">
            Collaborating with industry leaders to bring you the best services
          </p>
        </div>

        <div className="relative">
                {/* Fade Effect on Edges */}
                <div className="absolute left-0 top-0 bottom-0 w-16 lg:w-20 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-16 lg:w-20 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />

                {/* Scrollable Cards */}
                <div className="flex gap-4 lg:gap-8 overflow-x-auto scrollbar-hide px-4 lg:px-6 pb-4 scroll-smooth">
                    {partnersArray.map((partner, index) => (
                        <Link
                            key={index}
                            to={`/sister-companies/${partner.slug}`}
                            className="group flex-shrink-0"
                            style={{
                                animation: `slideInFromRight 0.6s ease-out ${
                                    index * 0.1
                                }s both`,
                            }}
                        >
                            {/* Fixed Size Card Container */}
                            <div
                                className={`rounded-2xl overflow-hidden transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] border border-primary w-64 lg:w-[360px]`}
                            >
                                {/* Vertical Layout */}
                                <div className="flex flex-col">
                                    {/* partner Logo - Top Section (Square) */}
                                    <div className="w-full aspect-square bg-white flex items-center justify-center p-6 lg:p-12 relative overflow-hidden">
                                        {/* Subtle Glow on Hover */}
                                        <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/5 transition-all duration-500" />

                                        {/* Logo with fixed size container */}
                                        <div className="w-full h-full flex items-center justify-center relative z-10">
                                            <img
                                                src={assetUrl(partner.logo) || assetUrl(partner.image)}
                                                alt={partner.name}
                                                className="max-w-full max-h-full object-contain group-hover:scale-110 transition-all duration-500"
                                            />
                                        </div>
                                    </div>

                                    {/* partner Info - Bottom Section */}
                                    <div
                                        className={`p-4 lg:p-6 flex flex-col items-center justify-center relative bg-transparent h-[40px]`}
                                    >
                                        <h3 className="text-base lg:text-xl font-bold text-secondary inline-flex items-center group-hover:text-accent transition-colors duration-300 relative z-10 text-center">
                                            {partner.name}
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>
                </div>
        {/* View All Partners Link */}
        {partnersArray?.length > 8 && (
          <div className="text-center mt-8 lg:mt-12">
            <Link
              to="/sister-companies"
              className="inline-flex items-center gap-2 text-accent font-semibold text-sm lg:text-lg hover:gap-3 transition-all duration-300"
            >
              View All Sister Companies
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default PartnersSection;