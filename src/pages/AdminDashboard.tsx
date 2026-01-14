import React, { useState } from 'react';
import Sidebar from '../components/Adminpage/Sidebar';
import Dashboard from '../components/Adminpage/Dashboard';
import Reservation from '../components/Adminpage/Reservation';
import BlogManger from '../components/Adminpage/AddBlogForm';
import AddMenu from '../components/Adminpage/AddMenu';
import AddCategory from '../components/Adminpage/AddCategory';


const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 ml-64">
        <main className="p-6">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'addMenu' && <AddMenu />}
          {activeTab === 'addCategory' && <AddCategory />}
          {activeTab === 'reservation' && <Reservation />}
          {activeTab === 'addBlog' && <BlogManger />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
