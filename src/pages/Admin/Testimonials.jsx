import { useState, useContext, useEffect } from 'react';
import { Save, Trash, Plus, Trash2, Edit2, Upload, MessageSquare, Video } from 'lucide-react';
import { ContentContext } from '../../context/globalContext';
import { useCreateTestimonial, useUpdateTestimonial, useDeleteTestimonial } from '../../hooks/useTestimonialsMutation';
import { assetUrl } from '../../utils';
import handleError from '../../utils/handleError';

const TestimonialsAdmin = () => {
  const { content, isLoading, refetch } = useContext(ContentContext);
  const createTestimonial = useCreateTestimonial();
  const updateTestimonial = useUpdateTestimonial();
  const deleteTestimonial = useDeleteTestimonial();

  const [testimonials, setTestimonials] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [videoFile, setVideoFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    company: '',
    rating: 5,
    text: '',
    date: new Date().toISOString().split('T')[0],
    category: 'text'
  });

  useEffect(() => {
    if (content?.testimonials) {
      setTestimonials(content.testimonials);
    }
  }, [content]);

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      company: '',
      rating: 5,
      text: '',
      date: new Date().toISOString().split('T')[0],
      category: 'text'
    });
    setImageFile(null);
    setVideoFile(null);
    setImagePreview(null);
    setVideoPreview(null);
    setEditingId(null);
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

  const handleVideoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('video/')) {
        handleError('Please select a valid video file');
        return;
      }

      if (file.size > 100 * 1024 * 1024) {
        handleError('Video size must be less than 100MB');
        return;
      }

      try {
        const base64 = await convertToBase64(file);
        setVideoFile(base64);
        setVideoPreview(base64);
      } catch (error) {
        handleError('Error uploading video');
      }
    }
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingId(null);
    setFormData({
      name: '',
      position: '',
      company: '',
      rating: 5,
      text: '',
      date: new Date().toISOString().split('T')[0],
      category: 'text'
    });
    setImageFile(null);
    setVideoFile(null);
    setImagePreview(null);
    setVideoPreview(null);
  };

  const handleEdit = (testimonial) => {
    setIsCreating(false);
    setEditingId(testimonial._id);
    setFormData({
      name: testimonial.name || '',
      position: testimonial.position || '',
      company: testimonial.company || '',
      rating: testimonial.rating || 5,
      text: testimonial.text || '',
      date: testimonial.date ? new Date(testimonial.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
      category: testimonial.category || 'text'
    });
    setImagePreview(testimonial.image ? assetUrl(testimonial.image) : null);
    setVideoPreview(testimonial.video ? assetUrl(testimonial.video) : null);
    setImageFile(null);
    setVideoFile(null);
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.name || !formData.text) {
      handleError('Name and testimonial text are required');
      return;
    }

    if (formData.category === 'video' && !videoFile && !videoPreview) {
      handleError('Please upload a video for video testimonial');
      return;
    }

    try {
      const submitData = {
        name: formData.name,
        position: formData.position,
        company: formData.company,
        rating: parseInt(formData.rating),
        text: formData.text,
        date: formData.date,
        category: formData.category
      };

      if (imageFile) {
        submitData.image = imageFile;
      }

      if (videoFile) {
        submitData.video = videoFile;
      }

      if (isCreating) {
        await createTestimonial.mutateAsync(submitData);
      } else {
        await updateTestimonial.mutateAsync({
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
    if (window.confirm('Are you sure you want to delete this testimonial? This action cannot be undone.')) {
      try {
        await deleteTestimonial.mutateAsync(id);
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
            <h1 className="text-3xl font-bold text-gray-900">Testimonials</h1>
            <p className="text-gray-600 mt-1">Manage customer testimonials and reviews</p>
          </div>
          {!isFormActive && (
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Testimonial</span>
            </button>
          )}
        </div>
      </div>

      {/* Form Section */}
      {isFormActive && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {isCreating ? 'Create New Testimonial' : 'Edit Testimonial'}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <Trash className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Category Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonial Type <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="text"
                    checked={formData.category === 'text'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <span>Text Testimonial</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="category"
                    value="video"
                    checked={formData.category === 'video'}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-blue-600"
                  />
                  <Video className="w-5 h-5 text-gray-600" />
                  <span>Video Testimonial</span>
                </label>
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Customer name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Position
                </label>
                <input
                  type="text"
                  name="position"
                  value={formData.position}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Job title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Company name"
                />
              </div>
            </div>

            {/* Rating and Date */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Rating <span className="text-red-500">*</span>
                </label>
                <div className="flex items-center space-x-2">
                  <select
                    name="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5].map(num => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Customer Image (Optional)
              </label>

              {imagePreview && (
                <div className="mb-4">
                  <div className="w-32 h-32 bg-gray-100 rounded-full overflow-hidden mx-auto">
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center">
                <label className="flex items-center space-x-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                  <Upload className="w-4 h-4 text-gray-700" />
                  <span className="text-sm text-gray-700">
                    {imageFile ? 'Change Image' : imagePreview ? 'Upload New Image' : 'Upload Image'}
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Max file size: 5MB. Formats: JPG, PNG, WebP
              </p>
            </div>

            {/* Video Upload (only for video testimonials) */}
            {formData.category === 'video' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Testimonial Video <span className="text-red-500">*</span>
                </label>

                {videoPreview && (
                  <div className="mb-4">
                    <video
                      src={videoPreview}
                      controls
                      className="w-full max-w-2xl h-64 object-contain border border-gray-200 rounded-lg mx-auto"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                )}

                <div className="flex items-center justify-center">
                  <label className="flex items-center space-x-2 px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors">
                    <Upload className="w-4 h-4 text-gray-700" />
                    <span className="text-sm text-gray-700">
                      {videoFile ? 'Change Video' : videoPreview ? 'Upload New Video' : 'Upload Video'}
                    </span>
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="text-xs text-gray-500 mt-2 text-center">
                  Max file size: 100MB. Formats: MP4, WebM, AVI
                </p>
              </div>
            )}

            {/* Testimonial Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Testimonial <span className="text-red-500">*</span>
              </label>
              <textarea
                name="text"
                value={formData.text}
                onChange={handleInputChange}
                rows="6"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Write the testimonial text here..."
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
                disabled={createTestimonial.isPending || updateTestimonial.isPending}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{isCreating ? 'Create Testimonial' : 'Update Testimonial'}</span>
              </button>
            </div>
          </div>
      )}

      {/* Testimonials Table */}
      {testimonials.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No testimonials found</p>
          <p className="text-sm text-gray-400 mb-4">Get started by adding your first testimonial</p>
          {!isFormActive && (
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Testimonial</span>
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
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {testimonials.map((testimonial, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 transition-colors ${
                      editingId === testimonial._id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {testimonial.image && (
                          <div className="h-10 w-10 rounded-full bg-gray-100 overflow-hidden mr-3">
                            <img
                              src={assetUrl(testimonial.image)}
                              alt={testimonial.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                        )}
                        <div>
                          <div className="text-sm font-medium text-gray-900">{testimonial.name}</div>
                          {testimonial.position && (
                            <div className="text-sm text-gray-600">
                              {testimonial.position}
                              {testimonial.company && `, ${testimonial.company}`}
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2 py-1 rounded text-xs ${
                        testimonial.category === 'video'
                          ? 'bg-purple-100 text-purple-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {testimonial.category === 'video' ? (
                          <>
                            <Video className="w-3 h-3 mr-1" />
                            Video
                          </>
                        ) : (
                          <>
                            <MessageSquare className="w-3 h-3 mr-1" />
                            Text
                          </>
                        )}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <span className="ml-2 text-sm text-gray-600">
                          {testimonial.rating}/5
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {new Date(testimonial.date).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {!isFormActive && (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(testimonial)}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(testimonial._id)}
                            disabled={deleteTestimonial.isPending}
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

export default TestimonialsAdmin;
