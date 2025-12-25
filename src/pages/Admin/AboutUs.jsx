import { useState, useContext, useEffect } from 'react';
import { Save, X, Upload, Plus, Trash2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { ContentContext } from '../../context/globalContext';
import { useUpdateAboutUs } from '../../hooks/useAboutUsMutation';
import { assetUrl } from '../../utils';

const AboutUsAdmin = () => {
  const { content, isLoading, refetch } = useContext(ContentContext);
  const updateAboutUs = useUpdateAboutUs();
  const [aboutData, setAboutData] = useState(null);
  const [activeTab, setActiveTab] = useState('basic');
  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    mission: false,
    vision: false,
    values: false,
    milestones: false,
    chairman: false,
    md: false,
    team: false,
    certifications: false,
    awards: false,
    stats: false
  });

  const [editMode, setEditMode] = useState({
    basic: false,
    mission: false,
    vision: false,
    values: false,
    milestones: false,
    chairman: false,
    md: false,
    team: false,
    certifications: false,
    awards: false,
    stats: false
  });

  const [sectionSnapshots, setSectionSnapshots] = useState({});

  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: '',
    mission: { title: '', content: '', icon: '' },
    vision: { title: '', content: '', icon: '' },
    values: [],
    milestones: [],
    chairman_message: { title: '', name: '', position: '', image: '', message: '' },
    md_message: { title: '', name: '', position: '', image: '', message: '' },
    team: [],
    certifications: [],
    awards: [],
    stats: {
      yearsOfExperience: '',
      employees: '',
      brands: '',
      serviceCenters: '',
      happyCustomers: '',
      vehiclesSold: ''
    }
  });

  useEffect(() => {
    if (content?.aboutUs && content.aboutUs?.length > 0) {
      const about = content.aboutUs[0];
      setAboutData(about);
      setFormData({
        title: about.title || '',
        content: about.content || '',
        image: about.image || '',
        mission: about.mission || { title: '', content: '', icon: '' },
        vision: about.vision || { title: '', content: '', icon: '' },
        values: about.values || [],
        milestones: about.milestones || [],
        chairman_message: about.chairman_message || { title: '', name: '', position: '', image: '', message: '' },
        md_message: about.md_message || { title: '', name: '', position: '', image: '', message: '' },
        team: about.team || [],
        certifications: about.certifications || [],
        awards: about.awards || [],
        stats: about.stats || {
          yearsOfExperience: '',
          employees: '',
          brands: '',
          serviceCenters: '',
          happyCustomers: '',
          vehiclesSold: ''
        }
      });
    }
  }, [content]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Deep clone helper function to ensure snapshots are independent
  const deepClone = (obj) => {
    if (obj === null || typeof obj !== 'object') return obj;
    if (obj instanceof Date) return new Date(obj.getTime());
    if (Array.isArray(obj)) return obj.map(item => deepClone(item));
    const clonedObj = {};
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        clonedObj[key] = deepClone(obj[key]);
      }
    }
    return clonedObj;
  };

  // Validation functions for each section
  const validateSection = (section) => {
    switch (section) {
      case 'basic':
        return !!(formData.title?.trim() && formData.content?.trim() && formData.image);

      case 'mission':
        return !!(formData.mission?.title?.trim() && formData.mission?.content?.trim());

      case 'vision':
        return !!(formData.vision?.title?.trim() && formData.vision?.content?.trim());

      case 'values':
        return formData.values?.every(v => v.title?.trim() && v.description?.trim());

      case 'milestones':
        return formData.milestones?.every(m =>
          m.year?.trim() && m.title?.trim() && m.description?.trim() && m.image
        );

      case 'chairman':
        return !!(
          formData.chairman_message?.title?.trim() &&
          formData.chairman_message?.name?.trim() &&
          formData.chairman_message?.position?.trim() &&
          formData.chairman_message?.message?.trim() &&
          formData.chairman_message?.image
        );

      case 'md':
        return !!(
          formData.md_message?.title?.trim() &&
          formData.md_message?.name?.trim() &&
          formData.md_message?.position?.trim() &&
          formData.md_message?.message?.trim() &&
          formData.md_message?.image
        );

      case 'team':
        return formData.team?.every(t =>
          t.name?.trim() && t.position?.trim() && t.department?.trim() && t.image
          // email, phone, bio are optional
        );

      case 'certifications':
        return formData.certifications?.every(c =>
          c.name?.trim() && c.issuedBy?.trim() && c.year?.trim() && c.description?.trim() && c.image
        );

      case 'awards':
        return formData.awards?.every(a =>
          a.title?.trim() && a.year?.trim() && a.issuedBy?.trim() && a.description?.trim() && a.image
        );

      case 'stats':
        // Stats are all optional, so always return true
        return true;

      default:
        return true;
    }
  };

  const handleEditSection = (section) => {
    // Save snapshot of current section data with deep cloning
    const snapshot = {
      basic: { title: formData.title, content: formData.content, image: formData.image },
      mission: deepClone(formData.mission),
      vision: deepClone(formData.vision),
      values: deepClone(formData.values),
      milestones: deepClone(formData.milestones),
      chairman: deepClone(formData.chairman_message),
      md: deepClone(formData.md_message),
      team: deepClone(formData.team),
      certifications: deepClone(formData.certifications),
      awards: deepClone(formData.awards),
      stats: deepClone(formData.stats)
    };

    setSectionSnapshots(prev => ({ ...prev, [section]: snapshot[section] }));
    setEditMode(prev => ({ ...prev, [section]: true }));
    setExpandedSections(prev => ({ ...prev, [section]: true }));
  };

  const handleCancelSection = (section) => {
    // Restore from snapshot
    if (sectionSnapshots[section]) {
      if (section === 'basic') {
        setFormData(prev => ({
          ...prev,
          title: sectionSnapshots[section].title,
          content: sectionSnapshots[section].content,
          image: sectionSnapshots[section].image
        }));
      } else if (section === 'chairman') {
        setFormData(prev => ({ ...prev, chairman_message: sectionSnapshots[section] }));
      } else if (section === 'md') {
        setFormData(prev => ({ ...prev, md_message: sectionSnapshots[section] }));
      } else {
        setFormData(prev => ({ ...prev, [section]: sectionSnapshots[section] }));
      }
    }
    setEditMode(prev => ({ ...prev, [section]: false }));
  };

  const handleSaveSection = async (section) => {
    try {
      // Prepare data for only this section
      const sectionData = {};

      if (section === 'basic') {
        sectionData.title = formData.title;
        sectionData.content = formData.content;
        sectionData.image = formData.image;
      } else if (section === 'chairman') {
        sectionData.chairman_message = formData.chairman_message;
      } else if (section === 'md') {
        sectionData.md_message = formData.md_message;
      } else {
        sectionData[section] = formData[section];
      }

      await updateAboutUs.mutateAsync({
        id: aboutData._id,
        data: sectionData
      });

      setEditMode(prev => ({ ...prev, [section]: false }));
      await refetch();
    } catch (error) {
      console.error('Update failed:', error);
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

  const handleImageUpload = async (e, field, subField = null, index = null) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be less than 5MB');
      return;
    }

    if (!file.type.startsWith('image/')) {
      toast.error('Only image files are allowed');
      return;
    }

    try {
      const base64 = await convertToBase64(file);

      if (subField && index !== null) {
        setFormData(prev => {
          const newArray = [...prev[field]];
          newArray[index] = { ...newArray[index], [subField]: base64 };
          return { ...prev, [field]: newArray };
        });
      } else if (subField) {
        setFormData(prev => ({
          ...prev,
          [field]: { ...prev[field], [subField]: base64 }
        }));
      } else {
        setFormData(prev => ({ ...prev, [field]: base64 }));
      }
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error uploading image');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (field, subField, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], [subField]: value }
    }));
  };

  const handleArrayItemChange = (field, index, subField, value) => {
    setFormData(prev => {
      const newArray = [...prev[field]];
      newArray[index] = { ...newArray[index], [subField]: value };
      return { ...prev, [field]: newArray };
    });
  };

  const handleAddArrayItem = (field, template) => {
    setFormData(prev => ({
      ...prev,
      [field]: [...prev[field], template]
    }));
  };

  const handleRemoveArrayItem = (field, index) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index)
    }));
  };


  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (!aboutData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 mb-4">No About Us content found</p>
        <p className="text-sm text-gray-400">Please contact your system administrator to create About Us content.</p>
      </div>
    );
  }

  const SectionHeader = ({ title, section, badge = null }) => {
    const isSaveDisabled = editMode[section] && !validateSection(section);

    return (
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div
          className="flex items-center space-x-2 cursor-pointer flex-1"
          onClick={() => toggleSection(section)}
        >
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {badge !== null && badge !== undefined && (
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
                disabled={updateAboutUs.isPending || isSaveDisabled}
                className="px-3 py-1 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1 disabled:opacity-50 disabled:cursor-not-allowed"
                title={isSaveDisabled ? 'Please fill all required fields' : ''}
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
  };

  const ImageUploadField = ({ label, imageSrc, onUpload, required = false, uniqueId }) => {
    // Generate a truly unique ID using timestamp and random number if uniqueId not provided
    const inputId = uniqueId || `upload-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    return (
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
              id={inputId}
            />
            <label
              htmlFor={inputId}
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
  };

  const tabs = [
    { id: 'basic', name: 'Basic & Mission/Vision', count: null },
    { id: 'values', name: 'Values', count: formData.values?.length || 0 },
    { id: 'milestones', name: 'Milestones', count: formData.milestones?.length || 0 },
    { id: 'leadership', name: 'Leadership', count: null },
    { id: 'team', name: 'Team', count: formData.team?.length || 0 },
    { id: 'achievements', name: 'Certifications & Awards', count: (formData.certifications?.length || 0) + (formData.awards?.length || 0) },
    { id: 'stats', name: 'Statistics', count: null }
  ];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">About Us Management</h1>
        <p className="text-gray-600 mt-1">Manage all About Us page content</p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 overflow-x-auto" aria-label="Tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                  ${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }
                `}
              >
                {tab.name}
                {tab.count !== null && (
                  <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${
                    activeTab === tab.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>
      </div>

      <div className="space-y-6">
        {/* Basic & Mission/Vision Tab */}
        {activeTab === 'basic' && (
          <>
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
              <SectionHeader title="Basic Information" section="basic" />
          {expandedSections.basic && (
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  disabled={!editMode.basic}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  disabled={!editMode.basic}
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                />
              </div>

              {editMode.basic && (
                <ImageUploadField
                  label="Main Image"
                  imageSrc={formData.image}
                  onUpload={(e) => handleImageUpload(e, 'image')}
                  required
                  uniqueId="upload-basic-image"
                />
              )}
              {!editMode.basic && formData.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Main Image
                  </label>
                  <img
                    src={formData.image.startsWith('data:') ? formData.image : assetUrl(formData.image)}
                    alt="Main"
                    className="w-48 h-48 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mission */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Mission" section="mission" />
          {expandedSections.mission && (
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.mission.title}
                  onChange={(e) => handleNestedChange('mission', 'title', e.target.value)}
                  disabled={!editMode.mission}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.mission.content}
                  onChange={(e) => handleNestedChange('mission', 'content', e.target.value)}
                  disabled={!editMode.mission}
                  rows="4"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          )}
        </div>

        {/* Vision */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Vision" section="vision" />
          {expandedSections.vision && (
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.vision.title}
                  onChange={(e) => handleNestedChange('vision', 'title', e.target.value)}
                  disabled={!editMode.vision}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Content <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.vision.content}
                  onChange={(e) => handleNestedChange('vision', 'content', e.target.value)}
                  disabled={!editMode.vision}
                  rows="4"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
              </div>
            </div>
          )}
        </div>
          </>
        )}

        {/* Values Tab */}
        {activeTab === 'values' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Values" section="values" badge={formData.values.length} />
          {expandedSections.values && (
            <div className="p-6 space-y-4">
              {editMode.values && (
                <button
                  type="button"
                  onClick={() => handleAddArrayItem('values', { valueId: Date.now(), title: '', description: '', icon: '' })}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Value</span>
                </button>
              )}

              {formData.values.map((value, index) => (
                <div key={value.valueId || index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">Value {index + 1}</h4>
                    {editMode.values && (
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem('values', index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Title"
                      value={value.title}
                      onChange={(e) => handleArrayItemChange('values', index, 'title', e.target.value)}
                      disabled={!editMode.values}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      placeholder="Description"
                      value={value.description}
                      onChange={(e) => handleArrayItemChange('values', index, 'description', e.target.value)}
                      disabled={!editMode.values}
                      rows="2"
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        )}

        {/* Milestones Tab */}
        {activeTab === 'milestones' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Milestones" section="milestones" badge={formData.milestones.length} />
          {expandedSections.milestones && (
            <div className="p-6 space-y-4">
              {editMode.milestones && (
                <button
                  type="button"
                  onClick={() => handleAddArrayItem('milestones', { id: Date.now(), year: '', title: '', description: '', image: '' })}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Milestone</span>
                </button>
              )}

              {formData.milestones.map((milestone, index) => (
                <div key={milestone.id || index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">Milestone {index + 1}</h4>
                    {editMode.milestones && (
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem('milestones', index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Year"
                    value={milestone.year}
                    onChange={(e) => handleArrayItemChange('milestones', index, 'year', e.target.value)}
                    disabled={!editMode.milestones}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <input
                    type="text"
                    placeholder="Title"
                    value={milestone.title}
                    onChange={(e) => handleArrayItemChange('milestones', index, 'title', e.target.value)}
                    disabled={!editMode.milestones}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <textarea
                    placeholder="Description"
                    value={milestone.description}
                    onChange={(e) => handleArrayItemChange('milestones', index, 'description', e.target.value)}
                    disabled={!editMode.milestones}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  {editMode.milestones && (
                    <ImageUploadField
                      label={`Milestone ${index + 1} Image`}
                      imageSrc={milestone.image}
                      onUpload={(e) => handleImageUpload(e, 'milestones', 'image', index)}
                      uniqueId={`upload-milestone-${index}`}
                    />
                  )}
                  {!editMode.milestones && milestone.image && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                      <img
                        src={milestone.image.startsWith('data:') ? milestone.image : assetUrl(milestone.image)}
                        alt={`Milestone ${index + 1}`}
                        className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        )}

        {/* Leadership Tab (Chairman & MD) */}
        {activeTab === 'leadership' && (
          <>
        {/* Chairman Message */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Chairman's Message" section="chairman" />
          {expandedSections.chairman && (
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.chairman_message.title}
                onChange={(e) => handleNestedChange('chairman_message', 'title', e.target.value)}
                disabled={!editMode.chairman}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <input
                type="text"
                placeholder="Name"
                value={formData.chairman_message.name}
                onChange={(e) => handleNestedChange('chairman_message', 'name', e.target.value)}
                disabled={!editMode.chairman}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <input
                type="text"
                placeholder="Position"
                value={formData.chairman_message.position}
                onChange={(e) => handleNestedChange('chairman_message', 'position', e.target.value)}
                disabled={!editMode.chairman}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <textarea
                placeholder="Message"
                value={formData.chairman_message.message}
                onChange={(e) => handleNestedChange('chairman_message', 'message', e.target.value)}
                disabled={!editMode.chairman}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              {editMode.chairman && (
                <ImageUploadField
                  label="Chairman Photo"
                  imageSrc={formData.chairman_message.image}
                  onUpload={(e) => handleImageUpload(e, 'chairman_message', 'image')}
                  uniqueId="upload-chairman-image"
                />
              )}
              {!editMode.chairman && formData.chairman_message.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Chairman Photo</label>
                  <img
                    src={formData.chairman_message.image.startsWith('data:') ? formData.chairman_message.image : assetUrl(formData.chairman_message.image)}
                    alt="Chairman"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* MD Message */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Managing Director's Message" section="md" />
          {expandedSections.md && (
            <div className="p-6 space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.md_message.title}
                onChange={(e) => handleNestedChange('md_message', 'title', e.target.value)}
                disabled={!editMode.md}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <input
                type="text"
                placeholder="Name"
                value={formData.md_message.name}
                onChange={(e) => handleNestedChange('md_message', 'name', e.target.value)}
                disabled={!editMode.md}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <input
                type="text"
                placeholder="Position"
                value={formData.md_message.position}
                onChange={(e) => handleNestedChange('md_message', 'position', e.target.value)}
                disabled={!editMode.md}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              <textarea
                placeholder="Message"
                value={formData.md_message.message}
                onChange={(e) => handleNestedChange('md_message', 'message', e.target.value)}
                disabled={!editMode.md}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
              {editMode.md && (
                <ImageUploadField
                  label="MD Photo"
                  imageSrc={formData.md_message.image}
                  onUpload={(e) => handleImageUpload(e, 'md_message', 'image')}
                  uniqueId="upload-md-image"
                />
              )}
              {!editMode.md && formData.md_message.image && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">MD Photo</label>
                  <img
                    src={formData.md_message.image.startsWith('data:') ? formData.md_message.image : assetUrl(formData.md_message.image)}
                    alt="MD"
                    className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                  />
                </div>
              )}
            </div>
          )}
        </div>
          </>
        )}

        {/* Team Tab */}
        {activeTab === 'team' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Team Members" section="team" badge={formData.team.length} />
          {expandedSections.team && (
            <div className="p-6 space-y-4">
              {editMode.team && (
                <button
                  type="button"
                  onClick={() => handleAddArrayItem('team', {
                    id: Date.now(),
                    name: '',
                    position: '',
                    department: '',
                    image: '',
                    bio: '',
                    email: '',
                    phone: ''
                  })}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Team Member</span>
                </button>
              )}

              {formData.team.map((member, index) => (
                <div key={member.id || index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">{member.name || `Team Member ${index + 1}`}</h4>
                    {editMode.team && (
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem('team', index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Name"
                        value={member.name}
                        onChange={(e) => handleArrayItemChange('team', index, 'name', e.target.value)}
                        disabled={!editMode.team}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Position <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Position"
                        value={member.position}
                        onChange={(e) => handleArrayItemChange('team', index, 'position', e.target.value)}
                        disabled={!editMode.team}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Department <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Department"
                        value={member.department}
                        onChange={(e) => handleArrayItemChange('team', index, 'department', e.target.value)}
                        disabled={!editMode.team}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email (Optional)
                      </label>
                      <input
                        type="email"
                        placeholder="Email"
                        value={member.email}
                        onChange={(e) => handleArrayItemChange('team', index, 'email', e.target.value)}
                        disabled={!editMode.team}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                    <div className="col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone (Optional)
                      </label>
                      <input
                        type="tel"
                        placeholder="Phone"
                        value={member.phone}
                        onChange={(e) => handleArrayItemChange('team', index, 'phone', e.target.value)}
                        disabled={!editMode.team}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Bio (Optional)
                    </label>
                    <textarea
                      placeholder="Bio"
                      value={member.bio}
                      onChange={(e) => handleArrayItemChange('team', index, 'bio', e.target.value)}
                      disabled={!editMode.team}
                      rows="2"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                  {editMode.team && (
                    <ImageUploadField
                      label={`${member.name || 'Member'} Photo`}
                      imageSrc={member.image}
                      onUpload={(e) => handleImageUpload(e, 'team', 'image', index)}
                      uniqueId={`upload-team-${index}`}
                    />
                  )}
                  {!editMode.team && member.image && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
                      <img
                        src={member.image.startsWith('data:') ? member.image : assetUrl(member.image)}
                        alt={member.name}
                        className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
        )}

        {/* Achievements Tab (Certifications & Awards) */}
        {activeTab === 'achievements' && (
          <>
        {/* Certifications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Certifications" section="certifications" badge={formData.certifications.length} />
          {expandedSections.certifications && (
            <div className="p-6 space-y-4">
              {editMode.certifications && (
                <button
                  type="button"
                  onClick={() => handleAddArrayItem('certifications', {
                    id: Date.now(),
                    name: '',
                    issuedBy: '',
                    year: '',
                    image: '',
                    description: ''
                  })}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Certification</span>
                </button>
              )}

              {formData.certifications.map((cert, index) => (
                <div key={cert.id || index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">{cert.name || `Certification ${index + 1}`}</h4>
                    {editMode.certifications && (
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem('certifications', index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Certification Name"
                    value={cert.name}
                    onChange={(e) => handleArrayItemChange('certifications', index, 'name', e.target.value)}
                    disabled={!editMode.certifications}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Issued By"
                      value={cert.issuedBy}
                      onChange={(e) => handleArrayItemChange('certifications', index, 'issuedBy', e.target.value)}
                      disabled={!editMode.certifications}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      value={cert.year}
                      onChange={(e) => handleArrayItemChange('certifications', index, 'year', e.target.value)}
                      disabled={!editMode.certifications}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={cert.description}
                    onChange={(e) => handleArrayItemChange('certifications', index, 'description', e.target.value)}
                    disabled={!editMode.certifications}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  {editMode.certifications && (
                    <ImageUploadField
                      label={`${cert.name || 'Certification'} Image`}
                      imageSrc={cert.image}
                      onUpload={(e) => handleImageUpload(e, 'certifications', 'image', index)}
                      uniqueId={`upload-certification-${index}`}
                    />
                  )}
                  {!editMode.certifications && cert.image && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                      <img
                        src={cert.image.startsWith('data:') ? cert.image : assetUrl(cert.image)}
                        alt={cert.name}
                        className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Awards */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Awards" section="awards" badge={formData.awards.length} />
          {expandedSections.awards && (
            <div className="p-6 space-y-4">
              {editMode.awards && (
                <button
                  type="button"
                  onClick={() => handleAddArrayItem('awards', {
                    id: Date.now(),
                    title: '',
                    year: '',
                    issuedBy: '',
                    image: '',
                    description: ''
                  })}
                  className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Award</span>
                </button>
              )}

              {formData.awards.map((award, index) => (
                <div key={award.id || index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">{award.title || `Award ${index + 1}`}</h4>
                    {editMode.awards && (
                      <button
                        type="button"
                        onClick={() => handleRemoveArrayItem('awards', index)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <input
                    type="text"
                    placeholder="Award Title"
                    value={award.title}
                    onChange={(e) => handleArrayItemChange('awards', index, 'title', e.target.value)}
                    disabled={!editMode.awards}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Year"
                      value={award.year}
                      onChange={(e) => handleArrayItemChange('awards', index, 'year', e.target.value)}
                      disabled={!editMode.awards}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                    <input
                      type="text"
                      placeholder="Issued By"
                      value={award.issuedBy}
                      onChange={(e) => handleArrayItemChange('awards', index, 'issuedBy', e.target.value)}
                      disabled={!editMode.awards}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={award.description}
                    onChange={(e) => handleArrayItemChange('awards', index, 'description', e.target.value)}
                    disabled={!editMode.awards}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                  {editMode.awards && (
                    <ImageUploadField
                      label={`${award.title || 'Award'} Image`}
                      imageSrc={award.image}
                      onUpload={(e) => handleImageUpload(e, 'awards', 'image', index)}
                      uniqueId={`upload-award-${index}`}
                    />
                  )}
                  {!editMode.awards && award.image && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                      <img
                        src={award.image.startsWith('data:') ? award.image : assetUrl(award.image)}
                        alt={award.title}
                        className="w-32 h-32 object-cover rounded-lg border border-gray-300"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
          </>
        )}

        {/* Stats Tab */}
        {activeTab === 'stats' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Statistics" section="stats" />
          {expandedSections.stats && (
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years of Experience
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 25+"
                    value={formData.stats.yearsOfExperience}
                    onChange={(e) => handleNestedChange('stats', 'yearsOfExperience', e.target.value)}
                    disabled={!editMode.stats}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employees
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 500+"
                    value={formData.stats.employees}
                    onChange={(e) => handleNestedChange('stats', 'employees', e.target.value)}
                    disabled={!editMode.stats}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Brands
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 15+"
                    value={formData.stats.brands}
                    onChange={(e) => handleNestedChange('stats', 'brands', e.target.value)}
                    disabled={!editMode.stats}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Service Centers
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 10+"
                    value={formData.stats.serviceCenters}
                    onChange={(e) => handleNestedChange('stats', 'serviceCenters', e.target.value)}
                    disabled={!editMode.stats}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Happy Customers
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 10,000+"
                    value={formData.stats.happyCustomers}
                    onChange={(e) => handleNestedChange('stats', 'happyCustomers', e.target.value)}
                    disabled={!editMode.stats}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Vehicles Sold
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 5,000+"
                    value={formData.stats.vehiclesSold}
                    onChange={(e) => handleNestedChange('stats', 'vehiclesSold', e.target.value)}
                    disabled={!editMode.stats}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        )}

      </div>
    </div>
  );
};

export default AboutUsAdmin;
