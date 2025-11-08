import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';

function Home() {
  const { content, isLoading } = useContent();

  if (isLoading) return <LoadingSpinner name='eicher'/>;

  return (
    <section>
      <div class="bg-primary text-accent border-secondary p-4 rounded">
        Auto Show Info
        </div>
      <p>{content?.about_us?.title}</p>
    </section>
  );
}

export default Home;
