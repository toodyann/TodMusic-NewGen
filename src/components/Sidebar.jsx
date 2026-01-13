import { useState } from "react";
import "../styles/scss/Components/sidebar.scss";
import ConfirmDialog from "./ConfirmDialog";

export default function Sidebar({
  onPlaylistSelect,
  isOpen,
  onClose,
  playlists,
  favorites,
  onCreatePlaylist,
  onDeletePlaylist,
  t,
}) {
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [isCreating, setIsCreating] = useState(false);
  const [selectedPlaylist, setSelectedPlaylist] = useState("favorites");
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    playlistId: null,
    playlistName: "",
  });

  const handlePlaylistClick = (id) => {
    setSelectedPlaylist(id);
    if (onPlaylistSelect) {
      onPlaylistSelect(id);
    }
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim() && onCreatePlaylist) {
      onCreatePlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
      setIsCreating(false);
    }
  };

  const favoritesPlaylist = {
    id: "favorites",
    name: t ? t("favorites") : "Улюблені",
    count: favorites.length,
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <h2>{t("playlists")}</h2>
        <div className="sidebar-header-actions">
          <button
            className="add-playlist-btn"
            aria-label="Додати плейліст"
            onClick={() => setIsCreating(!isCreating)}
          >
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

      {isCreating && (
        <div className="create-playlist-form">
          <input
            type="text"
            placeholder={t ? t("newPlaylistName") : "Назва плейлісту"}
            value={newPlaylistName}
            onChange={(e) => setNewPlaylistName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleCreatePlaylist()}
            autoFocus
          />
          <button onClick={handleCreatePlaylist} className="create-btn">
            {t ? t("create") : "Створити"}
          </button>
          <button onClick={() => setIsCreating(false)} className="cancel-btn">
            {t ? t("cancel") : "Скасувати"}
          </button>
        </div>
      )}

      <nav className="playlist-nav">
        <button
          key={favoritesPlaylist.id}
          className={`playlist-item ${
            selectedPlaylist === favoritesPlaylist.id ? "active" : ""
          }`}
          onClick={() => handlePlaylistClick(favoritesPlaylist.id)}
        >
          <div className="playlist-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
            </svg>
          </div>
          <div className="playlist-info">
            <span className="playlist-name">{favoritesPlaylist.name}</span>
            <span className="playlist-count">
              {favoritesPlaylist.count} {t ? t("tracks") : "треків"}
            </span>
          </div>
        </button>

        {playlists.map((playlist) => (
          <div key={playlist.id} className="playlist-item-wrapper">
            <button
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
                <span className="playlist-count">
                  {playlist.songs?.length || 0} {t ? t("tracks") : "треків"}
                </span>
              </div>
            </button>
            <button
              className="delete-playlist-btn"
              onClick={(e) => {
                e.stopPropagation();
                setConfirmDialog({
                  isOpen: true,
                  playlistId: playlist.id,
                  playlistName: playlist.name,
                });
              }}
              aria-label={t ? t("deletePlaylist") : "Видалити плейліст"}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                <line x1="10" y1="11" x2="10" y2="17"></line>
                <line x1="14" y1="11" x2="14" y2="17"></line>
              </svg>
            </button>
          </div>
        ))}
      </nav>

      <ConfirmDialog
        isOpen={confirmDialog.isOpen}
        itemName={confirmDialog.playlistName}
        t={t}
        onConfirm={() => {
          if (onDeletePlaylist) {
            onDeletePlaylist(confirmDialog.playlistId);
          }
          setConfirmDialog({
            isOpen: false,
            playlistId: null,
            playlistName: "",
          });
        }}
        onCancel={() =>
          setConfirmDialog({
            isOpen: false,
            playlistId: null,
            playlistName: "",
          })
        }
      />
    </aside>
  );
}
