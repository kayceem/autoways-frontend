import { useState, useContext, useEffect } from 'react';
import { Save, X, Plus, Trash2, Edit2, Upload, Image as ImageIcon } from 'lucide-react';
import toast from 'react-hot-toast';
import { ContentContext } from '../../context/globalContext';
import { useCreateHeroImage, useUpdateHeroImage, useDeleteHeroImage } from '../../hooks/useHeroImagesMutation';
import { assetUrl } from '../../utils';

const HeroImagesAdmin = () => {
  const { content, isLoading, refetch } = useContext(ContentContext);
  const createHeroImage = useCreateHeroImage();
  const updateHeroImage = useUpdateHeroImage();
  const deleteHeroImage = useDeleteHeroImage();

  const [heroImages, setHeroImages] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    ctaText: '',
    ctaLink: ''
  });

  const MAX_HERO_IMAGES = 10;
  const MIN_HERO_IMAGES = 1;

  useEffect(() => {
    if (content?.heroImages) {
      setHeroImages(content.heroImages);
    }
  }, [content]);

  const resetForm = () => {
    setFormData({
      title: '',
      subtitle: '',
      ctaText: '',
      ctaLink: ''
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setIsCreating(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
        const convertToBase64 = (file) => {
            return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            });
        };
      const base64 = await convertToBase64(file);

      setImageFile(base64);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    if (heroImages?.length >= MAX_HERO_IMAGES) {
      toast.error(`Maximum ${MAX_HERO_IMAGES} hero images allowed`);
      return;
    }

    setIsCreating(true);
    setEditingId(null);
    setFormData({
      title: '',
      subtitle: '',
      ctaText: '',
      ctaLink: ''
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleEdit = (image) => {
    setIsCreating(false);
    setEditingId(image._id);
    setFormData({
      title: image.title || '',
      subtitle: image.subtitle || '',
      ctaText: image.ctaText || '',
      ctaLink: image.ctaLink || ''
    });
    setImagePreview(assetUrl(image.image));
    setImageFile(null);
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.title) {
      toast.error('Title is required');
      return;
    }

    if (isCreating && !imageFile) {
      toast.error('Please select an image');
      return;
    }

    try {
      if (isCreating) {
        // Create new hero image
        const sectionData = {
            title: formData.title,
            subtitle: formData.subtitle,
            ctaText: formData.ctaText,
            ctaLink: formData.ctaLink,
            image : imageFile
        };

        await createHeroImage.mutateAsync(sectionData);
      } else {
        // Update existing hero image
        const submitData = {
            title: formData.title,
            subtitle: formData.subtitle,
            ctaText: formData.ctaText,
            ctaLink: formData.ctaLink,
            image: imageFile
        };
        await updateHeroImage.mutateAsync({
          id: editingId,
          data: submitData
        });
      }

      await refetch();
      resetForm();
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleDelete = async (id) => {
    if (heroImages?.length <= MIN_HERO_IMAGES) {
      toast.error(`At least ${MIN_HERO_IMAGES} hero image must remain`);
      return;
    }

    if (window.confirm('Are you sure you want to delete this hero image? This action cannot be undone.')) {
      try {
        await deleteHeroImage.mutateAsync(id);
        await refetch();
        if (editingId === id) {
          resetForm();
        }
      } catch (error) {
        console.error('Delete failed:', error);
      }
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  const isFormActive = isCreating || editingId !== null;

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Hero Images</h1>
            <p className="text-gray-600 mt-1">Manage homepage carousel images</p>
          </div>
          {!isFormActive && heroImages.length < MAX_HERO_IMAGES && (
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Hero Image</span>
            </button>
          )}
        </div>
        <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Note:</strong> You can have a minimum of {MIN_HERO_IMAGES} and maximum of {MAX_HERO_IMAGES} hero images.
            Currently: {heroImages.length}/{MAX_HERO_IMAGES}
          </p>
        </div>
      </div>

      {/* Form Section */}
      {isFormActive && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {isCreating ? 'Create New Hero Image' : 'Edit Hero Image'}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Image <span className="text-red-500">*</span>
              </label>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mb-4">
                  <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Upload Button */}
              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                  <Upload className="w-4 h-4 text-gray-700" />
                  <span className="text-sm text-gray-700">
                    {imageFile ? 'Change Image' : isCreating ? 'Upload Image' : 'Upload New Image'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {imageFile && (
                  <span className="text-sm text-gray-600">
                    {imageFile.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Recommended size: 1920x800px. Max file size: 5MB. Formats: JPG, PNG, WebP
              </p>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Main heading for the hero slide"
                required
              />
            </div>

            {/* Subtitle */}
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

            {/* CTA Text */}
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

            {/* CTA Link */}
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

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={createHeroImage.isPending || updateHeroImage.isPending}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{isCreating ? 'Create Hero Image' : 'Update Hero Image'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Images Table */}
      {heroImages?.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No hero images found</p>
          <p className="text-sm text-gray-400 mb-4">Get started by adding your first hero image</p>
          {!isFormActive && (
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Hero Image</span>
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Preview
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subtitle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    CTA
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {heroImages.map((image, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 transition-colors ${
                      editingId === image._id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-20 w-32 bg-gray-100 rounded overflow-hidden">
                          <img
                            src={assetUrl(image.image)}
                            alt={image.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{image.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {image.subtitle || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm">
                        {image.ctaText ? (
                          <div>
                            <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded text-xs">
                              {image.ctaText}
                            </span>
                            {image.ctaLink && (
                              <div className="text-xs text-gray-500 mt-1 truncate max-w-xs">
                                {image.ctaLink}
                              </div>
                            )}
                          </div>
                        ) : (
                          <span className="text-gray-400">-</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {!isFormActive && (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(image)}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(image._id)}
                            disabled={deleteHeroImage.isPending || heroImages.length <= MIN_HERO_IMAGES}
                            className="inline-flex items-center px-3 py-1 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title={heroImages.length <= MIN_HERO_IMAGES ? `At least ${MIN_HERO_IMAGES} hero image required` : 'Delete hero image'}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroImagesAdmin;
