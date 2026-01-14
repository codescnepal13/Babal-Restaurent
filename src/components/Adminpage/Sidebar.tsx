import React, { useState } from 'react';
import { LogOut, Menu, X } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab, onLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'addMenu', icon: '🍽️', label: 'Add Menu' },
  { id: 'addCategory', icon: '🗂️', label: 'Add Category' },
  { id: 'addBlog', icon: '📝', label: 'Blog' },
  { id: 'reservation', icon: '📅', label: 'Reservation' },
  ];

  const handleLogout = () => {
    // if (confirm('Are you sure you want to log out?')) {
    //   localStorage.removeItem("user");
      
      // Call the onLogout prop if provided, otherwise navigate directly
      if (onLogout) {
        onLogout();
      } else {
        // Fallback: redirect to login page
        window.location.href = '/login';
      }
    }
  ;

  const handleMenuItemClick = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-zinc-900 text-white rounded-lg shadow-lg"
      >
        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        w-64 bg-gradient-to-b from-zinc-900 to-black h-screen fixed left-0 top-0 flex flex-col z-40
        transition-transform duration-300 ease-in-out
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
      {/* Logo */}
      <div className="p-6 border-b border-zinc-800">
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Babal Restaurant" className="w-32 h-auto" />
        </div>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleMenuItemClick(item.id)}
            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
              activeTab === item.id
                ? 'bg-[#E4B951] text-black font-semibold'
                : 'text-white hover:bg-zinc-800'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t border-zinc-800">
        <button
          onClick={handleLogout}
          className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-white hover:bg-red-600 hover:text-white transition-all group"
        >
          <LogOut size={20} className="group-hover:translate-x-1 transition-transform" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
    </>
  );
};

export default Sidebar;