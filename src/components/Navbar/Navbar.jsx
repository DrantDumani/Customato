import "./Navbar.scss";
import Logo from "../../assets/tomato.svg?react";

function Navbar() {
  return (
    <header className="header">
      <nav className="nav-bar">
        <ul className="nav-list">
          <li>
            <Logo className="nav-list__logo" />
            <a href="/" className="nav-list__link">
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
