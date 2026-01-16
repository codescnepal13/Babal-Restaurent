import React, { useState, useEffect } from 'react';
import { Calendar, AlertCircle, X, ChevronRight } from 'lucide-react';

const API_BASE_URL = 'http://localhost:3000/api/v1';

interface BlogPost {
  id: string;
  subHeading: string;
  heading: string;
  description: string;
  coverImage: string;
  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

// Blog Detail Modal Component
const BlogDetailModal: React.FC<{ blog: BlogPost; onClose: () => void }> = ({ blog, onClose }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recently';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Recently';
    }
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div 
        className="bg-zinc-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-zinc-800 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition"
        >
          <X size={24} />
        </button>

        {/* Cover Image */}
        {blog.coverImage && (
          <div className="relative h-64 sm:h-80 lg:h-96 overflow-hidden rounded-t-2xl">
            <img
              src={blog.coverImage}
              alt={blog.heading}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-zinc-900/40 to-transparent" />
          </div>
        )}

        {/* Content */}
        <div className="p-6 sm:p-8 lg:p-10">
          {blog.subHeading && (
            <p className="text-[#E4B951] font-semibold text-sm sm:text-base mb-3">
              {blog.subHeading}
            </p>
          )}
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {blog.heading}
          </h2>

          <div className="flex items-center space-x-2 text-sm text-zinc-400 mb-6 pb-6 border-b border-zinc-800">
            <Calendar size={16} />
            <span>{formatDate(blog.createdAt)}</span>
          </div>

          <div className="prose prose-invert prose-lg max-w-none">
            <p className="text-zinc-300 text-base sm:text-lg leading-relaxed whitespace-pre-wrap">
              {blog.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Error Alert Component
const ErrorAlert: React.FC<{ message: string; onRetry: () => void }> = ({ message, onRetry }) => {
  return (
    <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 max-w-md mx-auto">
      <div className="flex items-start space-x-3">
        <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={20} />
        <div className="flex-1">
          <p className="text-red-400 text-sm font-medium mb-3">{message}</p>
          <button
            onClick={onRetry}
            className="px-4 py-2 bg-red-800 text-white text-sm rounded-lg hover:bg-red-700 transition"
          >
            Try Again
          </button>
        </div>
      </div>
    </div>
  );
};

// Loading Skeleton Component
const BlogSkeleton: React.FC = () => {
  return (
    <div className="bg-zinc-900 rounded-xl shadow-lg overflow-hidden border border-zinc-800 animate-pulse">
      <div className="h-64 sm:h-72 bg-zinc-800" />
      <div className="p-5 sm:p-6">
        <div className="h-4 bg-zinc-800 rounded w-24 mb-3" />
        <div className="h-7 bg-zinc-800 rounded w-3/4 mb-3" />
        <div className="space-y-2 mb-4">
          <div className="h-4 bg-zinc-800 rounded w-full" />
          <div className="h-4 bg-zinc-800 rounded w-5/6" />
          <div className="h-4 bg-zinc-800 rounded w-4/5" />
        </div>
        <div className="h-3 bg-zinc-800 rounded w-32" />
      </div>
    </div>
  );
};

// Individual Blog Card Component
const BlogCard: React.FC<{ blog: BlogPost; onClick: () => void }> = ({ blog, onClick }) => {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Recently';
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'Recently';
    }
  };

  return (
    <div 
      className="bg-zinc-900 rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:shadow-[#E4B951]/10 transition-all duration-300 group border border-zinc-800 cursor-pointer transform hover:-translate-y-1"
      onClick={onClick}
    >
      <div className="relative h-64 sm:h-72 overflow-hidden bg-zinc-800">
        {blog.coverImage ? (
          <>
            <img
              src={blog.coverImage}
              alt={blog.heading}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <div className="absolute inset-0 bg-linear-to-t from-zinc-900 via-transparent to-transparent opacity-60" />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-16 h-16 text-zinc-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Read More Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <p className="text-white font-semibold mb-2">Read Full Story</p>
            <ChevronRight className="text-[#E4B951] mx-auto" size={32} />
          </div>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        {blog.subHeading && (
          <p className="text-[#E4B951] font-semibold text-xs sm:text-sm mb-2 uppercase tracking-wide">
            {blog.subHeading}
          </p>
        )}
        <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-[#E4B951] transition-colors line-clamp-2">
          {blog.heading}
        </h3>
        <p className="text-zinc-400 text-sm sm:text-base mb-4 line-clamp-3 leading-relaxed">
          {blog.description}
        </p>
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <div className="flex items-center space-x-2 text-xs sm:text-sm text-zinc-500">
            <Calendar size={14} />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
          <div className="flex items-center space-x-1 text-[#E4B951] text-sm font-semibold group-hover:gap-2 transition-all">
            <span>Read More</span>
            <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyState: React.FC = () => {
  return (
    <div className="text-center py-20">
      <div className="w-24 h-24 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-zinc-800">
        <svg className="w-12 h-12 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
        </svg>
      </div>
      <h3 className="text-2xl font-bold text-white mb-3">No Blogs Yet</h3>
      <p className="text-zinc-400 text-base max-w-md mx-auto">
        Check back soon for exciting stories and updates from our restaurant!
      </p>
    </div>
  );
};

// Main Blog Display Component
const BlogDisplay: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [displayedBlogs, setDisplayedBlogs] = useState<BlogPost[]>([]);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [blogsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch blogs from API
  const fetchBlogs = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_BASE_URL}/blogs`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.status === 'success') {
        const publishedBlogs = result.data
          .filter((blog: BlogPost) => blog.isPublished)
          .sort((a: BlogPost, b: BlogPost) => {
            const dateA = new Date(a.createdAt || 0).getTime();
            const dateB = new Date(b.createdAt || 0).getTime();
            return dateB - dateA;
          });
        
        setBlogs(publishedBlogs);
        setDisplayedBlogs(publishedBlogs.slice(0, blogsPerPage));
      } else {
        throw new Error(result.message || 'Failed to fetch blogs');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load blogs. Please try again later.');
      console.error('Error fetching blogs:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleLoadMore = () => {
    const nextPage = currentPage + 1;
    const startIndex = 0;
    const endIndex = nextPage * blogsPerPage;
    
    setDisplayedBlogs(blogs.slice(startIndex, endIndex));
    setCurrentPage(nextPage);
  };

  const hasMore = displayedBlogs.length < blogs.length;

  return (
    <div className="min-h-screen bg-black py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16 sm:mb-20">
          <p className="text-[#E4B951] font-semibold text-sm sm:text-base uppercase tracking-wider mb-4 animate-fade-in">
            Our Stories
          </p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl text-white mb-4 sm:mb-6 px-4">
            Latest <span className="text-[#E4B951] italic font-great-vibes">Blogs</span>
          </h1>
          <div className="w-20 h-1 bg-[#E4B951] mx-auto mb-6"></div>
          <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto px-4 leading-relaxed">
            Discover the latest news, culinary insights, and behind-the-scenes stories from our restaurant
          </p>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(6)].map((_, index) => (
              <BlogSkeleton key={index} />
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !isLoading && (
          <ErrorAlert message={error} onRetry={fetchBlogs} />
        )}

        {/* Empty State */}
        {!isLoading && !error && blogs.length === 0 && <EmptyState />}

        {/* Blog Grid */}
        {!isLoading && !error && blogs.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {displayedBlogs.map((blog) => (
                <BlogCard 
                  key={blog.id} 
                  blog={blog}
                  onClick={() => setSelectedBlog(blog)}
                />
              ))}
            </div>

            {/* Load More Button */}
            {hasMore && (
              <div className="text-center mt-12 sm:mt-16">
                <button
                  onClick={handleLoadMore}
                  className="px-8 sm:px-10 py-3 sm:py-4 bg-transparent border-2 border-[#E4B951] text-[#E4B951] rounded-lg font-semibold hover:bg-[#E4B951] hover:text-black transition-all duration-300 text-sm sm:text-base inline-flex items-center space-x-3 transform hover:scale-105"
                >
                  <span>Load More Posts</span>
                  <span className="text-xs bg-[#E4B951]/20 px-3 py-1 rounded-full">
                    +{blogs.length - displayedBlogs.length}
                  </span>
                </button>
              </div>
            )}

            {/* Showing count */}
            {!hasMore && blogs.length > blogsPerPage && (
              <div className="text-center mt-12 sm:mt-16">
                <p className="text-zinc-500 text-sm">
                  Showing all {blogs.length} blog {blogs.length === 1 ? 'post' : 'posts'}
                </p>
              </div>
            )}
          </>
        )}

        {/* Blog Detail Modal */}
        {selectedBlog && (
          <BlogDetailModal 
            blog={selectedBlog} 
            onClose={() => setSelectedBlog(null)} 
          />
        )}
      </div>
    </div>
  );
};

export default BlogDisplay;