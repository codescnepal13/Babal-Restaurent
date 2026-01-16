import React, { useState, useEffect } from 'react';
import { apiService, type Category, type MenuItem } from '../../services/apiService';
import MenuForm from './AddMenuComponents/MenuForm';
import { useMenuForm } from '../../hooks/useMenuForm';
import LoadingSpinner from '../LoadingSpinner';
import MenuItemsList from './AddMenuComponents/MenuItemList';

const AddMenu: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await apiService.getCategories(true);
      
      const cats = response.data.filter(cat => cat.isActive);
      setCategories(cats);

      const allItems: MenuItem[] = [];
      response.data.forEach(cat => {
        if (cat.items) {
          allItems.push(...cat.items);
        }
      });
      setMenuItems(allItems);

      if (cats.length > 0 && !formData.categoryId) {
        setFormData(prev => ({ ...prev, categoryId: cats[0].id }));
      }
    } catch (error) {
      console.error('Failed to fetch data:', error);
      alert('Failed to load menu data. Please try again.');
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
    featureInput,
    setFeatureInput,
    handleSubmit,
    handleEdit,
    resetForm,
    handleFileChange,
    removeImage,
    addFeature,
    removeFeature,
  } = useMenuForm(categories, fetchData);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this menu item?')) {
      return;
    }

    try {
      await apiService.deleteItem(id);
      alert('Menu item deleted successfully!');
      fetchData();
    } catch (error) {
      console.error('Failed to delete:', error);
      alert('Failed to delete menu item. Please try again.');
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {showForm && (
          <MenuForm
            formData={formData}
            setFormData={setFormData}
            categories={categories}
            editingId={editingId}
            submitting={submitting}
            featureInput={featureInput}
            setFeatureInput={setFeatureInput}
            onSubmit={handleSubmit}
            onCancel={resetForm}
            onFileChange={handleFileChange}
            onRemoveImage={removeImage}
            onAddFeature={addFeature}
            onRemoveFeature={removeFeature}
          />
        )}

        <MenuItemsList
          menuItems={menuItems}
          categories={categories}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default AddMenu;