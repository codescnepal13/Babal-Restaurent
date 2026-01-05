import { useState } from 'react';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    date: '',
    time: '09:00',
    period: 'AM',
    message: ''
  });

  const [status, setStatus] = useState('');

  const handleSubmit = () => {
    setStatus('Reservation submitted successfully!');
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <p className="text-lg md:text-3xl mb-4 font-great-vibes text-gray-300">Reserve Now</p>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-inter font-bold mb-8">
            Secure your Table Now
          </h1>
          <div className="mb-8">
            <h2 className="text-2xl text-[#E4B951] font-inter md:text-3xl mb-4">
              Reserve <span className="font-great-vibes text-[#E4B951]">Now</span>
            </h2>
            <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
              At Almado Fado Al Fama, every dish is a note, and every evening tells a story.
              <br className="hidden md:block" />
              Inspired by the haunting.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="fullName" className="block text-sm mb-2 text-[#E4B951]">
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                required
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm mb-2 text-[#E4B951]">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="@gmail.com"
                required
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm mb-2 text-[#E4B951]">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="77722211"
                required
                className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600"
              />
            </div>

            <div>
              <label className="block text-sm mb-2 text-[#E4B951]">Time</label>
              <div className="flex gap-2">
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
                />
                <input
                  type="time"
                  name="time"
                  value={formData.time}
                  onChange={handleChange}
                  required
                  className="w-24 px-3 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
                />
                <select
                  name="period"
                  value={formData.period}
                  onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                  className="w-20 px-3 py-3 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#E4B951]"
                >
                  <option value="AM">AM</option>
                  <option value="PM">PM</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm mb-2 text-[#E4B951]">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Short Message"
              rows={6}
              className="w-full px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-600 resize-none"
            />
          </div>

          {status && (
            <div className="flex items-center gap-2 text-green-500">
              <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
              <span className="text-sm">{status}</span>
            </div>
          )}

          <div className="flex justify-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="px-32 py-3 bg-[#E4B951] hover:bg-yellow-700 text-white font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E4B951] focus:ring-offset-2 focus:ring-offset-black"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}