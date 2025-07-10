 import { useNavigate } from 'react-router-dom';
import image from '../assets/WINDO.jpg';

const WelcomePage = () => {
  const navigate = useNavigate();
  const name = 'Jonas Kahnwald';
  const email = 'xxxxxx@xxxx.com';

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="flex max-w-5xl w-full bg-white rounded-xl overflow-hidden shadow-lg">
        {/* Left Panel - Welcome Text */}
        <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center items-center text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome, {name}!</h2>
          <p className="text-sm text-gray-600 mb-6">Email: {email}</p>
          <button
            onClick={() => navigate('/notes')}
            className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
          >
            Go to Notes
          </button>
        </div>

        {/* Right Panel - Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src= {image}
            alt="Welcome background"
            className="object-cover h-full w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;