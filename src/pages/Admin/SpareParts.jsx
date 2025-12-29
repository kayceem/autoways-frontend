import { useState, useEffect } from 'react';
import { Save, X, Upload, Plus, Trash2, Edit2, ChevronDown, ChevronUp, Package } from 'lucide-react';
import toast from 'react-hot-toast';
import useSparepartsQuery from '../../hooks/useSparepartsQuery';
import { useUpdateSparePart, useCreateSparePart, useDeleteSparePart } from '../../hooks/useSparePartsMutation';
import { assetUrl } from '../../utils';
import handleError from '../../utils/handleError';

const SparePartsAdmin = () => {
  const { data: sparePartsData, isLoading, refetch } = useSparepartsQuery();
  const updateSparePart = useUpdateSparePart();
  const createSparePart = useCreateSparePart();
  const deleteSparePart = useDeleteSparePart();

  const [sparePartData, setSparePartData] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    banner: true,
    parts: false,
    services: false
  });

  const [editMode, setEditMode] = useState({
    banner: false,
    parts: false,
    services: false
  });

  const [sectionSnapshots, setSectionSnapshots] = useState({});

  const [formData, setFormData] = useState({
    image: '',
    description: '',
    parts: [],
    services: []
  });

  useEffect(() => {
    if (sparePartsData && sparePartsData.length > 0) {
      const data = sparePartsData[0];
      setSparePartData(data);
      setFormData({
        image: data.image || '',
        description: data.description || '',
        parts: data.parts || [],
        services: data.services || []
      });
    }
  }, [sparePartsData]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleEditSection = (section) => {
    const snapshot = {
      banner: { image: formData.image, description: formData.description },
      parts: [...formData.parts],
      services: [...formData.services]
    };

    setSectionSnapshots(prev => ({ ...prev, [section]: snapshot[section] }));
    setEditMode(prev => ({ ...prev, [section]: true }));
    setExpandedSections(prev => ({ ...prev, [section]: true }));
  };

  const handleCancelSection = (section) => {
    if (sectionSnapshots[section]) {
      if (section === 'banner') {
        setFormData(prev => ({
          ...prev,
          image: sectionSnapshots[section].image,
          description: sectionSnapshots[section].description
        }));
      } else {
        setFormData(prev => ({ ...prev, [section]: sectionSnapshots[section] }));
      }
    }
    setEditMode(prev => ({ ...prev, [section]: false }));
  };

  const handleSaveSection = async (section) => {
    try {
      const sectionData = {};

      if (section === 'banner') {
        sectionData.image = formData.image;
        sectionData.description = formData.description;
      } else {
        sectionData[section] = formData[section];
      }

      if (sparePartData?._id) {
        await updateSparePart.mutateAsync({
          id: sparePartData._id,
          data: sectionData
        });
      } else {
        await createSparePart.mutateAsync(formData);
      }

      setEditMode(prev => ({ ...prev, [section]: false }));
      await refetch();
    } catch (error) {
        handleError(error);
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

  const handleImageUpload = async (e, field, index = null) => {
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

      if (field === 'parts' && index !== null) {
        setFormData(prev => {
          const newParts = [...prev.parts];
          newParts[index] = { ...newParts[index], image: base64 };
          return { ...prev, parts: newParts };
        });
      } else if (field === 'image') {
        setFormData(prev => ({ ...prev, image: base64 }));
      }

      toast.success('Image uploaded successfully');
    } catch (error) {
        handleError(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayItemChange = (field, index, subField, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = { ...newArray[index], [subField]: value };
      return { ...prev, [field]: newArray };
    });
  };

  const handleAddPart = () => {
    setFormData(prev => ({
      ...prev,
      parts: [...prev.parts, { name: '', image: '' }]
    }));
  };

  const handleRemovePart = (index) => {
    setFormData(prev => ({
      ...prev,
      parts: prev.parts.filter((_, i) => i !== index)
    }));
  };

  const handleAddService = () => {
    const maxServiceId = formData.services.length > 0 
      ? Math.max(...formData.services.map(s => s.serviceId || 0))
      : 0;
    setFormData(prev => ({
      ...prev,
      services: [...prev.services, { serviceId: maxServiceId + 1, title: '' }]
    }));
  };

  const handleRemoveService = (index) => {
    setFormData(prev => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index)
    }));
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  const SectionHeader = ({ title, section, badge = null }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div
        className="flex items-center space-x-2 cursor-pointer flex-1"
        onClick={() => toggleSection(section)}
      >
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {badge && (
          <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
            {badge}
          </span>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {editMode[section] ? (
          <>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleCancelSection(section);
              }}
              className="px-3 py-1 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-1"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleSaveSection(section);
              }}
              disabled={updateSparePart.isPending || createSparePart.isPending}
              className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              <span>Save</span>
            </button>
          </>
        ) : (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleEditSection(section);
            }}
            className="px-3 py-1 text-sm border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors flex items-center space-x-1"
          >
            <Edit2 className="w-4 h-4" />
            <span>Edit</span>
          </button>
        )}
        <div className="cursor-pointer" onClick={() => toggleSection(section)}>
          {expandedSections[section] ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </div>
    </div>
  );

  const ImageUploadField = ({ label, imageSrc, onUpload, required = false }) => (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="flex items-start space-x-4">
        {imageSrc && (
          <img
            src={imageSrc.startsWith('data:') ? imageSrc : assetUrl(imageSrc)}
            alt={label}
            className="w-24 h-24 object-cover rounded-lg border border-gray-300"
          />
        )}
        <div className="flex-1">
          <input
            type="file"
            accept="image/*"
            onChange={onUpload}
            className="hidden"
            id="image-upload"
          />
          <label
            htmlFor="image-upload"
            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer"
          >
            <Upload className="w-4 h-4 mr-2" />
            {imageSrc ? 'Change Image' : 'Upload Image'}
          </label>
          <p className="text-xs text-gray-500 mt-1">Max 5MB</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Spares & Parts</h1>
          <p className="text-gray-600 mt-1">Manage your spare parts catalog</p>
        </div>
      </div>

      {/* Banner Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <SectionHeader title="Banner Information" section="banner" />
        {expandedSections.banner && (
          <div className="p-6 space-y-4">
            {editMode.banner ? (
              <>
                <ImageUploadField
                  label="Banner Image"
                  imageSrc={formData.image}
                  onUpload={(e) => handleImageUpload(e, 'image')}
                  required
                />
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter description for the spare parts section"
                  />
                </div>
              </>
            ) : (
              <>
                {formData.image && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Banner Image</p>
                    <img
                      src={assetUrl(formData.image)}
                      alt="Banner"
                      className="w-full max-w-2xl h-64 object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                )}
                {formData.description && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
                    <p className="text-gray-600 whitespace-pre-wrap">{formData.description}</p>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Parts Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <SectionHeader 
          title="Parts" 
          section="parts" 
          badge={formData.parts.length > 0 ? `${formData.parts.length} parts` : null}
        />
        {expandedSections.parts && (
          <div className="p-6">
            {editMode.parts ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-medium text-gray-700">Manage Parts</h4>
                  <button
                    type="button"
                    onClick={handleAddPart}
                    className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Part
                  </button>
                </div>

                {formData.parts.map((part, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <h5 className="text-sm font-medium text-gray-700">Part {part.name}</h5>
                      <button
                        type="button"
                        onClick={() => handleRemovePart(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Part Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={part.name}
                        onChange={(e) => handleArrayItemChange('parts', index, 'name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter part name"
                      />
                    </div>
                    <ImageUploadField
                      label={`Part Image ${index + 1}`}
                      imageSrc={part.image}
                      onUpload={(e) => handleImageUpload(e, 'parts', index)}
                      required
                    />
                  </div>
                ))}

                {formData.parts.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No parts added yet. Click "Add Part" to get started.</p>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Part ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Image
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.parts.map((part, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {part.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {part.image && (
                            <img
                              src={assetUrl(part.image)}
                              alt={`Part ${part.name}`}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {formData.parts.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No parts available</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Services Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <SectionHeader 
          title="Services" 
          section="services" 
          badge={formData.services.length > 0 ? `${formData.services.length} services` : null}
        />
        {expandedSections.services && (
          <div className="p-6">
            {editMode.services ? (
              <div className="space-y-4">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-medium text-gray-700">Manage Services</h4>
                  <button
                    type="button"
                    onClick={handleAddService}
                    className="inline-flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Service
                  </button>
                </div>

                {formData.services.map((service, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <div className="flex justify-between items-start">
                      <h5 className="text-sm font-medium text-gray-700">Service #{service.serviceId}</h5>
                      <button
                        type="button"
                        onClick={() => handleRemoveService(index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service ID <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="number"
                        value={service.serviceId}
                        onChange={(e) => handleArrayItemChange('services', index, 'serviceId', parseInt(e.target.value))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter service ID"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Title <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={service.title}
                        onChange={(e) => handleArrayItemChange('services', index, 'title', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="Enter service title"
                      />
                    </div>
                  </div>
                ))}

                {formData.services.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No services added yet. Click "Add Service" to get started.</p>
                )}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Service ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {formData.services.map((service, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          #{service.serviceId}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {service.title}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {formData.services.length === 0 && (
                  <p className="text-gray-500 text-center py-8">No services available</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SparePartsAdmin;
