import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, X } from 'lucide-react';
import { apiService, fileToBase64 } from '../services/apiService';
import type { Category } from '../services/apiService';

interface CategoryFormData {
  name: string;
  description: string;
  image: File | null;
  imagePreview?: string;
}

const CategoryManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    image: null,
    imagePreview: undefined,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCategories(false);
      setCategories(response.data.sort((a, b) => a.sortOrder - b.sortOrder));
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      alert('Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert('Please enter a category name');
      return;
    }

    try {
      setSubmitting(true);

      // Convert image to base64 if present
      let imageData = formData.imagePreview;
      if (formData.image) {
        imageData = await fileToBase64(formData.image);
      }

      const submitData = {
        name: formData.name,
        description: formData.description,
        ...(imageData && { image: imageData }),
      };

      if (editingId) {
        // Update existing category
        await apiService.updateCategory(editingId, submitData);
        alert('Category updated successfully!');
      } else {
        // Create new category
        if (!imageData) {
          alert('Please select an image');
          return;
        }
        await apiService.createCategory(submitData as any);
        alert('Category created successfully!');
      }

      // Reset form and refresh
      resetForm();
      fetchCategories();
    } catch (error) {
      console.error('Failed to submit category:', error);
      alert('Failed to save category. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (category: Category) => {
    setFormData({
      name: category.name,
      description: category.description || '',
      image: null,
      imagePreview: category.image,
    });
    setEditingId(category.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? All items in this category will also be deleted.')) {
      return;
    }

    try {
      await apiService.deleteCategory(id);
      alert('Category deleted successfully!');
      fetchCategories();
    } catch (error) {
      console.error('Failed to delete category:', error);
      alert('Failed to delete category. Please try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, image: file });
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, imagePreview: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: null,
      imagePreview: undefined,
    });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E4B951] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Loading categories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-zinc-800">
            Category <span className="text-[#E4B951] italic">Management</span>
          </h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#E4B951] text-black font-semibold rounded-lg hover:bg-[#d4a941] transition"
            >
              <Plus size={20} />
              Add Category
            </button>
          )}
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-zinc-800">
                {editingId ? 'Edit' : 'Add'} <span className="text-[#E4B951] italic">Category</span>
              </h2>
              <button
                onClick={resetForm}
                className="p-2 hover:bg-zinc-100 rounded-lg transition"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Category Name */}
              <div>
                <label className="block text-zinc-700 font-semibold mb-2">Category Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Nepali Thali"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-zinc-700 font-semibold mb-2">Description</label>
                <textarea
                  placeholder="Brief description of the category"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951] resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="block text-zinc-700 font-semibold mb-2">
                  Category Image {!editingId && '*'}
                </label>
                <div className="flex items-start gap-4">
                  <div className="w-32 h-32 bg-zinc-100 rounded-lg flex items-center justify-center border-2 border-dashed border-zinc-300 overflow-hidden">
                    {formData.imagePreview ? (
                      <img 
                        src={formData.imagePreview} 
                        alt="Preview" 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-zinc-600 mb-3">Upload category image (Square recommended, max 5MB)</p>
                    <label className="px-6 py-2 bg-white border-2 border-[#E4B951] text-[#E4B951] rounded-lg hover:bg-[#E4B951] hover:text-black transition cursor-pointer font-semibold inline-block">
                      Choose Image
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </label>
                    {formData.image && (
                      <p className="text-sm text-zinc-500 mt-2">{formData.image.name}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 px-8 py-3 bg-[#E4B951] text-black font-semibold rounded-lg hover:bg-[#d4a941] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Category' : 'Create Category'}
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-zinc-200 text-zinc-700 font-semibold rounded-lg hover:bg-zinc-300 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Categories List */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-zinc-800">Categories</h2>
            <span className="text-sm text-zinc-500">{categories.length} categories</span>
          </div>

          {categories.length === 0 ? (
            <div className="text-center py-12 text-zinc-400">
              <p>No categories yet. Add your first category above!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="border border-zinc-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square rounded-lg overflow-hidden mb-3 bg-zinc-100">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23e5e5e5" width="100" height="100"/%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-lg font-bold text-zinc-800 flex-1">{category.name}</h3>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      category.isActive 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                      {category.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                  
                  {category.description && (
                    <p className="text-sm text-zinc-600 mb-3 line-clamp-2">{category.description}</p>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(category)}
                      className="flex-1 flex items-center justify-center gap-2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      <Pencil size={16} />
                      <span className="text-sm font-medium">Edit</span>
                    </button>
                    <button
                      onClick={() => handleDelete(category.id)}
                      className="flex-1 flex items-center justify-center gap-2 p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 size={16} />
                      <span className="text-sm font-medium">Delete</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;