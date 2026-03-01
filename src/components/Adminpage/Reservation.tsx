import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, RefreshCw, Calendar, X, MessageSquare } from 'lucide-react';
import type { Reservation } from '../../services/apiService';
import apiService from '../../services/apiService';


const SpecialRequestModal = ({ message, guestName, onClose }: { message: string; guestName: string; onClose: () => void }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
    <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
    <div
      className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md p-6"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#E4B951]/20 rounded-xl flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-[#E4B951]" />
          </div>
          <div>
            <p className="text-xs text-zinc-400 font-medium uppercase tracking-wide">Special Request</p>
            <p className="font-bold text-zinc-800">{guestName}</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-full bg-zinc-100 hover:bg-zinc-200 transition-colors"
        >
          <X size={16} className="text-zinc-600" />
        </button>
      </div>
      <div className="bg-zinc-50 rounded-xl p-4 border border-zinc-100">
        <p className="text-sm text-zinc-700 leading-relaxed whitespace-pre-wrap break-words">{message}</p>
      </div>
    </div>
  </div>
);

const MessageCell = ({ message, guestName }: { message: string | undefined; guestName: string }) => {
  const [modalOpen, setModalOpen] = useState(false);

  if (!message) {
    return <span className="text-zinc-400 italic text-sm">No message</span>;
  }

  const isLong = message.length > 30;

  return (
    <>
      <div className="flex items-center gap-2">
        <span className="text-sm text-zinc-600">
          {isLong ? `${message.substring(0, 30)}...` : message}
        </span>
        {isLong && (
          <button
            onClick={() => setModalOpen(true)}
            className="shrink-0 w-7 h-7 flex items-center justify-center rounded-lg bg-[#E4B951]/10 hover:bg-[#E4B951]/20 transition-colors"
            title="View full message"
          >
            <MessageSquare size={14} className="text-[#E4B951]" />
          </button>
        )}
      </div>
      {modalOpen && (
        <SpecialRequestModal
          message={message}
          guestName={guestName}
          onClose={() => setModalOpen(false)}
        />
      )}
    </>
  );
};

