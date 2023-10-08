import { useState } from "react";
import "./App.scss";
import { Navbar } from "./components/Navbar/Navbar";
import { TimerContainer } from "./components/TimerContainer/TimerContainer";

function App() {
  const [displaySettings, setDisplaySettings] = useState(false);

  const toggleSettings = () => {
    setDisplaySettings(!displaySettings);
    console.log(664949);
  };
  return (
    <>
      <Navbar toggleSettings={toggleSettings} />
      <TimerContainer />
    </>
  );
}

export default App;
