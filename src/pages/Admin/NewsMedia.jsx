import { useState, useContext, useEffect } from 'react';
import { Save, X, Plus, Trash2, Edit2, Upload, Newspaper } from 'lucide-react';
import toast from 'react-hot-toast';
import { ContentContext } from '../../context/globalContext';
import { useCreateNewsArticle, useUpdateNewsArticle, useDeleteNewsArticle } from '../../hooks/useNewsMediaMutation';
import { assetUrl } from '../../utils';

const NewsMediaAdmin = () => {
  const { content, isLoading, refetch } = useContext(ContentContext);
  const createNewsArticle = useCreateNewsArticle();
  const updateNewsArticle = useUpdateNewsArticle();
  const deleteNewsArticle = useDeleteNewsArticle();

  const [articles, setArticles] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    articleId: '',
    title: '',
    category: '',
    date: '',
    excerpt: '',
    content: '',
    isFeatured: false
  });

  useEffect(() => {
    if (content?.newsArticles) {
      setArticles(content.newsArticles);
    }
  }, [content]);

  const resetForm = () => {
    setFormData({
      articleId: '',
      title: '',
      category: '',
      date: '',
      excerpt: '',
      content: '',
      isFeatured: false
    });
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setIsCreating(false);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
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
    const maxId = articles.length > 0
      ? Math.max(...articles.map(art => art.articleId))
      : 0;
    const today = new Date().toISOString().split('T')[0];
    setFormData({
      articleId: maxId + 1,
      title: '',
      category: '',
      date: today,
      excerpt: '',
      content: '',
      isFeatured: false
    });
    setImageFile(null);
    setImagePreview(null);
  };

  const handleEdit = (article) => {
    setIsCreating(false);
    setEditingId(article._id);
    const dateString = article.date ? new Date(article.date).toISOString().split('T')[0] : '';
    setFormData({
      articleId: article.articleId,
      title: article.title || '',
      category: article.category || '',
      date: dateString,
      excerpt: article.excerpt || '',
      content: article.content || '',
      isFeatured: article.isFeatured || false
    });
    setImagePreview(assetUrl(article.image));
    setImageFile(null);
  };

  const handleSave = async () => {
    // Validate required fields
    if (!formData.title || !formData.category || !formData.date || !formData.excerpt || !formData.content) {
      toast.error('All fields except Featured status are required');
      return;
    }

    if (isCreating && !imageFile) {
      toast.error('Please select an image');
      return;
    }

    try {
      const submitData = {
        articleId: formData.articleId,
        title: formData.title,
        category: formData.category,
        date: formData.date,
        excerpt: formData.excerpt,
        content: formData.content,
        isFeatured: formData.isFeatured
      };

      if (imageFile) {
        submitData.image = imageFile;
      }

    //   submitData.append('articleId', formData.articleId);
    //   submitData.append('title', formData.title);
    //   submitData.append('category', formData.category);
    //   submitData.append('date', formData.date);
    //   submitData.append('excerpt', formData.excerpt);
    //   submitData.append('content', formData.content);
    //   submitData.append('isFeatured', formData.isFeatured);


      if (isCreating) {
        await createNewsArticle.mutateAsync(submitData);
      } else {
        await updateNewsArticle.mutateAsync({
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
    if (window.confirm('Are you sure you want to delete this news article? This action cannot be undone.')) {
      try {
        await deleteNewsArticle.mutateAsync(id);
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

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
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
            <h1 className="text-3xl font-bold text-gray-900">News & Media</h1>
            <p className="text-gray-600 mt-1">Manage news articles and media content</p>
          </div>
          {!isFormActive && (
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add News Article</span>
            </button>
          )}
        </div>
      </div>

      {/* Form Section */}
      {isFormActive && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {isCreating ? 'Create New News Article' : 'Edit News Article'}
            </h2>
            <button
              onClick={handleCancel}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Article ID (read-only) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Article ID
              </label>
              <input
                type="number"
                value={formData.articleId}
                disabled
                className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-100 cursor-not-allowed"
              />
              <p className="text-xs text-gray-500 mt-1">Auto-generated</p>
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Article Image <span className="text-red-500">*</span>
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
                placeholder="Article title"
                required
              />
            </div>

            {/* Category and Date */}
            <div className="grid grid-cols-2 gap-4">
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
                  placeholder="e.g., Press Release, Industry News"
                  required
                />
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

            {/* Excerpt */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Excerpt <span className="text-red-500">*</span>
              </label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                rows="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Brief summary of the article"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Content <span className="text-red-500">*</span>
              </label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                rows="8"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Full article content"
                required
              />
            </div>

            {/* Featured Checkbox */}
            <div>
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  name="isFeatured"
                  checked={formData.isFeatured}
                  onChange={handleInputChange}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <span className="text-sm font-medium text-gray-700">
                  Mark as Featured Article
                </span>
              </label>
              <p className="text-xs text-gray-500 mt-1">
                Featured articles will be highlighted on the news page
              </p>
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
                disabled={createNewsArticle.isPending || updateNewsArticle.isPending}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Save className="w-4 h-4" />
                <span>{isCreating ? 'Create Article' : 'Update Article'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* News Articles Table */}
      {articles.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-12 text-center">
          <Newspaper className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500 mb-2">No news articles found</p>
          <p className="text-sm text-gray-400 mb-4">Get started by adding your first news article</p>
          {!isFormActive && (
            <button
              onClick={handleCreate}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center space-x-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add News Article</span>
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
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {articles.map((article) => (
                  <tr
                    key={article._id}
                    className={`hover:bg-gray-50 transition-colors ${
                      editingId === article._id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-20 w-32 bg-gray-100 rounded overflow-hidden">
                        <img
                          src={assetUrl(article.image)}
                          alt={article.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{article.title}</div>
                      <div className="text-sm text-gray-600 max-w-xs truncate">
                        {article.excerpt}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2 py-1 bg-purple-100 text-purple-800 rounded text-xs">
                        {article.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-600">
                        {formatDate(article.date)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {article.isFeatured ? (
                        <span className="inline-block px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                          Featured
                        </span>
                      ) : (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          Regular
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {!isFormActive && (
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(article)}
                            className="inline-flex items-center px-3 py-1 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Edit2 className="w-4 h-4 mr-1" />
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(article._id)}
                            disabled={deleteNewsArticle.isPending}
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

export default NewsMediaAdmin;
