import { useContent } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import WaveBackground from '../../components/common/WaveBackground';
import { assetUrl } from '../../utils';
import { Navigate } from 'react-router-dom';
import { useState, useEffect, useMemo } from 'react';

const NewsMedia = () => {
  const { content, isLoading } = useContent();
  const [featureImageLoaded, setFeatureImageLoaded] = useState(false);

  const newsArticles = content?.newsArticles ?? [];

  const featured = useMemo(() => {
    return newsArticles.find(a => a.isFeatured === true) ?? null;
  }, [newsArticles]);

  const articles = useMemo(() => {
    return newsArticles.filter(a => a.isFeatured !== true);
  }, [newsArticles]);

  useEffect(() => {
    setFeatureImageLoaded(false);

    if (!featured?.image) return;

    let cancelled = false;
    const img = new Image();
    img.src = assetUrl(featured.image);

    img.onload = () => {
      if (!cancelled) setFeatureImageLoaded(true);
    };

    return () => {
      cancelled = true;
    };
  }, [featured?.image]);

  if (isLoading) return <LoadingSpinner />;
  if (!content || !content.newsArticles) return <Navigate to="/not-found" replace />;


  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <main className="min-h-screen bg-dark relative">
      <WaveBackground height={20}/>

      {/* Hero Section */}
      <section className="relative py-8 lg:py-20 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 lg:mb-16 animate-fade-in-up">
            <h1 className="font-bold text-3xl lg:text-6xl text-secondary mb-3 lg:mb-4">News &amp; Media</h1>
            <div className="w-16 lg:w-24 h-1 bg-accent mx-auto mb-4 lg:mb-6" />
            <p className="text-base lg:text-xl text-secondary opacity-80 max-w-3xl mx-auto">
              Stay updated with the latest news, announcements, and industry insights from Autoways
            </p>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      {featured && (
        <section className="py-8 lg:py-12 px-4 lg:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="bg-primary rounded-lg overflow-hidden shadow-2xl animate-fade-in-up">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-48 lg:h-auto">
                    {/* Loading Skeleton - Enhanced with realistic blurred gradient */}
                    {!featureImageLoaded && featured?.image && (
                        <div className="absolute inset-0 overflow-hidden">
                            {/* Base gradient simulating blurred banner */}
                            <div
                                className="absolute inset-0 animate-pulse"
                                style={{
                                    background: "linear-gradient(135deg, #ebecefff 0%rgba(212, 192, 232, 1)a2 25%, #d2b8d5ff 50%, #cae0f3ff 75%, #d1f3f5ff 100%)",
                                    filter: 'blur(60px)',
                                    transform: 'scale(1.2)',
                                }}
                                />
                            {/* Colorful overlay for depth */}
                            <div className="absolute inset-0 pointer-events-none">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        background: "linear-gradient(135deg, #ebecefff 0%rgba(212, 192, 232, 1)a2 25%, #d2b8d5ff 50%, #cae0f3ff 75%, #d1f3f5ff 100%)",
                                        mixBlendMode: 'overlay',
                                        backdropFilter: 'saturate(1.05) blur(6px)',
                                    }}
                                />
                            </div>
                            <div
                                className="absolute inset-0 opacity-30"
                                style={{
                                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)',
                                    animation: 'shimmer 3s infinite',
                                }}
                            />
                        </div>
                    )}
                    <img
                        src={assetUrl(featured.image)}
                        alt={featured.title}
                        className="w-full h-full object-cover"
                        style={{
                            visibility: featureImageLoaded ? 'visible' : 'hidden'
                        }}
                        onLoad={() => setFeatureImageLoaded(true)}
                        loading="eager"
                        fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/50 to-primary" />

                  <div className="absolute top-3 lg:top-4 left-3 lg:left-4">
                    <span className="bg-accent text-dark px-3 lg:px-4 py-1 lg:py-2 rounded-full text-xs lg:text-sm font-bold">
                      Featured
                    </span>
                  </div>
                </div>
                <div className="p-6 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                    <span className="bg-dark text-accent px-2 lg:px-3 py-1 rounded text-xs lg:text-sm font-semibold">
                      {featured.category}
                    </span>
                    <span className="text-secondary opacity-70 text-xs lg:text-sm">
                      {formatDate(featured.date)}
                    </span>
                  </div>
                  <h2 className="text-2xl lg:text-4xl font-bold text-secondary mb-3 lg:mb-4">
                    {featured.title}
                  </h2>
                  <p className="text-secondary opacity-80 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-lg">
                    {featured.excerpt}
                  </p>
                  <p className="text-secondary opacity-70 mb-4 lg:mb-6 leading-relaxed text-sm lg:text-base">
                    {featured.content}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Articles */}
      <section className="py-8 lg:py-20 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 lg:mb-12">
            <h2 className="font-bold text-2xl lg:text-4xl text-secondary mb-3 lg:mb-4">Latest Articles</h2>
            <div className="w-16 lg:w-24 h-1 bg-accent mx-auto" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
            {articles.map((article, index) => (
              <div
                key={index}
                className="bg-primary rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="relative h-40 lg:h-48 overflow-hidden">
                  <img
                    src={assetUrl(article.image)}
                    alt={article.title}
                    className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="bg-primary text-accent px-2 py-1 rounded-full text-xs font-semibold opacity-95">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 lg:p-6">
                  <div className="flex items-center gap-2 mb-2 lg:mb-3">
                    <svg
                      className="w-4 h-4 text-accent"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="text-secondary opacity-70 text-xs lg:text-sm">
                      {formatDate(article.date)}
                    </span>
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-secondary mb-2 lg:mb-3 line-clamp-2">
                    {article.title}
                  </h3>
                  <p className="text-secondary opacity-80 text-xs lg:text-sm leading-relaxed mb-3 lg:mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-8 lg:py-20 px-4 lg:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-6 lg:p-12 text-center shadow-2xl">
            <h3 className="text-2xl lg:text-3xl font-bold text-secondary mb-3 lg:mb-4">
              Stay Updated
            </h3>
            <p className="text-secondary opacity-90 mb-6 lg:mb-8 text-base lg:text-lg">
              Subscribe to our newsletter for the latest news and exclusive updates
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-lg bg-accent text-dark focus:outline-none focus:ring-accent"
              />
              <button className="px-8 py-3 bg-primary text-secondary rounded-lg font-semibold hover:scale-105 duration-200">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NewsMedia;
