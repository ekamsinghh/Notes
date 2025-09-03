import { useState } from "react";
import { LogOut, Plus, Trash2 } from "lucide-react";
import logo from "../assets/logo.png";

export default function Dashboard() {
  const [notes, setNotes] = useState<string[]>([]);

  const addNote = () => {
    const newNote = `Note ${notes.length + 1}`;
    setNotes([...notes, newNote]);
  };

  const deleteNote = (index: number) => {
    setNotes(notes.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-purple-100 flex flex-col">
      {/* Navbar */}
      <header className="flex items-center justify-between px-6 py-4 bg-white/70 backdrop-blur-md shadow-md">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="w-8 h-8" />
          <h1 className="text-xl font-bold text-gray-800">NoteNest</h1>
        </div>
        <button className="flex items-center gap-1 text-sm text-red-600 hover:text-red-800">
          <LogOut size={16} /> Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6">
          {/* Profile / Welcome Section */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col justify-between h-[320px]">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">
                Welcome, <span className="font-bold">Jonas Kahnwald</span>!
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Email: xxxxxx@xxxx.com
              </p>

              {/* Info Badges */}
              <div className="flex flex-wrap gap-2 mt-6">
                <span className="bg-purple-100 text-purple-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  {notes.length} Notes
                </span>
                <span className="bg-pink-100 text-pink-700 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                  Last updated: Today
                </span>
              </div>
            </div>

            {/* Add Note Button (always at bottom) */}
            <button
              onClick={addNote}
              className="mt-6 flex items-center justify-center gap-2 w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-2 rounded-xl shadow-md hover:opacity-90 transition"
            >
              <Plus size={18} /> Create Note
            </button>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Notes</h3>
            <div className="flex-grow overflow-y-auto pr-2 space-y-3">
                {notes.length === 0 && (
                    <p className="text-gray-500 text-sm">No notes yet. Click "Create Note" to add one!</p>
                )}
              {notes.map((note, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between px-4 py-2 rounded-lg bg-gray-50 shadow-sm hover:bg-gray-100"
                >
                  <span>{note}</span>
                  <button
                    onClick={() => deleteNote(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
