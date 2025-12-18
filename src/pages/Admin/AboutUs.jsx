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
    awards: false
  });

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
    awards: []
  });

  useEffect(() => {
    if (content?.aboutUs && content.aboutUs.length > 0) {
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
        awards: about.awards || []
      });
    }
  }, [content]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await updateAboutUs.mutateAsync({
        id: aboutData._id,
        data: formData
      });
      await refetch();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleReset = () => {
    if (aboutData) {
      setFormData({
        title: aboutData.title || '',
        content: aboutData.content || '',
        image: aboutData.image || '',
        mission: aboutData.mission || { title: '', content: '', icon: '' },
        vision: aboutData.vision || { title: '', content: '', icon: '' },
        values: aboutData.values || [],
        milestones: aboutData.milestones || [],
        chairman_message: aboutData.chairman_message || { title: '', name: '', position: '', image: '', message: '' },
        md_message: aboutData.md_message || { title: '', name: '', position: '', image: '', message: '' },
        team: aboutData.team || [],
        certifications: aboutData.certifications || [],
        awards: aboutData.awards || []
      });
      toast.success('Changes discarded');
    }
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

  const SectionHeader = ({ title, section, badge = null }) => (
    <div
      className="flex items-center justify-between cursor-pointer p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
      onClick={() => toggleSection(section)}
    >
      <div className="flex items-center space-x-2">
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
        {badge && (
          <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-medium rounded-full">
            {badge}
          </span>
        )}
      </div>
      {expandedSections[section] ? (
        <ChevronUp className="w-5 h-5 text-gray-500" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-500" />
      )}
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
            id={`upload-${label.replace(/\s/g, '-')}`}
          />
          <label
            htmlFor={`upload-${label.replace(/\s/g, '-')}`}
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
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">About Us Management</h1>
        <p className="text-gray-600 mt-1">Manage all About Us page content</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                  rows="6"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>

              <ImageUploadField
                label="Main Image"
                imageSrc={formData.image}
                onUpload={(e) => handleImageUpload(e, 'image')}
                required
              />
            </div>
          )}
        </div>

        {/* Mission */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Mission" section="mission" />
          {expandedSections.mission && (
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.mission.title}
                  onChange={(e) => handleNestedChange('mission', 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={formData.mission.content}
                  onChange={(e) => handleNestedChange('mission', 'content', e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon URL</label>
                <input
                  type="text"
                  value={formData.mission.icon}
                  onChange={(e) => handleNestedChange('mission', 'icon', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="/icons/mission.svg"
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
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.vision.title}
                  onChange={(e) => handleNestedChange('vision', 'title', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Content</label>
                <textarea
                  value={formData.vision.content}
                  onChange={(e) => handleNestedChange('vision', 'content', e.target.value)}
                  rows="4"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon URL</label>
                <input
                  type="text"
                  value={formData.vision.icon}
                  onChange={(e) => handleNestedChange('vision', 'icon', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="/icons/vision.svg"
                />
              </div>
            </div>
          )}
        </div>

        {/* Values */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Values" section="values" badge={formData.values.length} />
          {expandedSections.values && (
            <div className="p-6 space-y-4">
              <button
                type="button"
                onClick={() => handleAddArrayItem('values', { valueId: Date.now(), title: '', description: '', icon: '' })}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Value</span>
              </button>

              {formData.values.map((value, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">Value {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('values', index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Title"
                    value={value.title}
                    onChange={(e) => handleArrayItemChange('values', index, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <textarea
                    placeholder="Description"
                    value={value.description}
                    onChange={(e) => handleArrayItemChange('values', index, 'description', e.target.value)}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Icon URL"
                    value={value.icon}
                    onChange={(e) => handleArrayItemChange('values', index, 'icon', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Milestones */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Milestones" section="milestones" badge={formData.milestones.length} />
          {expandedSections.milestones && (
            <div className="p-6 space-y-4">
              <button
                type="button"
                onClick={() => handleAddArrayItem('milestones', { year: '', title: '', description: '', image: '' })}
                className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                <Plus className="w-4 h-4" />
                <span>Add Milestone</span>
              </button>

              {formData.milestones.map((milestone, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">Milestone {index + 1}</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('milestones', index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Year"
                    value={milestone.year}
                    onChange={(e) => handleArrayItemChange('milestones', index, 'year', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Title"
                    value={milestone.title}
                    onChange={(e) => handleArrayItemChange('milestones', index, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <textarea
                    placeholder="Description"
                    value={milestone.description}
                    onChange={(e) => handleArrayItemChange('milestones', index, 'description', e.target.value)}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <ImageUploadField
                    label={`Milestone ${index + 1} Image`}
                    imageSrc={milestone.image}
                    onUpload={(e) => handleImageUpload(e, 'milestones', 'image', index)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Name"
                value={formData.chairman_message.name}
                onChange={(e) => handleNestedChange('chairman_message', 'name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Position"
                value={formData.chairman_message.position}
                onChange={(e) => handleNestedChange('chairman_message', 'position', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Message"
                value={formData.chairman_message.message}
                onChange={(e) => handleNestedChange('chairman_message', 'message', e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <ImageUploadField
                label="Chairman Photo"
                imageSrc={formData.chairman_message.image}
                onUpload={(e) => handleImageUpload(e, 'chairman_message', 'image')}
              />
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
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Name"
                value={formData.md_message.name}
                onChange={(e) => handleNestedChange('md_message', 'name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <input
                type="text"
                placeholder="Position"
                value={formData.md_message.position}
                onChange={(e) => handleNestedChange('md_message', 'position', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Message"
                value={formData.md_message.message}
                onChange={(e) => handleNestedChange('md_message', 'message', e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              />
              <ImageUploadField
                label="MD Photo"
                imageSrc={formData.md_message.image}
                onUpload={(e) => handleImageUpload(e, 'md_message', 'image')}
              />
            </div>
          )}
        </div>

        {/* Team Members */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Team Members" section="team" badge={formData.team.length} />
          {expandedSections.team && (
            <div className="p-6 space-y-4">
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

              {formData.team.map((member, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">{member.name || `Team Member ${index + 1}`}</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('team', index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Name"
                      value={member.name}
                      onChange={(e) => handleArrayItemChange('team', index, 'name', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Position"
                      value={member.position}
                      onChange={(e) => handleArrayItemChange('team', index, 'position', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Department"
                      value={member.department}
                      onChange={(e) => handleArrayItemChange('team', index, 'department', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="email"
                      placeholder="Email"
                      value={member.email}
                      onChange={(e) => handleArrayItemChange('team', index, 'email', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="tel"
                      placeholder="Phone"
                      value={member.phone}
                      onChange={(e) => handleArrayItemChange('team', index, 'phone', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <textarea
                    placeholder="Bio"
                    value={member.bio}
                    onChange={(e) => handleArrayItemChange('team', index, 'bio', e.target.value)}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <ImageUploadField
                    label={`${member.name || 'Member'} Photo`}
                    imageSrc={member.image}
                    onUpload={(e) => handleImageUpload(e, 'team', 'image', index)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Certifications */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Certifications" section="certifications" badge={formData.certifications.length} />
          {expandedSections.certifications && (
            <div className="p-6 space-y-4">
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

              {formData.certifications.map((cert, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">{cert.name || `Certification ${index + 1}`}</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('certifications', index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Certification Name"
                    value={cert.name}
                    onChange={(e) => handleArrayItemChange('certifications', index, 'name', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Issued By"
                      value={cert.issuedBy}
                      onChange={(e) => handleArrayItemChange('certifications', index, 'issuedBy', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Year"
                      value={cert.year}
                      onChange={(e) => handleArrayItemChange('certifications', index, 'year', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={cert.description}
                    onChange={(e) => handleArrayItemChange('certifications', index, 'description', e.target.value)}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <ImageUploadField
                    label={`${cert.name || 'Certification'} Image`}
                    imageSrc={cert.image}
                    onUpload={(e) => handleImageUpload(e, 'certifications', 'image', index)}
                  />
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

              {formData.awards.map((award, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <h4 className="font-medium text-gray-900">{award.title || `Award ${index + 1}`}</h4>
                    <button
                      type="button"
                      onClick={() => handleRemoveArrayItem('awards', index)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                  <input
                    type="text"
                    placeholder="Award Title"
                    value={award.title}
                    onChange={(e) => handleArrayItemChange('awards', index, 'title', e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Year"
                      value={award.year}
                      onChange={(e) => handleArrayItemChange('awards', index, 'year', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Issued By"
                      value={award.issuedBy}
                      onChange={(e) => handleArrayItemChange('awards', index, 'issuedBy', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <textarea
                    placeholder="Description"
                    value={award.description}
                    onChange={(e) => handleArrayItemChange('awards', index, 'description', e.target.value)}
                    rows="2"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  />
                  <ImageUploadField
                    label={`${award.title || 'Award'} Image`}
                    imageSrc={award.image}
                    onUpload={(e) => handleImageUpload(e, 'awards', 'image', index)}
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4 sticky bottom-0 bg-white p-4 border-t border-gray-200 rounded-lg shadow-sm">
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <X className="w-4 h-4" />
            <span>Discard Changes</span>
          </button>
          <button
            type="submit"
            disabled={updateAboutUs.isPending}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>{updateAboutUs.isPending ? 'Saving...' : 'Save All Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutUsAdmin;
