import { useState, useEffect } from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import MainContent from "./MainContent.jsx";
import SongInfo from "./SongInfo.jsx";
import BottomNav from "./BottomNav.jsx";
import Input from "./Input.jsx";
import Profile from "./Profile.jsx";
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
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("todmusic_favorites");
    if (saved) {
      try {
        return JSON.parse(saved);
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
        return JSON.parse(saved);
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
          // Перевірка чи трек вже є в плейлісті
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
    // Якщо видаляємо активний плейліст, переключаємо на улюблені
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
    setSelectedSong(null);
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
      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSearchClick={handleSearchClick}
      />
    </div>
  );
}
