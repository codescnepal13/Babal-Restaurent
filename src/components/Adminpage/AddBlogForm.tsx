// import React, { useState, useEffect } from 'react';
// import { Pencil, Trash2, AlertCircle, Loader2 } from 'lucide-react';

// const API_BASE_URL = 'http://localhost:3000/api/v1';

// interface BlogPost {
//   id: string;
//   subHeading: string;
//   heading: string;
//   description: string;
//   coverImage: string;
//   isPublished: boolean;
// }

// interface FormData {
//   subHeading: string;
//   heading: string;
//   description: string;
//   coverImage: File | null;
//   isPublished: boolean;
// }

// // Alert Component
// const Alert: React.FC<{ type: 'success' | 'error'; message: string; onClose: () => void }> = ({ type, message, onClose }) => {
//   useEffect(() => {
//     const timer = setTimeout(onClose, 5000);
//     return () => clearTimeout(timer);
//   }, [onClose]);

//   return (
//     <div className={`fixed top-4 right-4 z-50 max-w-md ${type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg p-4 shadow-lg flex items-start space-x-3`}>
//       <AlertCircle className={`${type === 'success' ? 'text-green-600' : 'text-red-600'} flex-shrink-0`} size={20} />
//       <div className="flex-1">
//         <p className={`text-sm font-medium ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>{message}</p>
//       </div>
//       <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
//         <span className="sr-only">Close</span>×
//       </button>
//     </div>
//   );
// };

// // Blog Form Component
// const BlogForm: React.FC<{
//   formData: FormData;
//   setFormData: (data: FormData) => void;
//   fileName: string;
//   setFileName: (name: string) => void;
//   editingId: string | null;
//   onSubmit: () => void;
//   onCancel: () => void;
//   isLoading: boolean;
// }> = ({ formData, setFormData, fileName, setFileName, editingId, onSubmit, onCancel, isLoading }) => {
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setFormData({ ...formData, coverImage: file });
//     setFileName(file ? file.name : 'No File Chosen');
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg p-8">
//       <div className="flex items-center justify-between mb-8">
//         <div className="flex items-center space-x-3">
//           <h2 className="text-3xl font-bold text-zinc-800">{editingId ? 'Edit' : 'Add'}</h2>
//           <span className="text-3xl font-bold text-[#E4B951] italic">Blog</span>
//         </div>
//         <div className="flex space-x-3">
//           {editingId && (
//             <button
//               onClick={onCancel}
//               disabled={isLoading}
//               className="px-6 py-3 bg-zinc-200 text-zinc-700 font-semibold rounded-lg hover:bg-zinc-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Cancel
//             </button>
//           )}
//           <button
//             onClick={onSubmit}
//             disabled={isLoading}
//             className="px-8 py-3 bg-[#E4B951] text-black font-semibold rounded-lg hover:bg-[#d4a941] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
//           >
//             {isLoading && <Loader2 className="animate-spin" size={18} />}
//             <span>{editingId ? 'Update Blog' : 'Add Blog'}</span>
//           </button>
//         </div>
//       </div>

//       <div className="space-y-6">
//         <div className="grid grid-cols-2 gap-6">
//           <div>
//             <label className="block text-zinc-700 font-semibold mb-2">Sub Heading</label>
//             <input
//               type="text"
//               placeholder="Sub Heading"
//               value={formData.subHeading}
//               onChange={(e) => setFormData({ ...formData, subHeading: e.target.value })}
//               disabled={isLoading}
//               className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951] disabled:bg-zinc-50"
//             />
//             <p className="text-xs text-zinc-500 mt-1">Shown above the main blog title.</p>
//           </div>

//           <div>
//             <label className="block text-zinc-700 font-semibold mb-2">
//               Heading <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               placeholder="Main Heading"
//               value={formData.heading}
//               onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
//               disabled={isLoading}
//               className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951] disabled:bg-zinc-50"
//             />
//             <p className="text-xs text-zinc-500 mt-1">Displayed prominently on the blog card.</p>
//           </div>
//         </div>

