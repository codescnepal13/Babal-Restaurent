import React from 'react';
import MenuItemCard from './MenuItemCard';
import type { MenuItem, Category } from '../../../services/apiService';

interface MenuItemsListProps {
  menuItems: MenuItem[];
  categories: Category[];
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

const MenuItemsList: React.FC<MenuItemsListProps> = ({ 
  menuItems, 
  categories, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-zinc-800">Menu Items</h2>
        <span className="text-sm text-zinc-500">{menuItems.length} items</span>
      </div>

      {menuItems.length === 0 ? (
        <div className="text-center py-12 text-zinc-400">
          <p>No menu items yet. Add your first item above!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {menuItems.map((item) => {
            const category = categories.find(c => c.id === item.categoryId);
            return (
              <MenuItemCard
                key={item.id}
                item={item}
                category={category}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MenuItemsList;