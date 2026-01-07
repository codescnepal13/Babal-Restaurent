import React from 'react';
import WelcomeCard from './WelcomeCard';
import StatsCard from './StatsCard';
import { FileText } from 'lucide-react';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2">
          <WelcomeCard adminName="Hari Prasad" />
        </div>
        <StatsCard title="Item in Menu" value={30} icon={<FileText className="w-8 h-8" />} />
      </div>
      
      <div className="bg-white rounded-xl shadow-lg p-8">
        <h3 className="text-2xl font-bold text-zinc-800 mb-4">Recent Activity</h3>
        <p className="text-zinc-500">Dashboard content goes here...</p>
      </div>
    </div>
  );
};

export default Dashboard;