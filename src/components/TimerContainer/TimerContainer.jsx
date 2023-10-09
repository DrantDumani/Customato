import { useState, useRef, useEffect } from "react";
import { Timer } from "../Timer/Timer";
import { UserSettings } from "../UserSettings/UserSettings";
import sfx from "../../assets/audio/ClockTower.wav";

function TimerContainer({ displaySettings }) {
  const [timers, setTimers] = useState({
    tomato: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  const [isCountdown, setIsCountdown] = useState(false);
  const [activeTimer, setActiveTimer] = useState("tomato");
  const [currentTime, setCurrentTime] = useState(timers[activeTimer] * 60000);
  const timerRef = useRef(currentTime);
  const cycleRef = useRef(0);
  const [longBreakCycle, setLongBreakCycle] = useState(4);
  const [formTimers, setFormTimers] = useState({ ...timers });
  const [formBreakCycle, setFormBreakCycle] = useState(longBreakCycle);

  const initTimers = (newTimer) => {
    cycleRef.current = 0;
    timerRef.current = newTimer;
    setCurrentTime(newTimer);
  };

  const toggleCountdown = () => {
    setIsCountdown(!isCountdown);
  };

  const swapTimerOnBtnClick = (str) => {
    setIsCountdown(false);
    setActiveTimer(str);
    const currTimer = timers[str] * 60000;
    initTimers(currTimer);
  };

  const editTimerInfo = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "tomato":
      case "shortBreak":
      case "longBreak":
        setFormTimers((formTimers) => ({ ...formTimers, [name]: value }));
        break;
      case "cycle":
        setFormBreakCycle(value);
    }
  };

  const handleValidSubmission = () => {
    setTimers({ ...formTimers });
    setLongBreakCycle({ ...longBreakCycle });
    const newTimer = formTimers[activeTimer] * 60000;
    initTimers(newTimer);
  };

  useEffect(() => {
    const alarm = new Audio(sfx);

    if (isCountdown) {
      const id = setInterval(() => {
        setCurrentTime((time) => time - 1000);
        timerRef.current -= 1000;
        if (timerRef.current < 0) {
          cycleRef.current =
            activeTimer === "tomato"
              ? (cycleRef.current + 1) % longBreakCycle
              : cycleRef.current;
          const currBreak = cycleRef.current === 0 ? "longBreak" : "shortBreak";
          const nextActiveTimer =
            activeTimer === "tomato" ? currBreak : "tomato";
          setActiveTimer(nextActiveTimer);
          alarm.play();
          setCurrentTime(timers[nextActiveTimer] * 60000);
          timerRef.current = timers[nextActiveTimer];
        }
      }, 1000);
      return () => clearInterval(id);
    }
  }, [activeTimer, isCountdown, longBreakCycle, timers]);

  return (
    <main>
      <Timer
        isCountdown={isCountdown}
        toggleCountdown={toggleCountdown}
        currentTime={currentTime}
        swapTimerOnBtnClick={swapTimerOnBtnClick}
      />
      {displaySettings && (
        <UserSettings
          formTimers={formTimers}
          formBreakCycle={formBreakCycle}
          editTimerInfo={editTimerInfo}
          handleValidSubmission={handleValidSubmission}
        />
      )}
    </main>
  );
}

export { TimerContainer };
