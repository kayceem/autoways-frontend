import { useState, useContext, useEffect } from 'react';
import { Save, X, Plus, Trash2, Edit2, Upload, Award } from 'lucide-react';
import toast from 'react-hot-toast';
import { ContentContext } from '../../context/globalContext';
import { useCreateCSRInitiative, useUpdateCSRInitiative, useDeleteCSRInitiative } from '../../hooks/useCSRMutation';
import { assetUrl } from '../../utils';

const CSRInitiativesAdmin = () => {
  const { content, isLoading, refetch } = useContext(ContentContext);
  const createCSRInitiative = useCreateCSRInitiative();
  const updateCSRInitiative = useUpdateCSRInitiative();
  const deleteCSRInitiative = useDeleteCSRInitiative();

  const [initiatives, setInitiatives] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    initiativeId: '',
    title: '',
    category: '',
    description: '',
    impactMetric: '',
    impactLabel: '',
    activities: ['']
  });

  useEffect(() => {
    if (content?.csr?.initiatives) {
      setInitiatives(content.csr.initiatives);
    }
  }, [content]);

  const resetForm = () => {
    setFormData({
      initiativeId: '',
      title: '',
      category: '',
      description: '',
      impactMetric: '',
      impactLabel: '',
      activities: ['']
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setIsCreating(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleActivityChange = (index, value) => {
    setFormData(prev => {
      const newActivities = [...prev.activities];
      newActivities[index] = value;
      return { ...prev, activities: newActivities };
    });
  };

  const addActivity = () => {
    setFormData(prev => ({
      ...prev,
      activities: [...prev.activities, '']
    }));
  };

  const removeActivity = (index) => {
    if (formData.activities.length > 1) {
      setFormData(prev => ({
        ...prev,
        activities: prev.activities.filter((_, i) => i !== index)
      }));
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      const convertToBase64 = (file) => {
            return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
            });
        };
      const base64 = await convertToBase64(file);

      setImageFile(base64);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    const maxId = initiatives.length > 0
      ? Math.max(...initiatives.map(init => init.initiativeId))
      : 0;
    setFormData({
      initiativeId: maxId + 1,
      title: '',
      category: '',
      description: '',
      impactMetric: '',
      impactLabel: '',
      activities: ['']
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleEdit = (initiative) => {
    setIsCreating(false);
    setEditingId(initiative._id);
    setFormData({
      initiativeId: initiative.initiativeId,
      title: initiative.title || '',
      category: initiative.category || '',
      description: initiative.description || '',
      impactMetric: initiative.impact?.metric || '',
      impactLabel: initiative.impact?.label || '',
      activities: initiative.activities?.length > 0 ? initiative.activities : ['']
    });
    setImagePreview(assetUrl(initiative.image));
    setImageFile(null);
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.title || !formData.category || !formData.description) {
      toast.error('Title, category, and description are required');
      return;
    }

    if (isCreating && !imageFile) {
      toast.error('Please select an image');
      return;
    }

    // Filter out empty activities
    const filteredActivities = formData.activities.filter(act => act.trim() !== '');
    if (filteredActivities.length === 0) {
      toast.error('At least one activity is required');
      return;
    }

    try {
      const submitData = {
        initiativeId: formData.initiativeId,
        title: formData.title,
        category: formData.category,
        description: formData.description,
        impact: formData.impactMetric || formData.impactLabel ? {
          metric: formData.impactMetric,
          label: formData.impactLabel
        } : null,
        activities: filteredActivities
      };

      if (imageFile) {
        submitData.append('image', imageFile);
      }

    //   submitData.append('initiativeId', formData.initiativeId);
    //   submitData.append('title', formData.title);
    //   submitData.append('category', formData.category);
    //   submitData.append('description', formData.description);

    //   if (formData.impactMetric || formData.impactLabel) {
    //     submitData.append('impact', JSON.stringify({
    //       metric: formData.impactMetric,
    //       label: formData.impactLabel
    //     }));
    //   }

    //   submitData.append('activities', JSON.stringify(filteredActivities));

      if (isCreating) {
        await createCSRInitiative.mutateAsync(submitData);
      } else {
        await updateCSRInitiative.mutateAsync({
          id: editingId,
          data: submitData
        });
      }

      await refetch();
      resetForm();
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this CSR initiative? This action cannot be undone.')) {
      try {
        await deleteCSRInitiative.mutateAsync(id);
        await refetch();
        if (editingId === id) {
          resetForm();
        }
      } catch (error) {
        console.error('Delete failed:', error);
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
            <h1 className="text-3xl font-bold text-gray-900">CSR Initiatives</h1>
            <p className="text-gray-600 mt-1">Manage Corporate Social Responsibility initiatives</p>
          </div>
          {!isFormActive && (
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add CSR Initiative</span>
            </button>
          )}
        </div>
      </div>

      {/* Form Section */}
      {isFormActive && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {isCreating ? 'Create New CSR Initiative' : 'Edit CSR Initiative'}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Initiative ID (read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initiative ID
              </label>
              <input
                type="number"
                value={formData.initiativeId}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Auto-generated</p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Initiative Image <span className="text-red-500">*</span>
              </label>

              {imagePreview && (
                <div className="mb-4">
                  <div className="w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-4">
                <label className="flex items-center space-x-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                  <Upload className="w-4 h-4 text-gray-700" />
                  <span className="text-sm text-gray-700">
                    {imageFile ? 'Change Image' : isCreating ? 'Upload Image' : 'Upload New Image'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
                {imageFile && (
                  <span className="text-sm text-gray-600">
                    {imageFile.name}
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Max file size: 5MB. Formats: JPG, PNG, WebP
              </p>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Initiative title"
                required
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="e.g., Education, Environment, Healthcare"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Detailed description of the initiative"
                required
              />
            </div>

            {/* Impact */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Impact Metric
                </label>
                <input
                  type="text"
                  name="impactMetric"
                  value={formData.impactMetric}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., 1000+"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Impact Label
                </label>
                <input
                  type="text"
                  name="impactLabel"
                  value={formData.impactLabel}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., Students Benefited"
                />
              </div>
            </div>

            {/* Activities */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Key Activities <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                {formData.activities.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={activity}
                      onChange={(e) => handleActivityChange(index, e.target.value)}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Activity ${index + 1}`}
                    />
                    {formData.activities.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeActivity(index)}
                        className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addActivity}
                  className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Activity</span>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={createCSRInitiative.isPending || updateCSRInitiative.isPending}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{isCreating ? 'Create Initiative' : 'Update Initiative'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CSR Initiatives Table */}
      {initiatives.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Award className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No CSR initiatives found</p>
          <p className="text-sm text-gray-400 mb-4">Get started by adding your first CSR initiative</p>
          {!isFormActive && (
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add CSR Initiative</span>
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Impact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Activities
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {initiatives.map((initiative) => (
                  <tr
                    key={initiative._id}
                    className={`hover:bg-gray-50 transition-colors ${
                      editingId === initiative._id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-20 w-32 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={assetUrl(initiative.image)}
                          alt={initiative.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{initiative.title}</div>
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {initiative.description}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                        {initiative.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      {initiative.impact?.metric ? (
                        <div className="text-sm">
                          <div className="font-medium text-gray-900">{initiative.impact.metric}</div>
                          <div className="text-gray-600">{initiative.impact.label}</div>
                        </div>
                      ) : (
                        <span className="text-gray-400">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600">
                        {initiative.activities?.length || 0} activities
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {!isFormActive && (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(initiative)}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(initiative._id)}
                            disabled={deleteCSRInitiative.isPending}
                            className="inline-flex items-center px-3 py-1 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Delete
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSRInitiativesAdmin;
