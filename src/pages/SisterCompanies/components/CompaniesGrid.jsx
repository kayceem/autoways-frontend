import CompanyCard from './CompanyCard';

const CompaniesGrid = ({ companies }) => {
  return (
    <section className="py-8 lg:py-12 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
          {companies.map((company, index) => (
            <CompanyCard key={index} company={company} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CompaniesGrid;
