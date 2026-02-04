import React, { useState, useEffect } from 'react';
import { FolderTree, Utensils, TrendingUp, BarChart3, BookOpen, Eye, Calendar, Users, Clock, CheckCircle2, XCircle } from 'lucide-react';
import apiService, { type Category, type BlogPost, type Reservation } from '../../services/apiService';

const WelcomeCard = ({ adminName }: { adminName: string }) => (
  <div className="bg-linear-to-br from-[#E4B951] to-[#d4a941] rounded-xl shadow-lg p-8 text-black">
    <h2 className="text-3xl font-bold mb-2">Welcome back, {adminName}! 👋</h2>
    <p className="text-black/80">Here's what's happening with your restaurant today.</p>
  </div>
);

const StatsCard = ({ title, value, icon, subtitle, trend }: { 
  title: string; 
  value: number | string; 
  icon: React.ReactNode; 
  subtitle?: string;
  trend?: 'up' | 'down' | 'neutral';
}) => (
  <div className="bg-white rounded-xl shadow-lg p-6 border border-zinc-100 hover:shadow-xl transition-all duration-300 group">
    <div className="flex items-start justify-between mb-4">
      <div className="w-14 h-14 bg-linear-to-br from-[#E4B951]/20 to-[#E4B951]/30 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
        <div className="text-[#E4B951]">{icon}</div>
      </div>
      {trend && (
        <div className={`flex items-center gap-1 px-3 py-1 rounded-full ${
          trend === 'up' ? 'bg-green-50 text-green-600' : 
          trend === 'down' ? 'bg-red-50 text-red-600' : 
          'bg-blue-50 text-blue-600'
        }`}>
          <TrendingUp size={14} className={trend === 'down' ? 'rotate-180' : ''} />
          <span className="text-xs font-semibold">{trend === 'up' ? 'Active' : trend === 'down' ? 'Low' : 'Stable'}</span>
        </div>
      )}
    </div>
    <h3 className="text-zinc-500 text-xs font-semibold mb-2 uppercase tracking-wider">{title}</h3>
    <p className="text-4xl font-bold text-zinc-800 mb-2">{value}</p>
    {subtitle && (
      <div className="flex items-center gap-2 text-sm text-zinc-500">
        <BarChart3 size={14} />
        <span>{subtitle}</span>
      </div>
    )}
  </div>
);

