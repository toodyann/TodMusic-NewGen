import ThemeToggle from "./ThemeToggle.jsx";
import "../styles/scss/Header/settings.scss";

export default function Settings({
  onBackClick,
  language,
  onLanguageChange,
  t,
}) {
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
          {t("back")}
        </button>
        <h2>{t ? t("settingsTitle") : "Налаштування"}</h2>
        <p className="settings-subtitle">
          {t ? t("settingsSubtitle") : "Персоналізація застосунку"}
        </p>
      </div>

      <div className="settings-section">
        <h3>{t ? t("appearance") : "Оформлення"}</h3>
        <div className="settings-item">
          <div className="setting-info">
            <span className="setting-label">
              {t ? t("theme") : "Тема оформлення"}
            </span>
            <span className="setting-description">
              {t ? t("themeDesc") : "Світла або темна тема"}
            </span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="settings-section">
        <h3>{t ? t("language") : "Мова"}</h3>
        <div className="settings-item">
          <div className="setting-info">
            <span className="setting-label">
              {t ? t("languageDesc") : "Мова інтерфейсу"}
            </span>
            <span className="setting-description">
              {t ? t("selectLanguage") : "Виберіть мову"}
            </span>
          </div>
          <div className="language-select">
            <button
              className={`lang-btn ${language === "uk" ? "active" : ""}`}
              onClick={() => onLanguageChange("uk")}
            >
              Українська
            </button>
            <button
              className={`lang-btn ${language === "en" ? "active" : ""}`}
              onClick={() => onLanguageChange("en")}
            >
              English
            </button>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>{t ? t("audio") : "Аудіо"}</h3>
        <div className="settings-item">
          <div className="setting-info">
            <span className="setting-label">
              {t ? t("audioQuality") : "Якість звуку"}
            </span>
            <span className="setting-description">
              {t ? t("audioQualityDesc") : "Висока якість"}
            </span>
          </div>
        </div>
      </div>

      <div className="settings-section">
        <h3>{t ? t("about") : "Про застосунок"}</h3>
        <div className="settings-item">
          <div className="setting-info">
            <span className="setting-label">{t ? t("version") : "Версія"}</span>
            <span className="setting-description">1.0.0 (Beta version)</span>
          </div>
        </div>
        <div className="settings-item">
          <div className="setting-info">
            <span className="setting-label">
              {t ? t("developer") : "Розробник"}
            </span>
            <span className="setting-description">TodMusic Team</span>
          </div>
        </div>
      </div>
    </div>
  );
}
