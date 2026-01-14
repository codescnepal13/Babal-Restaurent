import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import type { MenuItem, Category } from '../../../services/apiService';


interface MenuItemCardProps {
  item: MenuItem;
  category?: Category;
  onEdit: (item: MenuItem) => void;
  onDelete: (id: string) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({ item, category, onEdit, onDelete }) => {
  return (
    <div className="border border-zinc-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex space-x-4 flex-1">
          <div className="w-20 h-20 bg-zinc-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
            {item.images && item.images.length > 0 ? (
              <img 
                src={item.images[0]} 
                alt={item.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="text-xl font-bold text-zinc-800">{item.name}</h3>
                {item.subtitle && (
                  <p className="text-sm text-zinc-500">{item.subtitle}</p>
                )}
              </div>
              <span className="text-xl font-bold text-[#E4B951]">{item.price}</span>
            </div>
            <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 text-sm rounded-full mb-2">
              {category?.name || 'Unknown Category'}
            </span>
            <p className="text-zinc-600 text-sm mb-2">{item.description}</p>
            
            {item.features && item.features.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.features.map((feature, idx) => (
                  <span key={idx} className="text-xs px-2 py-1 bg-[#E4B951]/10 text-[#E4B951] rounded">
                    {feature}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(item)}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
            title="Edit"
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => onDelete(item.id)}
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

export default MenuItemCard;