//         <div>
//           <label className="block text-zinc-700 font-semibold mb-2">
//             Description <span className="text-red-500">*</span>
//           </label>
//           <textarea
//             placeholder="Write the story..."
//             value={formData.description}
//             onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//             rows={6}
//             disabled={isLoading}
//             className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951] resize-none disabled:bg-zinc-50"
//           />
//         </div>

//         <div>
//           <label className="block text-zinc-700 font-semibold mb-2">Cover Image</label>
//           <div className="border-2 border-dashed border-zinc-300 rounded-lg p-8">
//             <div className="flex flex-col items-center justify-center space-y-4">
//               <div className="w-20 h-20 bg-zinc-100 rounded-lg flex items-center justify-center">
//                 <svg className="w-12 h-12 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//                 </svg>
//               </div>
//               <div className="text-center">
//                 <label className="px-6 py-2 bg-white border-2 border-[#E4B951] text-[#E4B951] rounded-lg hover:bg-[#E4B951] hover:text-black transition cursor-pointer font-semibold inline-block">
//                   Choose File
//                   <input
//                     type="file"
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                     disabled={isLoading}
//                   />
//                 </label>
//                 <p className="text-sm text-zinc-500 mt-2">{fileName}</p>
//                 <p className="text-xs text-zinc-400 mt-1">Recommended size 1200×800px. JPG or PNG, max 2MB.</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="flex items-center space-x-3">
//           <input
//             type="checkbox"
//             id="isPublished"
//             checked={formData.isPublished}
//             onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
//             disabled={isLoading}
//             className="w-5 h-5 text-[#E4B951] border-zinc-300 rounded focus:ring-[#E4B951]"
//           />
//           <label htmlFor="isPublished" className="text-zinc-700 font-medium">
//             Publish immediately
//           </label>
//         </div>

//         <div className="flex justify-start space-x-3">
//           <button
//             onClick={onSubmit}
//             disabled={isLoading}
//             className="px-8 py-3 bg-[#E4B951] text-black font-semibold rounded-lg hover:bg-[#d4a941] transition flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {isLoading && <Loader2 className="animate-spin" size={18} />}
//             <span>{editingId ? 'Update Blog' : 'Add Blog'}</span>
//             <span>›</span>
//           </button>
//           {editingId && (
//             <button
//               onClick={onCancel}
//               disabled={isLoading}
//               className="px-6 py-3 bg-zinc-200 text-zinc-700 font-semibold rounded-lg hover:bg-zinc-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// // Blog Card Component
// const BlogCard: React.FC<{
//   post: BlogPost;
//   onEdit: (post: BlogPost) => void;
//   onDelete: (id: string) => void;
//   isDeleting: boolean;
// }> = ({ post, onEdit, onDelete, isDeleting }) => {
//   return (
//     <div className="border border-zinc-200 rounded-lg p-6 hover:shadow-md transition-shadow">
//       <div className="flex items-start justify-between">
//         <div className="flex space-x-4 flex-1">
//           <div className="w-32 h-32 bg-zinc-100 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
//             {post.coverImage ? (
//               <img src={post.coverImage} alt={post.heading} className="w-full h-full object-cover" />
//             ) : (
//               <svg className="w-16 h-16 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
//               </svg>
//             )}
//           </div>
          
//           <div className="flex-1">
//             <div className="flex items-center space-x-2 mb-1">
//               {post.subHeading && (
//                 <p className="text-sm text-[#E4B951] font-semibold">{post.subHeading}</p>
//               )}
//               {!post.isPublished && (
//                 <span className="text-xs bg-zinc-200 text-zinc-600 px-2 py-1 rounded">Draft</span>
//               )}
//             </div>
//             <h3 className="text-2xl font-bold text-zinc-800 mb-2">{post.heading}</h3>
//             <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3">{post.description}</p>
//           </div>
//         </div>

