import "./Navbar.scss";
import Logo from "../../assets/tomato.svg?react";
import Sun from "../../assets/icons/sun.svg?react";
import Moon from "../../assets/icons/moon.svg?react";

function Navbar({ toggleSettings, mode, toggleMode }) {
  return (
    <header className="header">
      <nav className={`nav-bar ${mode ? "nav-bar--light" : "nav-bar--dark"}`}>
        <ul className="nav-list">
          <li>
            <a href="/" className="nav-list__link">
              <Logo className="nav-list__logo" />
              Customato
            </a>
          </li>
          <li className="nav-list__left-item">
            <button
              className={`nav-list__toggle-btn ${
                mode
                  ? "nav-list__toggle-btn--light"
                  : "nav-list__toggle-btn--dark"
              }`}
              onClick={toggleMode}
            >
              {mode ? (
                <Sun className="nav-list__svg" />
              ) : (
                <Moon className="nav-list__svg" />
              )}
            </button>
          </li>
          <li>
            <button
              className={`nav-list__btn ${
                mode ? "nav-list__btn--light" : "nav-list__btn--dark"
              }`}
              onClick={toggleSettings}
            >
              Settings
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export { Navbar };
