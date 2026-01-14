import React from 'react';
import CategoryCard from './CategoryCard';
import type { Category } from '../../../services/apiService';


interface CategoriesListProps {
  categories: Category[];
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

const CategoriesList: React.FC<CategoriesListProps> = ({ 
  categories, 
  onEdit, 
  onDelete 
}) => {
  return (
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
        <div className="space-y-4">
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesList;