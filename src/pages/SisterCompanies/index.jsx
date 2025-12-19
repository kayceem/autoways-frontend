import { useState } from 'react';
import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import WaveBackground from '../../components/common/WaveBackground';
import {
  CategoryFilter,
  CompaniesGrid,
  CTASection,
} from './components';

const SisterCompanies = () => {
  const { content, isLoading } = useContent();
  const [selectedCategory, setSelectedCategory] = useState('all');

  if (isLoading) return <LoadingSpinner />;
  if (!content || !content.sisterCompanies) {
        window.location.href = "/not-found";
        return null;
  }

// Get unique categories
    const companies = content?.sisterCompanies || [];
    const categories = ['all', ...new Set(companies.map(company => company.category))];
  // Filter companies by category
  const filteredCompanies = selectedCategory === 'all'
    ? companies
    : companies.filter(company => company.category === selectedCategory);
console.log(content);
  return (
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
  );
};

export default SisterCompanies;
