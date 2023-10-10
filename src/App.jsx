import { useEffect, useState } from "react";
import "./App.scss";
import { Navbar } from "./components/Navbar/Navbar";
import { TimerContainer } from "./components/TimerContainer/TimerContainer";

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
      <TimerContainer displaySettings={displaySettings} />
    </>
  );
}

export default App;
