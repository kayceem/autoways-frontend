import { assetUrl } from '../../../utils';

const CompanyCard = ({ company, index }) => {
  return (
    <div
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
        {company.services && company.services.length > 0 && (
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
        )}


        {/* Contact Information */}
        {company.contact && (
          <div className="border-t border-accent border-opacity-20 pt-6">
            <h3 className="text-lg font-bold text-secondary mb-3">Contact Information</h3>
            <div className="space-y-2">
              {company.contact.email && (
                <a
                  href={`mailto:${company.contact.email}`}
                  className="flex items-center gap-2 text-secondary hover:text-accent transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{company.contact.email}</span>
                </a>
              )}
              {company.contact.phone && (
                <a
                  href={`tel:${company.contact.phone}`}
                  className="flex items-center gap-2 text-secondary hover:text-accent transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">{company.contact.phone}</span>
                </a>
              )}
              {company.contact.website && (
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
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;
