import { useState, useEffect } from 'react';
import apiService from '../services/apiService';


export default function ReservationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    guests: '1',
    date: '',
    time: '09:00',
    message: ''
  });

  const [status, setStatus] = useState('');
  const [minDate, setMinDate] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bookedTimes, setBookedTimes] = useState<string[]>([]);
  const [isBookingOpen, setIsBookingOpen] = useState(true);

  // Set minimum date to today
  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    setMinDate(`${year}-${month}-${day}`);
    
    // Check booking settings
    checkBookingSettings();
  }, []);

  // Check if booking is open
  const checkBookingSettings = async () => {
    try {
      const response = await apiService.getReservationSettings();
      setIsBookingOpen(response.data.isBookingOpen);
    } catch (error) {
      console.error('Failed to fetch booking settings:', error);
    }
  };

  // Fetch availability when date changes
  useEffect(() => {
    if (formData.date) {
      fetchAvailability(formData.date);
    }
  }, [formData.date]);

  const fetchAvailability = async (date: string) => {
    try {
      const response = await apiService.getReservationAvailability(date);
      setBookedTimes(response.data.bookedTimes);
      setIsBookingOpen(response.data.isBookingOpen);
    } catch (error) {
      console.error('Failed to fetch availability:', error);
    }
  };

  // Generate time slots in 1-hour intervals
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 0; hour < 24; hour++) {
      const timeString = `${String(hour).padStart(2, '0')}:00`;
      const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
      const period = hour < 12 ? 'AM' : 'PM';
      
      // Check if this time slot is booked
      const isBooked = bookedTimes.includes(timeString);
      
      slots.push({
        value: timeString,
        label: `${displayHour}:00 ${period}${isBooked ? ' (Booked)' : ''}`,
        isBooked
      });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleSubmit = async () => {
    // Validate form
    if (!formData.fullName || !formData.email || !formData.phone || !formData.date || !formData.time) {
      setStatus('error:Please fill in all required fields');
      return;
    }

    // Check if booking is open
    if (!isBookingOpen) {
      setStatus('error:Reservations are currently closed');
      return;
    }

    // Check if selected date and time is in the past
    const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
    const now = new Date();

    if (selectedDateTime < now) {
      setStatus('error:Cannot reserve for past date and time');
      return;
    }

    // Check if time slot is already booked
    if (bookedTimes.includes(formData.time)) {
      setStatus('error:This time slot is already booked. Please select another time.');
      return;
    }

    setIsLoading(true);
    setStatus('');

    try {
      const response = await apiService.createReservation({
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        guests: parseInt(formData.guests),
        date: formData.date,
        time: formData.time,
        message: formData.message || undefined
      });

      setStatus('success:Reservation submitted successfully!');
      console.log('Reservation created:', response.data);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          fullName: '',
          email: '',
          phone: '',
          guests: '1',
          date: '',
          time: '09:00',
          message: ''
        });
        setStatus('');
        setBookedTimes([]);
      }, 3000);

    } catch (error: any) {
      console.error('Failed to create reservation:', error);
      
      // Handle specific error messages from backend
      if (error.message.includes('409')) {
        setStatus('error:This time slot is already booked. Please select another time.');
      } else if (error.message.includes('400')) {
        setStatus('error:Invalid reservation data. Please check your inputs.');
      } else {
        setStatus('error:Failed to submit reservation. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear status when user makes changes
    if (status) setStatus('');
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16 lg:py-20">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-6 sm:mb-8">
          <p className="text-base sm:text-lg md:text-2xl lg:text-3xl mb-3 sm:mb-4 font-great-vibes">
            Reserve Now
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-inter font-bold mb-6 sm:mb-8 px-2">
            Secure your Table Now
          </h1>
          <div className="mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl mb-3 sm:mb-4">
              <span className="text-[#E4B951] font-inter">Reserve </span>
              <span className="font-great-vibes text-[#E4B951]">Now</span>
            </h2>
            <p className="text-gray-400 text-xs sm:text-sm md:text-base max-w-2xl mx-auto px-4">
              At Babal, every dish is a note, and every evening tells a story.
              <br className="hidden sm:block" />
              Inspired by the haunting.
            </p>
          </div>

          {!isBookingOpen && (
            <div className="mb-6 p-4 bg-red-900/30 border border-red-500 rounded-lg">
              <p className="text-red-400 text-sm sm:text-base">
                Reservations are currently closed. Please check back later.
              </p>
            </div>
          )}
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="fullName" className="block text-xs sm:text-sm mb-2 text-[#E4B951]">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                disabled={!isBookingOpen || isLoading}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs sm:text-sm mb-2 text-[#E4B951]">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="@gmail.com"
                required
                disabled={!isBookingOpen || isLoading}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="phone" className="block text-xs sm:text-sm mb-2 text-[#E4B951]">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="77722211"
                required
                disabled={!isBookingOpen || isLoading}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="guests" className="block text-xs sm:text-sm mb-2 text-[#E4B951]">
                Number of Guests <span className="text-red-500">*</span>
              </label>
              <select
                id="guests"
                name="guests"
                value={formData.guests}
                onChange={handleChange}
                required
                disabled={!isBookingOpen || isLoading}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {[...Array(20)].map((_, i) => (
                  <option key={i + 1} value={i + 1}>
                    {i + 1} {i === 0 ? 'Guest' : 'Guests'}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label htmlFor="date" className="block text-xs sm:text-sm mb-2 text-[#E4B951]">
                Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                min={minDate}
                required
                disabled={!isBookingOpen || isLoading}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E4B951] disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>

            <div>
              <label htmlFor="time" className="block text-xs sm:text-sm mb-2 text-[#E4B951]">
                Time <span className="text-red-500">*</span>
              </label>
              <select
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                disabled={!isBookingOpen || isLoading}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E4B951] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {timeSlots.map((slot) => (
                  <option 
                    key={slot.value} 
                    value={slot.value}
                    disabled={slot.isBooked}
                    className={slot.isBooked ? 'text-gray-400' : ''}
                  >
                    {slot.label}
                  </option>
                ))}
              </select>
              {formData.date && bookedTimes.length > 0 && (
                <p className="text-xs text-gray-400 mt-1">
                  {bookedTimes.length} time slot(s) already booked
                </p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs sm:text-sm mb-2 text-[#E4B951]">
              Message (Optional)
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Short Message"
              rows={6}
              disabled={!isBookingOpen || isLoading}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          {status && (
            <div className={`flex items-center gap-2 p-3 rounded-lg ${
              status.startsWith('error') 
                ? 'bg-red-900/30 border border-red-500' 
                : 'bg-green-900/30 border border-green-500'
            }`}>
              <span className={`inline-block w-2 h-2 rounded-full ${
                status.startsWith('error') ? 'bg-red-500' : 'bg-green-500'
              }`}></span>
              <span className={`text-xs sm:text-sm ${
                status.startsWith('error') ? 'text-red-400' : 'text-green-400'
              }`}>
                {status.split(':')[1]}
              </span>
            </div>
          )}

          <div className="flex justify-center pt-2 pb-6">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={!isBookingOpen || isLoading}
              className="w-full sm:w-auto px-12 sm:px-20 md:px-32 py-3 sm:py-3.5 bg-[#E4B951] hover:bg-yellow-600 text-white text-sm sm:text-base font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E4B951] focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#E4B951]"
            >
              {isLoading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}