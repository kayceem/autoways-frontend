import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import WaveBackground from '../../components/common/WaveBackground';
import { assetUrl } from '../../utils';
import { Link} from 'react-router-dom';

const CSR = () => {
  const { content, isLoading } = useContent();

  if (isLoading) return <LoadingSpinner />;
  console.log(content)
  if (!content || !content.csr) {
    window.location.href = "/not-found";
    return null;
  }

  const { hero: heroData, initiatives} = content.csr;
  const hero = heroData?.length !== 0 ?  heroData[0] : [];

  return (
    <main className="min-h-screen bg-dark relative">
      <WaveBackground />

      {/* Hero Section */}
      <section className="relative py-8 lg:py-20 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12 items-center">
            <div className="animate-fade-in-up">
              <h1 className="font-bold text-3xl lg:text-6xl text-secondary mb-3 lg:mb-4">{hero.title}</h1>
              <div className="w-16 lg:w-24 h-1 bg-accent mb-4 lg:mb-6" />
              <p className="text-lg lg:text-2xl text-accent mb-4 lg:mb-6 font-semibold">
                {hero.subtitle}
              </p>
              <p className="text-secondary opacity-80 leading-relaxed text-sm lg:text-lg">
                {hero.description}
              </p>
            </div>
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <img
                src={assetUrl(hero.image)}
                alt="CSR Hero"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-8 lg:py-12 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 lg:gap-6">
            <div className="text-center p-4 lg:p-6 bg-primary rounded-lg shadow-lg animate-fade-in-up">
              <div className="text-2xl lg:text-4xl font-bold text-accent mb-2">{hero.stats.yearsActive}</div>
              <div className="text-secondary opacity-70 text-xs lg:text-sm">Years Active</div>
            </div>
            <div className="text-center p-4 lg:p-6 bg-primary rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-2xl lg:text-4xl font-bold text-accent mb-2">{hero.stats.beneficiaries}</div>
              <div className="text-secondary opacity-70 text-xs lg:text-sm">Beneficiaries</div>
            </div>
            <div className="text-center p-4 lg:p-6 bg-primary rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-2xl lg:text-4xl font-bold text-accent mb-2">{hero.stats.initiatives}</div>
              <div className="text-secondary opacity-70 text-xs lg:text-sm">Initiatives</div>
            </div>
            <div className="text-center p-4 lg:p-6 bg-primary rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-2xl lg:text-4xl font-bold text-accent mb-2">{hero.stats.partnersCount}</div>
              <div className="text-secondary opacity-70 text-xs lg:text-sm">Partners</div>
            </div>
            <div className="text-center p-4 lg:p-6 bg-primary rounded-lg shadow-lg animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <div className="text-2xl lg:text-4xl font-bold text-accent mb-2">{hero.stats.investment}</div>
              <div className="text-secondary opacity-70 text-xs lg:text-sm">CSR Investment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Initiatives Section */}
      <section className="py-8 lg:py-20 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 lg:mb-12 animate-fade-in-up">
            <h2 className="font-bold text-2xl lg:text-4xl text-secondary mb-3 lg:mb-4">Our CSR Initiatives</h2>
            <div className="w-16 lg:w-24 h-1 bg-accent mx-auto mb-4 lg:mb-6" />
            <p className="text-secondary opacity-80 max-w-2xl mx-auto text-sm lg:text-base">
              Making a meaningful difference through focused social responsibility programs
            </p>
          </div>

          <div className="grid gap-4 lg:gap-8">
            {initiatives.map((initiative, index) => (
              <div
                key={initiative.initiativeId}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8 items-center animate-fade-in-up ${
                  index % 2 !== 0 ? 'lg:flex-row-reverse' : ''
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={index % 2 !== 0 ? 'lg:order-2' : ''}>
                  <div className="relative rounded-2xl overflow-hidden shadow-2xl h-[300px] lg:h-[400px] group">
                    <img
                      src={assetUrl(initiative.image)}
                      alt={`${initiative.title}`}
                      className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent" />

                    {/* Impact Badge */}
                    <div className="absolute top-4 lg:top-6 right-4 lg:right-6 bg-accent text-dark px-4 lg:px-6 py-3 lg:py-4 rounded-xl shadow-lg">
                      <div className="text-2xl lg:text-3xl font-bold">{initiative.impact.metric}</div>
                      <div className="text-xs lg:text-sm font-semibold">{initiative.impact.label}</div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute bottom-4 lg:bottom-6 left-4 lg:left-6">
                      <span className="bg-primary text-accent px-3 lg:px-4 py-1 lg:py-2 rounded-full font-semibold text-xs lg:text-sm">
                        {initiative.category}
                      </span>
                    </div>
                  </div>
                </div>

                <div className={index % 2 !== 0 ? 'lg:order-1' : ''}>
                  <h3 className="text-2xl lg:text-3xl font-bold text-secondary mb-3 lg:mb-4">
                    {initiative.title}
                  </h3>
                  <p className="text-secondary opacity-80 leading-relaxed text-sm lg:text-lg mb-4 lg:mb-6">
                    {initiative.description}
                  </p>

                  <div className="bg-primary rounded-lg p-4 lg:p-6">
                    <h4 className="text-xl font-bold text-accent mb-4">Key Activities:</h4>
                    <ul className="space-y-3">
                      {initiative.activities.map((activity, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-secondary opacity-80">
                          <svg className="w-5 h-5 text-accent mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <span>{activity}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commitment Section */}
      {/* <section className="py-20 px-6 bg-primary bg-opacity-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-bold text-4xl text-secondary mb-4">{commitment.title}</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
          </div>

          <div className="bg-primary rounded-2xl p-8 md:p-12 shadow-2xl animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-secondary opacity-80 leading-relaxed text-lg mb-8">
              {commitment.content}
            </p>

            <div className="bg-dark/50 rounded-xl p-8 border-l-4 border-accent">
              <p className="text-secondary text-xl italic mb-4">
                "{commitment.quote}"
              </p>
              <p className="text-accent font-semibold">
                - {commitment.author}
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Partners Section */}
      {/* <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 animate-fade-in-up">
            <h2 className="font-bold text-4xl text-secondary mb-4">Our CSR Partners</h2>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-secondary opacity-80 max-w-2xl mx-auto">
              Collaborating with organizations to amplify our social impact
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {partners.map((partner, index) => (
              <div
                key={partner.id}
                className="bg-primary rounded-lg p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="h-32 flex items-center justify-center mb-4 bg-secondary rounded-lg p-4">
                  <img
                    src={assetUrl(partner.logo)}
                    alt={partner.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <h3 className="text-xl font-bold text-secondary mb-2">{partner.name}</h3>
                <div className="text-accent font-semibold text-sm mb-3">{partner.type}</div>
                <p className="text-secondary opacity-80 text-sm leading-relaxed">
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-8 lg:py-20 px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 lg:p-12 text-center shadow-2xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-secondary mb-3 lg:mb-4">
              Partner With Us
            </h3>
            <p className="text-secondary opacity-90 mb-6 lg:mb-8 text-base lg:text-lg">
              Join us in making a positive difference. Together we can create lasting impact in communities across Nepal.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
                to={"/contact"}
                className={"px-8 py-4 bg-dark text-secondary rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"}
            >
                Become a Partner
            </Link>
              <button className="px-8 py-4 bg-accent text-dark rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CSR;
