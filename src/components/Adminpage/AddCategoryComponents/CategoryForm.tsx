import React from 'react';
import { X } from 'lucide-react';

interface CategoryFormData {
  name: string;
  description: string;
  image: File | null;
  imagePreview: string;
}

interface CategoryFormProps {
  formData: CategoryFormData;
  setFormData: React.Dispatch<React.SetStateAction<CategoryFormData>>;
  editingId: string | null;
  submitting: boolean;
  onSubmit: () => void;
  onCancel: () => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
  formData,
  setFormData,
  editingId,
  submitting,
  onSubmit,
  onCancel,
  onFileChange,
  onRemoveImage,
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <h2 className="text-3xl font-bold text-zinc-800">
            {editingId ? 'Edit' : 'Add'}
          </h2>
          <span className="text-3xl font-bold text-[#E4B951] italic">Category</span>
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
            {submitting ? 'Saving...' : editingId ? 'Update Category' : 'Add Category'}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Category Name */}
        <div>
          <label className="block text-zinc-700 font-semibold mb-2">Category Name</label>
          <input
            type="text"
            placeholder="e.g., Appetizers, Main Course, Desserts"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
          />
          <p className="text-xs text-zinc-500 mt-1">Category name must be entered how it wants to be displayed.</p>
        </div>

        {/* Category Image */}
        <div>
          <label className="block text-zinc-700 font-semibold mb-2">Category Image</label>
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <p className="text-sm text-zinc-600 mb-2">Please upload an image, size less than 5MB</p>
              <div className="flex items-center space-x-4 mb-4">
                <label className="px-6 py-2 bg-white border-2 border-[#E4B951] text-[#E4B951] rounded-lg hover:bg-[#E4B951] hover:text-black transition cursor-pointer font-semibold">
                  Choose File
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={onFileChange}
                  />
                </label>
                <span className="text-sm text-zinc-500">
                  {formData.imagePreview ? '1 image selected' : 'No file chosen'}
                </span>
              </div>

              {/* Image Preview */}
              {formData.imagePreview && (
                <div className="relative w-48 h-48 rounded-lg overflow-hidden bg-zinc-100 group">
                  <img 
                    src={formData.imagePreview} 
                    alt="Category preview" 
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={onRemoveImage}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition"
                  >
                    <X size={18} />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-zinc-700 font-semibold mb-2">Description (Optional)</label>
          <textarea
            placeholder="Brief description of this category"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951] resize-none"
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryForm;