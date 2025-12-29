import { useState } from 'react';
import { Mail, Phone, User, MessageSquare, Send } from 'lucide-react';
import { useSubmitContactForm } from '../../../hooks/useContactMutation';
import handleError from '../../../utils/handleError';

const ContactForm = ( { info = {} } ) => {
  const { subject: defaultSubject = '', isParts, isInquiry } = info;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: defaultSubject,
    message: '',
    isParts: isParts || false,
    isInquiry: isInquiry || false
  });
  const [errors, setErrors] = useState({});
  const { mutate: submitContact, isPending } = useSubmitContactForm();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\+?[0-9\s\-()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      handleError('Please fill in all required fields correctly');
      return;
    }

    submitContact(formData, {
      onSuccess: () => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          isParts: false,
          isInquiry: false
        });
        setErrors({});
      }
    });
  };

const isFormValid =
    formData.name.trim() &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
    formData.subject.trim() &&
    /^\+?[0-9\s\-()]{10,14}$/.test(formData.phone);

return (
    <div className="w-full max-w-2xl mx-auto p-4 lg:p-8">
        <div className="bg-white rounded-lg shadow-lg p-4 lg:p-8">
            <div className="mb-6 lg:mb-3 text-center">
                <h2 className="text-2xl lg:text-3xl font-bold text-secondary mb-2">Get in Touch</h2>
                <p className="text-sm lg:text-base text-neutral-600">Have a question? We'd love to hear from you.</p>
                {info.phone && <a className="text-sm lg:text-base text-neutral-400" href={`tel:${info.phone}`}>Call us at {info.phone}</a>}
            </div>

            <div className="mb-0.2 lg:mb-4">
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                {/* Name Field */}
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-secondary mb-2">
                        Full Name <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User size={18} className="text-neutral-400" />
                        </div>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                errors.name
                                    ? 'border-error focus:ring-error/20'
                                    : 'border-neutral-300 focus:border-secondary focus:ring-secondary/20'
                            }`}
                            placeholder="Ram Bahadur"
                        />
                    </div>
                    {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                        Email Address <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Mail size={18} className="text-neutral-400" />
                        </div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                errors.email
                                    ? 'border-error focus:ring-error/20'
                                    : 'border-neutral-300 focus:border-secondary focus:ring-secondary/20'
                            }`}
                            placeholder="ram@example.com"
                        />
                    </div>
                    {errors.email && <p className="mt-1 text-sm text-error">{errors.email}</p>}
                </div>

                {/* Phone Field */}
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-secondary mb-2">
                        Phone Number  <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone size={18} className="text-neutral-400" />
                        </div>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:border-secondary focus:ring-secondary/20 transition-colors"
                            placeholder="+977 9812345678"
                        />
                    </div>
                </div>

                {/* Subject Field */}
                <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-secondary mb-2">
                        Subject <span className="text-error">*</span>
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <MessageSquare size={18} className="text-neutral-400" />
                        </div>
                        <input
                            type="text"
                            id="subject"
                            name="subject"
                            value={formData.subject}
                            onChange={handleChange}
                            className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors ${
                                errors.subject
                                    ? 'border-error focus:ring-error/20'
                                    : 'border-neutral-300 focus:border-secondary focus:ring-secondary/20'
                            }`}
                            placeholder="How can we help you?"
                        />
                    </div>
                    {errors.subject && <p className="mt-1 text-sm text-error">{errors.subject}</p>}
                </div>

                {/* Message Field */}
                <div>
                    <label htmlFor="message" className="block text-sm font-medium text-secondary mb-2">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors resize-none ${
                            errors.message
                                ? 'border-error focus:ring-error/20'
                                : 'border-neutral-300 focus:border-secondary focus:ring-secondary/20'
                        }`}
                        placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && <p className="mt-1 text-sm text-error">{errors.message}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isPending || !isFormValid}
                    aria-disabled={isPending || !isFormValid}
                    className={`w-full bg-accent text-primary py-3 px-6 rounded-lg font-medium flex items-center justify-center ${
                        isPending || !isFormValid ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:bg-accent-2 transition-all duration-300 shadow-sm hover:shadow-lg hover:-translate-y-0.5'
                    }`}
                >
                    {isPending ? (
                        <>
                            <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                            <span className="ml-2">Sending...</span>
                        </>
                    ) : (
                        <>
                            <Send size={18} />
                            <span className="ml-2">Send Message</span>
                        </>
                    )}
                </button>
            </form>
        </div>
    </div>
);
};

export default ContactForm;
