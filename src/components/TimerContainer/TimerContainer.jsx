import { useState } from "react";
import { Timer } from "../Timer/Timer";

function TimerContainer() {
  const [timers, setTimers] = useState({
    tomato: 1000 * 60, //1500000,
    shortBreak: 1000 * 30, //300000,
    longBreak: 1000 * 45, //900000,
  });

  return (
    <main>
      <Timer timers={timers} />
    </main>
  );
}

export { TimerContainer };
