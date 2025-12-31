import ContactForm from '../../components/common/ContactForm';
import { useLocation } from 'react-router-dom';
import { useContent } from "../../context/globalContext";
import SEO from '../../components/common/SEO';
import StructuredData from '../../components/common/StructuredData';
import { generateLocalBusinessSchema } from '../../utils/seoHelpers';

const Contact = () =>  {
  const { state } = useLocation();
  const { content } = useContent();
  const info = {...state, phone: content?.contactInfo?.[0]?.phone} || {};
  const contactInfo = content?.contactInfo?.[0];

  const localBusinessSchema = generateLocalBusinessSchema({
    name: 'Autoways Pvt. Ltd.',
    address: contactInfo?.address || 'Kathmandu, Nepal',
    phone: contactInfo?.phone,
  });

  return (
    <>
      <SEO
        title="Contact Us | Get in Touch"
        description="Contact Autoways for inquiries about Bull machines, Toyota vehicles, construction equipment, and automotive services in Nepal. Call us or fill out our contact form."
        keywords="contact autoways, autoways phone, autoways nepal address, automotive inquiry nepal"
        url="/contact"
        type="website"
      />
      {localBusinessSchema && <StructuredData schema={localBusinessSchema} />}
      <section className="min-h-screen bg-neutral-100">
        <div className="py-8 lg:py-12">
          <ContactForm info={info} />
        </div>
      </section>
    </>
  );
}

export default Contact;