const ReservationList: React.FC = () => {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [todayDate, setTodayDate] = useState('');
  const [statusMessage, setStatusMessage] = useState('');
  const [isBookingOpen, setIsBookingOpen] = useState(true);
  const [isTogglingBooking, setIsTogglingBooking] = useState(false);

  const itemsPerPage = 9;
  const totalPages = Math.ceil(reservations.length / itemsPerPage);

  // Fetch today's reservations on component mount
  useEffect(() => {
    fetchTodayReservations();
    fetchBookingSettings();
  }, []);

  // When date is selected, fetch reservations for that date automatically
  useEffect(() => {
    if (selectedDate) {
      if (selectedDate === todayDate) {
        fetchTodayReservations();
      } else {
        fetchReservationsByDate(selectedDate);
      }
    }
  }, [selectedDate]);

  const fetchBookingSettings = async () => {
    try {
      const response = await apiService.getReservationSettings();
      setIsBookingOpen(response.data.isBookingOpen);
    } catch (err: any) {
      console.error('Failed to fetch booking settings:', err);
    }
  };

  const fetchTodayReservations = async () => {
    setIsLoading(true);
    setError('');
    try {
      const response = await apiService.getTodayReservations();
      setReservations(response.data.reservations);
      setTodayDate(response.data.date);
      if (!selectedDate) {
        setSelectedDate(response.data.date);
      }
    } catch (err: any) {
      console.error('Failed to fetch reservations:', err);
      setError('Failed to load reservations. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchReservationsByDate = async (date: string) => {
    setIsLoading(true);
    setError('');
    try {
      const response = await apiService.getReservationAvailability(date);
      
      // Convert availability response to Reservation format
      const displayReservations: Reservation[] = response.data.reservations.map((res) => ({
        id: res.id,
        fullName: res.fullName,
        email: res.email,
        phone: res.phone,
        guests: res.guests,
        date: res.date,
        time: res.time,
        message: res.message,
        isArchived: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }));

      setReservations(displayReservations);
      setCurrentPage(1);
    } catch (err: any) {
      console.error('Failed to fetch availability:', err);
      setError('Failed to load reservations for selected date. Please try again.');
      setReservations([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleBooking = async () => {
    setIsTogglingBooking(true);
    try {
      const response = await apiService.updateReservationSettings({
        isBookingOpen: !isBookingOpen
      });
      setIsBookingOpen(response.data.isBookingOpen);
      setStatusMessage(
        `Reservations ${response.data.isBookingOpen ? 'enabled' : 'disabled'} successfully!`
      );
      setTimeout(() => setStatusMessage(''), 3000);
    } catch (err: any) {
      console.error('Failed to toggle booking:', err);
      setStatusMessage('Failed to update booking settings. Please try again.');
      setTimeout(() => setStatusMessage(''), 3000);
    } finally {
      setIsTogglingBooking(false);
    }
  };

  const handleRefresh = () => {
    if (selectedDate && selectedDate !== todayDate) {
      fetchReservationsByDate(selectedDate);
    } else {
      fetchTodayReservations();
    }
  };

  const handleClearDate = () => {
    setSelectedDate('');
    fetchTodayReservations();
  };

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return reservations.slice(startIndex, endIndex);
  };

  // Format time only for display
  const formatTime = (time: string) => {
    // Handle both "HH:MM:SS" and "HH:MM" formats
    const timeParts = time.split(':');
    const hours = parseInt(timeParts[0]);
    const minutes = timeParts[1];

    // Convert 24-hour time to 12-hour format
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHour = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;

    return `${displayHour}:${minutes} ${period}`;
  };

  // const isViewingToday = selectedDate === todayDate;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 gap-4">
        <div className="flex items-center space-x-3">
          <h2 className="text-3xl font-bold text-zinc-800">Reservation</h2>
          <span className="text-3xl font-bold text-[#E4B951] italic">List</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-[#E4B951]" />
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 text-sm border border-zinc-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
            />
            {selectedDate && selectedDate !== todayDate && (
              <button
                onClick={handleClearDate}
                className="p-2 text-zinc-500 hover:text-zinc-700 hover:bg-zinc-100 rounded-lg transition"
                title="View today's reservations"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Booking Toggle */}
          <div className="flex items-center gap-3 px-4 py-2 bg-zinc-100 rounded-lg">
            <span className="text-sm font-medium text-zinc-700">
              Booking {isBookingOpen ? 'Open' : 'Closed'}
            </span>
            <button
              onClick={handleToggleBooking}
              disabled={isTogglingBooking}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-[#E4B951] focus:ring-offset-2 ${
                isBookingOpen ? 'bg-[#E4B951]' : 'bg-zinc-400'
              } ${isTogglingBooking ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  isBookingOpen ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-[#E4B951] text-white rounded-lg hover:bg-yellow-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            title="Refresh reservations"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            <span className="text-sm font-medium">Refresh</span>
          </button>
        </div>
      </div>

      {/* Status Message */}
      {statusMessage && (
        <div className={`mb-4 p-3 rounded-lg ${
          statusMessage.includes('Failed') 
            ? 'bg-red-100 text-red-700 border border-red-300' 
            : 'bg-green-100 text-green-700 border border-green-300'
        }`}>
          <p className="text-sm">{statusMessage}</p>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg border border-red-300">
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <div className="flex flex-col items-center gap-3">
            <RefreshCw className="w-8 h-8 text-[#E4B951] animate-spin" />
            <p className="text-zinc-600">Loading reservations...</p>
          </div>
        </div>
      ) : reservations.length === 0 ? (
        // Empty State
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <Calendar className="w-16 h-16 text-zinc-300 mx-auto mb-4" />
            <p className="text-xl text-zinc-600 font-medium">
              No reservations for {selectedDate ? 'selected date' : 'today'}
            </p>
            <p className="text-sm text-zinc-400 mt-2">
              {selectedDate && selectedDate !== todayDate
                ? 'Try selecting a different date or view today\'s reservations' 
                : 'Reservations will appear here when customers book'}
            </p>
          </div>
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-zinc-200">
                  <th className="text-left py-4 px-4 text-[#E4B951] font-semibold">S.no</th>
                  <th className="text-left py-4 px-4 text-[#E4B951] font-semibold">Name</th>
                  <th className="text-left py-4 px-4 text-[#E4B951] font-semibold">Email</th>
                  <th className="text-left py-4 px-4 text-[#E4B951] font-semibold">Phone</th>
                  <th className="text-left py-4 px-4 text-[#E4B951] font-semibold">Guests</th>
                  <th className="text-left py-4 px-4 text-[#E4B951] font-semibold">Time</th>
                  <th className="text-left py-4 px-4 text-[#E4B951] font-semibold">Message</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentPageData().map((reservation, index) => (
                  <tr key={reservation.id} className="border-b border-zinc-100 hover:bg-zinc-50 transition">
                    <td className="py-4 px-4 text-zinc-600">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="py-4 px-4 text-zinc-800 font-medium">
                      {reservation.fullName}
                    </td>
                    <td className="py-4 px-4 text-zinc-600">
                      {reservation.email}
                    </td>
                    <td className="py-4 px-4 text-zinc-600">
                      {reservation.phone}
                    </td>
                    <td className="py-4 px-4 text-zinc-600">
                      <span className="inline-flex items-center px-2 py-1 bg-[#E4B951]/10 text-[#E4B951] rounded-md text-sm font-medium">
                        {reservation.guests} {reservation.guests === 1 ? 'Guest' : 'Guests'}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-zinc-600">
                      {formatTime(reservation.time)}
                    </td>
                    <td className="py-4 px-4 text-zinc-600 max-w-xs">
                      <MessageCell message={reservation.message} guestName={reservation.fullName} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
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
          )}

          {/* Reservation Count */}
          <div className="mt-4 text-center">
            <p className="text-sm text-zinc-500">
              Showing {getCurrentPageData().length} of {reservations.length} reservation(s)
              {selectedDate && ` for ${new Date(selectedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default ReservationList;