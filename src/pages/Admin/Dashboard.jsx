import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Package, Layers, Image, TrendingUp, Award, Newspaper, RefreshCw } from 'lucide-react';
import { ContentContext } from '../../context/globalContext';
import LoadingSpinner from '../../components/common/Loading';
import { useRefreshCache } from '../../hooks/useRefreshCacheMutation';

const AdminDashboard = () => {
  const { content, isLoading } = useContext(ContentContext);
  const { mutate: refreshCache, isPending: isRefreshing } = useRefreshCache();

  if (isLoading) {
    return <LoadingSpinner />;
    }

  const handleRefreshCache = () => {
    refreshCache();
  };

const brandsArray = content?.brands ? content.brands : [];
const heroImagesArray = content?.heroImages ? content.heroImages : [];
const csrInitiatives = content?.csr?.initiatives ? content.csr.initiatives : [];
const newsArticles = content?.newsArticles ? content.newsArticles : [];

const stats = [
  {
    label: 'Product Types',
    value: brandsArray.reduce((total, brand) => {
      const productTypesArray = brand.productTypes ? Object.values(brand.productTypes) : [];
      return total + productTypesArray.length;
    }, 0),
    icon: Layers,
    color: 'bg-green-500',
    link: '/admin/product-types'
  },
  {
    label: 'Hero Images',
    value: heroImagesArray.length,
    icon: Image,
    color: 'bg-purple-500',
    link: '/admin/hero-images'
  },
  {
    label: 'CSR Initiatives',
    value: csrInitiatives.length,
    icon: Award,
    color: 'bg-yellow-500',
    link: '/admin/csr-initiatives'
  },
  {
    label: 'News Articles',
    value: newsArticles.length,
    icon: Newspaper,
    color: 'bg-indigo-500',
    link: '/admin/news-media'
  }
];

  return (
    <div>
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-2">Overview of your website content</p>
        </div>
        <button
          onClick={handleRefreshCache}
          disabled={isRefreshing}
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:cursor-pointer"
        >
          <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span>{isRefreshing ? 'Refreshing...' : 'Refresh Cache'}</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Link
              key={index}
              to={stat.link}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                </div>
                <div className={`${stat.color} p-3 rounded-lg`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            to="/admin/products"
            className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Manage Products</h3>
            <p className="text-sm text-gray-600">Add, edit, or delete products</p>
          </Link>
          <Link
            to="/admin/sister-companies"
            className="p-4 border-2 border-blue-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Manage Sister Companies</h3>
            <p className="text-sm text-gray-600">Add, edit, or delete sister companies</p>
          </Link>
          <Link
            to="/admin/csr-initiatives"
            className="p-4 border-2 border-yellow-200 rounded-lg hover:border-yellow-500 hover:bg-yellow-50 transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Manage CSR Initiatives</h3>
            <p className="text-sm text-gray-600">Add and manage CSR programs</p>
          </Link>
          <Link
            to="/admin/news-media"
            className="p-4 border-2 border-indigo-200 rounded-lg hover:border-indigo-500 hover:bg-indigo-50 transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Manage News & Media</h3>
            <p className="text-sm text-gray-600">Publish and update news articles</p>
          </Link>
          <Link
            to="/admin/product-types"
            className="p-4 border-2 border-green-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Manage Product Types</h3>
            <p className="text-sm text-gray-600">Add, edit, or delete product categories</p>
          </Link>
          <Link
            to="/admin/hero-images"
            className="p-4 border-2 border-purple-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Update Hero Images</h3>
            <p className="text-sm text-gray-600">Edit homepage carousel images</p>
          </Link>
          <Link
            to="/admin/locations"
            className="p-4 border-2 border-orange-200 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">Manage Locations</h3>
            <p className="text-sm text-gray-600">Update business locations</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
