// src/pages/SignupPage.tsx
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../api';
import image from '../assets/WINDO.jpg';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    email: '',
    password: '',
  });

  const handleSignup = async () => {
    const { name, dob, email, password } = formData;

    if (!name || !dob || !email || !password) {
      toast.error('Please fill all fields ❌');
      return;
    }

    console.log('🔍 Sending signup data:', formData); // ✅ DEBUG line

    try {
      const res = await axios.post(`${BASE_URL}/api/auth/signup`, formData);
      toast.success('Signup successful ✅');

      // Save user + token if backend returns them
      if (res.data.user && res.data.token) {
        localStorage.setItem('user', JSON.stringify(res.data.user));
        localStorage.setItem('token', res.data.token);
      }

      setTimeout(() => navigate('/'), 1000);
    } catch (err: any) {
      console.error('❌ Signup Error:', err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Signup failed ❌');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <ToastContainer position="bottom-right" />
      <div className="flex max-w-5xl w-full bg-white rounded-xl overflow-hidden shadow-lg">
        <div className="w-full md:w-1/2 p-8 md:p-12">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Create account</h2>
            <p className="text-sm text-gray-500">Sign up to enjoy the features of HD</p>
          </div>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-blue-500"
            />
            <input
              type="date"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-blue-500"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-blue-500"
            />
            <button
              onClick={handleSignup}
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Create Account
            </button>
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
          <img src={image} alt="Signup" className="object-cover h-full w-full" />
        </div>
      </div>
    </div>
  );
};

export default SignupPage;

