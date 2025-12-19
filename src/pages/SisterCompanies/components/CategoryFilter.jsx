const CategoryFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <section className="py-4 lg:py-8 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-center gap-3 lg:gap-4 mb-6 lg:mb-8">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => onCategoryChange(category)}
              className={`px-4 lg:px-6 py-2 lg:py-3 rounded-full font-semibold text-sm lg:text-base transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-accent text-dark scale-105 shadow-lg'
                  : 'bg-primary text-secondary hover:bg-accent hover:text-dark'
              }`}
            >
              {category === 'all' ? 'All Companies' : category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFilter;
