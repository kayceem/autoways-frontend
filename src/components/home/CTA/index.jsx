import { Link } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';

const CTASection = ({ contactInfo = {}, className = '' }) => {
  const { email = '', phone = '' } = contactInfo;

  return (
    <section className={`relative py-12 lg:py-24 px-4 lg:px-6 bg-primary overflow-hidden ${className}`}>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-64 h-64 lg:w-96 lg:h-96 bg-white/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-64 h-64 lg:w-96 lg:h-96 bg-white/5 rounded-full blur-3xl" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 lg:w-20 lg:h-20 bg-white/10 rounded-full mb-4 lg:mb-6 backdrop-blur-sm">
            <MessageSquare className="w-8 h-8 lg:w-10 lg:h-10 text-primary" />
          </div>

          {/* Heading */}
          <h2 className="text-2xl lg:text-5xl font-bold text-white mb-3 lg:mb-4 leading-tight text-secondary px-4">
            Ready to Find Your Perfect Drive?
          </h2>

          {/* Subheading */}
          <p className="text-sm lg:text-xl text-white/90 mb-8 lg:mb-10 max-w-2xl mx-auto text-secondary px-4">
            Get in touch with our expert team today. We're here to help you every step of the way.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-3 lg:gap-4 mb-8 lg:mb-12">
            <Link
              to="/contact"
              className="bg-white text-secondary px-6 py-3 lg:px-10 lg:py-4 rounded-full font-semibold text-sm lg:text-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2"
            >
              Contact Us
            </Link>
          </div>

          {/* Contact Info
          {(email || phone) && (
            <div className="flex justify-center gap-8 md:flex-col md:gap-4 md:items-center">
              {phone && (
                <a
                  href={`tel:${phone}`}
                  className="flex items-center gap-3 text-secondary/90 hover:text-white transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300">
                    <Phone className="w-5 h-5 md:w-4 md:h-4" />
                  </div>
                  <div className="text-left md:text-center">
                    <div className="text-sm text-secondary/70 font-medium">Call Us</div>
                    <div className="text-lg md:text-base font-semibold">{phone}</div>
                  </div>
                </a>
              )}

              {email && (
                <a
                  href={`mailto:${email}`}
                  className="flex items-center gap-3 text-secondary/90 hover:text-white transition-colors duration-300 group"
                >
                  <div className="w-12 h-12 md:w-10 md:h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm group-hover:bg-white/20 transition-all duration-300">
                    <Mail className="w-5 h-5 md:w-4 md:h-4" />
                  </div>
                  <div className="text-left md:text-center">
                    <div className="text-sm text-white/70 font-medium">Email Us</div>
                    <div className="text-lg md:text-base font-semibold">{email}</div>
                  </div>
                </a>
              )}
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default CTASection;