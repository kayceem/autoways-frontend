import { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import useProductsQuery from '../../hooks/useProductsQuery';
import { useCreateProduct, useUpdateProduct, useDeleteProduct } from '../../hooks/useProductsMutation';
import useBrandsQuery from '../../hooks/useBrandsQuery';
import useProductTypesQuery from '../../hooks/useProductTypesQuery';
 
const ProductsAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
 
  const { data: products = [], isLoading } = useProductsQuery({ brand: selectedBrand });
  const { data: brands = [] } = useBrandsQuery();
  const {data: productTypes = []} = useProductTypesQuery();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();
 
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    brand: '',
    fuelType: 'normal',
    images: [''],
    tag: '',
    shortDescription: '',
    fullDescription: '',
    features: [''],
    brochureUrl: '',
    specSheetUrl: ''
  });
 
  const [errors, setErrors] = useState({});
 
  useEffect(() => {
    let filtered = products;
 
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
 
    setFilteredProducts(filtered);
  }, [searchTerm, products]);
 
  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      brand: '',
      fuelType: 'normal',
      images: [''],
      tag: '',
      shortDescription: '',
      fullDescription: '',
      features: [''],
      brochureUrl: '',
      specSheetUrl: ''
    });
    setEditingProduct(null);
    setErrors({});
  };
 
  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || '',
        type: product.type || '',
        brand: product.brand || '',
        fuelType: product.fuelType || 'normal',
        images: product.images?.length > 0 ? product.images : [''],
        tag: product.tag || '',
        shortDescription: product.shortDescription || '',
        fullDescription: product.fullDescription || '',
        features: product.features?.length > 0 ? product.features : [''],
        brochureUrl: product.brochureUrl || '',
        specSheetUrl: product.specSheetUrl || ''
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
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
 
  const handleArrayChange = (field, index, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = value;
      return { ...prev, [field]: newArray };
    });
  };
 
  const handleAddArrayItem = (field) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], '']
    }));
  };
 
  const handleRemoveArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
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
 
    const validImages = formData.images.filter(img => img.trim());
    if (validImages.length === 0) {
      newErrors.images = 'At least one image is required';
    }
 
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
 
    if (!validateForm()) {
      return;
    }
 
    const submitData = {
      ...formData,
      images: formData.images.filter(img => img.trim()),
      features: formData.features.filter(feat => feat.trim())
    };
 
    try {
      if (editingProduct) {
        await updateProduct.mutateAsync({ id: editingProduct._id, data: submitData });
      } else {
        await createProduct.mutateAsync(submitData);
      }
      handleCloseModal();
    } catch (error) {
      console.error('Submission error:', error);
    }
  };
 
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }
 
    try {
      await deleteProduct.mutateAsync(id);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };
 
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading products...</div>
      </div>
    );
  }
 
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product</span>
        </button>
      </div>
 
      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedBrand}
            onChange={(e) => setSelectedBrand(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Brands</option>
            {brands.map(brand => (
              <option key={brand._id} value={brand.brandKey}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      </div>
 
      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Brand
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Fuel Type
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product._id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {product.images?.[0] && (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-12 h-12 rounded-lg object-cover mr-3"
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/48';
                        }}
                      />
                    )}
                    <div>
                      <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">
                    {brands.find(b => b.brandKey === product.brand)?.name || product.brand}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="text-sm text-gray-900">{product.type}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                    product.fuelType === 'electric' ? 'bg-green-100 text-green-800' :
                    product.fuelType === 'hybrid' ? 'bg-blue-100 text-blue-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {product.fuelType}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleOpenModal(product)}
                    className="text-blue-600 hover:text-blue-900 mr-4"
                  >
                    <Edit className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredProducts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            No products found
          </div>
        )}
      </div>
 
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingProduct ? 'Edit Product' : 'Add Product'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>
 
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                      {productTypes.map(type => (
                        <option key={type.type} value={type.type}>
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
                      <option value="normal">Normal</option>
                      <option value="hybrid">Hybrid</option>
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
 
              {/* Images */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Images (URLs) <span className="text-red-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem('images')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Add Image
                  </button>
                </div>
                {formData.images.map((image, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => handleArrayChange('images', index, e.target.value)}
                      placeholder="Image URL"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {formData.images.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem('images', index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
                {errors.images && (
                  <p className="text-red-500 text-sm mt-1">{errors.images}</p>
                )}
              </div>
 
              {/* Features */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Features (Optional)
                  </label>
                  <button
                    type="button"
                    onClick={() => handleAddArrayItem('features')}
                    className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                  >
                    + Add Feature
                  </button>
                </div>
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleArrayChange('features', index, e.target.value)}
                      placeholder="Feature description"
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    {formData.features.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem('features', index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
 
              {/* Additional Resources */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Brochure URL (Optional)
                    </label>
                    <input
                      type="text"
                      name="brochureUrl"
                      value={formData.brochureUrl}
                      onChange={handleInputChange}
                      placeholder="https://..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
 
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Spec Sheet URL (Optional)
                    </label>
                    <input
                      type="text"
                      name="specSheetUrl"
                      value={formData.specSheetUrl}
                      onChange={handleInputChange}
                      placeholder="https://..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
 
              {/* Form Actions */}
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
                  disabled={createProduct.isLoading || updateProduct.isLoading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {createProduct.isLoading || updateProduct.isLoading
                    ? 'Saving...'
                    : editingProduct
                    ? 'Update Product'
                    : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default ProductsAdmin;