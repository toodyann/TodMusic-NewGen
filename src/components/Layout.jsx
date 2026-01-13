import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import MainContent from "./MainContent.jsx";
import SongInfo from "./SongInfo.jsx";
import BottomNav from "./BottomNav.jsx";
import Input from "./Input.jsx";
import Profile from "./Profile.jsx";
import Settings from "./Settings.jsx";
import MiniPlayer from "./MiniPlayer.jsx";
import Footer from "./Footer.jsx";
import { searchTracks } from "../Scripts/api.js";
import { useTranslation } from "../Scripts/translations.js";
import "../styles/scss/Layout/layout.scss";
import "../styles/scss/Layout/searchPage.scss";

export default function Layout() {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem("todmusic_language");
    return saved || "uk";
  });
  const t = useTranslation(language);

  const [selectedPlaylist, setSelectedPlaylist] = useState(() => {
    const saved = localStorage.getItem("todmusic_selectedPlaylist");
    return saved ? JSON.parse(saved) : null;
  });
  const [selectedSong, setSelectedSong] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(() => {
    const saved = localStorage.getItem("todmusic_activeTab");
    return saved || "home";
  });
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState(null);
  const [playingSongId, setPlayingSongId] = useState(null);
  const [isFullscreenPlayer, setIsFullscreenPlayer] = useState(false);
  const [isClosingPlayer, setIsClosingPlayer] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("todmusic_favorites");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
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

  useEffect(() => {
    localStorage.setItem("todmusic_activeTab", activeTab);
  }, [activeTab]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handlePlaylistSelect = (playlistId) => {
    setSelectedPlaylist(playlistId);
    setSidebarOpen(false);
    setShowSearch(false);
    setShowProfile(false);
    setShowSettings(false);
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

    let nextSong;
    if (isShuffle) {
      const availableSongs = currentSongs.filter(
        (s) => s.id !== selectedSong.id
      );
      if (availableSongs.length > 0) {
        const randomIndex = Math.floor(Math.random() * availableSongs.length);
        nextSong = availableSongs[randomIndex];
      } else {
        nextSong = currentSongs[0];
      }
    } else {
      const currentIndex = currentSongs.findIndex(
        (s) => s.id === selectedSong.id
      );
      if (currentIndex < currentSongs.length - 1) {
        nextSong = currentSongs[currentIndex + 1];
      }
    }

    if (nextSong) {
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
    setShowSettings(false);
    setSidebarOpen(false);
  };

  const handleSettingsClick = () => {
    setActiveTab("settings");
    setShowSettings(true);
    setShowProfile(false);
    setShowSearch(false);
    setShowPlaylists(false);
    setSidebarOpen(false);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem("todmusic_language", lang);
  };

  const handleSearch = async (query) => {
    setSearchQuery(query);

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
      setSearchError(
        t ? t("searchError") : "Не вдалося знайти треки. Спробуйте ще раз."
      );
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
    setShowSettings(false);
    setActiveTab("home");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleBackToPlaylists = () => {
    setSelectedPlaylist(null);
    setActiveTab("playlists");
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "home") {
      setSelectedPlaylist(null);
      setShowPlaylists(false);
      setShowSearch(false);
      setShowProfile(false);
      setShowSettings(false);
      setSidebarOpen(false);
    } else if (tab === "playlists") {
      setShowPlaylists(true);
      setShowSearch(false);
      setShowProfile(false);
      setShowSettings(false);
      setSidebarOpen(true);
      setSelectedPlaylist(null);
    } else if (tab === "search") {
      setShowSearch(true);
      setShowPlaylists(false);
      setShowProfile(false);
      setShowSettings(false);
      setSidebarOpen(false);
    } else if (tab === "profile") {
      setShowProfile(true);
      setShowSearch(false);
      setShowPlaylists(false);
      setShowSettings(false);
      setSidebarOpen(false);
    }
  };

  const handleSearchClick = () => {
    setActiveTab("search");
    setShowSearch(true);
    setShowPlaylists(false);
    setShowProfile(false);
    setShowSettings(false);
    setSidebarOpen(false);
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
        onSettingsClick={handleSettingsClick}
        activeTab={activeTab}
        isMobile={isMobile}
        selectedPlaylist={selectedPlaylist}
        language={language}
        t={t}
      />
      <div className="app-body">
        {sidebarOpen && !isMobile && (
          <div className="sidebar-overlay" onClick={closeSidebar} />
        )}
        {(!isMobile || (activeTab === "playlists" && !selectedPlaylist)) && (
          <Sidebar
            onPlaylistSelect={handlePlaylistSelect}
            isOpen={sidebarOpen}
            onClose={closeSidebar}
            playlists={playlists}
            favorites={favorites}
            onCreatePlaylist={createPlaylist}
            onDeletePlaylist={handleDeletePlaylist}
            language={language}
            t={t}
          />
        )}
        <div className="app-content-wrapper">
          {activeTab === "search" || showSearch ? (
            <div className="search-page">
              {isSearching && <div className="loading">{t("searching")}</div>}
              {searchError && <div className="error">{searchError}</div>}
              {!isSearching &&
                !searchError &&
                searchResults.length === 0 &&
                searchQuery && (
                  <div className="no-results">
                    {t("noResults").replace("{query}", searchQuery)}
                  </div>
                )}
              {!searchQuery && (
                <div className="search-prompt">{t("searchPrompt")}</div>
              )}
              <MainContent
                playlistId={null}
                onSongSelect={handleSongSelect}
                searchResults={searchResults}
                isSearchMode={true}
                playingSongId={playingSongId}
                onPlayPause={handlePlayPause}
                language={language}
                t={t}
              />
            </div>
          ) : activeTab === "profile" || showProfile ? (
            <Profile
              onBackClick={handleHomeClick}
              playlists={playlists}
              favorites={favorites}
              language={language}
              t={t}
            />
          ) : activeTab === "settings" || showSettings ? (
            <Settings
              onBackClick={handleHomeClick}
              language={language}
              onLanguageChange={handleLanguageChange}
              t={t}
            />
          ) : isMobile &&
            activeTab === "playlists" &&
            !selectedPlaylist ? null : (
            <MainContent
              playlistId={selectedPlaylist}
              onSongSelect={handleSongSelect}
              searchResults={[]}
              isSearchMode={false}
              playingSongId={playingSongId}
              onPlayPause={handlePlayPause}
              playlists={playlists}
              favorites={favorites}
              isMobile={isMobile}
              onBackToPlaylists={handleBackToPlaylists}
              language={language}
              t={t}
            />
          )}
          <Footer t={t} />
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
          isShuffle={isShuffle}
          onShuffleToggle={() => setIsShuffle(!isShuffle)}
          t={t}
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
              isShuffle={isShuffle}
              onShuffleToggle={() => setIsShuffle(!isShuffle)}
              t={t}
            />
          </div>
        </div>
      )}
      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSearchClick={handleSearchClick}
        language={language}
        t={t}
      />
    </div>
  );
}
