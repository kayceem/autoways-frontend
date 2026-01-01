import { useContent } from '../../src/context/globalContext';
import LoadingSpinner from '../../src/components/common/Loading';
import HeroSection from '../../src/components/home/HeroSection';
import BullSection from '../../src/components/home/BullSection';
import BrandsSection from '../../src/components/home/BrandsSection';
import AboutSection from '../../src/components/home/AboutSection';
import CTASection from '../../src/components/home/CTA';
import PartnersSection from '../../src/components/home/PartnersSection';
import ClientsSection from '../../src/components/home/ClientsSection';

export default function Page() {
  const { content, isLoading } = useContent();

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (!content) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-primary">
        <p className="text-secondary text-lg">Unable to load content. Please try again later.</p>
      </div>
    );
  }

  return (
    <main className="min-h-screen">
      {content.heroImages && content.heroImages.length > 0 && (
        <HeroSection heroImages={content.heroImages} />
      )}

      <BullSection />

      {content.brands && Object.keys(content.brands).length > 0 && (
        <BrandsSection brands={content.brands} />
      )}

      {content.aboutUs?.length !== 0 && (
        <AboutSection
          aboutData={{
            title: content.aboutUs?.[0]?.title || 'Welcome to Autoways',
            content: content.aboutUs?.[0]?.content || '',
            image: content.aboutUs?.[0]?.image || ''
          }}
        />
      )}

      {content.sisterCompanies && Object.keys(content.sisterCompanies).length > 0 && (
        <PartnersSection partnersArray={content.sisterCompanies} />
      )}

      {content.clients && content.brands.length > 0 && (
        <ClientsSection clients={content.brands} stats={content.aboutUs?.[0]?.stats || {}} />
      )}

      {content.contactInfo && (
        <CTASection
          contactInfo={{
            email: content?.contactInfo?.[0]?.email || '',
            phone: content?.contactInfo?.[0]?.phone || ''
          }}
        />
      )}
    </main>
  );
}
