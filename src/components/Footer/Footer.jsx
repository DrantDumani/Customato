import "./Footer.scss";

function Footer({ mode }) {
  return (
    <footer className={`footer ${mode ? "footer--light" : "footer--dark"}`}>
      <p>
        Made by Darnell.{" "}
        <a href="" target="_blank">
          Github
        </a>
      </p>
    </footer>
  );
}

export { Footer };
