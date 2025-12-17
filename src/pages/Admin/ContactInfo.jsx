import { useState, useContext, useEffect } from 'react';
import { Save, X, Plus, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import { ContentContext } from '../../context/globalContext';
import apiService from '../../services/apiService';

const ContactInfoAdmin = () => {
  const { content, isLoading, refetch } = useContext(ContentContext);
  const [contactData, setContactData] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    addresses: [],
    socialLinks: {}
  });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (content?.contactInfo && content.contactInfo.length > 0) {
      const contact = content.contactInfo[0];
      setContactData(contact);
      setFormData({
        email: contact.email || '',
        phone: contact.phone || '',
        addresses: contact.addresses || [],
        socialLinks: contact.socialLinks || {}
      });
    }
  }, [content]);

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

  const handleAddressChange = (index, field, value) => {
    setFormData(prev => {
      const newAddresses = [...prev.addresses];
      newAddresses[index] = {
        ...newAddresses[index],
        [field]: value
      };
      return { ...prev, addresses: newAddresses };
    });
  };

  const handleAddAddress = () => {
    setFormData(prev => ({
      ...prev,
      addresses: [...prev.addresses, { label: '', value: '' }]
    }));
  };

  const handleRemoveAddress = (index) => {
    setFormData(prev => ({
      ...prev,
      addresses: prev.addresses.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      if (contactData?._id) {
        await apiService.patch(`/contact-info/${contactData._id}`, formData);
        toast.success('Contact information updated successfully!');
        await refetch();
      } else {
        toast.error('No contact data found to update');
      }
    } catch (error) {
      toast.error(error.message || 'Update failed');
    } finally {
      setIsSaving(false);
    }
  };

  const handleReset = () => {
    if (contactData) {
      setFormData({
        email: contactData.email || '',
        phone: contactData.phone || '',
        addresses: contactData.addresses || [],
        socialLinks: contactData.socialLinks || {}
      });
      toast.success('Changes discarded');
    }
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

  const socialPlatforms = ['facebook', 'twitter', 'linkedin', 'instagram', 'youtube'];

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Contact Information</h1>
        <p className="text-gray-600 mt-1">Update your contact details</p>
        <div className="mt-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Contact information can only be updated. Changes will be reflected across the website.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Basic Information</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="info@company.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
                placeholder="+977-1-234567"
              />
            </div>
          </div>
        </div>

        {/* Addresses */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Addresses</h2>
            <button
              type="button"
              onClick={handleAddAddress}
              className="text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
            >
              <Plus className="w-4 h-4" />
              <span>Add Address</span>
            </button>
          </div>
          <div className="space-y-4">
            {formData.addresses.map((address, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-medium text-gray-900">Address {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => handleRemoveAddress(index)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Label
                    </label>
                    <input
                      type="text"
                      value={address.label || ''}
                      onChange={(e) => handleAddressChange(index, 'label', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="e.g., Head Office, Branch Office"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address
                    </label>
                    <input
                      type="text"
                      value={address.value || ''}
                      onChange={(e) => handleAddressChange(index, 'value', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Full address"
                    />
                  </div>
                </div>
              </div>
            ))}
            {formData.addresses.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No addresses added. Click "Add Address" to add one.
              </div>
            )}
          </div>
        </div>

        {/* Social Links */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Social Media Links</h2>
          <div className="space-y-4">
            {socialPlatforms.map((platform) => (
              <div key={platform}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                  {platform}
                </label>
                <input
                  type="url"
                  value={formData.socialLinks[platform] || ''}
                  onChange={(e) => handleSocialLinkChange(platform, e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={`https://${platform}.com/yourcompany`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-4">
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
            disabled={isSaving}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="w-4 h-4" />
            <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactInfoAdmin;
