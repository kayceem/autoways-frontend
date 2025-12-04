import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import WaveBackground from '../../components/common/WaveBackground';

const AboutUs = () => {
  const { content, isLoading } = useContent();

  if (isLoading) return <LoadingSpinner />;
  if (!content || !content.about_us_detailed) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-secondary">Failed to load about us content</div>
      </div>
    );
  }

  const { mission, vision, values, milestones, team, stats } = content.about_us_detailed;
  const aboutUs = content.about_us;

  return (
    <main className="min-h-screen bg-dark relative">
      <WaveBackground />

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="font-bold text-6xl text-secondary mb-4">About Autoways</h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-xl text-secondary-bull opacity-80 max-w-3xl mx-auto">
              Driving Nepal's automotive excellence since 2002
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            <div className="text-center p-6 bg-primary-bull rounded-lg shadow-lg animate-fade-in-up">
              <div className="text-4xl font-bold text-accent mb-2">{stats.yearsOfExperience}</div>
              <div className="text-secondary-bull opacity-70 text-sm">Years Experience</div>
            </div>
            <div className="text-center p-6 bg-primary-bull rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold text-accent mb-2">{stats.happyCustomers}</div>
              <div className="text-secondary-bull opacity-70 text-sm">Happy Customers</div>
            </div>
            <div className="text-center p-6 bg-primary-bull rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold text-accent mb-2">{stats.vehiclesSold}</div>
              <div className="text-secondary-bull opacity-70 text-sm">Vehicles Sold</div>
            </div>
            <div className="text-center p-6 bg-primary-bull rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold text-accent mb-2">{stats.serviceCenters}</div>
              <div className="text-secondary-bull opacity-70 text-sm">Service Centers</div>
            </div>
            <div className="text-center p-6 bg-primary-bull rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-4xl font-bold text-accent mb-2">{stats.brands}</div>
              <div className="text-secondary-bull opacity-70 text-sm">Global Brands</div>
            </div>
            <div className="text-center p-6 bg-primary-bull rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
              <div className="text-4xl font-bold text-accent mb-2">{stats.employees}</div>
              <div className="text-secondary-bull opacity-70 text-sm">Team Members</div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Story */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-up">
              <img
                src={aboutUs.image}
                alt="Autoways"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h2 className="text-4xl font-bold text-secondary mb-6">{aboutUs.title}</h2>
              <div className="w-24 h-1 bg-accent mb-6" />
              <p className="text-secondary-bull opacity-80 leading-relaxed text-lg whitespace-pre-line">
                {aboutUs.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-primary-bull bg-opacity-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-primary-bull rounded-lg p-8 shadow-lg animate-fade-in-up">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-secondary">{mission.title}</h3>
              </div>
              <p className="text-secondary-bull opacity-80 leading-relaxed text-lg">
                {mission.content}
              </p>
            </div>
            <div className="bg-primary-bull rounded-lg p-8 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center">
                  <svg className="w-8 h-8 text-dark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="text-3xl font-bold text-secondary">{vision.title}</h3>
              </div>
              <p className="text-secondary-bull opacity-80 leading-relaxed text-lg">
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
            <p className="text-secondary-bull opacity-80 max-w-2xl mx-auto">
              The principles that guide our decisions and define our culture
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div
                key={value.id}
                className="bg-primary-bull rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center mb-4">
                  <span className="text-dark font-bold text-xl">{index + 1}</span>
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-3">{value.title}</h3>
                <p className="text-secondary-bull opacity-80 leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline - Milestones */}
      <section className="py-20 px-6 bg-primary-bull bg-opacity-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-bold text-4xl text-secondary mb-4">Our Journey</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-secondary-bull opacity-80 max-w-2xl mx-auto">
              Key milestones in our journey of excellence and growth
            </p>
          </div>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-accent opacity-30 hidden md:block" />

            {milestones.map((milestone, index) => (
              <div
                key={index}
                className={`relative mb-12 animate-fade-in-up ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? '' : 'md:ml-12'}`}>
                  <div className="bg-primary-bull rounded-lg p-6 shadow-lg">
                    <div className="inline-block bg-accent text-dark px-4 py-2 rounded-full font-bold text-lg mb-3">
                      {milestone.year}
                    </div>
                    <h3 className="text-2xl font-bold text-secondary mb-2">
                      {milestone.title}
                    </h3>
                    <p className="text-secondary-bull opacity-80">
                      {milestone.description}
                    </p>
                  </div>
                </div>
                {/* Timeline Dot */}
                <div className="absolute left-1/2 top-6 transform -translate-x-1/2 w-4 h-4 bg-accent rounded-full border-4 border-dark hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-bold text-4xl text-secondary mb-4">{team.title}</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-secondary-bull opacity-80 max-w-3xl mx-auto">
              {team.description}
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.members.map((member, index) => (
              <div
                key={member.id}
                className="bg-primary-bull rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-48 bg-gradient-to-br from-accent to-primary-bull flex items-center justify-center">
                  <div className="w-32 h-32 bg-dark rounded-full flex items-center justify-center">
                    <svg className="w-16 h-16 text-accent" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-secondary mb-2">{member.name}</h3>
                  <div className="text-accent font-semibold mb-3">{member.position}</div>
                  <p className="text-secondary-bull opacity-80 text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-bull to-accent rounded-2xl p-12 text-center shadow-2xl">
            <h3 className="text-3xl font-bold text-secondary mb-4">
              Join Our Journey
            </h3>
            <p className="text-secondary-bull opacity-90 mb-8 text-lg">
              Be part of Nepal's leading automotive company. Explore career opportunities and grow with us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-dark text-secondary rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg">
                View Careers
              </button>
              <button className="px-8 py-4 bg-secondary text-dark rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutUs;
