import { useState, useMemo } from 'react';
import { Plus, Edit, Trash2, Search, X, Filter } from 'lucide-react';
import useProductTypesQuery from '../../hooks/useProductTypesQuery';
import useBrandsQuery from '../../hooks/useBrandsQuery';
import {
  useCreateProductType,
  useUpdateProductType,
  useDeleteProductType
} from '../../hooks/useProductTypesMutation';
import { assetUrl } from '../../utils';

const ProductTypesAdmin = () => {
  const { data: productTypes = [], isLoading: isLoadingTypes } = useProductTypesQuery();
  const { data: brands = [], isLoading: isLoadingBrands } = useBrandsQuery();

  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [formData, setFormData] = useState({
    brandId: '',
    name: '',
    type: '',
    image: ''
  });
  const [errors, setErrors] = useState({});

  const createMutation = useCreateProductType();
  const updateMutation = useUpdateProductType();
  const deleteMutation = useDeleteProductType();

  // Filter and search product types
  const filteredTypes = useMemo(() => {
    return productTypes.filter(type => {
      const matchesSearch =
        type.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.brandName?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesBrand = !brandFilter || type.brandId === brandFilter;

      return matchesSearch && matchesBrand;
    });
  }, [productTypes, searchTerm, brandFilter]);

  const resetForm = () => {
    setFormData({
      brandId: '',
      name: '',
      type: '',
      image: ''
    });
    setErrors({});
    setEditingType(null);
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
      newErrors.image = 'Image URL is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleOpenModal = (type = null) => {
    if (type) {
      setEditingType(type);
      setFormData({
        brandId: type.brandId || '',
        name: type.name || '',
        type: type.type || '',
        image: type.image || ''
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (editingType) {
        await updateMutation.mutateAsync({
          brandId: formData.brandId,
          oldType: editingType.type,
          name: formData.name,
          type: formData.type,
          image: formData.image
        });
      } else {
        await createMutation.mutateAsync(formData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleDelete = async (type) => {
    if (!window.confirm(`Are you sure you want to delete "${type.name}"? This may affect products using this type.`)) {
      return;
    }

    try {
      await deleteMutation.mutateAsync({
        brandId: type.brandId,
        type: type.type
      });
    } catch (error) {
      console.error('Error deleting product type:', error);
    }
  };

  const isLoading = isLoadingTypes || isLoadingBrands;
  const isSubmitting = createMutation.isPending || updateMutation.isPending;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Types</h1>
          <p className="text-gray-600 mt-1">Manage product categories for each brand</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product Type</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search product types..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Brand Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={brandFilter}
              onChange={(e) => setBrandFilter(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
            >
              <option value="">All Brands</option>
              {brands.map((brand) => (
                <option key={brand._id} value={brand._id}>
                  {brand.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Product Types Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {filteredTypes.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-gray-500">
              {searchTerm || brandFilter ? 'No product types found matching your filters' : 'No product types found'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Brand
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTypes.map((type, index) => (
                  <tr key={`${type.brandId}-${type.type}-${index}`} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-16 w-24 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={assetUrl(type.image)}
                          alt={type.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{type.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs">{type.type}</code>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">{type.brandName}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleOpenModal(type)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(type)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Delete"
                          disabled={deleteMutation.isPending}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Results Count */}
      {filteredTypes.length > 0 && (
        <div className="text-sm text-gray-600">
          Showing {filteredTypes.length} of {productTypes.length} product types
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingType ? 'Edit Product Type' : 'Add Product Type'}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-600"
                disabled={isSubmitting}
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                  {brands.map((brand) => (
                    <option key={brand._id} value={brand._id}>
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

              {/* Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type Slug <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.type ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., forklifts, excavators, passenger-cars"
                />
                {errors.type && (
                  <p className="mt-1 text-sm text-red-500">{errors.type}</p>
                )}
                <p className="mt-1 text-sm text-gray-500">
                  Use lowercase with hyphens for URLs (e.g., heavy-equipment). This will be used in the website URL.
                </p>
              </div>

              {/* Image URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Image URL <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.image ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="e.g., /images/product-types/forklifts.jpg"
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-500">{errors.image}</p>
                )}
              </div>

              {/* Image Preview */}
              {formData.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preview
                  </label>
                  <div className="w-full h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={assetUrl(formData.image)}
                      alt="Preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" x="50%25" y="50%25" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                </div>
              )}

              {/* Form Actions */}
              <div className="flex justify-end space-x-4 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400 disabled:cursor-not-allowed"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Saving...' : editingType ? 'Update Product Type' : 'Create Product Type'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductTypesAdmin;
