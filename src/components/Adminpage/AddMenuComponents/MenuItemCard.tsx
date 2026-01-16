import React from 'react';
import { Pencil, Trash2, UtensilsCrossed } from 'lucide-react';
import type { MenuItem, Category } from '../../../services/apiService';

interface MenuItemCardProps {
  item: MenuItem;
  category?: Category;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, category, onEdit, onDelete }) => {
  return (
    <div className="group relative bg-white border border-zinc-200 rounded-xl overflow-hidden hover:shadow-xl hover:border-[#E4B951] transition-all duration-300 transform hover:-translate-y-1">
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-linear-to-br from-[#E4B951]/0 to-[#E4B951]/0 group-hover:from-[#E4B951]/5 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
      
      <div className="relative p-6">
        <div className="flex items-start space-x-4">
          {/* Image Container */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 bg-linear-to-br from-zinc-100 to-zinc-200 rounded-xl flex items-center justify-center overflow-hidden ring-2 ring-zinc-100 group-hover:ring-[#E4B951] transition-all duration-300">
              {item.images && item.images.length > 0 ? (
                <img 
                  src={item.images[0]} 
                  alt={item.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                />
              ) : (
                <UtensilsCrossed className="w-12 h-12 text-zinc-400 group-hover:text-[#E4B951] transition-colors duration-300" />
              )}
            </div>
            {/* Multiple images indicator */}
            {item.images && item.images.length > 1 && (
              <div className="absolute -bottom-1 -right-1 bg-[#E4B951] text-black text-xs font-bold px-2 py-0.5 rounded-full shadow-lg">
                +{item.images.length - 1}
              </div>
            )}
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <h3 className="text-xl font-bold text-zinc-800 group-hover:text-[#E4B951] transition-colors duration-300">
                  {item.name}
                </h3>
                {item.subtitle && (
                  <p className="text-sm text-zinc-500 mt-0.5 font-medium">{item.subtitle}</p>
                )}
              </div>
              <span className="text-xl font-bold text-[#E4B951] ml-3 whitespace-nowrap bg-[#E4B951]/10 px-3 py-1 rounded-lg group-hover:bg-[#E4B951] group-hover:text-black transition-all duration-300">
                {item.price}
              </span>
            </div>
            
            {/* Category Badge */}
            <span className="inline-block px-3 py-1.5 bg-linear-to-r from-zinc-100 to-zinc-50 text-zinc-700 text-xs font-semibold rounded-full mb-3 border border-zinc-200 group-hover:border-[#E4B951]/30 transition-colors duration-300">
              {category?.name || 'Unknown Category'}
            </span>
            
            {/* Description */}
            <p className="text-zinc-600 text-sm leading-relaxed mb-3 line-clamp-2">
              {item.description}
            </p>
            
            {/* Features */}
            {item.features && item.features.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-3">
                {item.features.map((feature, idx) => (
                  <span 
                    key={idx} 
                    className="text-xs px-2.5 py-1 bg-[#E4B951]/10 text-[#E4B951] rounded-md font-medium border border-[#E4B951]/20 hover:bg-[#E4B951]/20 transition-colors duration-200"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}
            
            {/* Bottom accent line */}
            <div className="h-1 w-0 bg-linear-to-r from-[#E4B951] to-[#d4a841] rounded-full group-hover:w-full transition-all duration-500"></div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-2 ml-2">
            <button
              onClick={() => onEdit(item)}
              className="group/btn p-2.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 hover:scale-110"
              title="Edit Item"
            >
              <Pencil size={18} className="group-hover/btn:scale-110 transition-transform" />
            </button>
            <button
              onClick={() => onDelete(item.id)}
              className="group/btn p-2.5 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 hover:scale-110"
              title="Delete Item"
            >
              <Trash2 size={18} className="group-hover/btn:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuItemCard;