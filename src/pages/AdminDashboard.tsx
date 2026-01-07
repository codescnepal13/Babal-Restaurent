import React, { useState } from 'react';
import Sidebar from '../components/Adminpage/Sidebar';
import Header from "../components/Adminpage/Header";
import Dashboard from '../components/Adminpage/Dashboard';
import AddMenuManger from '../components/Adminpage/AddMenuForm';
import Reservation from '../components/Adminpage/Reservation';
import BlogManger from '../components/Adminpage/AddBlogForm';

const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('');

  return (
    <div className="flex min-h-screen bg-zinc-50">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 ml-64">
        <Header adminName="Hari Prasad" />
        
        <main className="p-6">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'addMenu' && <AddMenuManger />}
          {activeTab === 'reservation' && <Reservation />}
          {activeTab === 'addBlog' && <BlogManger />}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;