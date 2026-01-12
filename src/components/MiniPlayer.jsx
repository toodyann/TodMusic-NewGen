import "../styles/scss/miniPlayer.scss";

export default function MiniPlayer({ song, isPlaying, onPlayPause, onExpand }) {
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
  );
}
