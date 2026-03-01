import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, Plus, X, Tag } from 'lucide-react';
import { apiService, fileToBase64 } from '../services/apiService';
import type { MenuItem, Category } from '../services/apiService';

interface ItemFormData {
  categoryId: string;
  name: string;
  subtitle: string;
  description: string;
  price: string;
  features: string[];
  images: File[];
  imagePreviews: string[];
}

const MenuItemManager: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [featureInput, setFeatureInput] = useState('');

  const [formData, setFormData] = useState<ItemFormData>({
    categoryId: '',
    name: '',
    subtitle: '',
    description: '',
    price: '',
    features: [],
    images: [],
    imagePreviews: [],
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [categoriesRes, itemsRes] = await Promise.all([
        apiService.getCategories(true),
        apiService.getCategories(true), // Get all items through categories
      ]);

      const cats = categoriesRes.data.filter(cat => cat.isActive);
      setCategories(cats);

      // Extract all items from all categories
      const allItems: MenuItem[] = [];
      itemsRes.data.forEach(cat => {
        if (cat.items) {
          allItems.push(...cat.items);
        }
      });
      setMenuItems(allItems);

      // Set default category if adding new item
      if (cats.length > 0 && !formData.categoryId) {
        setFormData(prev => ({ ...prev, categoryId: cats[0].id }));
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      alert('Failed to load data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!formData.name.trim() || !formData.price.trim() || !formData.categoryId) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSubmitting(true);

      // Convert images to base64
      const imageDataArray: string[] = [];
      
      // Include existing previews if editing
      if (editingId && formData.imagePreviews.length > 0) {
        imageDataArray.push(...formData.imagePreviews);
      }

      // Add new images
      for (const file of formData.images) {
        const base64 = await fileToBase64(file);
        imageDataArray.push(base64);
      }

      const submitData = {
        categoryId: formData.categoryId,
        name: formData.name,
        subtitle: formData.subtitle || undefined,
        description: formData.description,
        price: formData.price,
        features: formData.features.length > 0 ? formData.features : undefined,
        images: imageDataArray,
      };

      if (editingId) {
        // Update existing item
        const { categoryId, ...updateData } = submitData;
        await apiService.updateItem(editingId, updateData);
        alert('Menu item updated successfully!');
      } else {
        // Create new item
        if (imageDataArray.length === 0) {
          alert('Please add at least one image');
          return;
        }
        await apiService.createItem(submitData);
        alert('Menu item created successfully!');
      }

      resetForm();
      fetchData();
    } catch (error) {
      console.error('Failed to submit item:', error);
      alert('Failed to save menu item. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setFormData({
      categoryId: item.categoryId,
      name: item.name,
      subtitle: item.subtitle || '',
      description: item.description,
      price: item.price,
      features: item.features || [],
      images: [],
      imagePreviews: item.images || [],
    });
    setEditingId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) {
      return;
    }

    try {
      await apiService.deleteItem(id);
      alert('Menu item deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Failed to delete item:', error);
      alert('Failed to delete menu item. Please try again.');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));

    // Create previews
    files.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imagePreviews: [...prev.imagePreviews, reader.result as string]
        }));
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index),
    }));
  };

  const addFeature = () => {
    if (featureInput.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const removeFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const resetForm = () => {
    setFormData({
      categoryId: categories.length > 0 ? categories[0].id : '',
      name: '',
      subtitle: '',
      description: '',
      price: '',
      features: [],
      images: [],
      imagePreviews: [],
    });
    setEditingId(null);
    setShowForm(false);
    setFeatureInput('');
  };

  const filteredItems = selectedCategoryFilter === 'all'
    ? menuItems
    : menuItems.filter(item => item.categoryId === selectedCategoryFilter);

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E4B951] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Loading menu items...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-zinc-800">
            Menu <span className="text-[#E4B951] italic">Items</span>
          </h1>
          {!showForm && (
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 px-6 py-3 bg-[#E4B951] text-black font-semibold rounded-lg hover:bg-[#d4a941] transition"
            >
              <Plus size={20} />
              Add Menu Item
            </button>
          )}
        </div>

        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl font-bold text-zinc-800">
                {editingId ? 'Edit' : 'Add'} <span className="text-[#E4B951] italic">Menu Item</span>
              </h2>
              <button onClick={resetForm} className="p-2 hover:bg-zinc-100 rounded-lg transition">
                <X size={24} />
              </button>
            </div>

            <div className="space-y-6">
              {/* Category Selection */}
              <div>
                <label className="block text-zinc-700 font-semibold mb-2">Category *</label>
                <select
                  value={formData.categoryId}
                  onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951] bg-white"
                  disabled={editingId !== null}
                >
                  <option value="">Select a category</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              {/* Item Name */}
              <div>
                <label className="block text-zinc-700 font-semibold mb-2">Item Name *</label>
                <input
                  type="text"
                  placeholder="e.g., Lisbon Brunch Platter"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Subtitle */}
                <div>
                  <label className="block text-zinc-700 font-semibold mb-2">Subtitle</label>
                  <input
                    type="text"
                    placeholder="e.g., Chef Special"
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-zinc-700 font-semibold mb-2">Price *</label>
                  <input
                    type="text"
                    placeholder="e.g., €18 or $25.99"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-zinc-700 font-semibold mb-2">Description *</label>
                <textarea
                  placeholder="Describe the dish..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951] resize-none"
                />
              </div>

              {/* Features/Tags */}
              <div>
                <label className="block text-zinc-700 font-semibold mb-2">Features (Optional)</label>
                <div className="flex gap-2 mb-3">
                  <input
                    type="text"
                    placeholder="Add a feature tag (e.g., Vegetarian, Spicy)"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                    className="flex-1 px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
                  />
                  <button
                    onClick={addFeature}
                    type="button"
                    className="px-4 py-2 bg-[#E4B951] text-black font-semibold rounded-lg hover:bg-[#d4a941] transition"
                  >
                    Add
                  </button>
                </div>
                {formData.features.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-100 text-zinc-700 rounded-full text-sm"
                      >
                        <Tag size={14} />
                        {feature}
                        <button
                          onClick={() => removeFeature(idx)}
                          className="hover:text-red-600 transition"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Images */}
              <div>
                <label className="block text-zinc-700 font-semibold mb-2">
                  Images {!editingId && '*'}
                </label>
                <div className="space-y-4">
                  <label className="flex items-center justify-center w-full px-6 py-4 border-2 border-dashed border-zinc-300 rounded-lg hover:border-[#E4B951] transition cursor-pointer bg-zinc-50">
                    <div className="text-center">
                      <svg className="w-12 h-12 mx-auto text-zinc-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      <p className="text-sm text-zinc-600">Click to upload images</p>
                      <p className="text-xs text-zinc-400 mt-1">You can select multiple images</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                    />
                  </label>

                  {formData.imagePreviews.length > 0 && (
                    <div className="grid grid-cols-4 gap-4">
                      {formData.imagePreviews.map((preview, idx) => (
                        <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-zinc-100 group">
                          <img src={preview} alt={`Preview ${idx + 1}`} className="w-full h-full object-cover" />
                          <button
                            onClick={() => removeImage(idx)}
                            className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-4">
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="flex-1 px-8 py-3 bg-[#E4B951] text-black font-semibold rounded-lg hover:bg-[#d4a941] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {submitting ? 'Saving...' : editingId ? 'Update Item' : 'Create Item'}
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

        {/* Filter and List */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-zinc-800">Menu Items</h2>
            <div className="flex items-center gap-4">
              <select
                value={selectedCategoryFilter}
                onChange={(e) => setSelectedCategoryFilter(e.target.value)}
                className="px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951] bg-white"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <span className="text-sm text-zinc-500">{filteredItems.length} items</span>
            </div>
          </div>

          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-zinc-400">
              <p>No menu items found. Add your first item above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredItems.map((item) => {
                const category = categories.find(c => c.id === item.categoryId);
                return (
                  <div
                    key={item.id}
                    className="border border-zinc-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                  >
                    <div className="flex gap-4">
                      <div className="w-24 h-24 bg-zinc-100 rounded-lg overflow-hidden shrink-0">
                        {item.images && item.images.length > 0 ? (
                          <img
                            src={item.images[0]}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-zinc-800">{item.name}</h3>
                            {item.subtitle && (
                              <p className="text-sm text-zinc-500">{item.subtitle}</p>
                            )}
                          </div>
                          <span className="text-xl font-bold text-[#E4B951] ml-4">{item.price}</span>
                        </div>
                        
                        <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 text-sm rounded-full mb-2">
                          {category?.name || 'Unknown Category'}
                        </span>
                        
                        <p className="text-zinc-600 text-sm mb-2">{item.description}</p>
                        
                        {item.features && item.features.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {item.features.map((feature, idx) => (
                              <span key={idx} className="text-xs px-2 py-1 bg-[#E4B951]/10 text-[#E4B951] rounded">
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            item.isAvailable 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-red-100 text-red-700'
                          }`}>
                            {item.isAvailable ? 'Available' : 'Unavailable'}
                          </span>
                          {item.images && item.images.length > 1 && (
                            <span className="text-xs text-zinc-500">
                              {item.images.length} images
                            </span>
                          )}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => handleEdit(item)}
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                          title="Edit"
                        >
                          <Pencil size={20} />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemManager;