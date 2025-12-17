import { useState, useContext, useEffect } from 'react';
import { Edit, X, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import { ContentContext } from '../../context/globalContext';
import apiService from '../../services/apiService';
import { assetUrl } from '../../utils';

const HeroImagesAdmin = () => {
  const { content, isLoading, refetch } = useContext(ContentContext);
  const [heroImages, setHeroImages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingImage, setEditingImage] = useState(null);
  const [formData, setFormData] = useState({
    url: '',
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: '',
    alt: ''
  });

  useEffect(() => {
    if (content?.heroImages) {
      setHeroImages(content.heroImages);
    }
  }, [content]);

  const handleOpenModal = (image) => {
    setEditingImage(image);
    setFormData({
      url: image.url || '',
      title: image.title || '',
      subtitle: image.subtitle || '',
      ctaText: image.ctaText || '',
      ctaLink: image.ctaLink || '',
      alt: image.alt || ''
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingImage(null);
    setFormData({
      url: '',
      title: '',
      subtitle: '',
      ctaText: '',
      ctaLink: '',
      alt: ''
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await apiService.patch(`/hero-images/${editingImage._id}`, formData);
      toast.success('Hero image updated successfully!');
      await refetch();
      handleCloseModal();
    } catch (error) {
      toast.error(error.message || 'Update failed');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Hero Images</h1>
        <p className="text-gray-600 mt-1">Update homepage carousel images</p>
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Hero images can only be updated, not created or deleted. To add or remove hero images, please contact your system administrator.
          </p>
        </div>
      </div>

      {/* Hero Images Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {heroImages.map((image, index) => (
          <div key={image._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-64 bg-gray-100 overflow-hidden relative">
              <img
                src={assetUrl(image.url)}
                alt={image.alt || image.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Slide {index + 1}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{image.title}</h3>
              {image.subtitle && (
                <p className="text-gray-600 mb-4">{image.subtitle}</p>
              )}
              {image.ctaText && (
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    CTA: {image.ctaText}
                  </span>
                </div>
              )}
              <button
                onClick={() => handleOpenModal(image)}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2"
              >
                <Edit className="w-4 h-4" />
                <span>Edit Hero Image</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {heroImages.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No hero images found</p>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">Edit Hero Image</h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              {/* Image Preview */}
              {formData.url && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={assetUrl(formData.url)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3EImage Not Found%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL
                </label>
                <input
                  type="text"
                  name="url"
                  value={formData.url}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="/images/hero/banner-1.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="Main heading for the hero slide"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subtitle
                </label>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Supporting text below the title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CTA Text
                </label>
                <input
                  type="text"
                  name="ctaText"
                  value={formData.ctaText}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Learn More, Shop Now"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  CTA Link
                </label>
                <input
                  type="text"
                  name="ctaLink"
                  value={formData.ctaLink}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="/contact or https://example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Alt Text (for accessibility)
                </label>
                <input
                  type="text"
                  name="alt"
                  value={formData.alt}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Description of the image for screen readers"
                />
              </div>

              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroImagesAdmin;
