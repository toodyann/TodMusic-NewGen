import ThemeToggle from "./ThemeToggle.jsx";
import "../styles/scss/profile.scss";

export default function Profile({ onBackClick }) {
  return (
    <div className="profile-page">
      <div className="profile-header">
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
        <div className="profile-avatar">
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
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
          </svg>
        </div>
        <h2>Мій профіль</h2>
        <p className="profile-subtitle">Налаштуйте свій обліковий запис</p>
      </div>

      <div className="profile-section">
        <h3>Особиста інформація</h3>
        <div className="profile-info-item">
          <span className="info-label">Ім'я</span>
          <span className="info-value empty">Не вказано</span>
        </div>
        <div className="profile-info-item">
          <span className="info-label">Email</span>
          <span className="info-value empty">Не вказано</span>
        </div>
        <div className="profile-info-item">
          <span className="info-label">Телефон</span>
          <span className="info-value empty">Не вказано</span>
        </div>
      </div>

      <div className="profile-section">
        <h3>Налаштування</h3>
        <div className="profile-setting-item">
          <div className="setting-info">
            <span className="setting-label">Тема оформлення</span>
            <span className="setting-description">Світла або темна тема</span>
          </div>
          <ThemeToggle />
        </div>
      </div>

      <div className="profile-section">
        <h3>Статистика</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">0</div>
            <div className="stat-label">Плейлістів</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">0</div>
            <div className="stat-label">Треків</div>
          </div>
          <div className="stat-item">
            <div className="stat-value">0</div>
            <div className="stat-label">Годин прослухано</div>
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button className="profile-btn primary">Редагувати профіль</button>
        <button className="profile-btn">Вийти</button>
      </div>
    </div>
  );
}
