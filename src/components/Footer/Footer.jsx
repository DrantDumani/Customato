import "./Footer.scss";

function Footer({ mode }) {
  return (
    <footer className={`footer ${mode ? "footer--light" : "footer--dark"}`}>
      <p className="footer__text">
        Made by Darnell.{" "}
        <a
          className={`footer__link ${
            mode ? "footer__link--light" : "footer__link--dark"
          } `}
          href=""
          target="_blank"
        >
          Github
        </a>
      </p>
    </footer>
  );
}

export { Footer };
