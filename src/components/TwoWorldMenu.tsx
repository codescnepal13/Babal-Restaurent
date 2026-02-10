// const TwoWorldsMenu = () => {
//   return (
//     <div className="min-h-screen bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="text-center mb-16 sm:mb-20">
//           <p className="text-2xl sm:text-xl lg:text-4xl font-great-vibes mb-2">
//             Our Menu
//           </p>
//           <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
//             <span className="font-great-vibes text-white">Two </span>
//             <span className="text-[#E4B951]">Worlds,</span>
//           </h1>
//           <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6">
//             <span className="text-[#E4B951]">One </span>
//             <span className="font-great-vibes text-white">Plate</span>
//           </h1>
//           <p className="text-sm sm:text-base max-w-md mx-auto">
//             We bring you the best of two neighboring culinary giants.
//           </p>
//         </div>

//         {/* Menu Cards Section - Desktop/Tablet */}
//         <div className="hidden md:block relative mb-16">
//           <div className="grid grid-cols-2 gap-8 lg:gap-12 relative z-10">
//             {/* Nepali Kitchen Card */}
//             <div className="rounded-3xl p-8 lg:p-10 relative overflow-hidden">
//               {/* Background Image */}
//               <img 
//                 src="/background.jpg" 
//                 alt="Nepali Kitchen Background" 
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               {/* Text Content */}
//               <div className="relative z-10 mx-auto text-center">
//                 <h2 className="text-3xl lg:text-4xl xl:text-5xl mb-2">
//                   <span className="font-great-vibes">The </span>
//                   <span className="text-[#E4B951] font-inter">Nepali</span>
//                 </h2>
//                 <h3 className="text-2xl lg:text-3xl xl:text-4xl font-serif italic mb-6">
//                   Kitchen
//                 </h3>
//                 <p className="text-sm lg:text-base">
//                   From the streets of Kathmandu to your table.
//                 </p>
//               </div>
//             </div>

//             {/* North Indian Classics Card */}
//             <div className="rounded-3xl p-8 lg:p-10 relative overflow-hidden">
//               {/* Background Image */}
//               <img 
//                 src="/background.jpg" 
//                 alt="North Indian Background" 
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               {/* Text Content */}
//               <div className="relative z-10 mx-auto text-center">
//                 <h2 className="text-3xl lg:text-4xl xl:text-5xl mb-2">
//                   <span className="font-great-vibes">The </span>
//                   <span className="text-[#E4B951] font-inter">North</span>
//                 </h2>
//                 <h3 className="text-2xl lg:text-3xl xl:text-4xl mb-2">
//                   <span className="text-[#E4B951] font-inter">Indian </span>
//                   <span className="font-great-vibes">Classics</span>
//                 </h3>
//                 <p className="text-sm lg:text-base mt-6">
//                   Rich, aromatic, and comforting.
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* Momo Images - Overlapping at bottom corners */}
//           <div className="absolute bottom-0 left-10 transform translate-y-1/2 -translate-x-1/2 w-48 h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 z-20">
//             <img 
//               src="/menu1.png" 
//               alt="Nepali Momos" 
//               className="w-full h-full object-cover"
//             />
//           </div>

//           <div className="absolute bottom-0 right-10 transform translate-y-1/2 translate-x-1/2 w-48 h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 z-20">
//             <img 
//               src="/menu1.png" 
//               alt="Indian Momos" 
//               className="w-full h-full object-cover"
//             />
//           </div>
//         </div>

//         {/* Menu Cards Section - Mobile */}
//         <div className="md:hidden space-y-8 mb-16">
//           {/* Nepali Kitchen Card */}
//           <div className="relative">
//             <div className="rounded-3xl p-6 relative overflow-hidden">
//               {/* Background Image */}
//               <img 
//                 src="/background.jpg" 
//                 alt="Nepali Kitchen Background" 
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               {/* Text Content */}
//               <div className="relative z-10">
//                 <h2 className="text-3xl mb-2">
//                   <span className="font-serif italic">The </span>
//                   <span className="text-[#E4B951] font-bold">Nepali</span>
//                 </h2>
//                 <h3 className="text-2xl font-great-vibes mb-4">
//                   Kitchen
//                 </h3>
//                 <p className="text-sm">
//                   From the streets of Kathmandu.
//                 </p>
//               </div>
//             </div>
//             {/* Momo Image for Mobile */}
//             <div className="absolute -bottom-12 -right-6 w-32 h-32 z-20">
//               <img 
//                 src="/menu1.png" 
//                 alt="Nepali Momos" 
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>

