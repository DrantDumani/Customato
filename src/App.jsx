import { useEffect, useState } from "react";
import "./App.scss";
import { Navbar } from "./components/Navbar/Navbar";
import { TimerContainer } from "./components/TimerContainer/TimerContainer";
import { Footer } from "./components/Footer/Footer";
import { HelmetProvider } from "react-helmet-async";

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

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [displaySettings]);

  const toggleSettings = () => {
    setDisplaySettings(!displaySettings);
  };
  return (
    <HelmetProvider>
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
    </HelmetProvider>
  );
}

export default App;
