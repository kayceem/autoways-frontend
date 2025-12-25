import { useState, useEffect } from 'react';
import { X, Upload, FileText, Plus, Trash2, ArrowLeft, ChevronDown, ChevronUp } from 'lucide-react';
import { assetUrl } from '../../utils';

const ProductForm = ({ 
  editingProduct = null, 
  onClose, 
  onSubmit,
  brands = [],
  productTypes = []
}) => {
  const isEditing = !!editingProduct;

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    brand: '',
    fuelType: 'petrol',
    images: [],
    tag: '',
    shortDescription: '',
    fullDescription: '',
    features: [''],
    brochureUrl: '',
    specSheetUrl: '',
    specifications: {
      general: [],
      engine: [],
      motor: [],
      performance: [],
      dimensions: [],
      battery: [],
      hydraulics: [],
      liftArm: [],
      capacities: [],
      safety: [],
      offroad: [],
      electronics: [],
      range: [],
      rideAssist: [],
      connectivity: []
    }
  });

  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState({
    brochure: null,
    specSheet: null
  });
  const [errors, setErrors] = useState({});
  const [uploadErrors, setUploadErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [expandedSpecs, setExpandedSpecs] = useState({});

  // Specification categories with their display names
  const specificationCategories = [
    { key: 'general', label: 'General' },
    { key: 'engine', label: 'Engine' },
    { key: 'motor', label: 'Motor' },
    { key: 'performance', label: 'Performance' },
    { key: 'dimensions', label: 'Dimensions' },
    { key: 'battery', label: 'Battery' },
    { key: 'hydraulics', label: 'Hydraulics' },
    { key: 'liftArm', label: 'Lift Arm' },
    { key: 'capacities', label: 'Capacities' },
    { key: 'safety', label: 'Safety' },
    { key: 'offroad', label: 'Off-Road' },
    { key: 'electronics', label: 'Electronics' },
    { key: 'range', label: 'Range' },
    { key: 'rideAssist', label: 'Ride Assist' },
    { key: 'connectivity', label: 'Connectivity' }
  ];

  // Utility function to convert string to camelCase
  const toCamelCase = (str) => {
    return str
      .trim()
      .replace(/[^a-zA-Z0-9\s]/g, '') // Remove non-letter, non-digit, non-space characters
      .split(/\s+/) // Split by whitespace
      .map((word, index) => {
        if (index === 0) {
          return word.toLowerCase();
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join('');
  };

  useEffect(() => {
    if (editingProduct) {
      // Convert existing specifications object to array format
      const loadedSpecs = {
        general: [],
        engine: [],
        motor: [],
        performance: [],
        dimensions: [],
        battery: [],
        hydraulics: [],
        liftArm: [],
        capacities: [],
        safety: [],
        offroad: [],
        electronics: [],
        range: [],  
        rideAssist: [],
        connectivity: []
      };

      if (editingProduct.specifications) {
        Object.keys(loadedSpecs).forEach(category => {
          if (editingProduct.specifications[category] && typeof editingProduct.specifications[category] === 'object') {
            loadedSpecs[category] = Object.entries(editingProduct.specifications[category]).map(([key, value]) => ({
              key: key.replace(/([A-Z])/g, ' $1').trim(), // Convert camelCase back to readable format
              value: value
            }));
          }
        });
      }

      setFormData({
        name: editingProduct.name || '',
        type: editingProduct.type || '',
        brand: editingProduct.brand || '',
        fuelType: editingProduct.fuelType || 'petrol',
        images: editingProduct.images || [],
        tag: editingProduct.tag || '',
        shortDescription: editingProduct.shortDescription || '',
        fullDescription: editingProduct.fullDescription || '',
        features: editingProduct.features?.length > 0 ? editingProduct.features : [''],
        brochureUrl: editingProduct.brochureUrl || '',
        specSheetUrl: editingProduct.specSheetUrl || '',
        specifications: loadedSpecs
      });
      setImagePreviews(editingProduct.images.map(img => assetUrl(img)) || []);
    }
  }, [editingProduct]);

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

  const handleImageUpload = async (e) => {
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

    setUploadErrors({});

    try {
      const base64Images = await Promise.all(
        files.map(file => convertToBase64(file))
      );

      setFormData(prev => ({
        ...prev,
        images: [...prev.images, ...base64Images]
      }));
      setImagePreviews(prev => [...prev, ...base64Images]);
    } catch (error) {
      console.error('Error converting images:', error);
      setUploadErrors({ images: 'Error uploading images' });
    }
  };

  const handleRemoveImage = (index) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileUpload = async (e, fileType) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadErrors(prev => ({
        ...prev,
        [fileType]: 'File must be less than 5MB'
      }));
      return;
    }

    setUploadErrors(prev => ({ ...prev, [fileType]: '' }));

    try {
      const base64 = await convertToBase64(file);
      setUploadedFiles(prev => ({
        ...prev,
        [fileType]: { name: file.name, data: base64 }
      }));

      const urlField = fileType === 'brochure' ? 'brochureUrl' : 'specSheetUrl';
      setFormData(prev => ({ ...prev, [urlField]: base64 }));
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadErrors(prev => ({
        ...prev,
        [fileType]: 'Error uploading file'
      }));
    }
  };

  const handleRemoveFile = (fileType) => {
    setUploadedFiles(prev => ({ ...prev, [fileType]: null }));
    const urlField = fileType === 'brochure' ? 'brochureUrl' : 'specSheetUrl';
    setFormData(prev => ({ ...prev, [urlField]: '' }));
  };

  const handleFeatureChange = (index, value) => {
    setFormData(prev => {
      const newFeatures = [...prev.features];
      newFeatures[index] = value;
      return { ...prev, features: newFeatures };
    });
  };

  const handleAddFeature = () => {
    setFormData(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const handleRemoveFeature = (index) => {
    if (formData.features.length > 1) {
      setFormData(prev => ({
        ...prev,
        features: prev.features.filter((_, i) => i !== index)
      }));
    }
  };

  // Specification handlers
  const toggleSpecCategory = (category) => {
    setExpandedSpecs(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  const handleAddSpecField = (category) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [category]: [...prev.specifications[category], { key: '', value: '' }]
      }
    }));
  };

  const handleRemoveSpecField = (category, index) => {
    setFormData(prev => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [category]: prev.specifications[category].filter((_, i) => i !== index)
      }
    }));
  };

  const handleSpecFieldChange = (category, index, field, value) => {
    setFormData(prev => {
      const newSpecs = [...prev.specifications[category]];
      newSpecs[index] = { ...newSpecs[index], [field]: value };
      return {
        ...prev,
        specifications: {
          ...prev.specifications,
          [category]: newSpecs
        }
      };
    });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }

    if (!formData.type.trim()) {
      newErrors.type = 'Product type is required';
    }

    if (!formData.brand.trim()) {
      newErrors.brand = 'Brand is required';
    }

    if (!formData.shortDescription.trim()) {
      newErrors.shortDescription = 'Short description is required';
    }

    if (!formData.fullDescription.trim()) {
      newErrors.fullDescription = 'Full description is required';
    }

    if (formData.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    // Convert specifications array format to object format with camelCase keys
    const processedSpecs = {};
    Object.keys(formData.specifications).forEach(category => {
      const fields = formData.specifications[category];
      if (fields.length > 0) {
        processedSpecs[category] = {};
        fields.forEach(field => {
          if (field.key.trim() && field.value.trim()) {
            const camelKey = toCamelCase(field.key);
            processedSpecs[category][camelKey] = field.value.trim();
          }
        });
        // Remove empty categories
        if (Object.keys(processedSpecs[category]).length === 0) {
          delete processedSpecs[category];
        }
      }
    });

    const submitData = {
      ...formData,
      features: formData.features.filter(feat => feat.trim()),
      specifications: processedSpecs
    };

    setIsSubmitting(true);
    try {
      await onSubmit(submitData, editingProduct?._id);
    } catch (error) {
      console.error('Submission error:', error);
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
                  {isEditing ? 'Edit Product' : 'Add New Product'}
                </h1>
                <p className="text-gray-600 mt-1">
                  {isEditing ? 'Update product information' : 'Create a new product listing'}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-8">
            {/* Basic Information */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Name <span className="text-red-500">*</span>
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
                    Brand <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="brand"
                    value={formData.brand}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${errors.brand ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="">Select Brand</option>
                    {brands.map(brand => (
                      <option key={brand._id} value={brand.brandKey}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                  {errors.brand && (
                    <p className="text-red-500 text-sm mt-1">{errors.brand}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-2 border ${errors.type ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                  >
                    <option value="">Select Type</option>
                    {productTypes.map((type, index) => (
                      <option key={index} value={type.type}>
                        {type.name}
                      </option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="text-red-500 text-sm mt-1">{errors.type}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fuel Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="fuelType"
                    value={formData.fuelType}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="petrol">Petrol</option>
                    <option value="diesel">Diesel</option>
                    <option value="hybrid-diesel">Hybrid Diesel</option>
                    <option value="hybrid-petrol">Hybrid Petrol</option>
                    <option value="electric">Electric</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tag (Optional)
                  </label>
                  <input
                    type="text"
                    name="tag"
                    value={formData.tag}
                    onChange={handleInputChange}
                    placeholder="e.g., New, Popular, Best Seller"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Descriptions */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Descriptions</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Short Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="shortDescription"
                    value={formData.shortDescription}
                    onChange={handleInputChange}
                    rows="2"
                    className={`w-full px-4 py-2 border ${errors.shortDescription ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Brief description for listings and previews"
                  />
                  {errors.shortDescription && (
                    <p className="text-red-500 text-sm mt-1">{errors.shortDescription}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="fullDescription"
                    value={formData.fullDescription}
                    onChange={handleInputChange}
                    rows="4"
                    className={`w-full px-4 py-2 border ${errors.fullDescription ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
                    placeholder="Detailed description for product page"
                  />
                  {errors.fullDescription && (
                    <p className="text-red-500 text-sm mt-1">{errors.fullDescription}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Images Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Images <span className="text-red-500">*</span>
              </label>
              <div className="space-y-4">
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">
                      Click to upload images or drag and drop
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      PNG, JPG, GIF up to 5MB each
                    </p>
                  </label>
                </div>

                {uploadErrors.images && (
                  <p className="text-red-500 text-sm">{uploadErrors.images}</p>
                )}
                {errors.images && (
                  <p className="text-red-500 text-sm">{errors.images}</p>
                )}

                {imagePreviews.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {imagePreviews.map((preview, index) => (
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
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Features</h3>
                <button
                  onClick={handleAddFeature}
                  className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Feature</span>
                </button>
              </div>
              <div className="space-y-3">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="flex-1">
                      <textarea
                        value={feature}
                        onChange={(e) => handleFeatureChange(index, e.target.value)}
                        placeholder={`Feature ${index + 1}`}
                        rows="2"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    {formData.features.length > 1 && (
                      <button
                        onClick={() => handleRemoveFeature(index)}
                        className="text-red-600 hover:text-red-700 p-2 mt-1"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Product Specifications */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Product Specifications (Optional)</h3>
              <p className="text-sm text-gray-600 mb-4">
                Add technical specifications for your product. Each category can contain multiple fields.
              </p>
              <div className="space-y-3">
                {specificationCategories.map((category, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    {/* Category Header */}
                    <button
                      type="button"
                      onClick={() => toggleSpecCategory(category.key)}
                      className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-medium text-gray-900">{category.label}</span>
                        {formData.specifications[category.key].length > 0 && (
                          <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                            {formData.specifications[category.key].length} field{formData.specifications[category.key].length !== 1 ? 's' : ''}
                          </span>
                        )}
                      </div>
                      {expandedSpecs[category.key] ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                      )}
                    </button>

                    {/* Category Content */}
                    {expandedSpecs[category.key] && (
                      <div className="p-4 bg-white space-y-3">
                        {formData.specifications[category.key].map((field, index) => (
                          <div key={index} className="flex items-start space-x-2">
                            <div className="flex-1 grid grid-cols-2 gap-2">
                              <div>
                                <input
                                  type="text"
                                  value={field.key}
                                  onChange={(e) => handleSpecFieldChange(category.key, index, 'key', e.target.value)}
                                  placeholder="Field name (e.g., Max Power)"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                              </div>
                              <div>
                                <input
                                  type="text"
                                  value={field.value}
                                  onChange={(e) => handleSpecFieldChange(category.key, index, 'value', e.target.value)}
                                  placeholder="Value (e.g., 100 HP)"
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                                />
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveSpecField(category.key, index)}
                              className="text-red-600 hover:text-red-700 p-2 mt-0.5"
                              title="Remove field"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}

                        <button
                          type="button"
                          onClick={() => handleAddSpecField(category.key)}
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium mt-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Field</span>
                        </button>

                        {formData.specifications[category.key].length === 0 && (
                          <p className="text-sm text-gray-500 italic">No fields added yet. Click "Add Field" to get started.</p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Additional Resources */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Brochure */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brochure (Optional)
                  </label>
                  {!uploadedFiles.brochure && !formData.brochureUrl ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload(e, 'brochure')}
                        className="hidden"
                        id="brochure-upload"
                      />
                      <label htmlFor="brochure-upload" className="cursor-pointer">
                        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Upload brochure</p>
                        <p className="text-xs text-gray-500">PDF, DOC up to 5MB</p>
                      </label>
                    </div>
                  ) : (
                    <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {uploadedFiles.brochure?.name || 'Brochure uploaded'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveFile('brochure')}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {uploadErrors.brochure && (
                    <p className="text-red-500 text-sm mt-1">{uploadErrors.brochure}</p>
                  )}
                </div>

                {/* Spec Sheet */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spec Sheet (Optional)
                  </label>
                  {!uploadedFiles.specSheet && !formData.specSheetUrl ? (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => handleFileUpload(e, 'specSheet')}
                        className="hidden"
                        id="spec-upload"
                      />
                      <label htmlFor="spec-upload" className="cursor-pointer">
                        <FileText className="w-8 h-8 text-gray-400 mx-auto mb-1" />
                        <p className="text-xs text-gray-600">Upload spec sheet</p>
                        <p className="text-xs text-gray-500">PDF, DOC up to 5MB</p>
                      </label>
                    </div>
                  ) : (
                    <div className="border border-gray-300 rounded-lg p-3 flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <FileText className="w-5 h-5 text-gray-500" />
                        <span className="text-sm text-gray-700">
                          {uploadedFiles.specSheet?.name || 'Spec sheet uploaded'}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveFile('specSheet')}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                  {uploadErrors.specSheet && (
                    <p className="text-red-500 text-sm mt-1">{uploadErrors.specSheet}</p>
                  )}
                </div>
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
                {isSubmitting
                  ? 'Saving...'
                  : isEditing
                  ? 'Update Product'
                  : 'Create Product'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;