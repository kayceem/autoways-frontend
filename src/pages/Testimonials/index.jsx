import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import WaveBackground from '../../components/common/WaveBackground';
import { useState } from 'react';

const Testimonials = () => {
  const { content, isLoading } = useContent();
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (isLoading) return <LoadingSpinner />;
  if (!content || !content.testimonials) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-2xl text-secondary">Failed to load testimonials</div>
      </div>
    );
  }

  const testimonials = content.testimonials;

  // Get unique categories
  const categories = ['All', ...new Set(testimonials.map(t => t.category))];

  // Filter testimonials by category
  const filteredTestimonials = selectedCategory === 'All'
    ? testimonials
    : testimonials.filter(t => t.category === selectedCategory);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const StarRating = ({ rating }) => {
    return (
      <div className="flex gap-1">
        {[...Array(5)].map((_, index) => (
          <svg
            key={index}
            className={`w-5 h-5 ${
              index < rating ? 'text-accent fill-current' : 'text-gray-600'
            }`}
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
          </svg>
        ))}
      </div>
    );
  };

  return (
    <main className="min-h-screen bg-dark relative">
      <WaveBackground />

      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="font-bold text-6xl text-secondary mb-4">Customer Testimonials</h1>
            <div className="w-24 h-1 bg-accent mx-auto mb-6" />
            <p className="text-xl text-secondary-bull opacity-80 max-w-3xl mx-auto">
              Hear what our valued customers have to say about their experience with Autoways
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="text-center p-6 bg-primary-bull rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-accent mb-2">10,000+</div>
              <div className="text-secondary-bull opacity-70">Happy Customers</div>
            </div>
            <div className="text-center p-6 bg-primary-bull rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-accent mb-2">15,000+</div>
              <div className="text-secondary-bull opacity-70">Vehicles Sold</div>
            </div>
            <div className="text-center p-6 bg-primary-bull rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-accent mb-2">4.9/5</div>
              <div className="text-secondary-bull opacity-70">Average Rating</div>
            </div>
            <div className="text-center p-6 bg-primary-bull rounded-lg shadow-lg">
              <div className="text-4xl font-bold text-accent mb-2">20+</div>
              <div className="text-secondary-bull opacity-70">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-accent text-dark shadow-lg scale-105'
                    : 'bg-primary-bull text-secondary hover:bg-opacity-80'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className="bg-primary-bull rounded-lg p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up relative"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Quote Icon */}
                <div className="absolute top-4 right-4 text-accent opacity-20">
                  <svg
                    className="w-12 h-12"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                  </svg>
                </div>

                {/* Rating */}
                <div className="mb-4">
                  <StarRating rating={testimonial.rating} />
                </div>

                {/* Category Badge */}
                <div className="mb-4">
                  <span className="bg-dark text-accent px-3 py-1 rounded-full text-sm font-semibold">
                    {testimonial.category}
                  </span>
                </div>

                {/* Testimonial Text */}
                <p className="text-secondary-bull opacity-90 leading-relaxed mb-6 relative z-10">
                  "{testimonial.text}"
                </p>

                {/* Customer Info */}
                <div className="border-t border-secondary-bull border-opacity-20 pt-4">
                  <div className="font-bold text-secondary text-lg mb-1">
                    {testimonial.name}
                  </div>
                  <div className="text-accent text-sm font-semibold mb-1">
                    {testimonial.position}
                  </div>
                  {testimonial.company && (
                    <div className="text-secondary-bull opacity-70 text-sm mb-2">
                      {testimonial.company}
                    </div>
                  )}
                  <div className="text-secondary-bull opacity-50 text-xs">
                    {formatDate(testimonial.date)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary-bull to-accent rounded-2xl p-12 text-center shadow-2xl">
            <h3 className="text-3xl font-bold text-secondary mb-4">
              Share Your Experience
            </h3>
            <p className="text-secondary-bull opacity-90 mb-8 text-lg">
              We'd love to hear about your journey with Autoways. Your feedback helps us serve you better.
            </p>
            <button className="px-8 py-4 bg-dark text-secondary rounded-lg font-semibold hover:bg-opacity-90 transition-all transform hover:scale-105 shadow-lg">
              Write a Review
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Testimonials;
