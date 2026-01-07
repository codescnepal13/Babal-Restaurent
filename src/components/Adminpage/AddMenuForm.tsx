import React, { useState } from 'react';
import { Pencil, Trash2, X } from 'lucide-react';

interface MenuItem {
  id: string;
  itemName: string;
  price: string;
  category: string;
  description: string;
  image: File | null;
  imageUrl?: string;
}

interface FormData {
  itemName: string;
  price: string;
  category: string;
  description: string;
  image: File | null;
}

const MenuManager: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: '1',
      itemName: 'Grilled Salmon',
      price: '24.99',
      category: 'Dinner',
      description: 'Fresh Atlantic salmon with herbs and lemon butter',
      image: null,
    },
    {
      id: '2',
      itemName: 'Avocado Toast',
      price: '12.99',
      category: 'Brunch',
      description: 'Sourdough bread with smashed avocado, poached eggs',
      image: null,
    },
  ]);

  const [formData, setFormData] = useState<FormData>({
    itemName: '',
    price: '',
    category: 'Dinning Option',
    description: '',
    image: null,
  });

  const [fileName, setFileName] = useState<string>('No File Chosen');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = () => {
    if (!formData.itemName || !formData.price) {
      alert('Please fill in required fields');
      return;
    }

    if (editingId) {
      // Update existing item
      setMenuItems(menuItems.map(item => 
        item.id === editingId 
          ? { ...item, ...formData, id: editingId }
          : item
      ));
      setEditingId(null);
    } else {
      // Add new item
      const newItem: MenuItem = {
        id: Date.now().toString(),
        ...formData,
      };
      setMenuItems([...menuItems, newItem]);
    }

    // Reset form
    setFormData({
      itemName: '',
      price: '',
      category: 'Dinning Option',
      description: '',
      image: null,
    });
    setFileName('No File Chosen');
  };

  const handleEdit = (item: MenuItem) => {
    setFormData({
      itemName: item.itemName,
      price: item.price,
      category: item.category,
      description: item.description,
      image: item.image,
    });
    setEditingId(item.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      setMenuItems(menuItems.filter(item => item.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({
      itemName: '',
      price: '',
      category: 'Dinning Option',
      description: '',
      image: null,
    });
    setFileName('No File Chosen');
    setEditingId(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, image: file });
    setFileName(file ? file.name : 'No File Chosen');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Add/Edit Form */}
        {showForm && (
          <div className="bg-white rounded-xl shadow-lg p-8">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center space-x-3">
                <h2 className="text-3xl font-bold text-zinc-800">
                  {editingId ? 'Edit' : 'Add'}
                </h2>
                <span className="text-3xl font-bold text-[#E4B951] italic">Menu</span>
              </div>
              <div className="flex space-x-3">
                {editingId && (
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-zinc-200 text-zinc-700 font-semibold rounded-lg hover:bg-zinc-300 transition"
                  >
                    Cancel
                  </button>
                )}
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-[#E4B951] text-black font-semibold rounded-lg hover:bg-[#d4a941] transition"
                >
                  {editingId ? 'Update Menu' : 'Add Menu'}
                </button>
              </div>
            </div>

            <div className="space-y-6">
              {/* Food Item Name */}
              <div>
                <label className="block text-zinc-700 font-semibold mb-2">Food Item Name</label>
                <input
                  type="text"
                  placeholder="Food Item Name"
                  value={formData.itemName}
                  onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
                />
                <p className="text-xs text-zinc-500 mt-1">Item name must be entered how it wants to be displayed.</p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {/* Dish Price */}
                <div>
                  <label className="block text-zinc-700 font-semibold mb-2">Dish Price</label>
                  <input
                    type="text"
                    placeholder="Item Price"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
                  />
                  <p className="text-xs text-zinc-500 mt-1">Actual Price of Item.</p>
                </div>

                {/* Category Dropdown */}
                <div>
                  <label className="block text-zinc-700 font-semibold mb-2">Choose one</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951] bg-white"
                  >
                    <option value="Dinning Option">Dinning Option</option>
                    <option value="Brunch">Brunch</option>
                    <option value="Dinner">Dinner</option>
                  </select>
                </div>
              </div>

              {/* Image Upload */}
              <div>
                <div className="flex items-start space-x-4">
                  <div className="w-24 h-24 bg-zinc-100 rounded-lg flex items-center justify-center border-2 border-dashed border-zinc-300">
                    <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-zinc-600 mb-2">Please upload square image, size less than 100KB</p>
                    <div className="flex items-center space-x-4">
                      <label className="px-6 py-2 bg-white border-2 border-[#E4B951] text-[#E4B951] rounded-lg hover:bg-[#E4B951] hover:text-black transition cursor-pointer font-semibold">
                        Choose File
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                      <span className="text-sm text-zinc-500">{fileName}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-zinc-700 font-semibold mb-2">Description</label>
                <textarea
                  placeholder="Short Description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951] resize-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Menu Items List */}
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
              {menuItems.map((item) => (
                <div
                  key={item.id}
                  className="border border-zinc-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4 flex-1">
                      <div className="w-20 h-20 bg-zinc-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-10 h-10 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-bold text-zinc-800">{item.itemName}</h3>
                          <span className="text-xl font-bold text-[#E4B951]">${item.price}</span>
                        </div>
                        <span className="inline-block px-3 py-1 bg-zinc-100 text-zinc-600 text-sm rounded-full mb-2">
                          {item.category}
                        </span>
                        <p className="text-zinc-600 text-sm">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(item)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuManager;