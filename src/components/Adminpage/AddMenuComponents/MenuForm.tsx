import React from 'react';
import { Tag, X } from 'lucide-react';
import type { Category } from '../../../services/apiService';

interface FormData {
  categoryId: string;
  itemName: string;
  price: string;
  subtitle: string;
  description: string;
  features: string[];
  images: File[];
  imagePreviews: string[];
}

interface MenuFormProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
  categories: Category[];
  editingId: string | null;
  submitting: boolean;
  featureInput: string;
  setFeatureInput: (value: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
  onAddFeature: () => void;
  onRemoveFeature: (index: number) => void;
}

const MenuForm: React.FC<MenuFormProps> = ({
  formData,
  setFormData,
  categories,
  editingId,
  submitting,
  featureInput,
  setFeatureInput,
  onSubmit,
  onCancel,
  onFileChange,
  onRemoveImage,
  onAddFeature,
  onRemoveFeature,
}) => {
  const MAX_IMAGES = 3;
  const isImageLimitReached = formData.imagePreviews.length >= MAX_IMAGES;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <h2 className="text-3xl font-bold text-zinc-800">
            {editingId ? 'Edit' : 'Add'}
          </h2>
          <span className="text-3xl font-great-vibes font-bold text-[#E4B951] italic">Menu</span>
        </div>
        <div className="flex space-x-3">
          {editingId && (
            <button
              onClick={onCancel}
              className="px-6 py-3 bg-zinc-200 text-zinc-700 font-semibold rounded-lg hover:bg-zinc-300 transition"
            >
              Cancel
            </button>
          )}
          <button
            onClick={onSubmit}
            disabled={submitting}
            className="px-8 py-3 bg-[#E4B951] text-black font-semibold rounded-lg hover:bg-[#d4a941] transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Saving...' : editingId ? 'Update Menu' : 'Add Menu'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Food Item Name */}
        <div>
          <label className="block text-zinc-700 font-semibold mb-2">
            Food Item Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Food Item Name"
            value={formData.itemName}
            onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
            required
          />
          <p className="text-xs text-zinc-500 mt-1">Item name must be entered how it wants to be displayed.</p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Dish Price */}
          <div>
            <label className="block text-zinc-700 font-semibold mb-2">
              Dish Price <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Item Price (e.g., €18, $25.99)"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
              required
            />
            <p className="text-xs text-zinc-500 mt-1">Actual Price of Item.</p>
          </div>

          {/* Category Dropdown */}
          <div>
            <label className="block text-zinc-700 font-semibold mb-2">
              Choose Category <span className="text-red-500">*</span>
            </label>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951] bg-white"
              disabled={editingId !== null}
              required
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
            {editingId && (
              <p className="text-xs text-zinc-500 mt-1">Category cannot be changed when editing.</p>
            )}
          </div>
        </div>

        {/* Subtitle */}
        <div>
          <label className="block text-zinc-700 font-semibold mb-2">Subtitle (Optional)</label>
          <input
            type="text"
            placeholder="e.g., Chef Special, Signature Dish"
            value={formData.subtitle}
            onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
          />
        </div>

        {/* Features/Tags */}
        <div>
          <label className="block text-zinc-700 font-semibold mb-2">Features/Tags (Optional)</label>
          <div className="flex gap-2 mb-3">
            <input
              type="text"
              placeholder="Add a feature (e.g., Vegetarian, Spicy, Gluten-Free)"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), onAddFeature())}
              className="flex-1 px-4 py-2 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
            />
            <button
              onClick={onAddFeature}
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
                    onClick={() => onRemoveFeature(idx)}
                    className="hover:text-red-600 transition"
                  >
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-zinc-700 font-semibold mb-2">
            Upload Images <span className="text-red-500">*</span>
          </label>
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <p className="text-sm text-zinc-600 mb-2">
                Please upload at least one image, size less than 5MB each (Maximum {MAX_IMAGES} images)
              </p>
              <div className="flex items-center space-x-4 mb-4">
                <label 
                  className={`px-6 py-2 bg-white border-2 border-[#E4B951] text-[#E4B951] rounded-lg transition font-semibold ${
                    isImageLimitReached 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-[#E4B951] hover:text-black cursor-pointer'
                  }`}
                >
                  Choose Files
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    onChange={onFileChange}
                    disabled={isImageLimitReached}
                  />
                </label>
                <span className="text-sm text-zinc-500">
                  {formData.imagePreviews.length > 0 
                    ? `${formData.imagePreviews.length}/${MAX_IMAGES} image(s) selected` 
                    : `No files chosen (max ${MAX_IMAGES})`}
                </span>
              </div>

              {/* Image Previews */}
              {formData.imagePreviews.length > 0 && (
                <div className="grid grid-cols-4 gap-3">
                  {formData.imagePreviews.map((preview, idx) => (
                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden bg-zinc-100 group">
                      <img 
                        src={preview} 
                        alt={`Preview ${idx + 1}`} 
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => onRemoveImage(idx)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-100 hover:bg-red-600 transition shadow-md"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-zinc-700 font-semibold mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Short Description (Required)"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={5}
            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951] resize-none"
            required
          />
          <p className="text-xs text-zinc-500 mt-1">Description must be filled.</p>
        </div>
      </div>
    </div>
  );
};

export default MenuForm;