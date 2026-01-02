import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import HeroSection from '../../components/home/HeroSection';
import BullSection from '../../components/home/BullSection';
import BrandsSection from '../../components/home/BrandsSection';
import AboutSection from '../../components/home/AboutSection';
import CTASection from '../../components/home/CTA';
import SisterCompaniesSection from '../../components/home/SisterCompaniesSection';
import ClientsSection from '../../components/home/ClientsSection';
import SEO from '../../components/common/SEO';
import StructuredData from '../../components/common/StructuredData';
import seoConfig from '../../config/seoConfig';

const Home = () => {
  const { content, isLoading } = useContent();
  // Show loading spinner while content is being fetched
  if (isLoading) {
    return <LoadingSpinner />
 }

  // Handle case where content might not be available
  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <p className="text-secondary text-lg">Unable to load content. Please try again later.</p>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Premium Automotive Solutions"
        description="Autoways is the leading distributor of Bull machines in Nepal and dealer for Toyota, Eicher, Komatsu, Dongfeng, XCMG, and Ather. Discover trucks, buses, construction equipment, and electric vehicles."
        url="/"
        type="website"
      />
      <StructuredData schema={seoConfig.organization} />
      <main className="min-h-screen">
        {/* Hero Section - Full-screen carousel */}
        {content.heroImages && content.heroImages.length > 0 && (
          <HeroSection heroImages={content.heroImages} />
        )}

        {/* Bull Section - Power and reliability showcase */}
        <BullSection />

        {/* Brands Section - Featured automotive brands */}
        {content.brands && Object.keys(content.brands).length > 0 && (
          <BrandsSection brands={content.brands} />
        )}

        {/* About Section - Welcome to Autoways */}
        {content.aboutUs?.length !== 0 && (
          <AboutSection
            aboutData={{
              title: content.aboutUs?.[0]?.title || 'Welcome to Autoways',
              content: content.aboutUs?.[0]?.content || '',
              image: content.aboutUs?.[0]?.image || ''
            }}
          />
        )}

        {/* Sister Companies Section - Our sister companies */}
        {content.sisterCompanies && Object.keys(content.sisterCompanies).length > 0 && (
          <SisterCompaniesSection sisterCompaniesArray={content.sisterCompanies} />
        )}

        {/* Clients Section - Trusted by leading organizations */}
        {content.clients && content.clients.length > 0 && (
          <ClientsSection clients={content.clients} stats={content.aboutUs?.[0]?.stats || {}} />
        )}

        {/* CTA Section - Get in touch */}
        {content.contactInfo && (
          <CTASection
            contactInfo={{
              email: content?.contactInfo?.[0]?.email || '',
              phone: content?.contactInfo?.[0]?.phone || ''
            }}
          />
        )}
      </main>
    </>
  );
};

export default Home;
