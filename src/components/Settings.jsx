import ThemeToggle from "./ThemeToggle.jsx";
import "../styles/scss/Header/settings.scss";

export default function Settings({ onBackClick }) {
  return (
    <div className="settings-page">
      <div className="settings-header">
        <button className="back-btn" onClick={onBackClick}>
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
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Назад
        </button>
        <h2>Налаштування</h2>
        <p className="settings-subtitle">Персоналізація застосунку</p>
      </div>

      <div className="settings-section">
        <h3>Оформлення</h3>
        <div className="settings-item">
          <div className="setting-info">
            <span className="setting-label">Тема оформлення</span>
            <span className="setting-description">Світла або темна тема</span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="settings-section">
        <h3>Аудіо</h3>
        <div className="settings-item">
          <div className="setting-info">
            <span className="setting-label">Якість звуку</span>
            <span className="setting-description">Висока якість</span>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>Про застосунок</h3>
        <div className="settings-item">
          <div className="setting-info">
            <span className="setting-label">Версія</span>
            <span className="setting-description">1.0.0 (Beta version)</span>
          </div>
        </div>
        <div className="settings-item">
          <div className="setting-info">
            <span className="setting-label">Розробник</span>
            <span className="setting-description">TodMusic Team</span>
          </div>
        </div>
      </div>
    </div>
  );
}
