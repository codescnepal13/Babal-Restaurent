// import { useState, useCallback } from 'react';
// import { useNavigate } from 'react-router-dom';

// interface MenuItem {
//   id: string;
//   name: string;
//   description: string;
//   price: string;
// }

// interface MenuCategory {
//   id: string;
//   name: string;
//   image: string;
//   items: MenuItem[];
// }

// const RestaurantMenu = () => {
//   const [selectedCategory, setSelectedCategory] = useState('nepali-thali');
//   const navigate = useNavigate();

//   const categories: MenuCategory[] = [
//     {
//       id: 'nepali-thali',
//       name: 'Nepali Thali',
//       image: '/menu1.png',
//       items: Array(6).fill(null).map((_, i) => ({
//         id: `nepali-${i}`,
//         name: 'Lisbon Brunch Platter',
//         description: 'Local cheeses, smoked meats, olives, rustic bread & fig jam',
//         price: '€18'
//       }))
//     },
//     {
//       id: 'south-thali',
//       name: 'South Thali',
//       image: '/menu2.png',
//       items: Array(6).fill(null).map((_, i) => ({
//         id: `south-${i}`,
//         name: 'South Indian Platter',
//         description: 'Traditional south Indian delicacies with authentic spices',
//         price: '€16'
//       }))
//     },
//     {
//       id: 'sweat-delights',
//       name: 'Sweat Delights',
//       image: '/menu3.jpg',
//       items: Array(6).fill(null).map((_, i) => ({
//         id: `sweet-${i}`,
//         name: 'Sweet Treats',
//         description: 'Assorted desserts and sweet delicacies',
//         price: '€12'
//       }))
//     },
//     {
//       id: 'quick-snacks',
//       name: 'Quick Snacks',
//       image: '/menu4.jpg',
//       items: Array(6).fill(null).map((_, i) => ({
//         id: `snack-${i}`,
//         name: 'Quick Bites',
//         description: 'Light snacks perfect for any time',
//         price: '€10'
//       }))
//     }
//   ];

//   const currentCategory = categories.find(cat => cat.id === selectedCategory) || categories[0];

//   const handleItemClick = useCallback((item: MenuItem) => {
//     navigate(`/food/${item.id}`);
//   }, [navigate]);

//   return (
//     <div className="min-h-screen bg-black text-white p-4 pb-20 md:p-8 lg:p-12 relative">
//       <div className="max-w-7xl mx-auto relative">
//         {/* Header */}
//         <div className="flex justify-between items-start mb-8 md:mb-12 lg:mb-16">
//           <div>
//             <h2 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-great-vibes mb-1 md:mb-2">Our Menu</h2>
//             <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-anton text-[#E4B951] leading-tight">
//               That Always Makes You Fall<br className="hidden sm:block" />
//               <span className="sm:hidden"> </span>In <span className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-great-vibes text-white">Love</span>
//             </h1>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="grid pb-30 lg:grid-cols-[300px_1fr] gap-6 lg:gap-12 relative overflow-hidden">
//           {/* Sidebar Categories - Horizontal scroll on mobile */}
//           <div className="lg:max-h-[500px] lg:overflow-y-auto lg:pr-2 lg:space-y-4 flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 [&::-webkit-scrollbar]:h-1.5 lg:[&::-webkit-scrollbar]:h-0 lg:[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-zinc-900 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#E4B951] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#d4a841]">
//             {categories.map((category) => (
//               <button
//                 key={category.id}
//                 onClick={() => setSelectedCategory(category.id)}
//                 className={`flex-shrink-0 w-auto lg:w-60 flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2.5 lg:py-3 rounded-full transition-all whitespace-nowrap ${
//                   selectedCategory === category.id
//                     ? 'bg-[#E4B951] text-black'
//                     : 'bg-zinc-900 hover:bg-zinc-800 text-white'
//                 }`}
//               >
//                 <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden flex-shrink-0">
//                   <img 
//                     src={category.image} 
//                     alt={category.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//                 <span className="font-semibold text-sm lg:text-lg">{category.name}</span>
//               </button>
//             ))}
//           </div>

//           {/* Menu Items Grid */}
//           <div className="relative overflow-visible">
//             {/* Category Title */}
//             <div className="mb-6 lg:mb-8">
//               <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light">
//                 <span className="text-white">{currentCategory.name.split(' ')[0]} </span>
//                 <span className="text-[#E4B951]">{currentCategory.name.split(' ').slice(1).join(' ')}</span>
//               </h2>
//             </div>

//             {/* Menu Items */}
//             <div className="space-y-4 lg:space-y-6 max-w-3xl max-h-[500px] md:max-h-[600px] overflow-y-auto pr-2 lg:pr-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-zinc-900 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#E4B951] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#d4a841]">
//               {currentCategory.items.map((item) => (
//                 <div 
//                   key={item.id} 
//                   className="border-b border-zinc-800 pb-4 lg:pb-6 cursor-pointer hover:bg-zinc-900/50 active:bg-zinc-900/70 transition-colors rounded-lg p-3 lg:p-4 -m-3 lg:-m-4"
//                   onClick={() => handleItemClick(item)}
//                 >
//                   <div className="flex justify-between items-start gap-3 lg:gap-4 mb-1.5 lg:mb-2">
//                     <h3 className="text-base md:text-lg lg:text-xl font-semibold text-[#E4B951] leading-tight">
//                       {item.name}
//                     </h3>
//                     <span className="text-base md:text-lg lg:text-xl font-semibold text-[#E4B951] whitespace-nowrap">
//                       {item.price}
//                     </span>
//                   </div>
//                   <p className="text-xs md:text-sm lg:text-base text-zinc-400 leading-relaxed">
//                     {item.description}
//                   </p>
//                 </div>
//               ))}
//             </div>
//             {/* Food Image Half Visible - Positioned relative to menu items */}
//             <div className="absolute top-20 -right-48 hidden xl:block pointer-events-none z-10">
//               <div className="w-96 h-96 rounded-full overflow-hidden">
//                 <img
//                   src={currentCategory.image}
//                   alt={currentCategory.name}
//                   className="w-full h-full object-cover object-center scale-100"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RestaurantMenu;

























