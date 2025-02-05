import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
  const [token, setToken] = useState("");
  const [tracks, setTracks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access_token");
    if (accessToken) setToken(accessToken);
  }, []);

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/login";
  };

  const searchTracks = async () => {
    if (!query) return;
    const response = await axios.get("http://localhost:5000/search", {
      params: { query, token },
    });
    setTracks(response.data.tracks.items);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-4xl font-bold mb-6">Spotify Clone</h1>
      {!token ? (
        <button
          onClick={handleLogin}
          className="bg-green-500 px-6 py-3 rounded-full text-xl"
        >
          Login with Spotify
        </button>
      ) : (
        <div className="w-full max-w-md">
          <input
            type="text"
            placeholder="Search a song..."
            className="w-full px-4 py-2 text-black rounded"
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={searchTracks}
            className="bg-green-500 w-full mt-3 py-2 rounded"
          >
            Search
          </button>
          <ul className="mt-6">
            {tracks.map((track) => (
              <li key={track.id} className="mt-2">
                {track.name} - {track.artists[0].name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
