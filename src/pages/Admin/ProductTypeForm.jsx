import { useState, useEffect } from 'react';
import { Trash, Upload, ArrowLeft } from 'lucide-react';
import { assetUrl } from '../../utils';
import handleError from '../../utils/handleError';

const ProductTypeForm = ({
  editingType = null,
  onClose,
  onSubmit,
  brands = []
}) => {
  const isEditing = !!editingType;

  const [formData, setFormData] = useState({
    brandId: '',
    name: '',
    type: '',
    image: ''
  });
  const [errors, setErrors] = useState({});
  const [imagePreview, setImagePreview] = useState('');
  const [uploadErrors, setUploadErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to generate slug from name
  const generateSlug = (name) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
      .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
  };

  // Convert file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  useEffect(() => {
    if (editingType) {
      setFormData({
        brandId: editingType.brandId || '',
        name: editingType.name || '',
        type: editingType.type || '',
        image: editingType.image || ''
      });
      setImagePreview(editingType.image ? assetUrl(editingType.image) : '');
    }
  }, [editingType]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Auto-generate slug when name changes (only when creating new, not editing)
    if (name === 'name') {
      const slug = generateSlug(value);
      setFormData(prev => ({ ...prev, name: value, type: slug }));
    } else if (name === 'name' && editingType) {
      // When editing, update name but keep existing slug
      setFormData(prev => ({ ...prev, name: value }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setUploadErrors({ image: 'Only image files are allowed' });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadErrors({ image: 'Image must be less than 5MB' });
      return;
    }

    setUploadErrors({});

    try {
      const base64 = await convertToBase64(file);
      setFormData(prev => ({ ...prev, image: base64 }));
      setImagePreview(base64);

      // Clear image error if exists
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: '' }));
      }
    } catch (error) {
        handleError(error);
      setUploadErrors({ image: 'Error uploading image' });
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, image: '' }));
    setImagePreview('');
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.brandId) {
      newErrors.brandId = 'Brand is required';
    }

    if (!formData.name || formData.name.trim().length === 0) {
      newErrors.name = 'Name is required';
    }

    if (!formData.type || formData.type.trim().length === 0) {
      newErrors.type = 'Type is required';
    } else if (!/^[a-z0-9-]+$/.test(formData.type)) {
      newErrors.type = 'Type must contain only lowercase letters, numbers, and hyphens';
    }

    if (!formData.image || formData.image.trim().length === 0) {
      newErrors.image = 'Image is required';
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
      await onSubmit(formData, editingType);
    } catch (error) {
        handleError(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="border-b border-gray-200 px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {isEditing ? 'Edit Product Type' : 'Add New Product Type'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {isEditing ? 'Update product type information' : 'Create a new product type for your catalog'}
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

          <div className="p-6 space-y-6">
            {/* Brand Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brand <span className="text-red-500">*</span>
              </label>
              <select
                name="brandId"
                value={formData.brandId}
                onChange={handleInputChange}
                disabled={editingType !== null}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.brandId ? 'border-red-500' : 'border-gray-300'
                } ${editingType ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              >
                <option value="">Select a brand</option>
                {brands.map((brand, index) => (
                  <option key={index} value={brand._id}>
                    {brand.name}
                  </option>
                ))}
              </select>
              {errors.brandId && (
                <p className="mt-1 text-sm text-red-500">{errors.brandId}</p>
              )}
              {editingType && (
                <p className="mt-1 text-sm text-gray-500">
                  Brand cannot be changed when editing. Delete and recreate to move to a different brand.
                </p>
              )}
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="e.g., Forklifts, Excavators, Passenger Cars"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            {/* Type Slug (Auto-generated) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Type Slug <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  readOnly
                  disabled
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                  placeholder="Auto-generated from name"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                    Auto-generated
                  </span>
                </div>
              </div>
              {errors.type && (
                <p className="mt-1 text-sm text-red-500">{errors.type}</p>
              )}
              <p className="mt-1 text-sm text-gray-500">
                This slug is automatically generated from the name and will be used in URLs.
              </p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Type Image <span className="text-red-500">*</span>
              </label>

              {!imagePreview ? (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                    <p className="text-sm font-medium text-gray-700 mb-1">
                      Click to upload image
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF up to 5MB
                    </p>
                  </label>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors shadow-lg"
                      title="Remove image"
                    >
                      <Trash className="w-4 h-4" />
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={() => document.getElementById('image-upload').click()}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                  >
                    Change Image
                  </button>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                </div>
              )}

              {uploadErrors.image && (
                <p className="mt-1 text-sm text-red-500">{uploadErrors.image}</p>
              )}
              {errors.image && (
                <p className="mt-1 text-sm text-red-500">{errors.image}</p>
              )}
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
              <button
                onClick={onClose}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={handleFormSubmit}
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting
                  ? 'Saving...'
                  : isEditing
                  ? 'Update Product Type'
                  : 'Create Product Type'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTypeForm;
