import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import image from '../assets/WINDO.jpg';

const SignupPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [dob, setDob] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignup = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/signup', {
        name,
        dob,
        email,
        password,
      });
      navigate('/'); // ✅ Redirect to Sign In after successful signup
    } catch (err) {
      console.error(err);
      setError('Signup failed. Please try again.');
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Sign up</h2>
            <p className="text-sm text-gray-500">Sign up to enjoy the features of HD</p>
          </div>

          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-blue-500"
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-blue-500"
            />
            <button
              onClick={handleSignup}
              className="bg-[#007BFF] text-white py-2 rounded-md hover:bg-blue-600 transition"
            >
              Sign up
            </button>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <p className="text-sm text-gray-600 mt-2">
              Already have an account?{' '}
              <span
                className="text-blue-600 cursor-pointer hover:underline"
                onClick={() => navigate('/')}
              >
                Sign in
              </span>
            </p>
          </div>
        </div>

        <div className="hidden md:block md:w-1/2">
          <img
            src={image}
            alt="Signup background"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;