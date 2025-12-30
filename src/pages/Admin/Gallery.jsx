import { useState } from 'react';
import { Plus, Trash2, Upload, Image as ImageIcon, X } from 'lucide-react';
import { useCreateGallery, useDeleteGallery } from '../../hooks/useGalleryMutation';
import { useGalleryQuery } from '../../hooks/useGalleryQuery';
import { assetUrl } from '../../utils';
import handleError from '../../utils/handleError';
import LoadingSpinner from '../../components/common/Loading';

const GalleryAdmin = () => {
  const { data: galleryResponse, isLoading, refetch } = useGalleryQuery();
  const createGallery = useCreateGallery();
  const deleteGallery = useDeleteGallery();

  const gallery = galleryResponse?.data || [];

  const [isCreating, setIsCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    title: ''
  });

  const resetForm = () => {
    setFormData({ title: '' });
    setImageFile(null);
    setImagePreview(null);
    setIsCreating(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        handleError('Please select a valid image file');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        handleError('Image size must be less than 5MB');
        return;
      }

      try {
        const base64 = await convertToBase64(file);
        setImageFile(base64);
        setImagePreview(base64);
      } catch (error) {
        handleError('Error uploading image');
      }
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setFormData({ title: '' });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSave = async () => {
    if (!imageFile) {
      handleError('Please select an image');
      return;
    }

    try {
      const submitData = {
        title: formData.title,
        image: imageFile
      };

      await createGallery.mutateAsync(submitData);
      await refetch();
      resetForm();
    } catch (error) {
      handleError(error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image? This action cannot be undone.')) {
      try {
        await deleteGallery.mutateAsync(id);
        await refetch();
      } catch (error) {
        handleError(error);
      }
    }
  };

  const handleCancel = () => {
    resetForm();
  };
  if (isLoading) {
    return <LoadingSpinner/>
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gallery</h1>
            <p className="text-gray-600 mt-1">Manage gallery images</p>
          </div>
          {!isCreating && (
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Image</span>
            </button>
          )}
        </div>
      </div>

      {/* Form Section */}
      {isCreating && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Add New Image</h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title (Optional)
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Image title or description"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Image <span className="text-red-500">*</span>
              </label>

              {imagePreview ? (
                <div className="mb-4">
                  <div className="relative inline-block">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full max-w-md h-64 object-cover rounded-lg border border-gray-200"
                    />
                    <button
                      onClick={() => {
                        setImageFile(null);
                        setImagePreview(null);
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Click to upload image</p>
                    <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                  </label>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                disabled={createGallery.isPending}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {createGallery.isPending ? 'Adding...' : 'Add Image'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Gallery Table */}
      {gallery.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <ImageIcon className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No images in gallery</p>
          <p className="text-sm text-gray-400 mb-4">Get started by adding your first image</p>
          {!isCreating && (
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Image</span>
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
                    Date Added
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {gallery.map((item, index) => (
                  <tr key={item._id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-20 w-32 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={assetUrl(item.image)}
                          alt={item.title || 'Gallery image'}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {item.title || <span className="text-gray-400 italic">No title</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {new Date(item.createdAt).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {!isCreating && (
                        <button
                          onClick={() => handleDelete(item._id)}
                          disabled={deleteGallery.isPending}
                          className="inline-flex items-center px-3 py-1 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <Trash2 className="w-4 h-4 mr-1" />
                          Delete
                        </button>
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

export default GalleryAdmin;
