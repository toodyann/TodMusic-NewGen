import { useState } from "react";
import "../styles/scss/Components/mainContent.scss";

export default function MainContent({
  playlistId,
  onSongSelect,
  searchResults = [],
  isSearchMode = false,
  playingSongId = null,
  onPlayPause,
  playlists = [],
  favorites = [],
  isMobile = false,
  onBackToPlaylists,
  t,
}) {
  const songs = isSearchMode
    ? searchResults
    : playlistId === "favorites"
    ? favorites
    : playlistId
    ? playlists.find((p) => p.id === playlistId)?.songs || []
    : [];

  const [selectedSong, setSelectedSong] = useState(null);

  const formatDuration = (seconds) => {
    if (!seconds) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleSongClick = (song) => {
    setSelectedSong(song.id);
    if (onSongSelect) {
      onSongSelect(song);
    }
  };

  const handlePlayPause = (song, e) => {
    e.stopPropagation();
    if (onPlayPause) {
      onPlayPause(song.id);
    }
    if (onSongSelect) {
      onSongSelect(song);
    }
  };

  const getPlaylistName = () => {
    if (playlistId === "favorites") return t ? t("favorites") : "Улюблені";
    const playlist = playlists.find((p) => p.id === playlistId);
    return playlist?.name || "";
  };

  return (
    <main className="main-content">
      {isMobile && playlistId && onBackToPlaylists && (
        <div className="mobile-playlist-header">
          <button className="back-to-playlists-btn" onClick={onBackToPlaylists}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            <span>{t ? t("back") : "Назад"}</span>
          </button>
          <h2 className="playlist-title">{getPlaylistName()}</h2>
        </div>
      )}
      
      {songs.length === 0 ? (
        <div className="no-songs">
          {isSearchMode ? (
            <p>{t ? t("searchPrompt") : "Введіть запит для пошуку"}</p>
          ) : playlistId === null ? (
            <div className="search-hint">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              <h3>{t ? t("findMusic") : "Знайдіть свою музику"}</h3>
              <p>
                {t
                  ? t("useSearchTop")
                  : "Використовуйте пошук вгорі, щоб знайти улюблені треки"}
              </p>
            </div>
          ) : (
            <p>
              {t ? t("emptyPlaylist") : "У цьому плейлісті ще немає треків"}
            </p>
          )}
        </div>
      ) : (
        <ul className="song-list">
          {songs.map((song, index) => (
            <li
              key={song.id}
              className={`song-item ${
                selectedSong === song.id ? "selected" : ""
              } ${playingSongId === song.id ? "playing" : ""}`}
            >
              <span className="song-number">{index + 1}</span>
              {song.thumbnail && (
                <img
                  src={song.thumbnail}
                  alt={song.title}
                  className="song-thumbnail"
                />
              )}
              <div className="song-info" onClick={() => handleSongClick(song)}>
                <span className="song-title">{song.title}</span>
                <span className="song-artist">{song.artist}</span>
                {song.album && <span className="song-album">{song.album}</span>}
              </div>
              <span className="song-duration">
                {formatDuration(song.duration || 0)}
              </span>
              <button
                className={`play-pause-btn ${
                  playingSongId === song.id ? "playing" : ""
                }`}
                onClick={(e) => handlePlayPause(song, e)}
              >
                {playingSongId === song.id ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <rect x="6" y="4" width="4" height="16" rx="1" />
                    <rect x="14" y="4" width="4" height="16" rx="1" />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
