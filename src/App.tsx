// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OTPPage from './pages/OTPPage';
import WelcomePage from './pages/WelcomePage';
import NotesPage from './pages/NotesPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/otp" element={<OTPPage />} />
      <Route path="/welcome" element={<WelcomePage />} />
      <Route path="/notes" element={<NotesPage />} />
    </Routes>
  );
}

export default App;
