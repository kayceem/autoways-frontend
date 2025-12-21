import { useState, useMemo } from 'react';
import { Plus, Edit, Trash2, Search, Globe, Mail, Phone } from 'lucide-react';
import useSisterCompaniesQuery from '../../hooks/useSisterCompaniesQuery';
import { useCreateSisterCompany, useUpdateSisterCompany, useDeleteSisterCompany } from '../../hooks/useSisterCompaniesMutation';
import SisterCompanyForm from './SisterCompanyForm';
import { assetUrl } from '../../utils';

const SisterCompaniesAdmin = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingCompany, setEditingCompany] = useState(null);

  const { data: companies = [], isLoading } = useSisterCompaniesQuery();
  const createCompany = useCreateSisterCompany();
  const updateCompany = useUpdateSisterCompany();
  const deleteCompany = useDeleteSisterCompany();

  // Get unique categories
  const categories = [...new Set(companies.map(company => company.category))].filter(Boolean);

const filteredCompanies = useMemo(() => {
  let filtered = companies;

  if (searchTerm) {
    const term = searchTerm.toLowerCase();
    filtered = filtered.filter(company =>
      company.name?.toLowerCase().includes(term) ||
      company.category?.toLowerCase().includes(term) ||
      company.tagline?.toLowerCase().includes(term)
    );
  }

  if (selectedCategory) {
    filtered = filtered.filter(
      company => company.category === selectedCategory
    );
  }

  return filtered;
}, [companies, searchTerm, selectedCategory]);


  const handleOpenForm = (company = null) => {
    setEditingCompany(company);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingCompany(null);
  };

  const handleFormSubmit = async (data, id) => {
    try {
      if (id) {
        await updateCompany.mutateAsync({ id, data });
      } else {
        await createCompany.mutateAsync(data);
      }
      handleCloseForm();
    } catch (error) {
      console.error('Submission error:', error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this sister company?')) {
      return;
    }

    try {
      await deleteCompany.mutateAsync(id);
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  if (showForm) {
    return (
      <SisterCompanyForm
        editingCompany={editingCompany}
        onClose={handleCloseForm}
        onSubmit={handleFormSubmit}
      />
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg text-gray-600">Loading sister companies...</div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Sister Companies</h1>
          <p className="text-gray-600 mt-1">Manage your sister companies</p>
        </div>
        <button
          onClick={() => handleOpenForm()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Sister Company</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search companies..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Companies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCompanies.map((company) => (
          <div
            key={company._id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
          >
            {/* Cover Image */}
            {company.image && (
              <div className="h-48 overflow-hidden bg-gray-100">
                <img
                  src={assetUrl(company.image)}
                  alt={company.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300';
                  }}
                />
              </div>
            )}

            <div className="p-6">
              {/* Logo and Name */}
              <div className="flex items-start space-x-4 mb-4">
                {company.logo && (
                  <img
                    src={assetUrl(company.logo)}
                    alt={`${company.name} logo`}
                    className="w-16 h-16 object-contain rounded-lg border border-gray-200"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/64';
                    }}
                  />
                )}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 truncate">
                    {company.name}
                  </h3>
                  <p className="text-sm text-gray-600">{company.tagline}</p>
                  <span className="inline-block mt-1 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded">
                    {company.category}
                  </span>
                </div>
              </div>

              {/* Description */}
              <p className="text-sm text-gray-700 mb-4 line-clamp-3">
                {company.description}
              </p>

              {/* Services */}
              {company.services && company.services.length > 0 && (
                <div className="mb-4">
                  <p className="text-xs font-medium text-gray-500 mb-2">SERVICES</p>
                  <div className="flex flex-wrap gap-1">
                    {company.services.slice(0, 3).map((service, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded"
                      >
                        {service}
                      </span>
                    ))}
                    {company.services.length > 3 && (
                      <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        +{company.services.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              )}

              {/* Contact Info */}
              {company.contact && (
                <div className="space-y-2 mb-4 text-xs text-gray-600">
                  {company.contact.email && (
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4" />
                      <span className="truncate">{company.contact.email}</span>
                    </div>
                  )}
                  {company.contact.phone && (
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4" />
                      <span>{company.contact.phone}</span>
                    </div>
                  )}
                  {company.contact.website && (
                    <div className="flex items-center space-x-2">
                      <Globe className="w-4 h-4" />
                      <a
                        href={company.contact.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline truncate"
                      >
                        {company.contact.website.replace(/^https?:\/\//, '')}
                      </a>
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-end space-x-2 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleOpenForm(company)}
                  className="text-blue-600 hover:text-blue-900 p-2 rounded hover:bg-blue-50 transition-colors"
                  title="Edit company"
                >
                  <Edit className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(company._id)}
                  className="text-red-600 hover:text-red-900 p-2 rounded hover:bg-red-50 transition-colors"
                  title="Delete company"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCompanies.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-gray-500">
            {searchTerm || selectedCategory
              ? 'No sister companies found matching your filters'
              : 'No sister companies found. Click "Add Sister Company" to create one.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default SisterCompaniesAdmin;
