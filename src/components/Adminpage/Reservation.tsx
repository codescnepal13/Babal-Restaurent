import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ReservationData {
  id: number;
  name: string;
  email: string;
  phone: string;
  time: string;
}

const Reservation: React.FC = () => {
  // Sample data - replace with actual API data
  const [reservations] = useState<ReservationData[]>([
    {
      id: 1,
      name: 'Hari Prasad',
      email: 'abcde@gmail.com',
      phone: '+977-9007665236',
      time: '13th Jan 2025 10:00 AM',
    },
    {
      id: 2,
      name: 'Hari Prasad',
      email: 'abcde@gmail.com',
      phone: '+977-9007665236',
      time: '13th Jan 2025 10:00 AM',
    },
    {
      id: 3,
      name: 'Hari Prasad',
      email: 'abcde@gmail.com',
      phone: '+977-9007665236',
      time: '13th Jan 2025 10:00 AM',
    },
    {
      id: 4,
      name: 'Hari Prasad',
      email: 'abcde@gmail.com',
      phone: '+977-9007665236',
      time: '13th Jan 2025 10:00 AM',
    },
    {
      id: 5,
      name: 'Hari Prasad',
      email: 'abcde@gmail.com',
      phone: '+977-9007665236',
      time: '13th Jan 2025 10:00 AM',
    },
    {
      id: 6,
      name: 'Hari Prasad',
      email: 'abcde@gmail.com',
      phone: '+977-9007665236',
      time: '13th Jan 2025 10:00 AM',
    },
    {
      id: 7,
      name: 'Hari Prasad',
      email: 'abcde@gmail.com',
      phone: '+977-9007665236',
      time: '13th Jan 2025 10:00 AM',
    },
    {
      id: 8,
      name: 'Hari Prasad',
      email: 'abcde@gmail.com',
      phone: '+977-9007665236',
      time: '13th Jan 2025 10:00 AM',
    },
    {
      id: 9,
      name: 'Hari Prasad',
      email: 'abcde@gmail.com',
      phone: '+977-9007665236',
      time: '13th Jan 2025 10:00 AM',
    },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const totalPages = Math.ceil(reservations.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return reservations.slice(startIndex, endIndex);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="flex items-center space-x-3 mb-6">
        <h2 className="text-3xl font-bold text-zinc-800">Reservation</h2>
        <span className="text-3xl font-bold text-[#E4B951] italic">List</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-zinc-200">
              <th className="text-left py-4 px-4 text-[#E4B951] font-semibold">S.no</th>
              <th className="text-left py-4 px-4 text-[#E4B951] font-semibold">Name</th>
              <th className="text-left py-4 px-4 text-[#E4B951] font-semibold">Email</th>
              <th className="text-left py-4 px-4 text-[#E4B951] font-semibold">Phone Number</th>
              <th className="text-left py-4 px-4 text-[#E4B951] font-semibold">Time</th>
            </tr>
          </thead>
          <tbody>
            {getCurrentPageData().map((reservation, index) => (
              <tr key={reservation.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition">
                <td className="py-4 px-4 text-zinc-600">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="py-4 px-4 text-zinc-800 font-medium">{reservation.name}</td>
                <td className="py-4 px-4 text-zinc-600">{reservation.email}</td>
                <td className="py-4 px-4 text-zinc-600">{reservation.phone}</td>
                <td className="py-4 px-4 text-zinc-600">{reservation.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center space-x-4 mt-6">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`p-2 rounded-lg transition ${
            currentPage === 1
              ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
              : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
          }`}
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        
        <span className="text-zinc-600 font-medium">
          Page {currentPage} of {totalPages}
        </span>
        
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`p-2 rounded-lg transition ${
            currentPage === totalPages
              ? 'bg-zinc-200 text-zinc-400 cursor-not-allowed'
              : 'bg-zinc-200 text-zinc-700 hover:bg-zinc-300'
          }`}
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Reservation;