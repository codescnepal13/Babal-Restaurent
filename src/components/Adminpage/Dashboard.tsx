import React, { useState, useEffect } from 'react';
import { FileText, FolderTree, Utensils, TrendingUp, BarChart3, PieChart, BookOpen, Eye } from 'lucide-react';
import apiService, { type Category, type BlogPost } from '../../services/apiService';

const WelcomeCard = ({ adminName }: { adminName: string }) => (
  <div className="bg-gradient-to-br from-[#E4B951] to-[#d4a941] rounded-xl shadow-lg p-8 text-black">
    <h2 className="text-3xl font-bold mb-2">Welcome back, {adminName}! 👋</h2>
    <p className="text-black/80">Here's what's happening with your restaurant today.</p>
  </div>
);

const StatsCard = ({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-zinc-100">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-zinc-500 text-sm font-semibold mb-1">{title}</p>
        <p className="text-4xl font-bold text-zinc-800">{value}</p>
      </div>
      <div className="text-[#E4B951]">{icon}</div>
    </div>
  </div>
);

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState('Admin');
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalItems: 0,
    totalBlogs: 0,
    publishedBlogs: 0
  });

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setAdminName(storedUsername);
    }
    
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [categoriesResponse, blogsResponse] = await Promise.all([
        apiService.getCategories(true),
        apiService.getBlogs()
      ]);
      
      setCategories(categoriesResponse.data);
      setBlogs(blogsResponse.data);
      
      const totalItems = categoriesResponse.data.reduce((acc, cat) => acc + (cat.items?.length || 0), 0);
      const publishedBlogs = blogsResponse.data.filter(blog => blog.isPublished).length;
      
      setStats({
        totalCategories: categoriesResponse.data.filter(cat => cat.isActive).length,
        totalItems,
        totalBlogs: blogsResponse.data.length,
        publishedBlogs
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-12 h-12 border-4 border-[#E4B951] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <WelcomeCard adminName={adminName} />
        </div>
        <StatsCard 
          title="Total Items" 
          value={stats.totalItems} 
          icon={<FileText className="w-8 h-8" />} 
        />
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-8 border border-zinc-100 hover:shadow-2xl transition-all duration-300 group">
          <div className="flex items-start justify-between mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <FolderTree className="text-blue-600" size={32} />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-blue-50 rounded-full">
              <TrendingUp className="text-blue-600" size={16} />
              <span className="text-xs font-semibold text-blue-600">Active</span>
            </div>
          </div>
          <h3 className="text-zinc-500 text-sm font-semibold mb-2 uppercase tracking-wider">Total Categories</h3>
          <p className="text-5xl font-bold text-zinc-800 mb-4">{stats.totalCategories}</p>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <BarChart3 size={16} />
            <span>Menu categories</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-zinc-100 hover:shadow-2xl transition-all duration-300 group">
          <div className="flex items-start justify-between mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Utensils className="text-yellow-600" size={32} />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-yellow-50 rounded-full">
              <PieChart className="text-yellow-600" size={16} />
              <span className="text-xs font-semibold text-yellow-600">Total</span>
            </div>
          </div>
          <h3 className="text-zinc-500 text-sm font-semibold mb-2 uppercase tracking-wider">Menu Items</h3>
          <p className="text-5xl font-bold text-zinc-800 mb-4">{stats.totalItems}</p>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <BarChart3 size={16} />
            <span>
              {stats.totalCategories > 0 
                ? `Avg ${Math.round(stats.totalItems / stats.totalCategories)} per category`
                : 'No categories'}
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-zinc-100 hover:shadow-2xl transition-all duration-300 group">
          <div className="flex items-start justify-between mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#E4B951]/20 to-[#E4B951]/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <BookOpen className="text-[#E4B951]" size={32} />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-[#E4B951]/10 rounded-full">
              <TrendingUp className="text-[#E4B951]" size={16} />
              <span className="text-xs font-semibold text-[#E4B951]">Content</span>
            </div>
          </div>
          <h3 className="text-zinc-500 text-sm font-semibold mb-2 uppercase tracking-wider">Total Blogs</h3>
          <p className="text-5xl font-bold text-zinc-800 mb-4">{stats.totalBlogs}</p>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <BarChart3 size={16} />
            <span>Blog posts created</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 border border-zinc-100 hover:shadow-2xl transition-all duration-300 group">
          <div className="flex items-start justify-between mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-green-50 to-green-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Eye className="text-green-600" size={32} />
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-green-50 rounded-full">
              <span className="text-xs font-semibold text-green-600">Live</span>
            </div>
          </div>
          <h3 className="text-zinc-500 text-sm font-semibold mb-2 uppercase tracking-wider">Published Blogs</h3>
          <p className="text-5xl font-bold text-zinc-800 mb-4">{stats.publishedBlogs}</p>
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <BarChart3 size={16} />
            <span>Currently visible</span>
          </div>
        </div>
      </div>

      {/* Categories Overview Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#E4B951] to-[#d4a941] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-black">Categories Overview</h3>
              <p className="text-black/80 text-sm mt-1">Manage and view all your menu categories</p>
            </div>
            <button
              onClick={fetchData}
              className="px-6 py-3 bg-black text-[#E4B951] font-semibold rounded-lg hover:bg-zinc-900 transition-all shadow-lg"
            >
              Refresh Data
            </button>
          </div>
        </div>

        {categories.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FolderTree className="text-zinc-400" size={40} />
            </div>
            <p className="text-zinc-400 text-lg font-medium">No categories found</p>
            <p className="text-zinc-500 text-sm mt-2">Create your first category to get started with your menu!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-50 border-b-2 border-zinc-200">
                  <th className="text-left py-5 px-6 text-sm font-bold text-zinc-700 uppercase tracking-wider">Category</th>
                  <th className="text-center py-5 px-6 text-sm font-bold text-zinc-700 uppercase tracking-wider">Total Items</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category, index) => (
                  <tr 
                    key={category.id} 
                    className={`border-b border-zinc-100 hover:bg-gradient-to-r hover:from-[#E4B951]/5 hover:to-transparent transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'
                    }`}
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-16 h-16 rounded-xl object-cover shadow-md ring-2 ring-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23333" width="100" height="100"/%3E%3C/svg%3E';
                            }}
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#E4B951] rounded-full border-2 border-white flex items-center justify-center">
                            <FolderTree size={12} className="text-black" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="font-bold text-zinc-800 text-lg mb-1">{category.name}</p>
                          {category.description && (
                            <p className="text-sm text-zinc-500 line-clamp-2 max-w-2xl">{category.description}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#E4B951] to-[#d4a941] text-black rounded-xl font-bold text-base shadow-md">
                        <Utensils size={18} />
                        <span>{category.items?.length || 0}</span>
                        <span className="text-sm font-normal opacity-80">items</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Blogs Overview Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-[#E4B951] to-[#d4a941] p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-2xl font-bold text-black">Recent Blog Posts</h3>
              <p className="text-black/80 text-sm mt-1">Latest content and articles</p>
            </div>
            <button
              onClick={fetchData}
              className="px-6 py-3 bg-black text-[#E4B951] font-semibold rounded-lg hover:bg-zinc-900 transition-all shadow-lg"
            >
              Refresh
            </button>
          </div>
        </div>

        {blogs.length === 0 ? (
          <div className="text-center py-20 px-4">
            <div className="w-20 h-20 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="text-zinc-400" size={40} />
            </div>
            <p className="text-zinc-400 text-lg font-medium">No blog posts found</p>
            <p className="text-zinc-500 text-sm mt-2">Create your first blog post to share content with your audience!</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-50 border-b-2 border-zinc-200">
                  <th className="text-left py-5 px-6 text-sm font-bold text-zinc-700 uppercase tracking-wider">Blog Post</th>
                  <th className="text-center py-5 px-6 text-sm font-bold text-zinc-700 uppercase tracking-wider">Status</th>
                </tr>
              </thead>
              <tbody>
                {blogs.slice(0, 5).map((blog, index) => (
                  <tr 
                    key={blog.id} 
                    className={`border-b border-zinc-100 hover:bg-gradient-to-r hover:from-[#E4B951]/5 hover:to-transparent transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'
                    }`}
                  >
                    <td className="py-5 px-6">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <img
                            src={blog.coverImage}
                            alt={blog.heading}
                            className="w-20 h-20 rounded-xl object-cover shadow-md ring-2 ring-white"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23666" width="100" height="100"/%3E%3C/svg%3E';
                            }}
                          />
                          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#E4B951] rounded-full border-2 border-white flex items-center justify-center">
                            <BookOpen size={12} className="text-black" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <p className="text-xs text-[#E4B951] font-semibold mb-1">{blog.subHeading}</p>
                          <p className="font-bold text-zinc-800 text-lg mb-1">{blog.heading}</p>
                          <p className="text-sm text-zinc-500 line-clamp-2 max-w-2xl">{blog.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-5 px-6 text-center">
                      <div className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-base shadow-md ${
                        blog.isPublished 
                          ? 'bg-gradient-to-r from-green-500 to-green-600 text-white'
                          : 'bg-gradient-to-r from-zinc-300 to-zinc-400 text-zinc-700'
                      }`}>
                        {blog.isPublished ? <Eye size={18} /> : <BookOpen size={18} />}
                        <span>{blog.isPublished ? 'Published' : 'Draft'}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {blogs.length > 5 && (
          <div className="bg-zinc-50 px-6 py-4 text-center border-t border-zinc-200">
            <p className="text-sm text-zinc-600">
              Showing 5 of {blogs.length} blog posts
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;