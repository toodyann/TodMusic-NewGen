import { useState, useRef, useEffect } from "react";
import "../styles/scss/songInfo.scss";

export default function SongInfo({
  song,
  isPlaying = false,
  onPlayPause,
  onToggleFavorite,
  isFavorite = false,
  playlists = [],
  onAddToPlaylist,
  onCreatePlaylist,
  onNextSong,
  onPreviousSong,
  isFullscreen = false,
}) {
  const audioRef = useRef(null);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");

  useEffect(() => {
    if (song && song.previewUrl && audioRef.current) {
      const audio = audioRef.current;
      audio.src = song.previewUrl;
      audio.load();
      setCurrentTime(0);

      // Якщо пісня вже грає, автоматично запускаємо нову
      if (isPlaying) {
        audio.play().catch((err) => console.error("Play error:", err));
      }
    }
  }, [song, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch((err) => console.error("Play error:", err));
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    let animationFrameId;

    const updateTime = () => {
      setCurrentTime(audio.currentTime);

      if (!audio.paused && !audio.ended) {
        animationFrameId = requestAnimationFrame(updateTime);
      }
    };

    const handlePlay = () => {
      animationFrameId = requestAnimationFrame(updateTime);
    };

    const handlePause = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };

    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      if (onPlayPause) onPlayPause();
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", updateDuration);
    audio.addEventListener("ended", handleEnded);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", updateDuration);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [onPlayPause]);

  const togglePlay = () => {
    if (onPlayPause) {
      onPlayPause();
    }
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim() && onCreatePlaylist) {
      onCreatePlaylist(newPlaylistName.trim());
      setNewPlaylistName("");
      setShowPlaylistMenu(false);
    }
  };

  const formatTime = (time) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!song) {
    return (
      <aside className="song-info">
        <div className="no-song-selected">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="64"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M9 18V5l12-2v13"></path>
            <circle cx="6" cy="18" r="3"></circle>
            <circle cx="18" cy="16" r="3"></circle>
          </svg>
          <p>Оберіть пісню</p>
        </div>
      </aside>
    );
  }

  return (
    <aside className="song-info">
      {/* Audio завжди рендериться в першому екземплярі (desktop sidebar), на mobile fullscreen не рендериться */}
      {!isFullscreen && <audio ref={audioRef} />}

      <div className="song-cover">
        {song.thumbnail ? (
          <img src={song.thumbnail} alt={song.title} />
        ) : (
          <div className="cover-placeholder">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18V5l12-2v13"></path>
              <circle cx="6" cy="18" r="3"></circle>
              <circle cx="18" cy="16" r="3"></circle>
            </svg>
          </div>
        )}
      </div>

      <div className="song-details">
        <h2 className="song-title">{song.title}</h2>
        <p className="song-artist">{song.artist}</p>
      </div>

      {song.previewUrl && (
        <div className="player-controls">
          <div className="playback-buttons">
            <button className="prev-btn" onClick={onPreviousSong}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>
            <button className="play-btn-large" onClick={togglePlay}>
              {isPlaying ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>
            <button className="next-btn" onClick={onNextSong}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
              </svg>
            </button>
          </div>

          <div
            className="progress-bar"
            style={{
              "--progress": `${
                duration > 0 ? (currentTime / duration) * 100 : 0
              }%`,
            }}
          >
            <div className="progress-track"></div>
            <input
              type="range"
              min="0"
              max={duration || 0}
              value={currentTime}
              onChange={handleSeek}
              className="progress-slider"
            />
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="volume-control">
            <button onClick={toggleMute} className="volume-btn">
              {isMuted || volume === 0 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <line x1="23" y1="9" x2="17" y2="15" />
                  <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : volume < 0.5 ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M11 5L6 9H2v6h4l5 4V5z" />
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider"
            />
          </div>
        </div>
      )}

      <div className="song-meta">
        <div className="meta-item">
          <span className="meta-label">Альбом</span>
          <span className="meta-value">{song.album || "Unknown"}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Жанр</span>
          <span className="meta-value">{song.genre || "Unknown"}</span>
        </div>
        {song.releaseDate && (
          <div className="meta-item">
            <span className="meta-label">Рік</span>
            <span className="meta-value">
              {new Date(song.releaseDate).getFullYear()}
            </span>
          </div>
        )}
      </div>

      <div className="song-actions">
        <button
          className={`action-btn ${isFavorite ? "primary active" : "primary"}`}
          onClick={onToggleFavorite}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill={isFavorite ? "currentColor" : "none"}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          {isFavorite ? "У улюблених" : "Подобається"}
        </button>

        <div className="playlist-dropdown">
          <button
            className="action-btn"
            onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
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
            У плейліст
          </button>

          {showPlaylistMenu && (
            <div className="playlist-menu">
              <div className="playlist-menu-header">Додати у плейліст</div>
              {playlists.length > 0 ? (
                <div className="playlist-list">
                  {playlists.map((playlist) => (
                    <button
                      key={playlist.id}
                      className="playlist-item"
                      onClick={() => {
                        onAddToPlaylist(song, playlist.id);
                        setShowPlaylistMenu(false);
                      }}
                    >
                      {playlist.name}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="no-playlists">Немає плейлістів</p>
              )}
              <div className="create-playlist">
                <input
                  type="text"
                  placeholder="Назва нового плейліста"
                  value={newPlaylistName}
                  onChange={(e) => setNewPlaylistName(e.target.value)}
                  onKeyPress={(e) =>
                    e.key === "Enter" && handleCreatePlaylist()
                  }
                />
                <button onClick={handleCreatePlaylist}>Створити</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
