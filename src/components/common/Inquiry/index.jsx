import { useEffect, useMemo, useState } from 'react';
import { X } from 'lucide-react';
import { useSubmitContactForm } from '../../../hooks/useContactMutation';
import './index.css';
import handleError from '../../../utils/handleError';


const DownloadSpecsInquiryModal = ({
    isOpen,
    onClose,
    productName,
    onSuccess,
}) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+?[0-9\s\-()]{10,14}$/;
  
  const { mutate: submitContact, isPending } = useSubmitContactForm();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    isInquiry: true,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!isOpen) return;

    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: `Download Specifications ${productName || ''}`.trim(),
      isInquiry: true,
    });
    setErrors({});
  }, [isOpen, productName]);

//   Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  const validateForm = () => {
    const nextErrors = {};

    if (!formData.name.trim()) nextErrors.name = 'Name is required';
    if (!emailRegex.test(formData.email)) nextErrors.email = 'Enter a valid email';
    if (!phoneRegex.test(formData.phone)) nextErrors.phone = 'Enter a valid phone number';
    if (!formData.subject.trim()) nextErrors.subject = 'Subject is required';

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const isFormValid = useMemo(() => {
    return (
      formData.name.trim() &&
      emailRegex.test(formData.email) &&
      formData.subject.trim() &&
      phoneRegex.test(formData.phone)
    );
  }, [formData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      handleError('Please fill in all required fields correctly');
      return;
    }

    submitContact(formData, {
      onSuccess: () => {
        onSuccess?.({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
        });

        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          isInquiry: true,
        });
        setErrors({});
      },
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center px-4 overflow-y-auto"
      onClick={() => (!isPending ? onClose?.() : null)}
      aria-modal="true"
      role="dialog"
      style={{
        animation: 'fadeIn 0.2s ease-out',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <div
        className="w-full max-w-lg rounded-xl bg-primary border border-neutral-200 shadow-xl p-2 my-auto"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'slideUp 0.2s ease-out',
        }}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-neutral-200">
          <div>
            <h3 className="text-lg font-bold text-secondary">Download Specifications</h3>
            <p className="text-sm text-secondary/70">
              Please share your details to receive the spec sheet.
            </p>
          </div>

          <button
            type="button"
            className="p-2 rounded-md hover:bg-neutral-100 transition-all duration-200 hover:scale-110"
            onClick={() => (!isPending ? onClose?.() : null)}
            disabled={isPending}
            aria-label="Close"
          >
            <X size={18} className="text-secondary" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-5 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-secondary mb-1">Name</label>
            <input
              className="w-full rounded-lg border border-neutral-200 bg-white/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent transition-all duration-200 hover:border-neutral-300"
              style={{
                transition: 'all 0.2s ease',
              }}
              value={formData.name}
              onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
              placeholder="Ram Bahadur"
              autoComplete="name"
            />
            {errors.name && (
              <p 
                className="text-xs text-red-600 mt-1"
                style={{
                  animation: 'slideUp 0.2s ease-out',
                }}
              >
                {errors.name}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary mb-1">Email</label>
            <input
              className="w-full rounded-lg border border-neutral-200 bg-white/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent transition-all duration-200 hover:border-neutral-300"
              style={{
                transition: 'all 0.2s ease',
              }}
              value={formData.email}
              onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
              placeholder="ram@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <p 
                className="text-xs text-red-600 mt-1"
                style={{
                  animation: 'slideUp 0.2s ease-out',
                }}
              >
                {errors.email}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-semibold text-secondary mb-1">Phone</label>
            <input
              className="w-full rounded-lg border border-neutral-200 bg-white/70 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent transition-all duration-200 hover:border-neutral-300"
              style={{
                transition: 'all 0.2s ease',
              }}
              value={formData.phone}
              onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
              placeholder="+977 9812345678"
              autoComplete="tel"
            />
            {errors.phone && (
              <p 
                className="text-xs text-red-600 mt-1"
                style={{
                  animation: 'slideUp 0.2s ease-out',
                }}
              >
                {errors.phone}
              </p>
            )}
          </div>

          <input type="hidden" value={formData.subject} readOnly />

          <button
            type="submit"
            disabled={!isFormValid || isPending}
            className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm bg-accent text-secondary hover:bg-accent-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed hover:shadow-lg"
            style={{
              transform: 'scale(1)',
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              if (!isPending && isFormValid) {
                e.currentTarget.style.transform = 'scale(1.02)';
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
            }}
            onMouseDown={(e) => {
              if (!isPending && isFormValid) {
                e.currentTarget.style.transform = 'scale(0.98)';
              }
            }}
            onMouseUp={(e) => {
              if (!isPending && isFormValid) {
                e.currentTarget.style.transform = 'scale(1.02)';
              }
            }}
          >
            {isPending ? (
              <>
                <span 
                  className="inline-block w-4 h-4 border-2 border-secondary/30 border-t-secondary rounded-full"
                  style={{
                    animation: 'spin 0.6s linear infinite',
                  }}
                />
                Sending...
              </>
            ) : (
              'Send & Download'
            )}
          </button>

          <p className="text-xs text-gray-400">
            We'll use these details only for this inquiry.
          </p>
        </form>
      </div>
    </div>
  );
};

export default DownloadSpecsInquiryModal;