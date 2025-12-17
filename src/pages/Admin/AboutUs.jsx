import { useState, useContext, useEffect } from 'react';
import { Save, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { ContentContext } from '../../context/globalContext';
import apiService from '../../services/apiService';
import { assetUrl } from '../../utils';

const AboutUsAdmin = () => {
  const { content, isLoading, refetch } = useContext(ContentContext);
  const [aboutData, setAboutData] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: ''
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (content?.aboutUs && content.aboutUs.length > 0) {
      const about = content.aboutUs[0];
      setAboutData(about);
      setFormData({
        title: about.title || '',
        content: about.content || '',
        image: about.image || ''
      });
    }
  }, [content]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (aboutData?._id) {
        await apiService.patch(`/about-us/${aboutData._id}`, formData);
        toast.success('About Us section updated successfully!');
        await refetch();
      } else {
        toast.error('No About Us data found to update');
      }
    } catch (error) {
      toast.error(error.message || 'Update failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (aboutData) {
      setFormData({
        title: aboutData.title || '',
        content: aboutData.content || '',
        image: aboutData.image || ''
      });
      toast.success('Changes discarded');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (!aboutData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 mb-4">No About Us content found</p>
        <p className="text-sm text-gray-400">Please contact your system administrator to create About Us content.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">About Us Content</h1>
        <p className="text-gray-600 mt-1">Update the About Us section on your homepage</p>
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> This section can only be updated. Changes will be reflected on the homepage.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Preview Card */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Current Preview</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              {formData.image && (
                <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={assetUrl(formData.image)}
                    alt={formData.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                    }}
                  />
                </div>
              )}
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">{formData.title || 'Title'}</h3>
              <p className="text-gray-600 whitespace-pre-wrap">{formData.content || 'Content will appear here...'}</p>
            </div>
          </div>
        </div>

        {/* Edit Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Edit Content</h2>
          <div className="space-y-6">
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
                placeholder="Enter section title"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="8"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="Enter section content (supports multiple paragraphs)"
              />
              <p className="text-sm text-gray-500 mt-1">
                Tip: Use line breaks to separate paragraphs
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image URL
              </label>
              <input
                type="text"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="/images/about/company.jpg"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Discard Changes</span>
          </button>
          <button
            type="submit"
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutUsAdmin;
