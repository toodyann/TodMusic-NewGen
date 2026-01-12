import "../styles/scss/Components/footer.scss";
import faviconImage from "../assets/FaviconTM.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <div className="footer-logo">
            <p className="footer-logo-text">TodMusic</p>
            <img
              src={faviconImage}
              alt="TodMusic Logo"
              className="footer-logo-image"
            />
          </div>
        </div>

        <div className="footer-column">
          <h4>Компанія</h4>
          <ul>
            <li>
              <a href="#about">Про нас</a>
            </li>
            <li>
              <a href="#login">Увійти</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Спільноти</h4>
          <ul>
            <li>
              <a href="#artists">Для виконавців</a>
            </li>
            <li>
              <a href="#advertisers">Для рекламодавців</a>
            </li>
            <li>
              <a href="#investors">Для інвесторів</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Корисні посилання</h4>
          <ul>
            <li>
              <a href="#support">Підтримка</a>
            </li>
            <li>
              <a href="#player">Вебпрогравач</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Підписки TodMusic</h4>
          <ul>
            <li>
              <a href="#free">TodMusic Free</a>
            </li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Соціальні мережі</h4>
          <div className="footer-social">
            <div className="social-telegram">
              <a
                href="https://t.me/TodMusicOffficial"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  className="telegram-icon"
                  fill="#000000"
                  viewBox="0 0 256 256"
                >
                  <path d="M228.88,26.19a9,9,0,0,0-9.16-1.57L17.06,103.93a14.22,14.22,0,0,0,2.43,27.21L72,141.45V200a15.92,15.92,0,0,0,10,14.83,15.91,15.91,0,0,0,17.51-3.73l25.32-26.26L165,220a15.88,15.88,0,0,0,10.51,4,16.3,16.3,0,0,0,5-.79,15.85,15.85,0,0,0,10.67-11.63L231.77,35A9,9,0,0,0,228.88,26.19Zm-61.14,36L78.15,126.35l-49.6-9.73ZM88,200V152.52l24.79,21.74Zm87.53,8L92.85,135.5l119-85.29Z"></path>
                </svg>
              </a>
            </div>
            <div>
              <a href="#twitter" target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="23"
                  fill="currentColor"
                  className="bi bi-twitter-x"
                  viewBox="0 0 16 16"
                >
                  <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                </svg>
              </a>
            </div>
            <div>
              <a href="#facebook" target="_blank" rel="noopener noreferrer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  fill="currentColor"
                  className="bi bi-facebook"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>Юридична інформація</span>
        <span>Центр безпеки й конфіденційності</span>
        <span>Політика конфіденційності</span>
        <span>Політика щодо файлів cookie</span>
        <span>Про рекламу</span>
        <span>Доступність</span>
        <span>Україна (українська)</span>
        <span>© 2025 TodMusic AB</span>
      </div>
    </footer>
  );
}
