import React from 'react';

interface WelcomeCardProps {
  adminName: string;
}

const WelcomeCard: React.FC<WelcomeCardProps> = ({ adminName }) => {
  return (
    <div className="bg-gradient-to-r from-zinc-800 to-zinc-900 rounded-xl p-6 flex items-center justify-between shadow-lg">
      <div>
        <p className="text-zinc-400 text-sm mb-1">Current Admin</p>
        <h2 className="text-white text-3xl font-bold mb-2">{adminName}</h2>
        <p className="text-zinc-400 text-sm">Have a great day ahead..</p>
      </div>
      <img src="/admin-avatar.png" alt="Admin" className="w-24 h-24 rounded-full" />
    </div>
  );
};

export default WelcomeCard;