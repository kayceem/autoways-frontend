import { useState } from 'react';
import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import WaveBackground from '../../components/common/WaveBackground';
import {
  CategoryFilter,
  CompaniesGrid,
  CTASection,
} from './components';
import { Navigate } from 'react-router-dom';
import SEO from '../../components/common/SEO';

const SisterCompanies = () => {
  const { content, isLoading } = useContent();
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (isLoading) return <LoadingSpinner />;
  if (!content || !content.sisterCompanies) {
    return <Navigate to="/not-found" replace />;
  }

// Get unique categories
    const companies = content?.sisterCompanies || [];
    const categories = ['all', ...new Set(companies.map(company => company.category))];
  // Filter companies by category
  const filteredCompanies = selectedCategory === 'all'
    ? companies
    : companies.filter(company => company.category === selectedCategory);
  return (
    <>
      <SEO
        title="Sister Companies | Autoways Group"
        description="Explore Autoways' sister companies and partner businesses. Discover our diverse portfolio spanning automotive, logistics, construction equipment, and more across Nepal."
        keywords="autoways sister companies, autoways group, autoways partners, autoways nepal businesses"
        url="/sister-companies"
        type="website"
      />
      <main className="min-h-screen bg-dark relative">
        <WaveBackground />
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
        <CompaniesGrid companies={filteredCompanies} />
        <CTASection />
      </main>
    </>
  );
};

export default SisterCompanies;
