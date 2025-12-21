import { useState, useMemo } from 'react';
import { Plus, Edit, Trash2, Search, Filter } from 'lucide-react';
import useProductTypesQuery from '../../hooks/useProductTypesQuery';
import useBrandsQuery from '../../hooks/useBrandsQuery';
import {
  useCreateProductType,
  useUpdateProductType,
  useDeleteProductType
} from '../../hooks/useProductTypesMutation';
import { assetUrl } from '../../utils';
import ProductTypeForm from './ProductTypeForm';

const ProductTypesAdmin = () => {
  const { data: productTypes = [], isLoading: isLoadingTypes } = useProductTypesQuery();
  const { data: brands = [], isLoading: isLoadingBrands } = useBrandsQuery();

  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingType, setEditingType] = useState(null);

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

  const handleOpenForm = (type = null) => {
    setEditingType(type);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingType(null);
  };

  const handleFormSubmit = async (formData, editingType) => {
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
      handleCloseForm();
    } catch (error) {
      console.error('Error submitting form:', error);
      throw error;
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

  if (showForm) {
    return (
      <ProductTypeForm
        editingType={editingType}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
        brands={brands}
      />
    );
  }

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
          onClick={() => handleOpenForm()}
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
                          onClick={() => handleOpenForm(type)}
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
    </div>
  );
};

export default ProductTypesAdmin;
