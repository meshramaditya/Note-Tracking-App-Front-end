import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaEye } from 'react-icons/fa';
import image from '../assets/WINDO.jpg';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const res = await axios.post('https://note-tracking-app-back-end.onrender.com/api/auth/login', {
        email,
        password,
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      navigate('/notes');
    } catch (err) {
      console.error(err);
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex max-w-5xl w-full bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 rounded-full bg-blue-500" />
              <span className="text-lg font-semibold text-gray-900">Note</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign in</h2>
            <p className="text-sm text-gray-500">Please login to continue to your account.</p>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-blue-500"
            />
            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm pr-10 focus:outline-blue-500"
              />
              <FaEye className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            <button
              onClick={handleLogin}
              className="bg-[#007BFF] text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Sign in
            </button>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <p className="text-sm text-gray-600 mt-2">
              Need an account?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate('/signup')}
              >
                Create one
              </span>
            </p>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2">
          <img
            src={image}
            alt="Login background"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
