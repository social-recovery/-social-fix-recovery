"use client";

import { useState, useEffect } from "react";

interface Screenshot {
  name: string;
  type: string;
  data: string;
}

interface Submission {
  _id: string;
  accountType: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  platforms: string[];
  username: string;
  followers: string;
  hackDetails: string;
  screenshot?: Screenshot;
  createdAt: string;
}

const ADMIN_PASSWORD = ".malik18434";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
    } else {
      setError("Incorrect password");
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch("/api/submissions");
      const result = await response.json();
      if (result.success) {
        setSubmissions(result.data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center p-4">
        <div className="bg-gray-800 p-8 rounded-2xl max-w-md w-full">
          <h1 className="text-2xl font-bold mb-6 text-center">Admin Login</h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-gray-700 border border-gray-600 rounded-xl px-4 py-3 mb-4 focus:border-cyan-400 focus:outline-none"
            />
            {error && <p className="text-red-400 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-cyan-500 text-black py-3 rounded-xl font-semibold hover:bg-cyan-400 transition-colors"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard - Submissions</h1>

        {loading ? (
          <div className="text-center py-20">Loading...</div>
        ) : (
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">Date</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Platforms</th>
                  <th className="px-4 py-3 text-left">Username</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Screenshot</th>
                </tr>
              </thead>
              <tbody>
                {submissions.map((sub) => (
                  <tr key={sub._id} className="border-t border-gray-700 hover:bg-gray-750">
                    <td className="px-4 py-3 text-sm">{formatDate(sub.createdAt)}</td>
                    <td className="px-4 py-3">
                      {sub.firstName} {sub.lastName}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded text-xs ${
                        sub.accountType === "hacked" ? "bg-red-500/20 text-red-400" : "bg-yellow-500/20 text-yellow-400"
                      }`}>
                        {sub.accountType}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {sub.platforms?.join(", ")}
                    </td>
                    <td className="px-4 py-3 text-sm font-mono">{sub.username}</td>
                    <td className="px-4 py-3 text-sm">{sub.email}</td>
                    <td className="px-4 py-3">
                      {sub.screenshot?.data ? (
                        <button
                          onClick={() => setSelectedImage(`data:${sub.screenshot?.type};base64,${sub.screenshot?.data}`)}
                          className="text-cyan-400 hover:underline text-sm"
                        >
                          View Image
                        </button>
                      ) : (
                        <span className="text-gray-500 text-sm">No image</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {submissions.length === 0 && !loading && (
          <div className="text-center py-20 text-gray-500">No submissions yet</div>
        )}

        {selectedImage && (
          <div 
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <div className="max-w-4xl max-h-[90vh] overflow-auto">
              <img src={selectedImage} alt="Screenshot" className="max-w-full h-auto rounded" />
            </div>
            <button className="absolute top-4 right-4 text-white text-2xl">×</button>
          </div>
        )}
      </div>
    </div>
  );
}