//         <div className="flex space-x-2 ml-4">
//           <button
//             onClick={() => onEdit(post)}
//             disabled={isDeleting}
//             className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition disabled:opacity-50"
//             title="Edit"
//           >
//             <Pencil size={20} />
//           </button>
//           <button
//             onClick={() => onDelete(post.id)}
//             disabled={isDeleting}
//             className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
//             title="Delete"
//           >
//             {isDeleting ? <Loader2 className="animate-spin" size={20} /> : <Trash2 size={20} />}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Main Blog Manager Component
// const BlogManager: React.FC = () => {
//   const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
//   const [formData, setFormData] = useState<FormData>({
//     subHeading: '',
//     heading: '',
//     description: '',
//     coverImage: null,
//     isPublished: true,
//   });
//   const [fileName, setFileName] = useState<string>('No File Chosen');
//   const [editingId, setEditingId] = useState<string | null>(null);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isFetching, setIsFetching] = useState(true);
//   const [deletingId, setDeletingId] = useState<string | null>(null);
//   const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

//   // Convert file to base64
//   const fileToBase64 = (file: File): Promise<string> => {
//     return new Promise((resolve, reject) => {
//       const reader = new FileReader();
//       reader.readAsDataURL(file);
//       reader.onload = () => resolve(reader.result as string);
//       reader.onerror = (error) => reject(error);
//     });
//   };

//   // Fetch all blogs
//   const fetchBlogs = async () => {
//     try {
//       setIsFetching(true);
//       const response = await fetch(`${API_BASE_URL}/blogs`);
//       const result = await response.json();
      
//       if (result.status === 'success') {
//         setBlogPosts(result.data);
//       } else {
//         setAlert({ type: 'error', message: 'Failed to fetch blogs' });
//       }
//     } catch (error) {
//       setAlert({ type: 'error', message: 'Error connecting to server' });
//     } finally {
//       setIsFetching(false);
//     }
//   };

//   useEffect(() => {
//     fetchBlogs();
//   }, []);

//   // Create or update blog
//   const handleSubmit = async () => {
//     if (!formData.heading || !formData.description) {
//       setAlert({ type: 'error', message: 'Please fill in required fields (Heading and Description)' });
//       return;
//     }

//     setIsLoading(true);

//     try {
//       let coverImageData = '';
//       if (formData.coverImage) {
//         coverImageData = await fileToBase64(formData.coverImage);
//       }

//       const payload = {
//         subHeading: formData.subHeading,
//         heading: formData.heading,
//         description: formData.description,
//         coverImage: coverImageData,
//         isPublished: formData.isPublished,
//       };

//       const url = editingId ? `${API_BASE_URL}/blogs/${editingId}` : `${API_BASE_URL}/blogs`;
//       const method = editingId ? 'PATCH' : 'POST';

//       const response = await fetch(url, {
//         method,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(payload),
//       });

//       const result = await response.json();

//       if (result.status === 'success') {
//         setAlert({ 
//           type: 'success', 
//           message: editingId ? 'Blog updated successfully!' : 'Blog created successfully!' 
//         });
        
//         // Reset form
//         setFormData({
//           subHeading: '',
//           heading: '',
//           description: '',
//           coverImage: null,
//           isPublished: true,
//         });
//         setFileName('No File Chosen');
//         setEditingId(null);
        
//         // Refresh blog list
//         fetchBlogs();
//       } else {
//         setAlert({ type: 'error', message: result.message || 'Operation failed' });
//       }
//     } catch (error) {
//       setAlert({ type: 'error', message: 'Error connecting to server' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   // Edit blog
//   const handleEdit = (post: BlogPost) => {
//     setFormData({
//       subHeading: post.subHeading,
//       heading: post.heading,
//       description: post.description,
//       coverImage: null,
//       isPublished: post.isPublished,
//     });
//     setFileName(post.coverImage ? 'Current image will be kept if no new file is selected' : 'No File Chosen');
//     setEditingId(post.id);
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   // Delete blog
//   const handleDelete = async (id: string) => {
//     if (!confirm('Are you sure you want to delete this blog post?')) {
//       return;
//     }

//     setDeletingId(id);

//     try {
//       const response = await fetch(`${API_BASE_URL}/blogs/${id}`, {
//         method: 'DELETE',
//       });

//       const result = await response.json();

