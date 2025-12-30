import { useState, useEffect } from 'react';
import { Trash, Upload } from 'lucide-react';
import { assetUrl } from '../../utils';
import handleError from '../../utils/handleError';

const BrandForm = ({
  editingBrand = null,
  onClose,
  onSubmit
}) => {
  const isEditing = !!editingBrand;

  const [formData, setFormData] = useState({
    brandKey: '',
    name: '',
    slug: '',
    description: '',
    heroImage: '',
    images: [],
    video: '',
    logo: ''
  });

  const [imagePreviews, setImagePreviews] = useState({
    heroImage: '',
    logo: '',
    images: []
  });
  const [videoPreview, setVideoPreview] = useState('');
  const [errors, setErrors] = useState({});
  const [uploadErrors, setUploadErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingBrand) {
      setFormData({
        brandKey: editingBrand.brandKey || '',
        name: editingBrand.name || '',
        slug: editingBrand.slug || '',
        description: editingBrand.description || '',
        heroImage: editingBrand.heroImage || '',
        images: editingBrand.images || [],
        video: editingBrand.video || '',
        logo: editingBrand.logo || ''
      });
      setImagePreviews({
        heroImage: assetUrl(editingBrand.heroImage) || '',
        logo: assetUrl(editingBrand.logo) || '',
        images: editingBrand.images.map(img => assetUrl(img)) || []
      });
      setVideoPreview(editingBrand.video ? assetUrl(editingBrand.video) : '');
    }
  }, [editingBrand]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSingleImageUpload = async (e, fieldName) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadErrors(prev => ({
        ...prev,
        [fieldName]: 'Image must be less than 5MB'
      }));
      return;
    }

    if (!file.type.startsWith('image/')) {
      setUploadErrors(prev => ({
        ...prev,
        [fieldName]: 'Only image files are allowed'
      }));
      return;
    }

    setUploadErrors(prev => ({ ...prev, [fieldName]: '' }));

    try {
      const base64 = await convertToBase64(file);
      setFormData(prev => ({ ...prev, [fieldName]: base64 }));
      setImagePreviews(prev => ({ ...prev, [fieldName]: base64 }));
    } catch (error) {
      handleError(error);
      setUploadErrors(prev => ({
        ...prev,
        [fieldName]: 'Error uploading image'
      }));
    }
  };

  const handleMultipleImagesUpload = async (e) => {
    const files = Array.from(e.target.files);
    const newErrors = {};

    for (const file of files) {
      if (file.size > 5 * 1024 * 1024) {
        newErrors.images = 'Each image must be less than 5MB';
        setUploadErrors(newErrors);
        return;
      }

      if (!file.type.startsWith('image/')) {
        newErrors.images = 'Only image files are allowed';
        setUploadErrors(newErrors);
        return;
      }
    }

    setUploadErrors(prev => ({ ...prev, images: '' }));

    try {
      const base64Images = await Promise.all(
        files.map(file => convertToBase64(file))
      );

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...base64Images]
      }));
      setImagePreviews(prev => ({
        ...prev,
        images: [...prev.images, ...base64Images]
      }));
    } catch (error) {
      handleError(error);
      setUploadErrors(prev => ({ ...prev, images: 'Error uploading images' }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setUploadErrors(prev => ({
        ...prev,
        video: 'Video must be less than 10MB'
      }));
      return;
    }

    if (!file.type.startsWith('video/')) {
      setUploadErrors(prev => ({
        ...prev,
        video: 'Only video files are allowed'
      }));
      return;
    }

    setUploadErrors(prev => ({ ...prev, video: '' }));

    try {
      const base64 = await convertToBase64(file);
      setFormData(prev => ({ ...prev, video: base64 }));
      setVideoPreview(base64);
    } catch (error) {
      handleError(error);
      setUploadErrors(prev => ({
        ...prev,
        video: 'Error uploading video'
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Brand name is required';
    }

    if (!formData.slug.trim()) {
      newErrors.slug = 'Slug is required';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.heroImage) {
      newErrors.heroImage = 'Hero image is required';
    }

    if (!formData.logo) {
      newErrors.logo = 'Logo is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData, editingBrand?._id);
    } catch (error) {
      handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Edit Brand
                </h1>
                <p className="text-gray-600 mt-1">
                  Update brand information
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <Trash className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Key <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="brandKey"
                    value={formData.brandKey}
                    disabled={isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                  <p className="text-xs text-gray-500 mt-1">Brand key cannot be changed</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brand Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Slug <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="slug"
                    value={formData.slug}
                    disabled={isEditing}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
                  />
                <p className="text-xs text-gray-500 mt-1">Slug cannot be changed</p>
                </div>

              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows="4"
                  className={`w-full px-4 py-2 border ${errors.description ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  placeholder="Detailed description of the brand"
                />
                {errors.description && (
                  <p className="text-red-500 text-sm mt-1">{errors.description}</p>
                )}
              </div>
            </div>

            {/* Logo Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Logo <span className="text-red-500">*</span>
              </label>
              <div className="space-y-4">
                {!imagePreviews.logo ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSingleImageUpload(e, 'logo')}
                      className="hidden"
                      id="logo-upload"
                    />
                    <label htmlFor="logo-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload logo
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, SVG up to 5MB
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="relative inline-block">
                    <img
                      src={imagePreviews.logo}
                      alt="Logo preview"
                      className="w-32 h-32 object-contain border border-gray-200 rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, logo: '' }));
                        setImagePreviews(prev => ({ ...prev, logo: '' }));
                      }}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {uploadErrors.logo && (
                  <p className="text-red-500 text-sm">{uploadErrors.logo}</p>
                )}
                {errors.logo && (
                  <p className="text-red-500 text-sm">{errors.logo}</p>
                )}
              </div>
            </div>

            {/* Hero Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hero Image <span className="text-red-500">*</span>
              </label>
              <div className="space-y-4">
                {!imagePreviews.heroImage ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleSingleImageUpload(e, 'heroImage')}
                      className="hidden"
                      id="hero-upload"
                    />
                    <label htmlFor="hero-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload hero image
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG up to 5MB
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="relative inline-block">
                    <img
                      src={imagePreviews.heroImage}
                      alt="Hero preview"
                      className="w-full max-w-md h-48 object-cover border border-gray-200 rounded-lg"
                    />
                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, heroImage: '' }));
                        setImagePreviews(prev => ({ ...prev, heroImage: '' }));
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                )}
                {uploadErrors.heroImage && (
                  <p className="text-red-500 text-sm">{uploadErrors.heroImage}</p>
                )}
                {errors.heroImage && (
                  <p className="text-red-500 text-sm">{errors.heroImage}</p>
                )}
              </div>
            </div>

            {/* Video Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand Video (Optional)
              </label>
              <div className="space-y-4">
                {!videoPreview ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      className="hidden"
                      id="video-upload"
                    />
                    <label htmlFor="video-upload" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Click to upload brand video
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        MP4, WebM, AVI up to 10MB
                      </p>
                    </label>
                  </div>
                ) : (
                  <div className="relative inline-block w-full">
                    <video
                      src={videoPreview}
                      controls
                      className="w-full max-w-2xl h-64 object-contain border border-gray-200 rounded-lg"
                    >
                      Your browser does not support the video tag.
                    </video>
                    <button
                      onClick={() => {
                        setFormData(prev => ({ ...prev, video: '' }));
                        setVideoPreview('');
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <Trash className="w-5 h-5" />
                    </button>
                  </div>
                )}
                {uploadErrors.video && (
                  <p className="text-red-500 text-sm">{uploadErrors.video}</p>
                )}
              </div>
            </div>

            {/* Additional Images Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Additional Images (Optional)
              </label>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleMultipleImagesUpload}
                    className="hidden"
                    id="images-upload"
                  />
                  <label htmlFor="images-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload additional images
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG up to 5MB each
                    </p>
                  </label>
                </div>

                {uploadErrors.images && (
                  <p className="text-red-500 text-sm">{uploadErrors.images}</p>
                )}

                {imagePreviews.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviews.images.map((preview, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={preview}
                          alt={`Preview ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                        />
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleFormSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Saving...' : 'Update Brand'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrandForm;
