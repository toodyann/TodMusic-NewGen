import { useState } from "react";
import "../styles/scss/mainContent.scss";

export default function MainContent({ playlistId, onSongSelect }) {
  const [allSongs] = useState([
    {
      id: 1,
      title: "Bohemian Rhapsody",
      artist: "Queen",
      album: "A Night at the Opera",
      duration: "5:55",
    },
    {
      id: 2,
      title: "Stairway to Heaven",
      artist: "Led Zeppelin",
      album: "Led Zeppelin IV",
      duration: "8:02",
    },
    {
      id: 3,
      title: "Hotel California",
      artist: "Eagles",
      album: "Hotel California",
      duration: "6:30",
    },
    {
      id: 4,
      title: "Smells Like Teen Spirit",
      artist: "Nirvana",
      album: "Nevermind",
      duration: "5:01",
    },
    {
      id: 5,
      title: "Imagine",
      artist: "John Lennon",
      album: "Imagine",
      duration: "3:03",
    },
  ]);

  const songs = playlistId === null ? allSongs : [];

  const [selectedSong, setSelectedSong] = useState(null);
  const [playingSong, setPlayingSong] = useState(null);

  const handleSongClick = (song) => {
    setSelectedSong(song.id);
    if (onSongSelect) {
      onSongSelect(song);
    }
  };

  const handlePlayPause = (song) => {
    if (playingSong === song.id) {
      setPlayingSong(null);
    } else {
      setPlayingSong(song.id);
      setSelectedSong(song.id);
      if (onSongSelect) {
        onSongSelect(song);
      }
    }
  };

  return (
    <main className="main-content">
      <div className="content-header">
        <h1>{playlistId === null ? "Усі пісні" : "Плейліст"}</h1>
        {songs.length > 0 && (
          <div className="content-actions">
            <button className="play-all-btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
              Відтворити все
            </button>
          </div>
        )}
      </div>

      {songs.length === 0 ? (
        <div className="no-songs">
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
          <p>Цей плейліст порожній</p>
        </div>
      ) : (
        <div className="songs-list">
          {songs.length > 0 && (
            <>
              <div className="songs-header">
                <div className="col-number">#</div>
                <div className="col-title">Назва</div>
                <div className="col-album">Альбом</div>
                <div className="col-duration">Тривалість</div>
              </div>

              {songs.map((song, index) => (
                <div
                  key={song.id}
                  className={`song-item ${
                    selectedSong === song.id ? "selected" : ""
                  } ${playingSong === song.id ? "playing" : ""}`}
                  onClick={() => handleSongClick(song)}
                >
                  <div className="col-number">
                    {playingSong === song.id ? (
                      <button
                        className="play-btn active"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPause(song);
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <rect x="6" y="4" width="4" height="16"></rect>
                          <rect x="14" y="4" width="4" height="16"></rect>
                        </svg>
                      </button>
                    ) : (
                      <button
                        className="play-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePlayPause(song);
                        }}
                      >
                        <span className="number">{index + 1}</span>
                        <svg
                          className="play-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </button>
                    )}
                  </div>
                  <div className="col-title">
                    <div className="song-info">
                      <span className="song-title">{song.title}</span>
                      <span className="song-artist">{song.artist}</span>
                    </div>
                  </div>
                  <div className="col-album">{song.album}</div>
                  <div className="col-duration">{song.duration}</div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </main>
  );
}
