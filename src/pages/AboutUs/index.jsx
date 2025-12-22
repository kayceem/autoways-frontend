import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import WaveBackground from '../../components/common/WaveBackground';
import { useState, useRef } from 'react';
import { assetUrl } from '../../utils';
import { Link } from 'react-router-dom';

const AboutUs = () => {
  const { content, isLoading } = useContent();
  const [activeTimelineIndex, setActiveTimelineIndex] = useState(0);
  const timelineContainerRef = useRef(null);

  if (isLoading) return <LoadingSpinner />;
  if (!content || content.aboutUs?.length === 0) {
    window.location.href = "/not-found";
  }

  const { mission, vision, values, milestones, team, stats, chairman_message, md_message} = content.aboutUs[0] || [];
  console.log('About Us Content:', team);
  const aboutUs = content.aboutUs[0];

  // Handlers for timeline navigation
  const scrollToMilestone = (index) => {
    setActiveTimelineIndex(index);
    if (timelineContainerRef.current) {
      const container = timelineContainerRef.current;
      const cardWidth = container.scrollWidth / milestones.length;
      container.scrollTo({
        left: cardWidth * index,
        behavior: 'smooth'
      });
    }
  };

  const handlePrevious = () => {
    const newIndex = activeTimelineIndex > 0 ? activeTimelineIndex - 1 : milestones.length - 1;
    scrollToMilestone(newIndex);
  };

  const handleNext = () => {
    const newIndex = activeTimelineIndex < milestones.length - 1 ? activeTimelineIndex + 1 : 0;
    scrollToMilestone(newIndex);
  };

  return (
    <main className="min-h-screen bg-dark relative">
      <WaveBackground />

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="font-bold text-6xl text-secondary mb-4">About Autoways</h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-xl text-secondary opacity-80 max-w-3xl mx-auto">
              Driving Nepal's automotive excellence since 2002
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="text-center p-6 bg-primary rounded-lg shadow-lg animate-fade-in-up">
              <div className="text-4xl font-bold text-accent mb-2">{stats.yearsOfExperience}</div>
              <div className="text-secondary opacity-70 text-sm">Years Experience</div>
            </div>
            <div className="text-center p-6 bg-primary rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-accent mb-2">{stats.happyCustomers}</div>
              <div className="text-secondary opacity-70 text-sm">Happy Customers</div>
            </div>
            <div className="text-center p-6 bg-primary rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-accent mb-2">{stats.vehiclesSold}</div>
              <div className="text-secondary opacity-70 text-sm">Vehicles Sold</div>
            </div>
            <div className="text-center p-6 bg-primary rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-accent mb-2">{stats.serviceCenters}</div>
              <div className="text-secondary opacity-70 text-sm">Service Centers</div>
            </div>
            <div className="text-center p-6 bg-primary rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl font-bold text-accent mb-2">{stats.brands}</div>
              <div className="text-secondary opacity-70 text-sm">Global Brands</div>
            </div>
            <div className="text-center p-6 bg-primary rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="text-4xl font-bold text-accent mb-2">{stats.employees}</div>
              <div className="text-secondary opacity-70 text-sm">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <img
                src={assetUrl(aboutUs.image)}
                alt="Autoways"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl font-bold text-secondary mb-6">{aboutUs.title}</h2>
              <div className="w-24 h-1 bg-accent mb-6" />
              <p className="text-secondary text-justify opacity-80 leading-relaxed text-lg whitespace-pre-line">
                {aboutUs.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Message from Chairman */}
      {chairman_message && (
        <section className="py-20 px-6 bg-primary bg-opacity-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="animate-fade-in-up">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-bold text-secondary">Message from {chairman_message.title}</h2>
                </div>
                <div className="w-24 h-1 bg-accent mb-6" />
                <p className="text-secondary text-justify opacity-80 leading-relaxed text-lg whitespace-pre-line mb-6">
                  {chairman_message.message}
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-secondary font-bold text-xl">
                      {chairman_message.name}
                    </p>
                    <p className="text-accent font-semibold">
                      {chairman_message.title || 'Chairman & Managing Director'}
                    </p>
                  </div>
                </div>
              </div>
              {chairman_message.image && (
                <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <img
                    src={assetUrl(chairman_message.image)}
                    alt="Chairman"
                    className="rounded-lg shadow-2xl w-full"
                  />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Message from MD */}
      {md_message && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {md_message.image && (
                <div className="animate-fade-in-up order-2 lg:order-1">
                  <img
                    src={assetUrl(md_message.image)}
                    alt="Managing Director"
                    className="rounded-lg shadow-2xl w-full"
                  />
                </div>
              )}
              <div className="animate-fade-in-up order-1 lg:order-2" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="text-4xl font-bold text-secondary">Message from {md_message.title}</h2>
                </div>
                <div className="w-24 h-1 bg-accent mb-6" />
                <p className="text-secondary text-justify opacity-80 leading-relaxed text-lg whitespace-pre-line mb-6">
                  {md_message.message}
                </p>
                <div className="flex items-center gap-4">
                  <div className="text-left">
                    <p className="text-secondary font-bold text-xl">
                      {md_message.name}
                    </p>
                    <p className="text-accent font-semibold">
                      {md_message.title || 'CEO'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-primary bg-opacity-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-primary rounded-lg p-8 shadow-lg animate-fade-in-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-secondary">{mission.title}</h3>
              </div>
              <p className="text-secondary opacity-80 leading-relaxed text-lg">
                {mission.content}
              </p>
            </div>
            <div className="bg-primary rounded-lg p-8 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-secondary">{vision.title}</h3>
              </div>
              <p className="text-secondary opacity-80 leading-relaxed text-lg">
                {vision.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-bold text-4xl text-secondary mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-secondary opacity-80 max-w-2xl mx-auto">
              The principles that guide our decisions and define our culture
            </p>
          </div>
          <div className="grid lg:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-primary rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <span className="text-dark font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-3">{value.title}</h3>
                <p className="text-secondary opacity-80 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Milestones (Horizontal Swipeable) */}
      <section className="py-20 bg-primary bg-opacity-50 w-full">
        <div className="w-full">
          <div className="text-center mb-12 animate-fade-in-up px-6">
            <h2 className="font-bold text-4xl text-secondary mb-4">Our Journey</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-secondary opacity-80 max-w-2xl mx-auto">
              Key milestones in our journey of excellence and growth
            </p>
          </div>

          {/* Timeline Years Bar (Swipeable) */}
          <div className="relative mb-12 px-6">
            <div className="overflow-x-auto scrollbar-hide">
              <div className="flex gap-4 pb-4 min-w-max justify-center mx-auto">
                {milestones.map((milestone, index) => (
                  <button
                    key={index}
                    onClick={() => scrollToMilestone(index)}
                    className={`px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 whitespace-nowrap ${
                      activeTimelineIndex === index
                        ? 'bg-accent text-dark scale-110 shadow-lg'
                        : 'bg-primary text-secondary hover:bg-accent hover:text-dark'
                    }`}
                  >
                    {milestone.year}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Milestones Carousel */}
          <div className="relative">
            {/* Previous Button */}
            <button
              onClick={handlePrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-accent text-dark p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
              aria-label="Previous milestone"
            >
              <svg className="w-6 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            {/* Next Button */}
            <button
              onClick={handleNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-accent text-dark p-4 rounded-full shadow-lg hover:scale-110 transition-transform duration-300"
              aria-label="Next milestone"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Milestones Container */}
            <div
              ref={timelineContainerRef}
              className="overflow-x-auto scrollbar-hide scroll-smooth px-16"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              <div className="flex gap-6">
                {milestones.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex-shrink-0 w-full lg:w-[700px] scroll-snap-align-center"
                    style={{ scrollSnapAlign: 'center' }}
                  >
                    <div className="relative bg-primary rounded-2xl overflow-hidden shadow-2xl h-[450px] group">
                      {/* Background Image */}
                      <img
                        src={assetUrl(milestone.image)}
                        alt={`${milestone.title} - ${milestone.year}`}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/70 to-transparent" />

                      {/* Content Layout */}
                      <div className="absolute inset-0 flex flex-col p-6">
                        {/* Year Badge at Top */}
                        <div className="inline-block self-start bg-accent text-dark px-6 py-2 rounded-full font-bold text-xl shadow-lg mb-auto">
                          {milestone.year}
                        </div>

                        {/* Text Card on Left Middle */}
                        <div className="max-w-md bg-primary backdrop-blur-sm rounded-xl p-6 border border-accent/20">
                          <h3 className="text-2xl font-bold text-secondary mb-3">
                            {milestone.title}
                          </h3>
                          <p className="text-secondary opacity-90 text-base leading-relaxed">
                            {milestone.description}
                          </p>
                        </div>

                        {/* Spacer for bottom */}
                        <div className="h-6"></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mt-8 px-6">
            {milestones.map((_, index) => (
              <button
                key={index}
                onClick={() => scrollToMilestone(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeTimelineIndex === index
                    ? 'w-8 bg-accent'
                    : 'w-2 bg-secondary opacity-30 hover:opacity-50'
                }`}
                aria-label={`Go to milestone ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

    {/* Leadership Team */}
    {team?.length > 0 && (
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-bold text-4xl text-secondary mb-4">{team.title}</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-secondary opacity-80 max-w-3xl mx-auto">
              {team.description}
            </p>
          </div>
          <div className="grid lg:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
                <div
                key={index}
                className="bg-primary rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                >
                <div className="h-48 bg-gradient-to-br from-accent to-primary flex items-center justify-center">
                  <div className="w-32 h-32 bg-dark rounded-full flex items-center justify-center">
                    <img
                      src={assetUrl(member.image)}
                      alt={member.name}
                      className="w-28 h-28 rounded-full object-cover"
                    />
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary mb-2">{member.name}</h3>
                  <div className="text-accent font-semibold mb-3">{member.position}</div>
                  <div className="text-accent font-semibold mb-3">{member.department}</div>
                  <p className="text-secondary opacity-80 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )}
      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-12 text-center shadow-2xl">
            <h3 className="text-3xl font-bold text-secondary mb-4">
              Join Our Journey
            </h3>
            <p className="text-secondary opacity-90 mb-8 text-lg">
              Be part of Nepal's leading automotive company. Explore career opportunities and grow with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact"
               className="px-8 py-4 bg-accent text-secondary rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
            >
                Contact Us
            </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
