import { useState } from "react";
import "./App.scss";
import { Navbar } from "./components/Navbar/Navbar";
import { TimerContainer } from "./components/TimerContainer/TimerContainer";

function App() {
  const [displaySettings, setDisplaySettings] = useState(false);

  const toggleSettings = () => {
    setDisplaySettings(!displaySettings);
  };
  return (
    <>
      <Navbar toggleSettings={toggleSettings} />
      <TimerContainer displaySettings={displaySettings} />
    </>
  );
}

export default App;
