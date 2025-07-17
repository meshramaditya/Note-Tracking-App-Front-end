import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BASE_URL from '../api';

const NotePage = () => {
  const navigate = useNavigate();
  const [notes, setNotes] = useState<{ _id: string; content: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [newNote, setNewNote] = useState('');
  const [user, setUser] = useState<{ name: string; email: string }>({ name: '', email: '' });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/');
      return;
    }

    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }

    // Delayed fetch for smoother load transition
    setTimeout(() => {
      axios
        .get(`${BASE_URL}/api/notes`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        .then((res) => {
          setNotes(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          toast.error('Failed to load notes ❌');
          navigate('/');
        });
    }, 300); // Short delay improves perceived load
  }, [navigate]);

  const handleCreateNote = async () => {
    const token = localStorage.getItem('token');
    const content = newNote.trim();
    if (!content || !token) return;

    try {
      const res = await axios.post(
        `${BASE_URL}/api/notes`,
        { content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNotes((prev) => [res.data, ...prev]);
      setNewNote('');
      toast.success('Note added ✅');
    } catch (err) {
      console.error(err);
      toast.error('Failed to add note ❌');
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      await axios.delete(`${BASE_URL}/api/notes/${noteId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotes((prev) => prev.filter((note) => note._id !== noteId));
      toast.success('Note deleted ✅');
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete note ❌');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    toast.info('Logged out');
    navigate('/');
  };

  if (loading) {
    return (
      <div className="px-6 py-10 animate-pulse space-y-4">
        <ToastContainer position="bottom-right" />
        <div className="h-4 bg-gray-200 rounded w-1/3" />
        <div className="h-4 bg-gray-200 rounded w-2/3" />
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-24 bg-gray-100 rounded-md" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-4 sm:px-6 md:px-8 py-6 max-w-4xl mx-auto pb-24">
      <ToastContainer position="bottom-right" autoClose={3000} hideProgressBar={false} newestOnTop pauseOnFocusLoss draggable pauseOnHover />

      {/* Top Bar */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-500" />
          <h2 className="text-lg sm:text-xl font-semibold">Dashboard</h2>
        </div>
        <button onClick={handleLogout} className="text-blue-600 hover:underline text-sm">
          Sign Out
        </button>
      </div>

      {/* Welcome Message */}
      <div className="border-2 border-yellow-400 rounded-md p-4 mb-6 bg-yellow-50">
        <p className="text-base sm:text-lg font-semibold text-gray-900">Welcome, {user.name || 'User'}!</p>
        <p className="text-sm text-gray-700">Email: {user.email}</p>
      </div>

      {/* Notes List */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-3">Your Notes</h3>
        <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
          {notes.map((note) => (
            <div key={note._id} className="bg-gray-100 rounded-md p-4 shadow-sm flex justify-between items-start">
              <span className="text-gray-800">{note.content}</span>
              <button
                className="text-red-600 hover:text-red-800"
                onClick={() => handleDeleteNote(note._id)}
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* New Note Input */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 px-4 py-3 flex gap-2 items-center z-50">
        <input
          type="text"
          placeholder="Write a note..."
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm"
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleCreateNote();
            }
          }}
        />
        <button
          onClick={handleCreateNote}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default NotePage;