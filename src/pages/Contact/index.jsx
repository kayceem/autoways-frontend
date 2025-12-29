import ContactForm from '../../components/common/ContactForm';
import { useLocation } from 'react-router-dom';
import { useContent } from "../../context/globalContext";

const Contact = () =>  {
  const { state } = useLocation();
  const { content } = useContent();
  const info = {...state, phone: content?.contactInfo?.[0]?.phone} || {};
  console.log(content);
  return (
    <section className="min-h-screen bg-neutral-100">
      <div className="py-8 lg:py-12">
        <ContactForm info={info} />
      </div>
    </section>
  );
}

export default Contact;
