import { useState } from 'react';
import { Save, Trash2, Upload, Plus, Edit2, X, Users } from 'lucide-react';
import toast from 'react-hot-toast';
import useClientsQuery from '../../hooks/useClientsQuery';
import { useCreateClient, useUpdateClient, useDeleteClient } from '../../hooks/useClientsMutation';
import { assetUrl } from '../../utils';
import handleError from '../../utils/handleError';
import LoadingSpinner from '../../components/common/Loading';

const ClientsAdmin = () => {
  const { data: clients, isLoading, refetch } = useClientsQuery();
  const createClient = useCreateClient();
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();

  const [editingClient, setEditingClient] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: '', logo: '' });

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      handleError('Image must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      handleError('Only image files are allowed');
      return;
    }

    try {
      const base64 = await convertToBase64(file);
      setFormData(prev => ({ ...prev, logo: base64 }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      handleError(error);
    }
  };

  const handleEdit = (client) => {
    setEditingClient(client._id);
    setFormData({ name: client.name, logo: client.logo });
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingClient(null);
    setFormData({ name: '', logo: '' });
  };

  const handleCancel = () => {
    setEditingClient(null);
    setIsCreating(false);
    setFormData({ name: '', logo: '' });
  };

  const handleSave = async () => {
    if (!formData.name.trim()) {
      handleError('Client name is required');
      return;
    }

    if (!formData.logo) {
      handleError('Client logo is required');
      return;
    }

    try {
      if (isCreating) {
        await createClient.mutateAsync(formData);
      } else {
        await updateClient.mutateAsync({ id: editingClient, data: formData });
      }
      handleCancel();
      await refetch();
    } catch (error) {
      handleError(error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this client?')) return;

    try {
      await deleteClient.mutateAsync(id);
      await refetch();
    } catch (error) {
      handleError(error);
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Clients</h1>
          <p className="text-gray-600 mt-1">Manage your client logos</p>
        </div>
        <button
          type="button"
          onClick={handleCreate}
          disabled={isCreating || editingClient}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Client
        </button>
      </div>

      {/* Create/Edit Form */}
      {(isCreating || editingClient) && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              {isCreating ? 'Add New Client' : 'Edit Client'}
            </h2>
            <button
              type="button"
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Client Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter client name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo <span className="text-red-500">*</span>
              </label>
              <div className="flex items-start space-x-4">
                {formData.logo && (
                  <img
                    src={formData.logo.startsWith('data:') ? formData.logo : assetUrl(formData.logo)}
                    alt="Client logo"
                    className="w-24 h-24 object-contain rounded-lg border border-gray-300 bg-gray-50"
                  />
                )}
                <div className="flex-1">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label
                    htmlFor="logo-upload"
                    className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
                  >
                    <Upload className="w-4 h-4 mr-2" />
                    {formData.logo ? 'Change Logo' : 'Upload Logo'}
                  </label>
                  <p className="text-xs text-gray-500 mt-1">Max 5MB</p>
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={createClient.isPending || updateClient.isPending}
                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center disabled:opacity-50"
              >
                <Save className="w-4 h-4 mr-2" />
                {isCreating ? 'Create' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clients Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-gray-500" />
            <h3 className="text-lg font-semibold text-gray-900">All Clients</h3>
            {clients && clients.length > 0 && (
              <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
                {clients.length} clients
              </span>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Logo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created At
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {clients && clients.map((client) => (
                <tr key={client._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    {client.logo && (
                      <img
                        src={assetUrl(client.logo)}
                        alt={client.name}
                        className="w-16 h-16 object-contain rounded bg-gray-50"
                      />
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {client.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(client.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(client)}
                        disabled={isCreating || editingClient}
                        className="text-blue-600 hover:text-blue-700 disabled:opacity-50"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(client._id)}
                        disabled={deleteClient.isPending}
                        className="text-red-600 hover:text-red-700 disabled:opacity-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {(!clients || clients.length === 0) && (
            <p className="text-gray-500 text-center py-8">No clients available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClientsAdmin;
