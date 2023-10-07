import { useState } from "react";
import "./App.scss";
import { Navbar } from "./components/Navbar/Navbar";

function App() {
  const [displaySettings, setDisplaySettings] = useState(false);

  const toggleSettings = () => {
    setDisplaySettings(!displaySettings);
    console.log(664949);
  };
  return (
    <>
      <Navbar toggleSettings={toggleSettings} />
    </>
  );
}

export default App;
