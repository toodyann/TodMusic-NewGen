import Logo from "./Logo.jsx";
import Input from "./Input.jsx";
import ThemeToggle from "./ThemeToggle.jsx";
import "../styles/scss/header.scss";

export default function Header() {
  return (
    <header className="app-header">
      <Logo />
      <Input placeholder="Пошук музики..." />
      <ThemeToggle />
    </header>
  );
}