const Dashboard: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [todayReservations, setTodayReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminName, setAdminName] = useState('Admin');
  const [isBookingOpen, setIsBookingOpen] = useState(true);
  const [stats, setStats] = useState({
    totalCategories: 0,
    totalItems: 0,
    totalBlogs: 0,
    todayReservations: 0,
    totalGuests: 0
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
      const [categoriesResponse, blogsResponse, reservationsResponse, settingsResponse] = await Promise.all([
        apiService.getCategories(true),
        apiService.getBlogs(),
        apiService.getTodayReservations().catch(() => ({ data: { reservations: [] } })),
        apiService.getReservationSettings().catch(() => ({ data: { isBookingOpen: true } }))
      ]);
      
      setCategories(categoriesResponse.data);
      setBlogs(blogsResponse.data);
      setTodayReservations(reservationsResponse.data.reservations || []);
      setIsBookingOpen(settingsResponse.data.isBookingOpen);
      
      const totalItems = categoriesResponse.data.reduce((acc, cat) => acc + (cat.items?.length || 0), 0);
      const totalGuests = (reservationsResponse.data.reservations || []).reduce((acc, res) => acc + res.guests, 0);
      
      setStats({
        totalCategories: categoriesResponse.data.filter(cat => cat.isActive).length,
        totalItems,
        totalBlogs: blogsResponse.data.length,
        todayReservations: reservationsResponse.data.reservations?.length || 0,
        totalGuests
      });
    } catch (error) {
      console.error('Failed to fetch data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours);
    const period = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
    return `${displayHour}:${minutes} ${period}`;
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
        <div className="bg-white rounded-xl shadow-lg p-6 border border-zinc-100">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-zinc-500 text-sm font-semibold mb-1">Booking Status</p>
              <p className="text-2xl font-bold text-zinc-800">
                {isBookingOpen ? 'Open' : 'Closed'}
              </p>
            </div>
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
              isBookingOpen ? 'bg-green-100' : 'bg-red-100'
            }`}>
              {isBookingOpen ? (
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600" />
              )}
            </div>
          </div>
          <p className="text-xs text-zinc-500">
            {isBookingOpen ? 'Currently accepting reservations' : 'Reservations are closed'}
          </p>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <StatsCard 
          title="Categories" 
          value={stats.totalCategories} 
          icon={<FolderTree className="w-7 h-7" />}
          subtitle="Active categories"
          trend="up"
        />
        <StatsCard 
          title="Menu Items" 
          value={stats.totalItems} 
          icon={<Utensils className="w-7 h-7" />}
          subtitle={`${stats.totalCategories > 0 ? Math.round(stats.totalItems / stats.totalCategories) : 0} per category`}
          trend="up"
        />
        <StatsCard 
          title="Blog Posts" 
          value={stats.totalBlogs} 
          icon={<BookOpen className="w-7 h-7" />}
          subtitle="Published content"
          trend={stats.totalBlogs > 0 ? 'up' : 'neutral'}
        />
        <StatsCard 
          title="Today's Bookings" 
          value={stats.todayReservations} 
          icon={<Calendar className="w-7 h-7" />}
          subtitle="Reservations"
          trend={stats.todayReservations > 0 ? 'up' : 'neutral'}
        />
        <StatsCard 
          title="Total Guests" 
          value={stats.totalGuests} 
          icon={<Users className="w-7 h-7" />}
          subtitle="Expected today"
          trend={stats.totalGuests > 0 ? 'up' : 'neutral'}
        />
      </div>

      {/* Today's Reservations */}
      {stats.todayReservations > 0 && (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-linear-to-r from-[#E4B951] to-[#d4a941] p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-black">Today's Reservations</h3>
                <p className="text-black/80 text-sm mt-1">
                  {stats.todayReservations} reservation{stats.todayReservations !== 1 ? 's' : ''} · {stats.totalGuests} guest{stats.totalGuests !== 1 ? 's' : ''} expected
                </p>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-black/20 rounded-lg">
                <Calendar className="w-5 h-5 text-black" />
                <span className="text-black font-semibold">
                  {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-zinc-50 border-b-2 border-zinc-200">
                  <th className="text-left py-4 px-6 text-sm font-bold text-zinc-700 uppercase tracking-wider">Guest</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-zinc-700 uppercase tracking-wider">Contact</th>
                  <th className="text-center py-4 px-6 text-sm font-bold text-zinc-700 uppercase tracking-wider">Time</th>
                  <th className="text-center py-4 px-6 text-sm font-bold text-zinc-700 uppercase tracking-wider">Party Size</th>
                  <th className="text-left py-4 px-6 text-sm font-bold text-zinc-700 uppercase tracking-wider">Special Request</th>
                </tr>
              </thead>
              <tbody>
                {todayReservations.slice(0, 5).map((reservation, index) => (
                  <tr 
                    key={reservation.id} 
                    className={`border-b border-zinc-100 hover:bg-linear-to-r hover:from-[#E4B951]/5 hover:to-transparent transition-all duration-200 ${
                      index % 2 === 0 ? 'bg-white' : 'bg-zinc-50/50'
                    }`}
                  >
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-[#E4B951] to-[#d4a941] rounded-full flex items-center justify-center text-white font-bold">
                          {reservation.fullName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-bold text-zinc-800">{reservation.fullName}</p>
                          <p className="text-xs text-zinc-500">{reservation.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <p className="text-sm text-zinc-600">{reservation.phone}</p>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#E4B951]/10 text-[#E4B951] rounded-lg font-semibold">
                        <Clock size={14} />
                        <span>{formatTime(reservation.time)}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg font-semibold">
                        <Users size={14} />
                        <span>{reservation.guests}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      {reservation.message ? (
                        <p className="text-sm text-zinc-600 line-clamp-2 max-w-xs" title={reservation.message}>
                          {reservation.message}
                        </p>
                      ) : (
                        <p className="text-sm text-zinc-400 italic">No special requests</p>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {todayReservations.length > 5 && (
            <div className="bg-zinc-50 px-6 py-4 text-center border-t border-zinc-200">
              <p className="text-sm text-zinc-600">
                Showing 5 of {todayReservations.length} reservations for today
              </p>
            </div>
          )}
        </div>
      )}

      {/* Categories Overview Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-linear-to-r from-[#E4B951] to-[#d4a941] p-6">
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
                    className={`border-b border-zinc-100 hover:bg-linear-to-r hover:from-[#E4B951]/5 hover:to-transparent transition-all duration-200 ${
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
                      <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-[#E4B951] to-[#d4a941] text-black rounded-xl font-bold text-base shadow-md">
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
        <div className="bg-linear-to-r from-[#E4B951] to-[#d4a941] p-6">
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
                    className={`border-b border-zinc-100 hover:bg-linear-to-r hover:from-[#E4B951]/5 hover:to-transparent transition-all duration-200 ${
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
                          ? 'bg-linear-to-r from-green-500 to-green-600 text-white'
                          : 'bg-linear-to-r from-zinc-300 to-zinc-400 text-zinc-700'
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