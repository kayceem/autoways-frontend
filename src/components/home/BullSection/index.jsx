const BullSection = ({ className = '' }) => {
  return (
    <section className={`relative py-24 bg-primary overflow-hidden ${className}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* Left Side - Bull Image */}
          <div className="relative flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">
              {/* Main Bull Image Container */}
              <div className="relative aspect-square">
                <img
                  src="/images/bull.png"
                  alt="Bull representing strength and power"
                  className="w-full h-full object-contain drop-shadow-2xl"
                />

                {/* Decorative Accent Glow */}
                <div className="absolute inset-0 bg-accent/20 rounded-full blur-3xl -z-10" />
              </div>
            </div>
          </div>

          {/* Right Side - Promotional Content */}
          <div className="relative text-center lg:text-left">
            {/* Decorative Line */}
            <div className="hidden lg:block absolute -left-4 top-0 w-1 h-20 bg-accent" />

            <div className="max-w-xl mx-auto lg:mx-0">
              {/* Label */}
              <div className="inline-block mb-4">
                <span className="text-accent font-semibold text-sm uppercase tracking-widest">
                  Power & Reliability
                </span>
              </div>

              {/* Main Heading */}
              <h2 className="text-5xl lg:text-6xl font-bold text-secondary mb-6 leading-tight">
                Built Like a Bull
              </h2>

              {/* Description */}
              <p className="text-lg text-secondary/80 leading-relaxed mb-8">
                Experience the unwavering strength and reliability that drives your journey forward.
                Our commitment to excellence ensures you get the power and performance you deserve.
              </p>

              {/* Feature Points */}
              <div className="flex flex-col gap-4">
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-secondary font-medium">Unmatched Strength</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-secondary font-medium">Trusted Performance</span>
                </div>
                <div className="flex items-center gap-3 justify-center lg:justify-start">
                  <div className="w-2 h-2 bg-accent rounded-full" />
                  <span className="text-secondary font-medium">Built to Last</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Background Decorative Elements */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-accent/10 rounded-full blur-3xl -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
    </section>
  );
};

export default BullSection;
