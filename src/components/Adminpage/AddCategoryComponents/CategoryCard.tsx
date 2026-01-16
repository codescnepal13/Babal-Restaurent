import React from 'react';
import { Pencil, Trash2, ChefHat } from 'lucide-react';
import type { Category } from '../../../services/apiService';

interface CategoryCardProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onEdit, onDelete }) => {
  return (
    <div className="group relative bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-[#E4B951] transition-all duration-300 transform hover:-translate-y-1">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-[#E4B951]/0 to-[#E4B951]/0 group-hover:from-[#E4B951]/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
      
      <div className="relative p-6">
        <div className="flex items-start space-x-4">
          {/* Image Container */}
          <div className="relative shrink-0">
            <div className="w-28 h-28 bg-linear-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center overflow-hidden ring-2 ring-zinc-100 group-hover:ring-[#E4B951] transition-all duration-300">
              {category.image ? (
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <ChefHat className="w-14 h-14 text-zinc-400 group-hover:text-[#E4B951] transition-colors duration-300" />
              )}
            </div>
            {/* Item count badge */}
            {category.items && category.items.length > 0 && (
              <div className="absolute -top-2 -right-2 bg-[#E4B951] text-black text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
                {category.items.length}
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-zinc-800 group-hover:text-[#E4B951] transition-colors duration-300 mb-1">
                  {category.name}
                </h3>
                {category.items && (
                  <p className="text-sm text-zinc-500 font-medium">
                    {category.items.length} {category.items.length === 1 ? 'Item' : 'Items'}
                  </p>
                )}
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => onEdit(category)}
                  className="group/btn p-2.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
                  title="Edit Category"
                >
                  <Pencil size={18} className="group-hover/btn:scale-110 transition-transform" />
                </button>
                <button
                  onClick={() => onDelete(category.id)}
                  className="group/btn p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
                  title="Delete Category"
                >
                  <Trash2 size={18} className="group-hover/btn:scale-110 transition-transform" />
                </button>
              </div>
            </div>
            
            {/* Description */}
            {category.description && (
              <p className="text-zinc-600 text-sm leading-relaxed line-clamp-2">
                {category.description}
              </p>
            )}
            
            {/* Bottom accent line */}
            <div className="mt-4 h-1 w-0 bg-linear-to-r from-[#E4B951] to-[#d4a841] rounded-full group-hover:w-full transition-all duration-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;