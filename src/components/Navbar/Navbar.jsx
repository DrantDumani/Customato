import "./Navbar.scss";
import Logo from "../../assets/tomato.svg?react";

function Navbar() {
  return (
    <header className="header">
      <nav className="nav-bar">
        <ul className="nav-list">
          <li>
            <a href="/" className="nav-list__link">
              <Logo className="nav-list__logo" />
              Customato
            </a>
          </li>
          <li>
            <button className="nav-list__btn">Settings</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export { Navbar };
