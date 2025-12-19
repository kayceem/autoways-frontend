import { useState } from 'react';
import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import WaveBackground from '../../components/common/WaveBackground';
import {
  HeroSection,
  CategoryFilter,
  CompaniesGrid,
  SharedValuesSection,
  CTASection,
} from './components';

const SisterCompanies = () => {
  const { content, isLoading } = useContent();
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (isLoading) return <LoadingSpinner />;
  if (!content || !content.sister_companies) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-secondary">Failed to load sister companies content</div>
      </div>
    );
  }

  const { hero, companies, values } = content.sister_companies;

  // Get unique categories
  const categories = ['all', ...new Set(companies.map(company => company.category))];

  // Filter companies by category
  const filteredCompanies = selectedCategory === 'all'
    ? companies
    : companies.filter(company => company.category === selectedCategory);

  return (
    <main className="min-h-screen bg-dark relative">
      <WaveBackground />
      <HeroSection hero={hero} />
      <CategoryFilter
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      <CompaniesGrid companies={filteredCompanies} />
      <SharedValuesSection values={values} />
      <CTASection />
    </main>
  );
};

export default SisterCompanies;
