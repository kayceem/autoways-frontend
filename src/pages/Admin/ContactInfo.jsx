import { useState, useContext, useEffect } from 'react';
import { Save, X, Plus, Trash2, Edit2, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import { ContentContext } from '../../context/globalContext';
import { useUpdateContactInfo } from '../../hooks/useContactInfoMutation';

const ContactInfoAdmin = () => {
  const { content, isLoading, refetch } = useContext(ContentContext);
  const updateContactInfo = useUpdateContactInfo();
  const [contactData, setContactData] = useState(null);

  const [expandedSections, setExpandedSections] = useState({
    basic: true,
    corporate: false,
    address: false,
    social: false
  });

  const [editMode, setEditMode] = useState({
    basic: false,
    corporate: false,
    address: false,
    social: false
  });

  const [sectionSnapshots, setSectionSnapshots] = useState({});

  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    corporate_address: '',
    address: '',
    socialLinks: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    }
  });

  useEffect(() => {
    if (content?.contactInfo && content.contactInfo.length > 0) {
      const contact = content.contactInfo[0];
      setContactData(contact);
      setFormData({
        email: contact.email || '',
        phone: contact.phone || '',
        corporate_address: contact.corporate_address || '',
        address: contact.address || '',
        socialLinks: contact.socialLinks || {
          facebook: '',
          instagram: '',
          twitter: '',
          linkedin: ''
        }
      });
    }
  }, [content]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleEditSection = (section) => {
    // Save snapshot of current section data
    const snapshot = {
      basic: { email: formData.email, phone: formData.phone },
      corporate: { corporate_address: formData.corporate_address },
      address: { address: formData.address },
      social: { ...formData.socialLinks }
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
          email: sectionSnapshots[section].email,
          phone: sectionSnapshots[section].phone
        }));
      } else if (section === 'corporate') {
        setFormData(prev => ({ ...prev, corporate_address: sectionSnapshots[section].corporate_address }));
      } else if (section === 'address') {
        setFormData(prev => ({ ...prev, address: sectionSnapshots[section].address }));
      } else if (section === 'social') {
        setFormData(prev => ({ ...prev, socialLinks: sectionSnapshots[section] }));
      }
    }
    setEditMode(prev => ({ ...prev, [section]: false }));
  };

  const handleSaveSection = async (section) => {
    try {
      // Prepare data for only this section
      const sectionData = {};

      if (section === 'basic') {
        sectionData.email = formData.email;
        sectionData.phone = formData.phone;
      } else if (section === 'corporate') {
        sectionData.corporate_address = formData.corporate_address;
      } else if (section === 'address') {
        sectionData.address = formData.address;
      } else if (section === 'social') {
        sectionData.socialLinks = formData.socialLinks;
      }

      await updateContactInfo.mutateAsync({
        id: contactData._id,
        data: sectionData
      });

      setEditMode(prev => ({ ...prev, [section]: false }));
      await refetch();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSocialLinkChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialLinks: {
        ...prev.socialLinks,
        [platform]: value
      }
    }));
  };

  if (isLoading) {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }

  if (!contactData) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
        <p className="text-gray-500 mb-4">No contact information found</p>
        <p className="text-sm text-gray-400">Please contact your system administrator to create contact information.</p>
      </div>
    );
  }

  const SectionHeader = ({ title, section }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div
        className="flex items-center space-x-2 cursor-pointer flex-1"
        onClick={() => toggleSection(section)}
      >
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
              disabled={updateContactInfo.isPending}
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

  const socialPlatforms = ['facebook', 'twitter', 'linkedin', 'instagram'];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Contact Information</h1>
        <p className="text-gray-600 mt-1">Manage your contact details</p>
      </div>

      <div className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Basic Information" section="basic" />
          {expandedSections.basic && (
            <div className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  disabled={!editMode.basic}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                  placeholder="info@company.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={!editMode.basic}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                  placeholder="+977-1-234567"
                />
              </div>
            </div>
          )}
        </div>

        {/* Corporate Address */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Corporate Address" section="corporate" />
          {expandedSections.corporate && (
            <div className="p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Corporate Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="corporate_address"
                  value={formData.corporate_address}
                  onChange={handleInputChange}
                  disabled={!editMode.corporate}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                  placeholder="Full corporate address"
                />
              </div>
            </div>
          )}
        </div>

        {/* Physical Address */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Physical Address" section="address" />
          {expandedSections.address && (
            <div className="p-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  disabled={!editMode.address}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                  required
                  placeholder="Full physical address"
                />
              </div>
            </div>
          )}
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <SectionHeader title="Social Media Links" section="social" />
          {expandedSections.social && (
            <div className="p-6 space-y-4">
              {socialPlatforms.map((platform) => (
                <div key={platform}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {platform}
                  </label>
                  <input
                    type="url"
                    value={formData.socialLinks[platform] || ''}
                    onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                    disabled={!editMode.social}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder={`https://${platform}.com/yourcompany`}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactInfoAdmin;
