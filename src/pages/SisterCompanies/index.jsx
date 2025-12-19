import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import WaveBackground from '../../components/common/WaveBackground';
import { useState } from 'react';
import { assetUrl } from '../../utils';

const SisterCompanies = () => {
  const { content, isLoading } = useContent();
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (isLoading) return <LoadingSpinner />;
  if (!content || !content.sister_companies) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-secondary">Failed to load sister companies content</div>
      </div>
    );
  }

  const { hero, companies, values } = content.sister_companies;

  // Get unique categories
  const categories = ['all', ...new Set(companies.map(company => company.category))];

  // Filter companies by category
  const filteredCompanies = selectedCategory === 'all'
    ? companies
    : companies.filter(company => company.category === selectedCategory);

  return (
    <main className="min-h-screen bg-dark relative">
      <WaveBackground />

      {/* Hero Section */}
      <section className="relative py-8 lg:py-20 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 lg:mb-12 animate-fade-in-up">
            <h1 className="font-bold text-3xl lg:text-6xl text-secondary mb-3 lg:mb-4">{hero.title}</h1>
            <div className="w-16 lg:w-24 h-1 bg-accent mx-auto mb-4 lg:mb-6" />
            <p className="text-lg lg:text-2xl text-accent opacity-90 mb-3 lg:mb-4">{hero.subtitle}</p>
            <p className="text-sm lg:text-lg text-secondary opacity-80 max-w-4xl mx-auto">
              {hero.description}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 lg:py-8 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4 mb-6 lg:mb-8">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full font-semibold text-sm lg:text-base transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-accent text-dark scale-105 shadow-lg'
                    : 'bg-primary text-secondary hover:bg-accent hover:text-dark'
                }`}
              >
                {category === 'all' ? 'All Companies' : category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Companies Grid */}
      <section className="py-8 lg:py-12 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
            {filteredCompanies.map((company, index) => (
              <div
                key={company.id}
                className="bg-primary rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Company Header with Image */}
                <div className="relative h-48 lg:h-64 overflow-hidden">
                  <img
                    src={assetUrl(company.image)}
                    alt={company.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/50 to-transparent" />
                  <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6 right-4 lg:right-6">
                    <div className="flex items-center gap-3 lg:gap-4 mb-2 lg:mb-3">
                      <img
                        src={assetUrl(company.logo)}
                        alt={`${company.name} logo`}
                        className="h-12 lg:h-16 w-auto bg-white p-2 rounded-lg shadow-lg"
                      />
                      <div>
                        <span className="inline-block px-2 lg:px-3 py-1 bg-accent text-dark text-xs font-bold rounded-full mb-1 lg:mb-2">
                          {company.category}
                        </span>
                        <h2 className="text-xl lg:text-3xl font-bold text-secondary">{company.name}</h2>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Company Content */}
                <div className="p-4 lg:p-8">
                  <p className="text-accent text-lg font-semibold mb-4 italic">
                    {company.tagline}
                  </p>
                  <p className="text-secondary opacity-90 leading-relaxed mb-6">
                    {company.description}
                  </p>

                  {/* Services */}
                  <div className="mb-6">
                    <h3 className="text-xl font-bold text-secondary mb-3 flex items-center gap-2">
                      <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      Key Services
                    </h3>
                    <ul className="grid grid-cols-1 gap-2">
                      {company.services.map((service, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-secondary opacity-80">
                          <span className="text-accent mt-1">•</span>
                          <span>{service}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-dark bg-opacity-50 rounded-lg">
                    {Object.entries(company.stats).map(([key, value], idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-2xl font-bold text-accent mb-1">{value}</div>
                        <div className="text-xs text-secondary opacity-70 capitalize">
                          {key.replace(/([A-Z])/g, ' $1').trim()}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Contact Information */}
                  <div className="border-t border-accent border-opacity-20 pt-6">
                    <h3 className="text-lg font-bold text-secondary mb-3">Contact Information</h3>
                    <div className="space-y-2">
                      <a
                        href={`mailto:${company.contact.email}`}
                        className="flex items-center gap-2 text-secondary hover:text-accent transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        <span className="text-sm">{company.contact.email}</span>
                      </a>
                      <a
                        href={`tel:${company.contact.phone}`}
                        className="flex items-center gap-2 text-secondary hover:text-accent transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                        <span className="text-sm">{company.contact.phone}</span>
                      </a>
                      <a
                        href={`https://${company.contact.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-secondary hover:text-accent transition-colors"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                        </svg>
                        <span className="text-sm">{company.contact.website}</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Shared Values Section */}
      <section className="py-8 lg:py-20 px-4 lg:px-6 bg-primary bg-opacity-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 lg:mb-12 animate-fade-in-up">
            <h2 className="font-bold text-2xl lg:text-4xl text-secondary mb-3 lg:mb-4">{values.title}</h2>
            <div className="w-16 lg:w-24 h-1 bg-accent mx-auto mb-4 lg:mb-6" />
            <p className="text-secondary opacity-80 max-w-3xl mx-auto text-sm lg:text-base">
              {values.description}
            </p>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
            {values.items.map((value, index) => (
              <div
                key={value.id}
                className="bg-primary rounded-lg p-4 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 lg:w-16 lg:h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                  <span className="text-dark font-bold text-lg lg:text-2xl">{index + 1}</span>
                </div>
                <h3 className="text-lg lg:text-2xl font-bold text-secondary mb-2 lg:mb-3">{value.title}</h3>
                <p className="text-secondary opacity-80 leading-relaxed text-sm lg:text-base">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 lg:py-20 px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 lg:p-12 text-center shadow-2xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-secondary mb-3 lg:mb-4">
              Partner With Excellence
            </h3>
            <p className="text-secondary opacity-90 mb-6 lg:mb-8 text-base lg:text-lg">
              Explore collaboration opportunities with our family of companies across diverse industries
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-dark text-secondary rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
              >
                Get in Touch
              </a>
              <a
                href="/about"
                className="px-8 py-4 bg-accent text-dark rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
              >
                Learn More About Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SisterCompanies;
