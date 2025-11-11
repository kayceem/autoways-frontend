import { Link } from 'react-router-dom';
import { Mail, Phone, MessageSquare } from 'lucide-react';

const CTASection = ({ contactInfo = {}, className = '' }) => {
  const { email = '', phone = '' } = contactInfo;

  return (
    <section className={`relative py-24 md:py-16 px-6 md:px-4 bg-primary overflow-hidden ${className}`}>
      {/* Background Decorative Elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl md:w-64 md:h-64" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-white/5 rounded-full blur-3xl md:w-64 md:h-64" />
      
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-16 md:h-16 bg-white/10 rounded-full mb-6 md:mb-4 backdrop-blur-sm">
            <MessageSquare className="w-10 h-10 md:w-8 md:h-8 text-white" />
          </div>

          {/* Heading */}
          <h2 className="text-5xl md:text-3xl font-bold text-white mb-4 md:mb-3 leading-tight text-secondary">
            Ready to Find Your Dream Car?
          </h2>

          {/* Subheading */}
          <p className="text-xl md:text-lg text-white/90 mb-10 md:mb-8 max-w-2xl mx-auto text-secondary">
            Get in touch with our expert team today. We're here to help you every step of the way.
          </p>

          {/* CTA Buttons */}
          <div className="flex justify-center gap-4 md:flex-col md:gap-3 mb-12 md:mb-8">
            <Link
              to="/contact"
              className="bg-white text-secondary px-10 py-4 md:px-8 md:py-3 rounded-full font-semibold text-lg md:text-base hover:bg-white/90 transition-all duration-300 transform hover:scale-105 shadow-xl inline-flex items-center justify-center gap-2"
            >
              <Mail className="w-5 h-5" />
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