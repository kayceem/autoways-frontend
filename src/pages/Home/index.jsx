import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import HeroSection from '../../components/home/HeroSection';
import BullSection from '../../components/home/BullSection';
import BrandsSection from '../../components/home/BrandsSection';
import AboutSection from '../../components/home/AboutSection';
import CTASection from '../../components/home/CTA';
import PartnersSection from '../../components/home/PartnersSection';
import ClientsSection from '../../components/home/ClientsSection';

const Home = () => {
  const { content, isLoading } = useContent();

  // Show loading spinner while content is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <LoadingSpinner />
      </div>
    );
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
      {content.about_us && (
        <AboutSection 
          aboutData={{
            title: content.about_us.title || 'Welcome to Autoways',
            content: content.about_us.content || '',
            image: content.about_us.image || ''
          }} 
        />
      )}

      {/* Partners Section - Our trusted partners */}
      {content.partners && Object.keys(content.partners).length > 0 && (
        <PartnersSection partners={content.partners} />
      )}

      {/* Clients Section - Trusted by leading organizations */}
      {content.clients && Object.keys(content.clients).length > 0 && (
        <ClientsSection clients={content.clients} />
      )}

      {/* CTA Section - Get in touch */}
      {content.info && (
        <CTASection 
          contactInfo={{
            email: content.info.email || '',
            phone: content.info.phone || ''
          }} 
        />
      )}
    </main>
  );
};

export default Home;