//       if (result.status === 'success') {
//         setAlert({ type: 'success', message: 'Blog deleted successfully!' });
//         fetchBlogs();
//       } else {
//         setAlert({ type: 'error', message: result.message || 'Delete failed' });
//       }
//     } catch (error) {
//       setAlert({ type: 'error', message: 'Error connecting to server' });
//     } finally {
//       setDeletingId(null);
//     }
//   };

//   // Cancel editing
//   const handleCancel = () => {
//     setFormData({
//       subHeading: '',
//       heading: '',
//       description: '',
//       coverImage: null,
//       isPublished: true,
//     });
//     setFileName('No File Chosen');
//     setEditingId(null);
//   };

//   return (
//     <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 p-8">
//       {alert && (
//         <Alert
//           type={alert.type}
//           message={alert.message}
//           onClose={() => setAlert(null)}
//         />
//       )}

//       <div className="max-w-6xl mx-auto space-y-8">
//         <BlogForm
//           formData={formData}
//           setFormData={setFormData}
//           fileName={fileName}
//           setFileName={setFileName}
//           editingId={editingId}
//           onSubmit={handleSubmit}
//           onCancel={handleCancel}
//           isLoading={isLoading}
//         />

//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold text-zinc-800">Blog Posts</h2>
//             <span className="text-sm text-zinc-500">{blogPosts.length} posts</span>
//           </div>

//           {isFetching ? (
//             <div className="text-center py-12">
//               <Loader2 className="animate-spin mx-auto text-[#E4B951]" size={40} />
//               <p className="text-zinc-500 mt-4">Loading blogs...</p>
//             </div>
//           ) : blogPosts.length === 0 ? (
//             <div className="text-center py-12 text-zinc-400">
//               <p>No blog posts yet. Add your first post above!</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {blogPosts.map((post) => (
//                 <BlogCard
//                   key={post.id}
//                   post={post}
//                   onEdit={handleEdit}
//                   onDelete={handleDelete}
//                   isDeleting={deletingId === post.id}
//                 />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default BlogManager;
















import React, { useState, useEffect } from 'react';
import { Pencil, Trash2, AlertCircle, Loader2 } from 'lucide-react';
import apiService, { fileToBase64, type BlogPost } from '../../services/apiService';

interface FormData {
  subHeading: string;
  heading: string;
  description: string;
  coverImage: File | null;
  isPublished: boolean;
}

// Alert Component
const Alert: React.FC<{ type: 'success' | 'error'; message: string; onClose: () => void }> = ({ type, message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`fixed top-4 right-4 z-50 max-w-md ${type === 'success' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border rounded-lg p-4 shadow-lg flex items-start space-x-3`}>
      <AlertCircle className={`${type === 'success' ? 'text-green-600' : 'text-red-600'} shrink-0`} size={20} />
      <div className="flex-1">
        <p className={`text-sm font-medium ${type === 'success' ? 'text-green-800' : 'text-red-800'}`}>{message}</p>
      </div>
      <button onClick={onClose} className="text-zinc-400 hover:text-zinc-600">
        <span className="sr-only">Close</span>×
      </button>
    </div>
  );
};

