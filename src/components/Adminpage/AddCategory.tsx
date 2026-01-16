import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/apiService';
import type { Category } from '../../services/apiService';
import { useCategoryForm } from '../../hooks/useCategoryForm';
import LoadingSpinner from '../LoadingSpinner';
import CategoryForm from './AddCategoryComponents/CategoryForm';
import CategoriesList from './AddCategoryComponents/CategoryList';


interface AddCategoryProps {
  onCategoryChange?: () => void;
}

const AddCategory: React.FC<AddCategoryProps> = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCategories(true);
      setCategories(response.data);
      
      // Notify parent component that categories have changed
      if (onCategoryChange) {
        onCategoryChange();
      }
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      alert('Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const {
    formData,
    setFormData,
    editingId,
    submitting,
    handleSubmit,
    handleEdit,
    resetForm,
    handleFileChange,
    removeImage,
  } = useCategoryForm(fetchData);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this category? All items in this category will also be deleted.')) {
      return;
    }

    try {
      await apiService.deleteCategory(id);
      alert('Category deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete category. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {showForm && (
          <CategoryForm
            formData={formData}
            setFormData={setFormData}
            editingId={editingId}
            submitting={submitting}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            onFileChange={handleFileChange}
            onRemoveImage={removeImage}
          />
        )}

        <CategoriesList
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AddCategory;