//           {/* North Indian Classics Card */}
//           <div className="relative mt-16">
//             <div className="rounded-3xl p-6 relative overflow-hidden">
//               {/* Background Image */}
//               <img 
//                 src="/background.jpg" 
//                 alt="North Indian Background" 
//                 className="absolute inset-0 w-full h-full object-cover"
//               />
//               {/* Text Content */}
//               <div className="relative z-10">
//                 <h2 className="text-3xl mb-2">
//                   <span className="font-great-vibes">The </span>
//                   <span className="text-[#E4B951]">North</span>
//                 </h2>
//                 <h3 className="text-2xl mb-2">
//                   <span className="text-[#E4B951]">Indian </span>
//                   <span className="font-great-vibes text-gray-300">Classics</span>
//                 </h3>
//                 <p className="text-sm mt-4">
//                   Rich, aromatic, and comforting.
//                 </p>
//               </div>
//             </div>
//             {/* Momo Image for Mobile */}
//             <div className="absolute -bottom-12 -right-6 w-32 h-32 z-20">
//               <img 
//                 src="/menu1.png" 
//                 alt="Indian Momos" 
//                 className="w-full h-full object-cover"
//               />
//             </div>
//           </div>
//         </div>

//         {/* View All Menu Button */}
//         <div className="text-center mt-20 sm:mt-24">
//           <a href="/menu" className="text-[#E4B951] text-lg sm:text-xl font-semibold border-b-2 border-[#E4B951] pb-1 hover:text-yellow-600 hover:border-yellow-600 transition-colors duration-300">
//             View All Menu
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default TwoWorldsMenu;





const TwoWorldsMenu = () => {
  return (
    <div className="bg-black text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-2xl sm:text-xl lg:text-4xl font-great-vibes mb-2">
            Our Menu
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4">
            <span className="font-great-vibes text-white">Authentic </span>
            <span className="text-[#E4B951]">Nepali</span>
          </h1>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-6">
            <span className="font-great-vibes text-white">Cuisine</span>
          </h1>
          <p className="text-sm sm:text-base max-w-md mx-auto">
            From the streets of Kathmandu to your table.
          </p>
        </div>

        {/* Menu Card Section - Desktop/Tablet */}
        <div className="hidden md:block relative mb-16">
          <div className="max-w-2xl mx-auto relative z-10">
            {/* Nepali Kitchen Card */}
            <div className="rounded-3xl p-8 lg:p-10 relative overflow-hidden">
              {/* Background Image */}
              <img 
                src="/background.jpg" 
                alt="Nepali Kitchen Background" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Text Content */}
              <div className="relative z-10 mx-auto text-center">
                <h2 className="text-3xl lg:text-4xl xl:text-5xl mb-2">
                  <span className="font-great-vibes">The </span>
                  <span className="text-[#E4B951] font-inter">Nepali</span>
                </h2>
                <h3 className="text-2xl lg:text-3xl xl:text-4xl font-serif italic mb-6">
                  Kitchen
                </h3>
                <p className="text-sm lg:text-base">
                  From the streets of Kathmandu to your table.
                </p>
              </div>
            </div>

            {/* Momo Image - Original positioning */}
            <div className="absolute bottom-0 left-10 transform translate-y-1/2 -translate-x-1/2 w-48 h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 z-20">
              <img 
                src="/menu1.png" 
                alt="Nepali Momos" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Menu Card Section - Mobile */}
        <div className="md:hidden mb-16">
          {/* Nepali Kitchen Card */}
          <div className="relative">
            <div className="rounded-3xl p-6 relative overflow-hidden">
              {/* Background Image */}
              <img 
                src="/background.jpg" 
                alt="Nepali Kitchen Background" 
                className="absolute inset-0 w-full h-full object-cover"
              />
              {/* Text Content */}
              <div className="relative z-10">
                <h2 className="text-3xl mb-2">
                  <span className="font-serif italic">The </span>
                  <span className="text-[#E4B951] font-bold">Nepali</span>
                </h2>
                <h3 className="text-2xl font-great-vibes mb-4">
                  Kitchen
                </h3>
                <p className="text-sm">
                  From the streets of Kathmandu.
                </p>
              </div>
            </div>
            {/* Momo Image for Mobile */}
            <div className="absolute -bottom-12 -right-6 w-32 h-32 z-20">
              <img 
                src="/menu1.png" 
                alt="Nepali Momos" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* View All Menu Button */}
        <div className="text-center mt-20 sm:mt-24 pb-8">
          <a href="/menu" className="text-[#E4B951] text-lg sm:text-xl font-semibold border-b-2 border-[#E4B951] pb-1 hover:text-yellow-600 hover:border-yellow-600 transition-colors duration-300">
            View All Menu
          </a>
        </div>
      </div>
    </div>
  );
};

export default TwoWorldsMenu;