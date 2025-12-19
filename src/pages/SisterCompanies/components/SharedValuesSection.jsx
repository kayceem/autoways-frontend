const SharedValuesSection = ({ values }) => {
  if (!values || !values.items || values.items.length === 0) {
    return null;
  }

  return (
    <section className="py-8 lg:py-20 px-4 lg:px-6 bg-primary bg-opacity-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 lg:mb-12 animate-fade-in-up">
          <h2 className="font-bold text-2xl lg:text-4xl text-secondary mb-3 lg:mb-4">
            {values.title}
          </h2>
          <div className="w-16 lg:w-24 h-1 bg-accent mx-auto mb-4 lg:mb-6" />
          <p className="text-secondary opacity-80 max-w-3xl mx-auto text-sm lg:text-base">
            {values.description}
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-8">
          {values.items.map((value, index) => (
            <div
              key={value.id}
              className="bg-primary rounded-lg p-4 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 text-center animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-12 h-12 lg:w-16 lg:h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <span className="text-dark font-bold text-lg lg:text-2xl">{index + 1}</span>
              </div>
              <h3 className="text-lg lg:text-2xl font-bold text-secondary mb-2 lg:mb-3">
                {value.title}
              </h3>
              <p className="text-secondary opacity-80 leading-relaxed text-sm lg:text-base">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SharedValuesSection;
