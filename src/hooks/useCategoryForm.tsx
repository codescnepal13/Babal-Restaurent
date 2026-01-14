import { useState } from 'react';
import apiService, { fileToBase64, type Category } from '../services/apiService';


interface CategoryFormData {
  name: string;
  description: string;
  image: File | null;
  imagePreview: string;
}

export const useCategoryForm = (fetchData: () => void) => {
  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    image: null,
    imagePreview: '',
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      alert('Please enter a category name');
      return;
    }

    if (!editingId && !formData.image) {
      alert('Please select an image for the category');
      return;
    }

    try {
      setSubmitting(true);

      let imageData = formData.imagePreview;
      
      // Convert new image to base64 if provided
      if (formData.image) {
        imageData = await fileToBase64(formData.image);
      }

      const submitData = {
        name: formData.name,
        image: imageData,
        description: formData.description || undefined,
      };

      if (editingId) {
        // Update existing category
        await apiService.updateCategory(editingId, submitData);
        alert('Category updated successfully!');
      } else {
        // Create new category
        await apiService.createCategory(submitData);
        alert('Category added successfully!');
      }

      resetForm();
      fetchData();
    } catch (error) {
      console.error('Failed to submit:', error);
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      image: null,
      imagePreview: '',
    });
    setEditingId(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    
    if (!file) return;

    setFormData(prev => ({ ...prev, image: file }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setFormData(prev => ({
        ...prev,
        imagePreview: reader.result as string
      }));
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: '',
    }));
  };

  return {
    formData,
    setFormData,
    editingId,
    submitting,
    handleSubmit,
    handleEdit,
    resetForm,
    handleFileChange,
    removeImage,
  };
};