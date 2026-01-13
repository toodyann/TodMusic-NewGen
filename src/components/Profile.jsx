import { useState } from "react";
import "../styles/scss/Header/profile.scss";

export default function Profile({
  onBackClick,
  playlists = [],
  favorites = [],
  t,
}) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const totalTracks =
    playlists.reduce(
      (sum, playlist) => sum + (playlist.songs?.length || 0),
      0
    ) + favorites.length;

  const totalHours = Math.floor((totalTracks * 30) / 3600);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login:", { email, password });
    setIsLoggedIn(true);
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert(t ? t("passwordMismatch") : "Паролі не співпадають!");
      return;
    }
    console.log("Sign up:", { username, email, password });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setUsername("");
    setIsSignUp(false);
  };

  if (!isLoggedIn) {
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
            {t ? t("back") : "Назад"}
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
          <h2>
            {isSignUp
              ? t
                ? t("signUp")
                : "Реєстрація"
              : t
              ? t("accountSignIn")
              : "Вхід в акаунт"}
          </h2>
          <p className="profile-subtitle">
            {isSignUp
              ? t
                ? t("createAccountPrompt")
                : "Створіть акаунт для синхронізації даних"
              : t
              ? t("signInPrompt")
              : "Увійдіть щоб синхронізувати дані"}
          </p>
        </div>

        {isSignUp ? (
          <form className="login-form" onSubmit={handleSignUp}>
            <div className="form-group">
              <label htmlFor="username">
                {t ? t("username") : "Ім'я користувача"}
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t ? t("namePlaceholder") : "Ваше ім'я"}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">{t ? t("email") : "Email"}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">{t ? t("password") : "Пароль"}</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength="6"
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">
                {t ? t("confirmPassword") : "Підтвердіть пароль"}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength="6"
              />
            </div>

            <button type="submit" className="login-btn">
              {t ? t("register") : "Зареєструватися"}
            </button>

            <div className="login-footer">
              <span>{t ? t("alreadyHaveAccount") : "Вже є акаунт?"}</span>
              <span className="separator">•</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignUp(false);
                }}
                className="sign-up"
              >
                {t ? t("login") : "Увійти"}
              </a>
            </div>
          </form>
        ) : (
          <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="email">{t ? t("email") : "Email"}</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">{t ? t("password") : "Пароль"}</label>
              <div className="password-input">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                      <line x1="1" y1="1" x2="23" y2="23"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                      <circle cx="12" cy="12" r="3"></circle>
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="login-btn">
              {t ? t("login") : "Увійти"}
            </button>

            <div className="login-footer">
              <a href="#" className="forgot-password">
                {t ? t("forgotPassword") : "Забули пароль?"}
              </a>
              <span className="separator">•</span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setIsSignUp(true);
                }}
                className="sign-up"
              >
                {t ? t("register") : "Зареєструватися"}
              </a>
            </div>
          </form>
        )}
      </div>
    );
  }

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
          {t ? t("back") : "Назад"}
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
        <h2>{t ? t("profileTitle") : "Мій профіль"}</h2>
        <p className="profile-subtitle">
          {t ? t("profileSubtitle") : "Налаштуйте свій обліковий запис"}
        </p>
      </div>

      <div className="profile-section">
        <h3>{t ? t("personalInfo") : "Особиста інформація"}</h3>
        <div className="profile-info-item">
          <span className="info-label">{t ? t("name") : "Ім'я"}</span>
          <span className="info-value empty">
            {t ? t("notSpecified") : "Не вказано"}
          </span>
        </div>
        <div className="profile-info-item">
          <span className="info-label">{t ? t("email") : "Email"}</span>
          <span className="info-value empty">
            {t ? t("notSpecified") : "Не вказано"}
          </span>
        </div>
        <div className="profile-info-item">
          <span className="info-label">{t ? t("phone") : "Телефон"}</span>
          <span className="info-value empty">
            {t ? t("notSpecified") : "Не вказано"}
          </span>
        </div>
      </div>

      <div className="profile-section">
        <h3>{t ? t("statistics") : "Статистика"}</h3>
        <div className="stats-grid">
          <div className="stat-item">
            <div className="stat-value">{playlists.length}</div>
            <div className="stat-label">
              {t ? t("totalPlaylists") : "Плейлістів"}
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{favorites.length}</div>
            <div className="stat-label">
              {t ? t("totalFavorites") : "Улюблених"}
            </div>
          </div>
          <div className="stat-item">
            <div className="stat-value">{totalTracks}</div>
            <div className="stat-label">
              {t ? t("totalTracks") : "Всього треків"}
            </div>
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button className="profile-btn primary">
          {t ? t("editProfile") : "Редагувати профіль"}
        </button>
        <button className="profile-btn" onClick={handleLogout}>
          {t ? t("logout") : "Вийти"}
        </button>
      </div>
    </div>
  );
}
