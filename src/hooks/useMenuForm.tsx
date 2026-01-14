import { useState } from 'react';
import apiService, { type Category, fileToBase64, type MenuItem } from '../services/apiService';


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

export const useMenuForm = (categories: Category[], fetchData: () => void) => {
  const [formData, setFormData] = useState<FormData>({
    categoryId: '',
    itemName: '',
    price: '',
    subtitle: '',
    description: '',
    features: [],
    images: [],
    imagePreviews: [],
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [featureInput, setFeatureInput] = useState('');

  const handleSubmit = async () => {
    if (!formData.itemName.trim() || !formData.price.trim() || !formData.categoryId) {
      alert('Please fill in all required fields (Item Name, Price, Category)');
      return;
    }

    try {
      setSubmitting(true);

      const imageDataArray: string[] = [];
      
      if (editingId && formData.imagePreviews.length > 0) {
        imageDataArray.push(...formData.imagePreviews);
      }

      for (const file of formData.images) {
        const base64 = await fileToBase64(file);
        imageDataArray.push(base64);
      }

      const submitData = {
        categoryId: formData.categoryId,
        name: formData.itemName,
        subtitle: formData.subtitle || undefined,
        description: formData.description,
        price: formData.price,
        features: formData.features.length > 0 ? formData.features : undefined,
        images: imageDataArray,
      };

      if (editingId) {
        const { categoryId, ...updateData } = submitData;
        await apiService.updateItem(editingId, updateData);
        alert('Menu item updated successfully!');
      } else {
        if (imageDataArray.length === 0) {
          alert('Please add at least one image');
          return;
        }
        await apiService.createItem(submitData);
        alert('Menu item added successfully!');
      }

      resetForm();
      fetchData();
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Failed to save menu item. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (item: MenuItem) => {
    setFormData({
      categoryId: item.categoryId,
      itemName: item.name,
      price: item.price,
      subtitle: item.subtitle || '',
      description: item.description,
      features: item.features || [],
      images: [],
      imagePreviews: item.images || [],
    });
    setEditingId(item.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetForm = () => {
    setFormData({
      categoryId: categories.length > 0 ? categories[0].id : '',
      itemName: '',
      price: '',
      subtitle: '',
      description: '',
      features: [],
      images: [],
      imagePreviews: [],
    });
    setEditingId(null);
    setFeatureInput('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    if (files.length === 0) return;

    setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));

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

  return {
    formData,
    setFormData,
    editingId,
    submitting,
    featureInput,
    setFeatureInput,
    handleSubmit,
    handleEdit,
    resetForm,
    handleFileChange,
    removeImage,
    addFeature,
    removeFeature,
  };
};