import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import type { Category, MenuItem } from '../services/apiService';

const RestaurantMenu = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await apiService.getCategories(true);
      
      // Filter only active categories and sort by sortOrder
      const activeCategories = response.data
        .filter(cat => cat.isActive)
        .sort((a, b) => a.sortOrder - b.sortOrder);
      
      setCategories(activeCategories);
      
      // Set first category as selected if available
      if (activeCategories.length > 0 && !selectedCategory) {
        setSelectedCategory(activeCategories[0].id);
      }
    } catch (err) {
      console.error('Failed to fetch categories:', err);
      setError('Failed to load menu. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const currentItems = currentCategory?.items?.filter(item => item.isAvailable) || [];

  const handleItemClick = useCallback((item: MenuItem) => {
    navigate(`/food/${item.id}`);
  }, [navigate]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#E4B951] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-400">Loading menu...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={fetchCategories}
            className="px-6 py-2 bg-[#E4B951] text-black rounded-lg hover:bg-[#d4a841] transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-zinc-400 text-xl">No menu items available at the moment.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-4 pb-20 md:p-8 lg:p-12 relative">
      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 md:mb-12 lg:mb-16">
          <div>
            <h2 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-great-vibes mb-1 md:mb-2">Our Menu</h2>
            <h1 className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-anton text-[#E4B951] leading-tight">
              That Always Makes You Fall<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>In <span className="text-xl md:text-2xl lg:text-4xl xl:text-5xl font-great-vibes text-white">Love</span>
            </h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid pb-30 lg:grid-cols-[300px_1fr] gap-6 lg:gap-12 relative overflow-hidden">
          {/* Sidebar Categories - Horizontal scroll on mobile */}
          <div className="lg:max-h-[500px] lg:overflow-y-auto lg:pr-2 lg:space-y-4 flex lg:flex-col gap-3 overflow-x-auto pb-4 lg:pb-0 [&::-webkit-scrollbar]:h-1.5 lg:[&::-webkit-scrollbar]:h-0 lg:[&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-zinc-900 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#E4B951] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#d4a841]">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex-shrink-0 w-auto lg:w-60 flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-2.5 lg:py-3 rounded-full transition-all whitespace-nowrap ${
                  selectedCategory === category.id
                    ? 'bg-[#E4B951] text-black'
                    : 'bg-zinc-900 hover:bg-zinc-800 text-white'
                }`}
              >
                <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full overflow-hidden flex-shrink-0">
                  <img 
                    src={category.image} 
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3C/svg%3E';
                    }}
                  />
                </div>
                <span className="font-semibold text-sm lg:text-lg">{category.name}</span>
              </button>
            ))}
          </div>

          {/* Menu Items Grid */}
          <div className="relative overflow-visible">
            {currentCategory && (
              <>
                {/* Category Title */}
                <div className="mb-6 lg:mb-8">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light">
                    <span className="text-white">{currentCategory.name.split(' ')[0]} </span>
                    <span className="text-[#E4B951]">{currentCategory.name.split(' ').slice(1).join(' ')}</span>
                  </h2>
                  {currentCategory.description && (
                    <p className="text-zinc-400 mt-2 text-sm md:text-base">{currentCategory.description}</p>
                  )}
                </div>

                {/* Menu Items */}
                {currentItems.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-zinc-400">No items available in this category.</p>
                  </div>
                ) : (
                  <div className="space-y-4 lg:space-y-6 max-w-3xl max-h-[500px] md:max-h-[600px] overflow-y-auto pr-2 lg:pr-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-zinc-900 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-thumb]:bg-[#E4B951] [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:hover:bg-[#d4a841]">
                    {currentItems.map((item) => (
                      <div 
                        key={item.id} 
                        className="border-b border-zinc-800 pb-4 lg:pb-6 cursor-pointer hover:bg-zinc-900/50 active:bg-zinc-900/70 transition-colors rounded-lg p-3 lg:p-4 -m-3 lg:-m-4"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="flex justify-between items-start gap-3 lg:gap-4 mb-1.5 lg:mb-2">
                          <div className="flex-1">
                            <h3 className="text-base md:text-lg lg:text-xl font-semibold text-[#E4B951] leading-tight">
                              {item.name}
                            </h3>
                            {item.subtitle && (
                              <p className="text-xs md:text-sm text-zinc-500 mt-1">{item.subtitle}</p>
                            )}
                          </div>
                          <span className="text-base md:text-lg lg:text-xl font-semibold text-[#E4B951] whitespace-nowrap">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-xs md:text-sm lg:text-base text-zinc-400 leading-relaxed">
                          {item.description}
                        </p>
                        {item.features && item.features.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {item.features.map((feature, idx) => (
                              <span 
                                key={idx}
                                className="text-xs px-2 py-1 bg-zinc-800 text-zinc-300 rounded"
                              >
                                {feature}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Food Image Half Visible - Positioned relative to menu items */}
                {currentCategory.image && (
                  <div className="absolute top-20 -right-48 hidden xl:block pointer-events-none z-10">
                    <div className="w-96 h-96 rounded-full overflow-hidden">
                      <img
                        src={currentCategory.image}
                        alt={currentCategory.name}
                        className="w-full h-full object-cover object-center scale-100"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = 'none';
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantMenu;