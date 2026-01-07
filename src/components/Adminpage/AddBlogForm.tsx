import React, { useState } from 'react';
import { Pencil, Trash2 } from 'lucide-react';

interface BlogPost {
  id: string;
  subHeading: string;
  heading: string;
  description: string;
  coverImage: File | null;
  imageUrl?: string;
}

interface FormData {
  subHeading: string;
  heading: string;
  description: string;
  coverImage: File | null;
}

const BlogManager: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([
    {
      id: '1',
      subHeading: 'Restaurant News',
      heading: 'Grand Opening Celebration',
      description: 'Join us for our grand opening celebration with special menu items and live music. Experience the finest dining in town with our award-winning chefs.',
      coverImage: null,
    },
    {
      id: '2',
      subHeading: 'Chef\'s Special',
      heading: 'New Summer Menu Released',
      description: 'Discover our fresh summer menu featuring locally sourced ingredients and innovative recipes that will delight your taste buds.',
      coverImage: null,
    },
  ]);

  const [formData, setFormData] = useState<FormData>({
    subHeading: '',
    heading: '',
    description: '',
    coverImage: null,
  });

  const [fileName, setFileName] = useState<string>('No File Chosen');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(true);

  const handleSubmit = () => {
    if (!formData.heading || !formData.description) {
      alert('Please fill in required fields');
      return;
    }

    if (editingId) {
      // Update existing blog post
      setBlogPosts(blogPosts.map(post => 
        post.id === editingId 
          ? { ...post, ...formData, id: editingId }
          : post
      ));
      setEditingId(null);
    } else {
      // Add new blog post
      const newPost: BlogPost = {
        id: Date.now().toString(),
        ...formData,
      };
      setBlogPosts([...blogPosts, newPost]);
    }

    // Reset form
    setFormData({
      subHeading: '',
      heading: '',
      description: '',
      coverImage: null,
    });
    setFileName('No File Chosen');
  };

  const handleEdit = (post: BlogPost) => {
    setFormData({
      subHeading: post.subHeading,
      heading: post.heading,
      description: post.description,
      coverImage: post.coverImage,
    });
    setEditingId(post.id);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this blog post?')) {
      setBlogPosts(blogPosts.filter(post => post.id !== id));
    }
  };

  const handleCancel = () => {
    setFormData({
      subHeading: '',
      heading: '',
      description: '',
      coverImage: null,
    });
    setFileName('No File Chosen');
    setEditingId(null);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, coverImage: file });
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
                <h2 className="text-3xl font-bold text-zinc-800">{editingId ? 'Edit' : 'Add'}</h2>
                <span className="text-3xl font-bold text-[#E4B951] italic">Blog</span>
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
                  {editingId ? 'Update Blog' : 'Add Blog'}
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                {/* Sub Heading */}
                <div>
                  <label className="block text-zinc-700 font-semibold mb-2">Sub Heading</label>
                  <input
                    type="text"
                    placeholder="Sub Heading"
                    value={formData.subHeading}
                    onChange={(e) => setFormData({ ...formData, subHeading: e.target.value })}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
                  />
                  <p className="text-xs text-zinc-500 mt-1">Shown above the main blog title.</p>
                </div>

                {/* Heading */}
                <div>
                  <label className="block text-zinc-700 font-semibold mb-2">Heading</label>
                  <input
                    type="text"
                    placeholder="Main Heading"
                    value={formData.heading}
                    onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
                  />
                  <p className="text-xs text-zinc-500 mt-1">Displayed prominently on the blog card.</p>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-zinc-700 font-semibold mb-2">Description</label>
                <textarea
                  placeholder="Write the story..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={6}
                  className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951] resize-none"
                />
              </div>

              {/* Cover Image */}
              <div>
                <label className="block text-zinc-700 font-semibold mb-2">Cover Image</label>
                <div className="border-2 border-dashed border-zinc-300 rounded-lg p-8">
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="w-20 h-20 bg-zinc-100 rounded-lg flex items-center justify-center">
                      <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div className="text-center">
                      <label className="px-6 py-2 bg-white border-2 border-[#E4B951] text-[#E4B951] rounded-lg hover:bg-[#E4B951] hover:text-black transition cursor-pointer font-semibold inline-block">
                        Choose File
                        <input
                          type="file"
                          className="hidden"
                          accept="image/*"
                          onChange={handleFileChange}
                        />
                      </label>
                      <p className="text-sm text-zinc-500 mt-2">{fileName}</p>
                      <p className="text-xs text-zinc-400 mt-1">Recommended size 1200×800px. JPG or PNG, max 2MB.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-start space-x-3">
                <button
                  onClick={handleSubmit}
                  className="px-8 py-3 bg-[#E4B951] text-black font-semibold rounded-lg hover:bg-[#d4a941] transition flex items-center space-x-2"
                >
                  <span>{editingId ? 'Update Blog' : 'Add Blog'}</span>
                  <span>›</span>
                </button>
                {editingId && (
                  <button
                    onClick={handleCancel}
                    className="px-6 py-3 bg-zinc-200 text-zinc-700 font-semibold rounded-lg hover:bg-zinc-300 transition"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Blog Posts List */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-zinc-800">Blog Posts</h2>
            <span className="text-sm text-zinc-500">{blogPosts.length} posts</span>
          </div>

          {blogPosts.length === 0 ? (
            <div className="text-center py-12 text-zinc-400">
              <p>No blog posts yet. Add your first post above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <div
                  key={post.id}
                  className="border border-zinc-200 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex space-x-4 flex-1">
                      <div className="w-32 h-32 bg-zinc-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <svg className="w-16 h-16 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                      
                      <div className="flex-1">
                        {post.subHeading && (
                          <p className="text-sm text-[#E4B951] font-semibold mb-1">{post.subHeading}</p>
                        )}
                        <h3 className="text-2xl font-bold text-zinc-800 mb-2">{post.heading}</h3>
                        <p className="text-zinc-600 text-sm leading-relaxed">{post.description}</p>
                      </div>
                    </div>

                    <div className="flex space-x-2 ml-4">
                      <button
                        onClick={() => handleEdit(post)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit"
                      >
                        <Pencil size={20} />
                      </button>
                      <button
                        onClick={() => handleDelete(post.id)}
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

export default BlogManager;