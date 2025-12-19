const CTASection = () => {
  return (
    <section className="py-8 lg:py-20 px-4 lg:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 lg:p-12 text-center shadow-2xl">
          <h3 className="text-2xl lg:text-3xl font-bold text-secondary mb-3 lg:mb-4">
            Partner With Excellence
          </h3>
          <p className="text-secondary opacity-90 mb-6 lg:mb-8 text-base lg:text-lg">
            Explore collaboration opportunities with our family of companies across diverse industries
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-dark text-secondary rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
            >
              Get in Touch
            </a>
            <a
              href="/about"
              className="px-8 py-4 bg-accent text-dark rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg"
            >
              Learn More About Us
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
