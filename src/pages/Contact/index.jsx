import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import Header from '../../components/common/Header';

function Contact() {
  const { content, isLoading } = useContent();

  if (isLoading) return <LoadingSpinner name='eicher'/>;

  return (
    <section>
        <Header />
      <p>{content?.about_us?.content}</p>
    </section>
  );
}

export default Contact;
