import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import WaveBackground from '../../components/common/WaveBackground';
import { useState } from 'react';

const SparesParts = () => {
  const { content, isLoading } = useContent();
  const [selectedCategory, setSelectedCategory] = useState(null);

  if (isLoading) return <LoadingSpinner />;
  if (!content || !content.spares_parts) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-secondary">Failed to load spares and parts content</div>
      </div>
    );
  }

  const { hero, categories, brands_supported, services, featured_products, stats, contact } = content.spares_parts;

  return (
    <main className="min-h-screen bg-dark relative">
      <WaveBackground />

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="font-bold text-6xl text-secondary mb-4">{hero.title}</h1>
              <div className="w-24 h-1 bg-accent mb-6" />
              <p className="text-2xl text-accent opacity-90 mb-4">{hero.subtitle}</p>
              <p className="text-lg text-secondary opacity-80 leading-relaxed mb-6">
                {hero.description}
              </p>
              <div className="flex gap-4">
                <a
                  href="#categories"
                  className="px-8 py-4 bg-accent text-dark rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
                >
                  Browse Categories
                </a>
                <a
                  href="#contact"
                  className="px-8 py-4 bg-primary text-secondary rounded-lg font-semibold hover:bg-accent hover:text-dark transition-all transform hover:scale-105 shadow-lg border border-accent"
                >
                  Contact Us
                </a>
              </div>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <img
                src={assetUrl(hero.image)}
                alt="Spares and Parts"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-primary rounded-lg shadow-lg animate-fade-in-up">
              <div className="text-4xl font-bold text-accent mb-2">{stats.partsAvailable}</div>
              <div className="text-secondary opacity-70">Parts Available</div>
            </div>
            <div className="text-center p-6 bg-primary rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-accent mb-2">{stats.brandsSupported}</div>
              <div className="text-secondary opacity-70">Brands Supported</div>
            </div>
            <div className="text-center p-6 bg-primary rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-accent mb-2">{stats.serviceLocations}</div>
              <div className="text-secondary opacity-70">Service Locations</div>
            </div>
            <div className="text-center p-6 bg-primary rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-accent mb-2">{stats.expertTechnicians}</div>
              <div className="text-secondary opacity-70">Expert Technicians</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-6 bg-primary bg-opacity-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-bold text-4xl text-secondary mb-4">Why Choose Us</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-secondary opacity-80 max-w-3xl mx-auto">
              Comprehensive parts solutions with expert support and genuine quality
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={service.id}
                className="bg-primary rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-3">{service.title}</h3>
                <p className="text-secondary opacity-80 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section id="categories" className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-bold text-4xl text-secondary mb-4">Parts Categories</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-secondary opacity-80 max-w-3xl mx-auto">
              Comprehensive inventory across all major automotive systems and components
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(selectedCategory === category.id ? null : category.id)}
                className="bg-primary rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-fade-in-up"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={assetUrl(category.image)}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/70 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-secondary">{category.name}</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-secondary opacity-80 text-sm mb-4">
                    {category.description}
                  </p>

                  {selectedCategory === category.id && (
                    <div className="mt-4 pt-4 border-t border-accent border-opacity-20">
                      <h4 className="text-sm font-bold text-accent mb-2">Available Items:</h4>
                      <ul className="space-y-1">
                        {category.subcategories.map((sub, idx) => (
                          <li key={idx} className="flex items-start gap-2 text-secondary opacity-80 text-xs">
                            <span className="text-accent mt-1">•</span>
                            <span>{sub}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <button className="mt-4 w-full px-4 py-2 bg-accent text-dark rounded-lg font-semibold hover:bg-opacity-90 transition-all text-sm">
                    {selectedCategory === category.id ? 'Hide Details' : 'View Details'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 px-6 bg-primary bg-opacity-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-bold text-4xl text-secondary mb-4">Featured Products</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-secondary opacity-80 max-w-3xl mx-auto">
              Popular genuine parts from our extensive inventory
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featured_products.map((product, index) => (
              <div
                key={product.id}
                className="bg-primary rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-48 bg-gradient-to-br from-accent to-primary flex items-center justify-center overflow-hidden">
                  <img
                    src={assetUrl(product.image)}
                    alt={product.name}
                    className="w-full h-full object-cover opacity-50"
                  />
                  {product.inStock && (
                    <span className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full">
                      In Stock
                    </span>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-xs text-accent font-semibold mb-2">{product.category}</div>
                  <h3 className="text-lg font-bold text-secondary mb-2">{product.name}</h3>
                  <p className="text-xs text-secondary opacity-70 mb-3">
                    Part #: {product.partNumber}
                  </p>
                  <p className="text-secondary opacity-80 text-sm mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-accent">
                      NPR {product.price.toLocaleString()}
                    </div>
                  </div>
                  <button className="mt-4 w-full px-4 py-2 bg-accent text-dark rounded-lg font-semibold hover:bg-opacity-90 transition-all">
                    Inquire Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Supported */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-bold text-4xl text-secondary mb-4">Brands We Support</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-secondary opacity-80 max-w-3xl mx-auto">
              Genuine OEM parts for all our represented automotive brands
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
            {brands_supported.map((brand, index) => (
              <div
                key={index}
                className="bg-primary rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col items-center justify-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={assetUrl(brand.logo)}
                  alt={brand.name}
                  className="h-16 w-auto mb-3 object-contain"
                />
                <p className="text-secondary opacity-70 text-xs text-center">
                  {brand.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-center shadow-2xl">
            <h3 className="text-3xl font-bold text-secondary mb-4">
              {contact.title}
            </h3>
            <p className="text-secondary opacity-90 mb-6 text-lg">
              {contact.description}
            </p>
            <div className="space-y-3 mb-8">
              <a
                href={`tel:${contact.phone}`}
                className="flex items-center justify-center gap-2 text-secondary hover:text-accent transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-xl font-semibold">{contact.phone}</span>
              </a>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center justify-center gap-2 text-secondary hover:text-accent transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-xl font-semibold">{contact.email}</span>
              </a>
              <div className="flex items-center justify-center gap-2 text-secondary">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{contact.hours}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-dark text-secondary rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
              >
                Contact Us
              </a>
              <a
                href="/locations"
                className="px-8 py-4 bg-accent text-dark rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
              >
                Find Our Locations
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default SparesParts;
