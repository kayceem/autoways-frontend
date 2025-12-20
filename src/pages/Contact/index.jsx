import ContactForm from '../../components/common/ContactForm';
import { useLocation } from 'react-router-dom';

const Contact = () =>  {
  const { state } = useLocation();
  const info = state || {};

  return (
    <section className="min-h-screen bg-neutral-100">
      <div className="py-8 lg:py-12">
        <ContactForm info={info} />
      </div>
    </section>
  );
}

export default Contact;
