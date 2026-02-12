import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Reset error
    setError('');

    // Validation
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }

    setIsLoading(true);

    
    try {
  const response = await fetch(
    `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );


      const data = await response.json();

      if (response.ok && data.status === 'success') {
        // Store tokens in localStorage
        localStorage.setItem('accessToken', data.data.accessToken);
        localStorage.setItem('refreshToken', data.data.refreshToken);
        localStorage.setItem('userId', data.data.id);
        localStorage.setItem('username', data.data.username);
        localStorage.setItem('role', data.data.role);

        // Redirect to admin dashboard
        navigate('/admin');
      } else {
        // Handle error response
        setError(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('Unable to connect to server. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="h-screen bg-black flex items-center justify-center px-4 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-linear-to-br from-[#E4B951]/20 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-linear-to-tl from-[#E4B951]/20 to-transparent rounded-full blur-3xl"></div>
      </div>

      {/* Main Login Container */}
      <div className="w-full max-w-md relative z-10">
        {/* Logo Container */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="w-32 h-32 flex items-center justify-center">
              <Link to="/">
              <img 
                src="/logo.png" 
                alt="Restaurant Logo"
                className="w-full h-full object-contain"
              />
              </Link>
            </div>
          </div>
        </div>

        {/* Login Card */}
        <div className="bg-linear-to-br from-zinc-900 to-zinc-950 rounded-2xl shadow-2xl p-8 border border-[#E4B951]/20 backdrop-blur-sm">
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-[#E4B951] mb-2 tracking-tight">
              Admin Portal
            </h1>
            <div className="w-20 h-1 bg-[#E4B951] mx-auto rounded-full mb-3"></div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-5 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-sm text-center">{error}</p>
            </div>
          )}

          <div className="space-y-5">
            {/* Username Input */}
            <div>
              <label 
                htmlFor="username" 
                className="block text-[#E4B951] text-sm font-semibold mb-2 tracking-wide"
              >
                USERNAME
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[#E4B951]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="w-full pl-12 pr-4 py-4 bg-black/50 border-2 border-zinc-700 rounded-xl text-[#E4B951] placeholder-[#E4B951]/30 focus:outline-none focus:ring-2 focus:ring-[#E4B951] focus:border-[#E4B951] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="admin"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label 
                htmlFor="password" 
                className="block text-[#E4B951] text-sm font-semibold mb-2 tracking-wide"
              >
                PASSWORD
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-[#E4B951]/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyPress={handleKeyPress}
                  disabled={isLoading}
                  className="w-full pl-12 pr-14 py-4 bg-black/50 border-2 border-zinc-700 rounded-xl text-[#E4B951] placeholder-[#E4B951]/30 focus:outline-none focus:ring-2 focus:ring-[#E4B951] focus:border-[#E4B951] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder="Enter your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#E4B951]/50 hover:text-[#E4B951] transition-colors disabled:opacity-50"
                >
                  {showPassword ? (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full bg-linear-to-r from-[#E4B951] to-[#d4a941] text-black font-bold py-4 px-4 rounded-xl hover:from-[#f0c961] hover:to-[#E4B951] transition-all duration-300 shadow-lg shadow-[#E4B951]/30 hover:shadow-[#E4B951]/50 hover:scale-[1.02] active:scale-[0.98] mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  SIGNING IN...
                </span>
              ) : (
                'SIGN IN'
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-6 space-y-2">
          <div className="flex items-center justify-center space-x-2 text-[#E4B951]/50">
            <div className="w-8 h-px bg-[#E4B951]/30"></div>
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            <div className="w-8 h-px bg-[#E4B951]/30"></div>
          </div>
          <p className="text-[#E4B951]/50 text-xs">
            © 2026 Babal Restaurant. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}