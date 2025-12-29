import { useState, useMemo } from 'react';
import { Edit, Search } from 'lucide-react';
import useBrandsQuery from '../../hooks/useBrandsQuery';
import { useUpdateBrand } from '../../hooks/useBrandsMutation';
import BrandForm from './BrandForm';
import { assetUrl } from '../../utils';
import handleError from '../../utils/handleError';

const BrandAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);

  const { data: brands = [], isLoading } = useBrandsQuery();
  const updateBrand = useUpdateBrand();

  const filteredBrands = useMemo(() => {
    let filtered = brands;

    if (selectedType) {
      filtered = filtered.filter(brand => brand.type === selectedType);
    }

    if (searchTerm) {
      filtered = filtered.filter(brand =>
        brand.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        brand.brandKey?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    return filtered;
  }, [brands, searchTerm, selectedType]);

  const brandTypes = useMemo(() => {
    const types = [...new Set(brands.map(brand => brand.type))];
    return types.filter(Boolean);
  }, [brands]);

  const handleOpenForm = (brand) => {
    setEditingBrand(brand);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingBrand(null);
  };

  const handleFormSubmit = async (data, id) => {
    try {
      await updateBrand.mutateAsync({ id, data });
      handleCloseForm();
    } catch (error) {
      handleError(error);
    }
  };

  if (showForm) {
    return (
      <BrandForm
        editingBrand={editingBrand}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading brands...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Brand Management</h1>
          <p className="text-gray-600 mt-1">Update brand information</p>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search brands..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Types</option>
            {brandTypes.map(type => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Brands Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map((brand, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Brand Hero Image */}
            <div className="relative h-40 bg-gray-100">
              {brand.heroImage && (
                <img
                  src={assetUrl(brand.heroImage)}
                  alt={brand.name}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            {/* Brand Info */}
            <div className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  {brand.logo && (
                    <img
                      src={assetUrl(brand.logo)}
                      alt={`${brand.name} logo`}
                      className="h-12 w-auto object-contain mb-2"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  )}
                  <h3 className="text-lg font-semibold text-gray-900">{brand.name}</h3>
                  <p className="text-sm text-gray-500">{brand.brandKey}</p>
                </div>
              </div>

              <div className="mb-3">
                <span className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                  {brand.type}
                </span>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {brand.description}
              </p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-200">
                <div className="text-xs text-gray-500">
                  {brand.productTypes?.length || 0} product type{brand.productTypes?.length !== 1 ? 's' : ''}
                </div>
                <button
                  onClick={() => handleOpenForm(brand)}
                  className="text-blue-600 hover:text-blue-900 inline-flex items-center text-sm font-medium"
                  title="Edit brand"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBrands.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <p className="text-gray-500">
            {searchTerm || selectedType ? 'No brands found matching your filters' : 'No brands found'}
          </p>
        </div>
      )}
    </div>
  );
};

export default BrandAdmin;
