import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
    if (!userId) {
      navigate("/");
      return;
    }
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        setError("User not found. Please login again.");
        return;
      }

      await api.post(API_PATHS.CREATE_NOTE, {
        title,
        content,
        userId,
      });

      navigate("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to create note");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-600 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Create Note</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none resize-none"
            ></textarea>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Note"}
          </button>
        </form>
      </div>
    </div>
  );
}
