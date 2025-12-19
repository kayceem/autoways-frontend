const HeroSection = ({ hero }) => {
  return (
    <section className="relative py-8 lg:py-20 px-4 lg:px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 lg:mb-12 animate-fade-in-up">
          <h1 className="font-bold text-3xl lg:text-6xl text-secondary mb-3 lg:mb-4">
            {hero.title}
          </h1>
          <div className="w-16 lg:w-24 h-1 bg-accent mx-auto mb-4 lg:mb-6" />
          <p className="text-lg lg:text-2xl text-accent opacity-90 mb-3 lg:mb-4">
            {hero.subtitle}
          </p>
          <p className="text-sm lg:text-lg text-secondary opacity-80 max-w-4xl mx-auto">
            {hero.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
