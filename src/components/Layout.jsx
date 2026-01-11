import { useState } from "react";
import Header from "./Header.jsx";
import Sidebar from "./Sidebar.jsx";
import MainContent from "./MainContent.jsx";
import SongInfo from "./SongInfo.jsx";
import BottomNav from "./BottomNav.jsx";
import Input from "./Input.jsx";
import Profile from "./Profile.jsx";
import "../styles/scss/layout.scss";
import "../styles/scss/searchPage.scss";

export default function Layout() {
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);
  const [selectedSong, setSelectedSong] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handlePlaylistSelect = (playlistId) => {
    setSelectedPlaylist(playlistId);
    setSelectedSong(null);
    setSidebarOpen(false);
  };

  const handleSongSelect = (song) => {
    setSelectedSong(song);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    console.log("Searching for:", query);
  };

  const handleHomeClick = () => {
    setSelectedPlaylist(null);
    setSelectedSong(null);
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
      />
      <div className="app-body">
        {sidebarOpen && (
          <div className="sidebar-overlay" onClick={closeSidebar} />
        )}
        <Sidebar
          onPlaylistSelect={handlePlaylistSelect}
          isOpen={sidebarOpen}
          onClose={closeSidebar}
        />
        {showSearch ? (
          <div className="search-page">
            <Input
              placeholder="Пошук музики..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onSearch={handleSearch}
            />
          </div>
        ) : showProfile ? (
          <Profile />
        ) : (
          <MainContent
            playlistId={selectedPlaylist}
            onSongSelect={handleSongSelect}
          />
        )}
        <SongInfo song={selectedSong} />
      </div>
      <BottomNav
        activeTab={activeTab}
        onTabChange={handleTabChange}
        onSearchClick={handleSearchClick}
      />
    </div>
  );
}
