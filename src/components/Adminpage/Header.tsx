import React from 'react';
import { Search, MessageSquare, Bell } from 'lucide-react';

interface HeaderProps {
  adminName: string;
}

const Header: React.FC<HeaderProps> = ({}) => {
  return (
    <div className="bg-white border-b border-zinc-200 px-6 py-4 flex items-center justify-between">
      {/* Search Bar */}
      <div className="flex items-center flex-1 max-w-xl">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Search....."
            className="w-full pl-4 pr-4 py-3 bg-zinc-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
          />
          <button className="absolute right-0 top-0 h-full px-4 bg-[#E4B951] rounded-r-lg hover:bg-[#d4a941] transition">
            <Search className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>

      {/* Right Side - Notifications & Messages */}
      <div className="flex items-center space-x-3 ml-6">
        <button className="p-3 bg-[#E4B951] rounded-lg hover:bg-[#d4a941] transition">
          <MessageSquare className="w-5 h-5 text-white" />
        </button>
        <button className="p-3 bg-[#E4B951] rounded-lg hover:bg-[#d4a941] transition">
          <Bell className="w-5 h-5 text-white" />
        </button>
      </div>
    </div>
  );
};

export default Header;