// Blog Form Component
const BlogForm: React.FC<{
  formData: FormData;
  setFormData: (data: FormData) => void;
  fileName: string;
  setFileName: (name: string) => void;
  editingId: string | null;
  onSubmit: () => void;
  onCancel: () => void;
  isLoading: boolean;
}> = ({ formData, setFormData, fileName, setFileName, editingId, onSubmit, onCancel, isLoading }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData({ ...formData, coverImage: file });
    setFileName(file ? file.name : 'No File Chosen');
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-3">
          <h2 className="text-3xl font-bold text-zinc-800">{editingId ? 'Edit' : 'Add'}</h2>
          <span className="text-3xl font-great-vibes font-bold text-[#E4B951] italic">Blog</span>
        </div>
        <div className="flex space-x-3">
          {editingId && (
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="px-6 py-3 bg-zinc-200 text-zinc-700 font-semibold rounded-lg hover:bg-zinc-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          )}
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="px-8 py-3 bg-[#E4B951] text-black font-semibold rounded-lg hover:bg-[#d4a941] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
          >
            {isLoading && <Loader2 className="animate-spin" size={18} />}
            <span>{editingId ? 'Update Blog' : 'Add Blog'}</span>
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-zinc-700 font-semibold mb-2">Sub Heading</label>
            <input
              type="text"
              placeholder="Sub Heading"
              value={formData.subHeading}
              onChange={(e) => setFormData({ ...formData, subHeading: e.target.value })}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951] disabled:bg-zinc-50"
            />
            <p className="text-xs text-zinc-500 mt-1">Shown above the main blog title.</p>
          </div>

          <div>
            <label className="block text-zinc-700 font-semibold mb-2">
              Heading <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="Main Heading"
              value={formData.heading}
              onChange={(e) => setFormData({ ...formData, heading: e.target.value })}
              disabled={isLoading}
              className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951] disabled:bg-zinc-50"
            />
            <p className="text-xs text-zinc-500 mt-1">Displayed prominently on the blog card.</p>
          </div>
        </div>

        <div>
          <label className="block text-zinc-700 font-semibold mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            placeholder="Write the story..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={6}
            disabled={isLoading}
            className="w-full px-4 py-3 border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951] resize-none disabled:bg-zinc-50"
          />
        </div>

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
                    disabled={isLoading}
                  />
                </label>
                <p className="text-sm text-zinc-500 mt-2">{fileName}</p>
                <p className="text-xs text-zinc-400 mt-1">Recommended size 1200×800px. JPG or PNG, max 2MB.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            id="isPublished"
            checked={formData.isPublished}
            onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
            disabled={isLoading}
            className="w-5 h-5 text-[#E4B951] border-zinc-300 rounded focus:ring-[#E4B951]"
          />
          <label htmlFor="isPublished" className="text-zinc-700 font-medium">
            Publish immediately
          </label>
        </div>

        <div className="flex justify-start space-x-3">
          <button
            onClick={onSubmit}
            disabled={isLoading}
            className="px-8 py-3 bg-[#E4B951] text-black font-semibold rounded-lg hover:bg-[#d4a941] transition flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading && <Loader2 className="animate-spin" size={18} />}
            <span>{editingId ? 'Update Blog' : 'Add Blog'}</span>
            <span>›</span>
          </button>
          {editingId && (
            <button
              onClick={onCancel}
              disabled={isLoading}
              className="px-6 py-3 bg-zinc-200 text-zinc-700 font-semibold rounded-lg hover:bg-zinc-300 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Blog Card Component
const BlogCard: React.FC<{
  post: BlogPost;
  onEdit: (post: BlogPost) => void;
  onDelete: (id: string) => void;
  isDeleting: boolean;
}> = ({ post, onEdit, onDelete, isDeleting }) => {
  return (
    <div className="border border-zinc-200 rounded-lg p-6 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div className="flex space-x-4 flex-1">
          <div className="w-32 h-32 bg-zinc-100 rounded-lg flex items-center justify-center shrink-0 overflow-hidden">
            {post.coverImage ? (
              <img src={post.coverImage} alt={post.heading} className="w-full h-full object-cover" />
            ) : (
              <svg className="w-16 h-16 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              {post.subHeading && (
                <p className="text-sm text-[#E4B951] font-semibold">{post.subHeading}</p>
              )}
              {!post.isPublished && (
                <span className="text-xs bg-zinc-200 text-zinc-600 px-2 py-1 rounded">Draft</span>
              )}
            </div>
            <h3 className="text-2xl font-bold text-zinc-800 mb-2">{post.heading}</h3>
            <p className="text-zinc-600 text-sm leading-relaxed line-clamp-3">{post.description}</p>
          </div>
        </div>

        <div className="flex space-x-2 ml-4">
          <button
            onClick={() => onEdit(post)}
            disabled={isDeleting}
            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition disabled:opacity-50"
            title="Edit"
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => onDelete(post.id)}
            disabled={isDeleting}
            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition disabled:opacity-50"
            title="Delete"
          >
            {isDeleting ? <Loader2 className="animate-spin" size={20} /> : <Trash2 size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

// Main Blog Manager Component
const BlogManager: React.FC = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [formData, setFormData] = useState<FormData>({
    subHeading: '',
    heading: '',
    description: '',
    coverImage: null,
    isPublished: true,
  });
  const [fileName, setFileName] = useState<string>('No File Chosen');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      setIsFetching(true);
      const response = await apiService.getBlogs();
      
      if (response.status === 'success') {
        setBlogPosts(response.data);
      } else {
        setAlert({ type: 'error', message: 'Failed to fetch blogs' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Error connecting to server' });
      console.error('Fetch blogs error:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // Create or update blog
  const handleSubmit = async () => {
    if (!formData.heading || !formData.description) {
      setAlert({ type: 'error', message: 'Please fill in required fields (Heading and Description)' });
      return;
    }

    setIsLoading(true);

    try {
      let coverImageData = '';
      if (formData.coverImage) {
        coverImageData = await fileToBase64(formData.coverImage);
      }

      const payload = {
        subHeading: formData.subHeading,
        heading: formData.heading,
        description: formData.description,
        coverImage: coverImageData,
        isPublished: formData.isPublished,
      };

      let response;
      if (editingId) {
        response = await apiService.updateBlog(editingId, payload);
      } else {
        response = await apiService.createBlog(payload);
      }

      if (response.status === 'success') {
        setAlert({ 
          type: 'success', 
          message: editingId ? 'Blog updated successfully!' : 'Blog created successfully!' 
        });
        
        // Reset form
        setFormData({
          subHeading: '',
          heading: '',
          description: '',
          coverImage: null,
          isPublished: true,
        });
        setFileName('No File Chosen');
        setEditingId(null);
        
        // Refresh blog list
        fetchBlogs();
      } else {
        setAlert({ type: 'error', message: response.message || 'Operation failed' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Error connecting to server' });
      console.error('Submit blog error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit blog
  const handleEdit = (post: BlogPost) => {
    setFormData({
      subHeading: post.subHeading,
      heading: post.heading,
      description: post.description,
      coverImage: null,
      isPublished: post.isPublished,
    });
    setFileName(post.coverImage ? 'Current image will be kept if no new file is selected' : 'No File Chosen');
    setEditingId(post.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete blog
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this blog post?')) {
      return;
    }

    setDeletingId(id);

    try {
      const response = await apiService.deleteBlog(id);

      if (response.status === 'success') {
        setAlert({ type: 'success', message: 'Blog deleted successfully!' });
        fetchBlogs();
      } else {
        setAlert({ type: 'error', message: response.message || 'Delete failed' });
      }
    } catch (error) {
      setAlert({ type: 'error', message: 'Error connecting to server' });
      console.error('Delete blog error:', error);
    } finally {
      setDeletingId(null);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setFormData({
      subHeading: '',
      heading: '',
      description: '',
      coverImage: null,
      isPublished: true,
    });
    setFileName('No File Chosen');
    setEditingId(null);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-amber-50 to-orange-50 p-8">
      {alert && (
        <Alert
          type={alert.type}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}

      <div className="max-w-6xl mx-auto space-y-8">
        <BlogForm
          formData={formData}
          setFormData={setFormData}
          fileName={fileName}
          setFileName={setFileName}
          editingId={editingId}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          isLoading={isLoading}
        />

        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-zinc-800">Blog Posts</h2>
            <span className="text-sm text-zinc-500">{blogPosts.length} posts</span>
          </div>

          {isFetching ? (
            <div className="text-center py-12">
              <Loader2 className="animate-spin mx-auto text-[#E4B951]" size={40} />
              <p className="text-zinc-500 mt-4">Loading blogs...</p>
            </div>
          ) : blogPosts.length === 0 ? (
            <div className="text-center py-12 text-zinc-400">
              <p>No blog posts yet. Add your first post above!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {blogPosts.map((post) => (
                <BlogCard
                  key={post.id}
                  post={post}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isDeleting={deletingId === post.id}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogManager;