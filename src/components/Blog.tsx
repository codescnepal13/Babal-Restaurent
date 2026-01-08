import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

interface BlogPost {
  id: string;
  subHeading: string;
  heading: string;
  description: string;
  date: string;
  imageUrl: string;
}

const BlogDisplay: React.FC = () => {
  const [blogs] = useState<BlogPost[]>([
    {
      id: '1',
      subHeading: 'Restaurant News',
      heading: 'Grand Opening Celebration',
      description: 'Join us for our grand opening celebration with special menu items and live music. Experience the finest dining in town with our award-winning chefs. We are bringing together culinary excellence and warm hospitality to create unforgettable dining experiences.',
      date: 'January 5, 2026',
      imageUrl: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    },
    {
      id: '2',
      subHeading: "Chef's Special",
      heading: 'New Summer Menu Released',
      description: 'Discover our fresh summer menu featuring locally sourced ingredients and innovative recipes that will delight your taste buds. Our culinary team has crafted a selection of seasonal dishes that showcase the best produce from local farms.',
      date: 'January 3, 2026',
      imageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80',
    },
    {
      id: '3',
      subHeading: 'Behind The Scenes',
      heading: 'Meet Our Master Chef',
      description: 'Get to know the culinary genius behind our exquisite dishes. With over 15 years of experience in fine dining, Chef Marco brings passion and creativity to every plate. Learn about his journey and the inspiration behind our signature dishes.',
      date: 'December 28, 2025',
      imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=800&q=80',
    },
  ]);

  return (
    <div className="min-h-screen bg-black py-12  sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <p className="text-[#E4B951] font-semibold font-anton text-base lg:text-3xl sm:text-lg mb-4">Our Stories</p>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-inter text-white mb-3 sm:mb-4 px-4">
            Latest <span className="text-[#E4B951] font-great-vibes">Blogs</span>
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl mx-auto px-4">
            Discover the latest news, culinary insights, and behind-the-scenes stories from our restaurant
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-zinc-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl hover:shadow-[#E4B951]/20 transition-shadow group border border-zinc-800"
            >
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src={blog.imageUrl}
                  alt={blog.heading}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-5 sm:p-6">
                <p className="text-[#E4B951] font-semibold text-xs sm:text-sm mb-2">{blog.subHeading}</p>
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 sm:mb-3">{blog.heading}</h3>
                <p className="text-zinc-300 text-sm mb-4 line-clamp-3">{blog.description}</p>
                <div className="flex items-center space-x-2 text-xs text-zinc-400">
                  <Calendar size={14} />
                  <span>{blog.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Section */}
        {blogs.length > 3 && (
          <div className="text-center mt-10 sm:mt-12">
            <button className="px-6 sm:px-8 py-2.5 sm:py-3 border-2 border-[#E4B951] text-[#E4B951] rounded-lg font-semibold hover:bg-[#E4B951] hover:text-black transition text-sm sm:text-base">
              Load More Posts
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDisplay;