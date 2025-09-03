import { useEffect, useState } from "react";
import { LogOut, Plus, Trash2 } from "lucide-react";
import logo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";
import api from "../utils/axiosInstance";
import { API_PATHS } from "../utils/apiPaths";
import axiosInstance from "../utils/axiosInstance";

interface Note {
  _id: string;
  title: string;
  content: string;
}
interface User {
  _id: string;
  name: string;
  email: string;
}

export default function Dashboard() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [expandedNote, setExpandedNote] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  
  const fetchUser = async () => {
  try {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/");
      return;
    }

    const res = await axiosInstance.get(API_PATHS.GET_USER(userId));
    setUser(res.data.data);

    fetchNotes(res.data.data._id);
  } catch (err) {
    console.error("Auth failed:", err);
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  }
};

  const fetchNotes = async (userId: string) => {
    try {
      const res = await api.get(API_PATHS.GET_NOTES_BY_USER(userId));
      setNotes(res.data.data|| []);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching notes:", err);
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await api.delete(API_PATHS.DELETE_NOTE(id));
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
      return;
    }
    fetchUser();
  }, []);

  if (!user) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex flex-col">
      <header className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-gray-800">Notes App</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800"
        >
          <LogOut size={16} /> Logout
        </button>
      </header>

      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6">
          
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between h-[320px]">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Welcome, <span className="font-bold">{user.name}</span>!
              </h2>
              <p className="text-sm text-gray-600 mt-1">Email: {user.email}</p>

              <div className="flex flex-wrap gap-2 mt-6">
                <span className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  {notes.length} Notes
                </span>
                <span className="bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  Last updated: Today
                </span>
              </div>
            </div>

            <button
              onClick={() => navigate("/create")}
              className="mt-6 flex items-center justify-center gap-2 w-full bg-blue-500 text-white font-semibold py-2 rounded-xl shadow-md hover:opacity-90 transition"
            >
              <Plus size={18} /> Create Note
            </button>
          </div>

          
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes</h3>
            <div className="flex-grow overflow-y-auto pr-2 space-y-3">
              {notes.length === 0 && (
                <p className="text-gray-500 text-sm">
                  No notes yet. Click "Create Note" to add one!
                </p>
              )}
              {notes.map((note) => (
                <div
                  key={note._id}
                  className="px-4 py-2 rounded-lg bg-gray-50 shadow-sm hover:bg-gray-100 cursor-pointer"
                  onClick={() =>
                    setExpandedNote((prev) =>
                      prev === note._id ? null : note._id
                    )
                  }
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{note.title}</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteNote(note._id);
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                  {expandedNote === note._id && (
                    <p className="mt-2 text-sm text-gray-700">{note.content}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
