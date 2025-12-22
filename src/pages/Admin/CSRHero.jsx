import { useState, useEffect } from 'react';
import { Save, X, Upload, Edit2, ChevronDown, ChevronUp, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import useCSRHeroQuery from '../../hooks/useCSRHeroQuery';
import { useUpdateCSRHero, useCreateCSRHero } from '../../hooks/useCSRHeroMutation';
import { assetUrl } from '../../utils';

const CSRHeroAdmin = () => {
  const { data: csrHeroData, isLoading, refetch } = useCSRHeroQuery();
  const updateCSRHero = useUpdateCSRHero();
  const createCSRHero = useCreateCSRHero();

  const [csrHero, setCSRHero] = useState(null);
  const [expandedSections, setExpandedSections] = useState({
    hero: true,
    stats: false
  });

  const [editMode, setEditMode] = useState({
    hero: false,
    stats: false
  });

  const [sectionSnapshots, setSectionSnapshots] = useState({});

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    image: '',
    stats: {
      investment: '',
      beneficiaries: '',
      initiatives: '',
      partnersCount: '',
      yearsActive: ''
    }
  });

  useEffect(() => {
    if (csrHeroData && csrHeroData.length > 0) {
      const data = csrHeroData[0];
      setCSRHero(data);
      setFormData({
        title: data.title || '',
        subtitle: data.subtitle || '',
        description: data.description || '',
        image: data.image || '',
        stats: {
          investment: data.stats?.investment || '',
          beneficiaries: data.stats?.beneficiaries || '',
          initiatives: data.stats?.initiatives || '',
          partnersCount: data.stats?.partnersCount || '',
          yearsActive: data.stats?.yearsActive || ''
        }
      });
    }
  }, [csrHeroData]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleEditSection = (section) => {
    const snapshot = {
      hero: {
        title: formData.title,
        subtitle: formData.subtitle,
        description: formData.description,
        image: formData.image
      },
      stats: { ...formData.stats }
    };

    setSectionSnapshots(prev => ({ ...prev, [section]: snapshot[section] }));
    setEditMode(prev => ({ ...prev, [section]: true }));
    setExpandedSections(prev => ({ ...prev, [section]: true }));
  };

  const handleCancelSection = (section) => {
    if (sectionSnapshots[section]) {
      if (section === 'hero') {
        setFormData(prev => ({
          ...prev,
          title: sectionSnapshots[section].title,
          subtitle: sectionSnapshots[section].subtitle,
          description: sectionSnapshots[section].description,
          image: sectionSnapshots[section].image
        }));
      } else if (section === 'stats') {
        setFormData(prev => ({ ...prev, stats: sectionSnapshots[section] }));
      }
    }
    setEditMode(prev => ({ ...prev, [section]: false }));
  };

  const handleSaveSection = async (section) => {
    try {
      const sectionData = {};

      if (section === 'hero') {
        sectionData.title = formData.title;
        sectionData.subtitle = formData.subtitle;
        sectionData.description = formData.description;
        sectionData.image = formData.image;
      } else if (section === 'stats') {
        sectionData.stats = formData.stats;
      }

      if (csrHero?._id) {
        await updateCSRHero.mutateAsync({
          id: csrHero._id,
          data: sectionData
        });
      } else {
        await createCSRHero.mutateAsync(formData);
      }

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

  const handleImageUpload = async (e) => {
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
      setFormData(prev => ({ ...prev, image: base64 }));
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

  const handleStatsChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      stats: { ...prev.stats, [field]: value }
    }));
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  const SectionHeader = ({ title, section, icon: Icon }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div
        className="flex items-center space-x-2 cursor-pointer flex-1"
        onClick={() => toggleSection(section)}
      >
        {Icon && <Icon className="w-5 h-5 text-blue-600" />}
        <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
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
              disabled={updateCSRHero.isPending || createCSRHero.isPending}
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
            id="hero-image-upload"
          />
          <label
            htmlFor="hero-image-upload"
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
          <h1 className="text-3xl font-bold text-gray-900">CSR Hero Section</h1>
          <p className="text-gray-600 mt-1">Manage CSR hero content and statistics</p>
        </div>
      </div>

      {/* Hero Information Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <SectionHeader title="Hero Information" section="hero" icon={Heart} />
        {expandedSections.hero && (
          <div className="p-6 space-y-4">
            {editMode.hero ? (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter hero title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subtitle <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="subtitle"
                    value={formData.subtitle}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter hero subtitle"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter hero description"
                  />
                </div>
                <ImageUploadField
                  label="Hero Image"
                  imageSrc={formData.image}
                  onUpload={handleImageUpload}
                  required
                />
              </>
            ) : (
              <>
                {formData.title && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Title</p>
                    <p className="text-gray-900 text-xl font-semibold">{formData.title}</p>
                  </div>
                )}
                {formData.subtitle && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Subtitle</p>
                    <p className="text-gray-700 text-lg">{formData.subtitle}</p>
                  </div>
                )}
                {formData.description && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Description</p>
                    <p className="text-gray-600 whitespace-pre-wrap">{formData.description}</p>
                  </div>
                )}
                {formData.image && (
                  <div>
                    <p className="text-sm font-medium text-gray-700 mb-2">Hero Image</p>
                    <img
                      src={assetUrl(formData.image)}
                      alt="CSR Hero"
                      className="w-full max-w-2xl h-64 object-cover rounded-lg border border-gray-300"
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>

      {/* Statistics Section */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <SectionHeader title="Statistics" section="stats" />
        {expandedSections.stats && (
          <div className="p-6">
            {editMode.stats ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Investment
                  </label>
                  <input
                    type="text"
                    value={formData.stats.investment}
                    onChange={(e) => handleStatsChange('investment', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., $5M+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Beneficiaries
                  </label>
                  <input
                    type="text"
                    value={formData.stats.beneficiaries}
                    onChange={(e) => handleStatsChange('beneficiaries', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 10,000+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Initiatives
                  </label>
                  <input
                    type="text"
                    value={formData.stats.initiatives}
                    onChange={(e) => handleStatsChange('initiatives', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 25+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Partners Count
                  </label>
                  <input
                    type="text"
                    value={formData.stats.partnersCount}
                    onChange={(e) => handleStatsChange('partnersCount', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 15+"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Years Active
                  </label>
                  <input
                    type="text"
                    value={formData.stats.yearsActive}
                    onChange={(e) => handleStatsChange('yearsActive', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="e.g., 5+"
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {formData.stats.investment && (
                  <div className="bg-blue-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Investment</p>
                    <p className="text-2xl font-bold text-blue-600">{formData.stats.investment}</p>
                  </div>
                )}
                {formData.stats.beneficiaries && (
                  <div className="bg-green-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Beneficiaries</p>
                    <p className="text-2xl font-bold text-green-600">{formData.stats.beneficiaries}</p>
                  </div>
                )}
                {formData.stats.initiatives && (
                  <div className="bg-purple-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Initiatives</p>
                    <p className="text-2xl font-bold text-purple-600">{formData.stats.initiatives}</p>
                  </div>
                )}
                {formData.stats.partnersCount && (
                  <div className="bg-orange-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Partners Count</p>
                    <p className="text-2xl font-bold text-orange-600">{formData.stats.partnersCount}</p>
                  </div>
                )}
                {formData.stats.yearsActive && (
                  <div className="bg-teal-50 rounded-lg p-4">
                    <p className="text-sm text-gray-600 mb-1">Years Active</p>
                    <p className="text-2xl font-bold text-teal-600">{formData.stats.yearsActive}</p>
                  </div>
                )}
                {!formData.stats.investment && !formData.stats.beneficiaries && !formData.stats.initiatives && !formData.stats.partnersCount && !formData.stats.yearsActive && (
                  <p className="text-gray-500 col-span-full text-center py-8">No statistics available</p>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CSRHeroAdmin;
