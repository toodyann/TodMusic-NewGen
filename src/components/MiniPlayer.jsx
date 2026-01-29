import "../styles/scss/Components/miniPlayer.scss";
import { useEffect, useRef, useState } from "react";

export default function MiniPlayer({ song, isPlaying, onPlayPause, onExpand }) {
  const [progress, setProgress] = useState(0);
  const audioRef = useRef();

  useEffect(() => {
    if (!isPlaying) return;
    const audio = document.querySelector("audio");
    if (!audio) return;
    const update = () => {
      setProgress(audio.currentTime / (audio.duration || 1));
    };
    audio.addEventListener("timeupdate", update);
    return () => audio.removeEventListener("timeupdate", update);
  }, [isPlaying, song]);

  if (!song) return null;

  return (
    <div className="mini-player" onClick={onExpand}>
      <div className="mini-player-content">
        {song.thumbnail && (
          <img
            src={song.thumbnail}
            alt={song.title}
            className="mini-player-thumbnail"
          />
        )}
        <div className="mini-player-info">
          <span className="mini-player-title">{song.title}</span>
          <span className="mini-player-artist">{song.artist}</span>
        </div>
        <div className="mini-player-play-btn-progress">
          <svg className="mini-player-progress-ring" width="48" height="48">
            <circle
              className="mini-player-progress-bg"
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#eee"
              strokeWidth="4"
            />
            <circle
              className="mini-player-progress-bar"
              cx="24"
              cy="24"
              r="20"
              fill="none"
              stroke="#ff6a00"
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 20}
              strokeDashoffset={2 * Math.PI * 20 * (1 - progress)}
              style={{ transition: "stroke-dashoffset 0.3s linear" }}
            />
          </svg>
          <button
            className="mini-player-play-btn"
            onClick={(e) => {
              e.stopPropagation();
              onPlayPause();
            }}
          >
            {isPlaying ? (
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
        </div>
      </div>
    </div>
  );
}
