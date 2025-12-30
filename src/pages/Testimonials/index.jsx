import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import WaveBackground from '../../components/common/WaveBackground';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { capitalizeWords, assetUrl } from '../../utils';

const Testimonials = () => {
  const { content, isLoading } = useContent();
  const [selectedCategory, setSelectedCategory] = useState('text');

  if (isLoading) return <LoadingSpinner />;
  if (!content || !content.testimonials) {
    return <Navigate to="/not-found" replace />;
  }

  const testimonials = content.testimonials;
  const aboutUs = content?.aboutUs?.[0] || {};
  const { stats = { yearsOfExperience: 0, happyCustomers: 0, vehiclesSold: 0, serviceCenters: 0, brands: 0, employees: 0 }} = aboutUs;

  const categories = [...new Set(testimonials.map(t => t.category))];

  const categoryMap = {
    video: 'Videos',
    text: 'Reviews',
  };
  const filteredTestimonials = testimonials.filter(t => t.category === selectedCategory);

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
      <WaveBackground height={20}/>

      {/* Hero Section */}
      <section className="relative py-8 lg:py-20 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 lg:mb-16 animate-fade-in-up">
            <h1 className="font-bold text-3xl lg:text-6xl text-secondary mb-3 lg:mb-4">Customer Testimonials</h1>
            <div className="w-16 lg:w-24 h-1 bg-accent mx-auto mb-4 lg:mb-6" />
            <p className="text-base lg:text-xl text-secondary opacity-80 max-w-3xl mx-auto">
              Hear what our valued customers have to say about their experience with Autoways
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mt-8 lg:mt-12">
            <div className="text-center p-4 lg:p-6 bg-primary rounded-lg shadow-lg">
              <div className="text-2xl lg:text-4xl font-bold text-accent mb-2">{stats.happyCustomers}</div>
              <div className="text-secondary opacity-70 text-xs lg:text-base">Happy Customers</div>
            </div>
            <div className="text-center p-4 lg:p-6 bg-primary rounded-lg shadow-lg">
              <div className="text-2xl lg:text-4xl font-bold text-accent mb-2">{stats.vehiclesSold}</div>
              <div className="text-secondary opacity-70 text-xs lg:text-base">Vehicles Sold</div>
            </div>
            <div className="text-center p-4 lg:p-6 bg-primary rounded-lg shadow-lg">
              <div className="text-2xl lg:text-4xl font-bold text-accent mb-2">4.9/5</div>
              <div className="text-secondary opacity-70 text-xs lg:text-base">Average Rating</div>
            </div>
            <div className="text-center p-4 lg:p-6 bg-primary rounded-lg shadow-lg">
              <div className="text-2xl lg:text-4xl font-bold text-accent mb-2">{stats.yearsOfExperience}</div>
              <div className="text-secondary opacity-70 text-xs lg:text-base">Years Experience</div>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-4 lg:py-8 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 lg:px-6 py-2 rounded-full font-semibold transition-all duration-300 text-sm lg:text-base ${
                  selectedCategory === category
                    ? 'bg-accent text-dark shadow-lg scale-105'
                    : 'bg-primary text-secondary hover:bg-opacity-80'
                }`}
              >
                {categoryMap[category] || capitalizeWords(category)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-8 lg:py-12 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
            {filteredTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-primary rounded-lg p-4 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up relative"
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
                    {categoryMap[testimonial.category] || capitalizeWords(testimonial.category)}
                  </span>
                </div>

                {/* Testimonial Text */}
                <p className="text-secondary opacity-90 leading-relaxed text-justify mb-6 relative z-10 h-48 lg:h-56 overflow-hidden">
                  "{testimonial.text}"
                </p>

                {/* Customer Info */}
                <div className="border-t border-secondary border-opacity-20 pt-4">
                  <div className="font-bold text-secondary flex items-center justify-between text-lg mb-1">
                    {testimonial.name}
                  {testimonial.image && (
                      <img
                        src={assetUrl(testimonial.image)}
                        alt={`${testimonial.name}'s photo`}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                )}
                  </div>
                  <div className="text-accent text-sm font-semibold mb-1">
                    {testimonial.position}
                  </div>
                  {testimonial.company && (
                    <div className="text-secondary opacity-70 text-sm mb-2">
                      {testimonial.company}
                    </div>
                  )}
                  <div className="text-secondary opacity-50 text-xs">
                    {formatDate(testimonial.date)}
                  </div>
                  {/* customer image in circular frame */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-8 lg:py-20 px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 lg:p-12 text-center shadow-2xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-secondary mb-3 lg:mb-4">
              Share Your Experience
            </h3>
            <p className="text-secondary opacity-90 mb-6 lg:mb-8 text-base lg:text-lg">
              We'd love to hear about your journey with Autoways. Your feedback helps us serve you better.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Testimonials;
