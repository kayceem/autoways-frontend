import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import WaveBackground from '../../components/common/WaveBackground';
import { Navigate } from 'react-router-dom';
import { useState } from 'react';
import { X, MapPin, Calendar, CheckCircle } from 'lucide-react';
import { Link } from "react-router-dom";

const Careers = () => {
  const { content, isLoading } = useContent();
  const [selectedCareer, setSelectedCareer] = useState(null);

  const careers = content?.careers ?? [];
  const mailtoEmail = content?.contactInfo?.email || 'careers@autoways.com.np';
  const activeCareers = careers.filter(career => career.isActive);

  if (isLoading) return <LoadingSpinner />;
  if (!content) return <Navigate to="/not-found" replace />;

  const formatDate = (dateString) => {
    if (!dateString) return 'Ongoing';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const openModal = (career) => {
    setSelectedCareer(career);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedCareer(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <main className="min-h-screen bg-dark relative">
      <WaveBackground height={20}/>

      {/* Hero Section */}
      <section className="relative py-8 lg:py-10 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 lg:mb-10 animate-fade-in-up">
            <h1 className="font-bold text-3xl lg:text-6xl text-secondary mb-3 lg:mb-4">Careers</h1>
            <div className="w-16 lg:w-24 h-1 bg-accent mx-auto mb-4 lg:mb-6" />
            <p className="text-base lg:text-xl text-secondary opacity-80 max-w-3xl mx-auto">
              Join our team and be part of something extraordinary. Explore exciting career opportunities at Autoways
            </p>
          </div>
        </div>
      </section>

      {/* Career Listings */}
      <section className="py-8 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          {activeCareers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-secondary opacity-70 text-lg mb-2">
                No open positions at the moment
              </p>
              <p className="text-secondary opacity-50 text-sm">
                Check back later for new opportunities
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
              {activeCareers.map((career, index) => (
                <div
                  key={career._id}
                  onClick={() => openModal(career)}
                  className="bg-primary rounded-lg p-4 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Department Badge */}
                  {career.department && (
                    <div className="mb-4">
                      <span className="bg-dark text-accent px-3 py-1 rounded-full text-sm font-semibold">
                        {career.department}
                      </span>
                    </div>
                  )}

                  {/* Position Title */}
                  <h3 className="text-lg lg:text-xl font-bold text-secondary mb-3 lg:mb-4">
                    {career.position}
                  </h3>

                  {/* Location & Deadline */}
                  <div className="space-y-2 mb-4">
                    {career.location && (
                      <div className="flex items-center gap-2 text-secondary opacity-70 text-xs lg:text-sm">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span>{career.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-2 text-secondary opacity-70 text-xs lg:text-sm">
                      <Calendar className="w-4 h-4 text-accent" />
                      <span>Apply by: {formatDate(career.deadline)}</span>
                    </div>
                  </div>

                  {/* Description Preview */}
                  <p className="text-secondary opacity-80 text-xs lg:text-sm leading-relaxed mb-4 line-clamp-3">
                    {career.description}
                  </p>

                  {/* View Details Button */}
                  <button className="text-accent hover:text-secondary transition-colors font-semibold text-sm">
                    View Details →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal */}
      {selectedCareer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200"
          style={{ backdropFilter: 'blur(8px)', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          onClick={closeModal}
        >
          <div
            className="bg-primary rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="sticky top-4 float-right mr-4 text-secondary hover:text-accent transition-colors z-10 p-2 bg-dark bg-opacity-50 rounded-full"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="p-6 lg:p-12">
              {/* Header */}
              <div className="mb-6 lg:mb-8">
                {selectedCareer.department && (
                  <span className="bg-dark text-accent px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedCareer.department}
                  </span>
                )}
                <h2 className="text-2xl lg:text-4xl font-bold text-secondary mt-4 mb-4">
                  {selectedCareer.position}
                </h2>

                <div className="flex flex-wrap gap-4 text-secondary opacity-70">
                  {selectedCareer.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-accent" />
                      <span>{selectedCareer.location}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-accent" />
                    <span>Apply by: {formatDate(selectedCareer.deadline)}</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6 lg:mb-8">
                <h3 className="text-xl font-bold text-secondary mb-3">About the Role</h3>
                <p className="text-secondary opacity-80 leading-relaxed whitespace-pre-line">
                  {selectedCareer.description}
                </p>
              </div>

              {/* Requirements */}
              {selectedCareer.requirements && selectedCareer.requirements.length > 0 && (
                <div className="mb-6 lg:mb-8">
                  <h3 className="text-xl font-bold text-secondary mb-3">Requirements</h3>
                  <ul className="space-y-2">
                    {selectedCareer.requirements.map((req, index) => (
                      <li key={index} className="flex items-start gap-3 text-secondary opacity-80">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Responsibilities */}
              {selectedCareer.responsibilities && selectedCareer.responsibilities.length > 0 && (
                <div className="mb-6 lg:mb-8">
                  <h3 className="text-xl font-bold text-secondary mb-3">Responsibilities</h3>
                  <ul className="space-y-2">
                    {selectedCareer.responsibilities.map((resp, index) => (
                      <li key={index} className="flex items-start gap-3 text-secondary opacity-80">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{resp}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Benefits */}
              {selectedCareer.benefits && selectedCareer.benefits.length > 0 && (
                <div className="mb-6 lg:mb-8">
                  <h3 className="text-xl font-bold text-secondary mb-3">Benefits</h3>
                  <ul className="space-y-2">
                    {selectedCareer.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start gap-3 text-secondary opacity-80">
                        <CheckCircle className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Apply Button */}
              <div className="pt-6">
                <a href={`mailto:${mailtoEmail}`} className="w-full lg:w-auto px-8 py-3 bg-accent text-dark rounded-lg font-semibold hover:scale-105 transition-transform duration-200">
                    Apply Now
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Careers;
