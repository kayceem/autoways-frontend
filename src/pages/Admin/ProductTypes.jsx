import { useState, useContext, useEffect } from 'react';
import { Plus, Edit, Trash2, Search, X } from 'lucide-react';
import toast from 'react-hot-toast';
import { ContentContext } from '../../context/globalContext';
import apiService from '../../services/apiService';
import { assetUrl } from '../../utils';

const ProductTypesAdmin = () => {
  const { content, isLoading, refetch } = useContext(ContentContext);
  const [productTypes, setProductTypes] = useState([]);
  const [filteredTypes, setFilteredTypes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingType, setEditingType] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    image: ''
  });

  useEffect(() => {
    if (content?.brands) {
      const allTypes = content.brands.flatMap(brand =>
        (brand.productTypes || []).map(type => ({
          ...type,
          brandName: brand.name,
          brandKey: brand.brandKey
        }))
      );
      setProductTypes(allTypes);
      setFilteredTypes(allTypes);
    }
  }, [content]);

  useEffect(() => {
    if (searchTerm) {
      const filtered = productTypes.filter(type =>
        type.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        type.type?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTypes(filtered);
    } else {
      setFilteredTypes(productTypes);
    }
  }, [searchTerm, productTypes]);

  const resetForm = () => {
    setFormData({
      name: '',
      type: '',
      image: ''
    });
    setEditingType(null);
  };

  const handleOpenModal = (type = null) => {
    if (type) {
      setEditingType(type);
      setFormData({
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
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingType) {
        await apiService.patch(`/product-types/${editingType._id}`, formData);
        toast.success('Product type updated successfully!');
      } else {
        await apiService.post('/product-types', formData);
        toast.success('Product type created successfully!');
      }

      await refetch();
      handleCloseModal();
    } catch (error) {
      toast.error(error.message || 'Operation failed');
    }
  };

  const handleDelete = async (typeId) => {
    if (!window.confirm('Are you sure you want to delete this product type? This may affect products using this type.')) {
      return;
    }

    try {
      await apiService.delete(`/product-types/${typeId}`);
      toast.success('Product type deleted successfully!');
      await refetch();
    } catch (error) {
      toast.error(error.message || 'Failed to delete product type');
    }
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Product Types</h1>
          <p className="text-gray-600 mt-1">Manage product categories</p>
        </div>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Product Type</span>
        </button>
      </div>

      {/* Search */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
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
      </div>

      {/* Product Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTypes.map((type) => (
          <div key={type._id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {type.image && (
              <div className="h-48 bg-gray-100 overflow-hidden">
                <img
                  src={assetUrl(type.image)}
                  alt={type.name}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{type.name}</h3>
              <p className="text-sm text-gray-600 mb-1">Type: {type.type}</p>
              <p className="text-sm text-gray-600 mb-4">Brand: {type.brandName}</p>
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => handleOpenModal(type)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(type._id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredTypes.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">No product types found</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="border-b border-gray-200 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingType ? 'Edit Product Type' : 'Add Product Type'}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-600">
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="e.g., SUVs, Sedans, Heavy Equipment"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                  placeholder="e.g., suv, sedan, heavy-equipment"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Use lowercase with hyphens for URLs (e.g., heavy-equipment)
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
                  placeholder="e.g., /images/product-types/suv.jpg"
                />
              </div>

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
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {editingType ? 'Update Product Type' : 'Create Product Type'}
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
