import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import Header from '../../components/common/Header';
import ContactForm from '../../components/common/ContactForm';

function Contact() {
  const { content, isLoading } = useContent();

  if (isLoading) return <LoadingSpinner name='eicher'/>;

  return (
    <section className="min-h-screen bg-neutral-100">
      <Header />
      <div className="py-12">
        <ContactForm />
      </div>
    </section>
  );
}

export default Contact;
