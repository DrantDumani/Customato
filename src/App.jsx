import { useEffect, useState } from "react";
import "./App.scss";
import { Navbar } from "./components/Navbar/Navbar";
import { TimerContainer } from "./components/TimerContainer/TimerContainer";
import { Footer } from "./components/Footer/Footer";

function App() {
  const [displaySettings, setDisplaySettings] = useState(false);
  const [mode, setMode] = useState(true);

  const toggleMode = () => {
    localStorage.setItem("mode", !mode);
    setMode(!mode);
  };

  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode !== null) {
      setMode(JSON.parse(mode));
    }
  }, []);

  useEffect(() => {
    if (displaySettings) {
      document.body.style.overflow = "hidden";
    }

    () => {
      document.body.style.overflow = "auto";
    };
  }, [displaySettings]);

  const toggleSettings = () => {
    setDisplaySettings(!displaySettings);
  };
  return (
    <>
      <Navbar
        toggleSettings={toggleSettings}
        mode={mode}
        toggleMode={toggleMode}
      />
      <TimerContainer
        displaySettings={displaySettings}
        mode={mode}
        toggleSettings={toggleSettings}
      />
      <Footer mode={mode} />
    </>
  );
}

export default App;
