import { useState, useContext, useEffect } from 'react';
import { Save, Trash, Plus, Trash2, Edit2, MapPin } from 'lucide-react';
import toast from 'react-hot-toast';
import { ContentContext } from '../../context/globalContext';
import { useCreateLocation, useUpdateLocation, useDeleteLocation } from '../../hooks/useLocationsMutation';
import handleError from '../../utils/handleError';

const LocationsAdmin = () => {
  const { content, isLoading, refetch } = useContext(ContentContext);
  const createLocation = useCreateLocation();
  const updateLocation = useUpdateLocation();
  const deleteLocation = useDeleteLocation();

  const [locations, setLocations] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({
    locationId: '',
    name: '',
    position: ['', ''],
    address: '',
    info: '',
    phone: ''
  });

  useEffect(() => {
    if (content?.locations) {
      setLocations(content.locations);
    }
  }, [content]);

  const resetForm = () => {
    setFormData({
      locationId: '',
      name: '',
      position: ['', ''],
      address: '',
      info: '',
      phone: ''
    });
    setEditingId(null);
    setIsCreating(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePositionChange = (index, value) => {
    setFormData(prev => {
      const newPosition = [...prev.position];
      newPosition[index] = value;
      return { ...prev, position: newPosition };
    });
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    // Generate next locationId
    const maxId = locations.length > 0
      ? Math.max(...locations.map(loc => loc.locationId))
      : 0;
    setFormData({
      locationId: maxId + 1,
      name: '',
      position: ['', ''],
      address: '',
      info: '',
      phone: ''
    });
  };

  const handleEdit = (location) => {
    setIsCreating(false);
    setEditingId(location._id);
    setFormData({
      locationId: location.locationId,
      name: location.name,
      position: location.position || ['', ''],
      address: location.address,
      info: location.info,
      phone: location.phone
    });
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.name || !formData.address || !formData.info || !formData.phone) {
      handleError('Please fill in all required fields');
      return;
    }

    // Validate position
    const lat = parseFloat(formData.position[0]);
    const lng = parseFloat(formData.position[1]);

    if (isNaN(lat) || isNaN(lng)) {
      handleError('Please enter valid latitude and longitude');
      return;
    }

    if (lat < -90 || lat > 90) {
      handleError('Latitude must be between -90 and 90');
      return;
    }

    if (lng < -180 || lng > 180) {
      handleError('Longitude must be between -180 and 180');
      return;
    }

    const submitData = {
      ...formData,
      position: [lat, lng]
    };

    try {
      if (isCreating) {
        await createLocation.mutateAsync(submitData);
      } else {
        await updateLocation.mutateAsync({
          id: editingId,
          data: submitData
        });
      }
      await refetch();
      resetForm();
    } catch (error) {
        handleError(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this location? This action cannot be undone.')) {
      try {
        await deleteLocation.mutateAsync(id);
        await refetch();
        if (editingId === id) {
          resetForm();
        }
      } catch (error) {
        handleError(error);
      }
    }
  };

  const handleCancel = () => {
    resetForm();
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  const isFormActive = isCreating || editingId !== null;

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Locations Management</h1>
            <p className="text-gray-600 mt-1">Manage your business locations</p>
          </div>
          {!isFormActive && (
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Location</span>
            </button>
          )}
        </div>
      </div>

      {/* Form Section */}
      {isFormActive && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {isCreating ? 'Create New Location' : 'Edit Location'}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Location ID (read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location ID
              </label>
              <input
                type="number"
                value={formData.locationId}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Auto-generated</p>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Location Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Main Office, Branch Office, Warehouse"
                required
              />
            </div>

            {/* Position (Coordinates) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coordinates <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    step="any"
                    value={formData.position[0]}
                    onChange={(e) => handlePositionChange(0, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Latitude (e.g., 27.7172)"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Latitude (-90 to 90)</p>
                </div>
                <div>
                  <input
                    type="number"
                    step="any"
                    value={formData.position[1]}
                    onChange={(e) => handlePositionChange(1, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Longitude (e.g., 85.3240)"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">Longitude (-180 to 180)</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address <span className="text-red-500">*</span>
              </label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Full address of the location"
                required
              />
            </div>

            {/* Info */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Information <span className="text-red-500">*</span>
              </label>
              <textarea
                name="info"
                value={formData.info}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Additional information about this location"
                required
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+977-1-234567"
                required
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <Trash className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={createLocation.isPending || updateLocation.isPending}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{isCreating ? 'Create Location' : 'Update Location'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Locations List */}
      <div className="space-y-4">
        {locations.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
            <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 mb-2">No locations found</p>
            <p className="text-sm text-gray-400 mb-4">Get started by adding your first location</p>
            {!isFormActive && (
              <button
                onClick={handleCreate}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
              >
                <Plus className="w-4 h-4" />
                <span>Add Location</span>
              </button>
            )}
          </div>
        ) : (
          locations.map((location, index) => (
            <div
              key={index}
              className={`bg-white rounded-lg shadow-sm border border-gray-200 p-6 transition-all ${
                editingId === location._id ? 'ring-2 ring-blue-500 border-blue-500' : ''
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <MapPin className="w-5 h-5 text-blue-600" />
                    <h3 className="text-lg font-semibold text-gray-900">{location.name}</h3>
                    <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                      ID: {location.locationId}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="font-medium text-gray-700">Address:</span>
                      <p className="text-gray-600 mt-1">{location.address}</p>
                    </div>

                    <div>
                      <span className="font-medium text-gray-700">Information:</span>
                      <p className="text-gray-600 mt-1">{location.info}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="font-medium text-gray-700">Phone:</span>
                        <p className="text-gray-600">{location.phone}</p>
                      </div>
                      <div>
                        <span className="font-medium text-gray-700">Coordinates:</span>
                        <p className="text-gray-600">
                          {location.position?.[0]}, {location.position?.[1]}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {!isFormActive && (
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(location)}
                      className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-1"
                    >
                      <Edit2 className="w-4 h-4" />
                      <span>Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(location._id)}
                      disabled={deleteLocation.isPending}
                      className="px-3 py-2 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors flex items-center space-x-1 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LocationsAdmin;
