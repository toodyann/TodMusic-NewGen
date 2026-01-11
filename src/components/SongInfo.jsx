import "../styles/scss/songInfo.scss";

export default function SongInfo({ song }) {
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
      <div className="song-cover">
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
      </div>

      <div className="song-details">
        <h2 className="song-title">{song.title}</h2>
        <p className="song-artist">{song.artist}</p>
      </div>

      <div className="song-meta">
        <div className="meta-item">
          <span className="meta-label">Альбом</span>
          <span className="meta-value">{song.album}</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Тривалість</span>
          <span className="meta-value">{song.duration}</span>
        </div>
      </div>

      <div className="song-actions">
        <button className="action-btn primary">
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
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
          Подобається
        </button>
        <button className="action-btn">
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
      </div>

      <div className="song-lyrics">
        <h3>Текст пісні</h3>
        <p className="lyrics-placeholder">Текст пісні недоступний</p>
      </div>
    </aside>
  );
}
