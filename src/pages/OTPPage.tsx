import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const OTPPage = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleVerifyOtp = async () => {
    const email = localStorage.getItem('email');
    const name = localStorage.getItem('name');
    const dob = localStorage.getItem('dob');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', {
            email,
            otp,
            name,
            dob,
        });

      const { token, user } = res.data;

      // ✅ Save to localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      navigate('/notes'); // go to dashboard
    } catch (err) {
      console.error(err);
      setError('Invalid OTP ❌ Please try again.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Enter OTP</h2>
        <p className="text-sm text-gray-600 mb-6">
          We've sent an OTP to your email. Please enter it below.
        </p>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm mb-4"
        />
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          onClick={handleVerifyOtp}
        >
          Verify OTP
        </button>
        {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default OTPPage;