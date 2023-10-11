import { useState, useRef, useEffect } from "react";
import { Timer } from "../Timer/Timer";
import { UserSettings } from "../UserSettings/UserSettings";
import sfx from "../../assets/audio/ClockTower.wav";
import "./TimerContainer.scss";

function TimerContainer({ displaySettings, mode, toggleSettings }) {
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

  useEffect(() => {
    const timers = localStorage.getItem("timers");
    if (timers !== null) {
      const timerObj = JSON.parse(timers);
      setTimers(timerObj);
      const currTime = timerObj["tomato"] * 60000;
      setCurrentTime(currTime);
      timerRef.current = currTime;
      setFormTimers(timerObj);
    }
    const breakCycle = JSON.parse(localStorage.getItem("longBreakCycle"));
    if (breakCycle !== null) {
      setLongBreakCycle(breakCycle);
      setFormBreakCycle(breakCycle);
    }
  }, []);

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
    localStorage.setItem("timers", JSON.stringify(formTimers));
    setLongBreakCycle(formBreakCycle);
    localStorage.setItem("longBreakCycle", formBreakCycle);
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
          timerRef.current = timers[nextActiveTimer] * 60000;
        }
      }, 1000);
      return () => clearInterval(id);
    }
  }, [activeTimer, isCountdown, longBreakCycle, timers]);

  return (
    <main
      className={`main-content ${
        mode ? "main-content--light" : "main-content--dark"
      }`}
    >
      <Timer
        isCountdown={isCountdown}
        toggleCountdown={toggleCountdown}
        currentTime={currentTime}
        swapTimerOnBtnClick={swapTimerOnBtnClick}
        mode={mode}
      />
      {displaySettings && (
        <UserSettings
          formTimers={formTimers}
          formBreakCycle={formBreakCycle}
          editTimerInfo={editTimerInfo}
          handleValidSubmission={handleValidSubmission}
          toggleSettings={toggleSettings}
          mode={mode}
        />
      )}
    </main>
  );
}

export { TimerContainer };
