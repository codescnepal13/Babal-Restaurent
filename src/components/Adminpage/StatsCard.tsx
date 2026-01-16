import React from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-linear-to-br from-[#E4B951] to-[#d4a941] rounded-xl p-6 text-white flex items-center justify-between shadow-lg">
      <div className="bg-white/20 p-4 rounded-lg">{icon}</div>
      <div className="text-right">
        <h3 className="text-4xl font-bold">{value}</h3>
        <p className="text-sm mt-1">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;