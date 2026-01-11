import "../styles/scss/Header/logo.scss";
import faviconImage from "../assets/FaviconTM.png";

function Logo() {
  return (
    <>
      <div className="logo_container">
        <p className="main_logo">TodMusic</p>
        <img src={faviconImage} alt="TodMusic Logo" className="logo_image" />
      </div>
    </>
  );
}

export default Logo;
