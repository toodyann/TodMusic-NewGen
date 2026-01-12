import { useState } from "react";
import "../styles/scss/mainContent.scss";

export default function MainContent({
  playlistId,
  onSongSelect,
  searchResults = [],
  isSearchMode = false,
  playingSongId = null,
  onPlayPause,
  playlists = [],
  favorites = [],
}) {
  const [allSongs] = useState([]);

  const songs = isSearchMode
    ? searchResults
    : playlistId === "favorites"
    ? favorites
    : playlistId
    ? playlists.find((p) => p.id === playlistId)?.songs || []
    : [];

  console.log("MainContent render:", {
    playlistId,
    isSearchMode,
    songsCount: songs.length,
    playlistsCount: playlists.length,
    favoritesCount: favorites.length,
  });

  const [selectedSong, setSelectedSong] = useState(null);

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

  return (
    <main className="main-content">
      {songs.length === 0 ? (
        <div className="no-songs">
          {isSearchMode ? (
            <p>Введіть запит для пошуку</p>
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
              <h3>Знайдіть свою музику</h3>
              <p>Використовуйте пошук вгорі, щоб знайти улюблені треки</p>
            </div>
          ) : (
            <p>У цьому плейлісті ще немає треків</p>
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
