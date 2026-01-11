import { useState } from "react";
import "../styles/scss/sidebar.scss";

export default function Sidebar({ onPlaylistSelect, isOpen, onClose }) {
  const [playlists] = useState([
    { id: 1, name: "Улюблені", count: 0 },
    { id: 2, name: "Рок", count: 0 },
    { id: 3, name: "Поп", count: 0 },
    { id: 4, name: "Електронна", count: 0 },
    { id: 5, name: "Джаз", count: 0 },
    { id: 6, name: "Класика", count: 0 },
  ]);

  const [selectedPlaylist, setSelectedPlaylist] = useState(1);

  const handlePlaylistClick = (id) => {
    setSelectedPlaylist(id);
    if (onPlaylistSelect) {
      onPlaylistSelect(id);
    }
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>Плейлісти</h2>
        <div className="sidebar-header-actions">
          <button className="add-playlist-btn" aria-label="Додати плейліст">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
          </button>
          <button className="close-sidebar-btn" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
      </div>

      <nav className="playlist-nav">
        {playlists.map((playlist) => (
          <button
            key={playlist.id}
            className={`playlist-item ${
              selectedPlaylist === playlist.id ? "active" : ""
            }`}
            onClick={() => handlePlaylistClick(playlist.id)}
          >
            <div className="playlist-icon">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 18V5l12-2v13"></path>
                <circle cx="6" cy="18" r="3"></circle>
                <circle cx="18" cy="16" r="3"></circle>
              </svg>
            </div>
            <div className="playlist-info">
              <span className="playlist-name">{playlist.name}</span>
              <span className="playlist-count">{playlist.count} треків</span>
            </div>
          </button>
        ))}
      </nav>
    </aside>
  );
}
