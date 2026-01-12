import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import MainContent from "./MainContent.jsx";
import SongInfo from "./SongInfo.jsx";
import BottomNav from "./BottomNav.jsx";
import Input from "./Input.jsx";
import Profile from "./Profile.jsx";
import MiniPlayer from "./MiniPlayer.jsx";
import { searchTracks } from "../Scripts/api.js";
import "../styles/scss/layout.scss";
import "../styles/scss/searchPage.scss";

export default function Layout() {
  const [selectedPlaylist, setSelectedPlaylist] = useState(() => {
    const saved = localStorage.getItem("todmusic_selectedPlaylist");
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedSong, setSelectedSong] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem("todmusic_activeTab");
    return saved || "home";
  });
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [playingSongId, setPlayingSongId] = useState(null);
  const [isFullscreenPlayer, setIsFullscreenPlayer] = useState(false);
  const [isClosingPlayer, setIsClosingPlayer] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("todmusic_favorites");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Оновлюємо URL картинок до 600x600
        return parsed.map((song) => ({
          ...song,
          thumbnail: song.thumbnail
            ? song.thumbnail
                .replace(/100x100/g, "600x600")
                .replace(/60x60/g, "600x600")
            : null,
        }));
      } catch (error) {
        console.error("Error loading favorites:", error);
        return [];
      }
    }
    return [];
  });
  const [playlists, setPlaylists] = useState(() => {
    const saved = localStorage.getItem("todmusic_playlists");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Оновлюємо URL картинок до 600x600 в усіх плейлістах
        return parsed.map((playlist) => ({
          ...playlist,
          songs: playlist.songs.map((song) => ({
            ...song,
            thumbnail: song.thumbnail
              ? song.thumbnail
                  .replace(/100x100/g, "600x600")
                  .replace(/60x60/g, "600x600")
              : null,
          })),
        }));
      } catch (error) {
        console.error("Error loading playlists:", error);
        return [];
      }
    }
    return [];
  });

  // Видаляємо окремий useEffect для завантаження, бо тепер дані завантажуються при ініціалізації

  // Збереження favorites в localStorage при зміні
  useEffect(() => {
    localStorage.setItem("todmusic_favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Збереження playlists в localStorage при зміні
  useEffect(() => {
    localStorage.setItem("todmusic_playlists", JSON.stringify(playlists));
  }, [playlists]);

  // Збереження selectedPlaylist в localStorage при зміні
  useEffect(() => {
    localStorage.setItem(
      "todmusic_selectedPlaylist",
      JSON.stringify(selectedPlaylist)
    );
  }, [selectedPlaylist]);

  // Збереження activeTab в localStorage при зміні
  useEffect(() => {
    localStorage.setItem("todmusic_activeTab", activeTab);
  }, [activeTab]);

  const handlePlaylistSelect = (playlistId) => {
    setSelectedPlaylist(playlistId);
    setSidebarOpen(false);
    setShowSearch(false);
    setShowProfile(false);
    setActiveTab("playlists");
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };

  const handlePlayPause = (songId) => {
    if (playingSongId === songId) {
      setPlayingSongId(null);
    } else {
      setPlayingSongId(songId);
    }
  };

  const handleNextSong = () => {
    const currentSongs =
      selectedPlaylist === "favorites"
        ? favorites
        : selectedPlaylist
        ? playlists.find((p) => p.id === selectedPlaylist)?.songs || []
        : searchResults;

    if (currentSongs.length === 0 || !selectedSong) return;

    const currentIndex = currentSongs.findIndex(
      (s) => s.id === selectedSong.id
    );
    if (currentIndex < currentSongs.length - 1) {
      const nextSong = currentSongs[currentIndex + 1];
      setSelectedSong(nextSong);
      setPlayingSongId(nextSong.id);
    }
  };

  const handlePreviousSong = () => {
    const currentSongs =
      selectedPlaylist === "favorites"
        ? favorites
        : selectedPlaylist
        ? playlists.find((p) => p.id === selectedPlaylist)?.songs || []
        : searchResults;

    if (currentSongs.length === 0 || !selectedSong) return;

    const currentIndex = currentSongs.findIndex(
      (s) => s.id === selectedSong.id
    );
    if (currentIndex > 0) {
      const previousSong = currentSongs[currentIndex - 1];
      setSelectedSong(previousSong);
      setPlayingSongId(previousSong.id);
    }
  };

  const handleCloseFullscreenPlayer = () => {
    setIsClosingPlayer(true);
    setTimeout(() => {
      setIsFullscreenPlayer(false);
      setIsClosingPlayer(false);
    }, 300);
  };

  const toggleFavorite = (song) => {
    if (!song) return;

    setFavorites((prev) => {
      const exists = prev.find((s) => s.id === song.id);
      if (exists) {
        return prev.filter((s) => s.id !== song.id);
      }
      return [...prev, song];
    });
  };

  const addToPlaylist = (song, playlistId) => {
    if (!song) return;

    setPlaylists((prev) => {
      const updated = prev.map((playlist) => {
        if (playlist.id === playlistId) {
          const exists = playlist.songs.find((s) => s.id === song.id);
          if (exists) return playlist;

          return {
            ...playlist,
            songs: [...playlist.songs, song],
          };
        }
        return playlist;
      });

      console.log("Playlist updated:", updated);
      return updated;
    });
  };

  const createPlaylist = (name) => {
    const newPlaylist = {
      id: Date.now(),
      name,
      songs: [],
    };
    setPlaylists((prev) => [...prev, newPlaylist]);
  };
  const handleDeletePlaylist = (playlistId) => {
    setPlaylists((prev) => prev.filter((p) => p.id !== playlistId));
    if (selectedPlaylist === playlistId) {
      setSelectedPlaylist("favorites");
    }
  };
  const handleProfileClick = () => {
    setActiveTab("profile");
    setShowProfile(true);
    setShowSearch(false);
    setShowPlaylists(false);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

    // Автоматично активуємо режим пошуку
    setShowSearch(true);
    setShowPlaylists(false);
    setShowProfile(false);
    setActiveTab("search");

    if (!query || query.trim().length === 0) {
      setSearchResults([]);
      setSearchError(null);
      return;
    }

    setIsSearching(true);
    setSearchError(null);

    try {
      const results = await searchTracks(query);
      setSearchResults(results);
      console.log("Знайдено треків:", results.length);
    } catch (error) {
      console.error("Помилка пошуку:", error);
      setSearchError("Не вдалося знайти треки. Спробуйте ще раз.");
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleHomeClick = () => {
    setSelectedPlaylist(null);
    setShowProfile(false);
    setShowSearch(false);
    setShowPlaylists(false);
    setActiveTab("home");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "home") {
      setSelectedPlaylist(null);
      setShowPlaylists(false);
      setShowSearch(false);
      setShowProfile(false);
    } else if (tab === "playlists") {
      setShowPlaylists(true);
      setShowSearch(false);
      setShowProfile(false);
      setSidebarOpen(true);
    } else if (tab === "search") {
      setShowSearch(true);
      setShowPlaylists(false);
      setShowProfile(false);
    } else if (tab === "profile") {
      setShowProfile(true);
      setShowSearch(false);
      setShowPlaylists(false);
    }
  };

  const handleSearchClick = () => {
    setActiveTab("search");
    setShowSearch(true);
    setShowPlaylists(false);
    setShowProfile(false);
  };

  return (
    <div className="app-layout">
      <Header
        searchValue={searchQuery}
        onSearch={handleSearch}
        onSearchChange={setSearchQuery}
        onHomeClick={handleHomeClick}
        onMenuClick={toggleSidebar}
        onProfileClick={handleProfileClick}
      />
      <div className="app-body">
        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={closeSidebar} />
        )}
        <Sidebar
          onPlaylistSelect={handlePlaylistSelect}
          isOpen={sidebarOpen}
          onClose={closeSidebar}
          playlists={playlists}
          favorites={favorites}
          onCreatePlaylist={createPlaylist}
          onDeletePlaylist={handleDeletePlaylist}
        />
        {showSearch ? (
          <div className="search-page">
            {isSearching && <div className="loading">Пошук...</div>}
            {searchError && <div className="error">{searchError}</div>}
            {!isSearching &&
              !searchError &&
              searchResults.length === 0 &&
              searchQuery && (
                <div className="no-results">
                  Нічого не знайдено для "{searchQuery}"
                </div>
              )}
            {!searchQuery && (
              <div className="search-prompt">
                Введіть запит у поле пошуку вгорі
              </div>
            )}
            <MainContent
              playlistId={null}
              onSongSelect={handleSongSelect}
              searchResults={searchResults}
              isSearchMode={true}
              playingSongId={playingSongId}
              onPlayPause={handlePlayPause}
            />
          </div>
        ) : showProfile ? (
          <Profile onBackClick={handleHomeClick} />
        ) : (
          <MainContent
            playlistId={selectedPlaylist}
            onSongSelect={handleSongSelect}
            searchResults={[]}
            isSearchMode={false}
            playingSongId={playingSongId}
            onPlayPause={handlePlayPause}
            playlists={playlists}
            favorites={favorites}
          />
        )}
        <SongInfo
          song={selectedSong}
          isPlaying={playingSongId === selectedSong?.id}
          onPlayPause={() => handlePlayPause(selectedSong?.id)}
          onToggleFavorite={() => toggleFavorite(selectedSong)}
          isFavorite={favorites.some((s) => s?.id === selectedSong?.id)}
          playlists={playlists}
          onAddToPlaylist={addToPlaylist}
          onCreatePlaylist={createPlaylist}
          onNextSong={handleNextSong}
          onPreviousSong={handlePreviousSong}
        />
      </div>

      <MiniPlayer
        song={selectedSong}
        isPlaying={playingSongId === selectedSong?.id}
        onPlayPause={() => handlePlayPause(selectedSong?.id)}
        onExpand={() => setIsFullscreenPlayer(true)}
      />

      {isFullscreenPlayer && (
        <div
          className={`fullscreen-player-overlay ${
            isClosingPlayer ? "closing" : ""
          }`}
          onClick={handleCloseFullscreenPlayer}
        >
          <div
            className={`fullscreen-player ${isClosingPlayer ? "closing" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="fullscreen-player-header">
              <div
                className="drag-handle"
                onTouchStart={(e) => {
                  const startY = e.touches[0].clientY;
                  const handleTouchMove = (moveEvent) => {
                    const currentY = moveEvent.touches[0].clientY;
                    const diff = currentY - startY;
                    if (diff > 100) {
                      handleCloseFullscreenPlayer();
                      document.removeEventListener(
                        "touchmove",
                        handleTouchMove
                      );
                    }
                  };
                  document.addEventListener("touchmove", handleTouchMove);
                  document.addEventListener(
                    "touchend",
                    () => {
                      document.removeEventListener(
                        "touchmove",
                        handleTouchMove
                      );
                    },
                    { once: true }
                  );
                }}
              ></div>
              <button
                className="close-fullscreen-btn"
                onClick={handleCloseFullscreenPlayer}
              >
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
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <polyline points="19 12 12 19 5 12"></polyline>
                </svg>
              </button>
            </div>
            <SongInfo
              song={selectedSong}
              isPlaying={playingSongId === selectedSong?.id}
              onPlayPause={() => handlePlayPause(selectedSong?.id)}
              onToggleFavorite={() => toggleFavorite(selectedSong)}
              isFavorite={favorites.some((s) => s?.id === selectedSong?.id)}
              playlists={playlists}
              onAddToPlaylist={addToPlaylist}
              onCreatePlaylist={createPlaylist}
              onNextSong={handleNextSong}
              onPreviousSong={handlePreviousSong}
              isFullscreen={true}
            />
          </div>
        </div>
      )}

      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSearchClick={handleSearchClick}
      />
    </div>
  );
}
