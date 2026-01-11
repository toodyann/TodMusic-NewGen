import Logo from "./Logo.jsx";
import Input from "./Input.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import "../styles/scss/header.scss";

export default function Header({
  searchValue,
  onSearch,
  onSearchChange,
  onHomeClick,
  onMenuClick,
}) {
  return (
    <header className="app-header">
      <button className="burger-btn" onClick={onMenuClick}>
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
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </button>
      <Logo />
      <button className="home-btn" onClick={onHomeClick}>
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
          <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
        Додому
      </button>
      <Input
        placeholder="Пошук музики..."
        value={searchValue}
        onChange={(e) => onSearchChange(e.target.value)}
        onSearch={onSearch}
      />
      <ThemeToggle />
    </header>
  );
}
