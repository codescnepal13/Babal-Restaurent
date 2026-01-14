import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { Category } from '../../../services/apiService';


interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit, onDelete }) => {
  return (
    <div className="border border-zinc-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex space-x-4 flex-1">
          <div className="w-24 h-24 bg-zinc-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            {category.image ? (
              <img 
                src={category.image} 
                alt={category.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-zinc-800">{category.name}</h3>
                <span className={`inline-block px-2 py-1 text-xs rounded-full mt-2 ${
                  category.isActive 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {category.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <span className="text-sm text-zinc-500">
                Sort: {category.sortOrder}
              </span>
            </div>
            {category.description && (
              <p className="text-zinc-600 text-sm mb-2">{category.description}</p>
            )}
            {category.items && (
              <p className="text-sm text-zinc-500">
                {category.items.length} item{category.items.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>
        </div>

        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(category)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="Edit"
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => onDelete(category.id)}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            title="Delete"
          >
            <Trash2 size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;