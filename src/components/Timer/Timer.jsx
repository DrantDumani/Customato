import { useEffect, useState } from "react";
import sfx from "../../assets/audio/ClockTower.wav";

function Timer() {
  const [timers, setTimers] = useState({
    tomato: 1000 * 60, //1500000,
    shortBreak: 1000 * 30, //300000,
    longBreak: 1000 * 45, //900000,
  });

  const [cycle, setCycle] = useState(0);
  const [isCountdown, setIsCountdown] = useState(false);
  const [activeTimer, setActiveTimer] = useState("tomato");
  const [currentTime, setCurrentTime] = useState(timers[activeTimer]);

  const swapTimerOnBtnClick = (str) => {
    setIsCountdown(false);
    setActiveTimer(str);
    setCurrentTime(timers[str]);
  };

  useEffect(() => {
    const alarm = new Audio(sfx);

    if (isCountdown) {
      const id = setInterval(() => {
        setCurrentTime((time) => {
          if (time <= 0) {
            const nextCycle =
              activeTimer === "tomato" ? (cycle + 1) % 4 : cycle;
            const currBreak = nextCycle === 0 ? "longBreak" : "shortBreak";
            const nextActiveTimer =
              activeTimer === "tomato" ? currBreak : "tomato";
            setCycle(nextCycle);
            setActiveTimer(nextActiveTimer);
            alarm.play();
            return timers[nextActiveTimer];
          } else {
            return time - 1000;
          }
        });
      }, 1000);

      return () => clearInterval(id);
    }
  }, [activeTimer, isCountdown, cycle, timers]);

  return (
    <div className="timer-container">
      <ul className="timer-btn-list">
        <button
          className="timer-btn-list__btn"
          onClick={() => swapTimerOnBtnClick("tomato")}
        >
          Customato
        </button>
        <button
          className="timer-btn-list__btn"
          onClick={() => swapTimerOnBtnClick("shortBreak")}
        >
          Short Break
        </button>
        <button
          className="timer-btn-list__btn"
          onClick={() => swapTimerOnBtnClick("longBreak")}
        >
          Long Break
        </button>
      </ul>

      <h2 className="timer-container__time">
        {`${String(Math.floor(currentTime / 60000)).padStart(2, "0")}:${String(
          Math.floor(currentTime % 60000) / 1000
        ).padStart(2, "0")}`}
      </h2>

      <button
        className="timer-container__btn"
        onClick={() => {
          setIsCountdown(!isCountdown);
        }}
      >
        {isCountdown ? "Pause" : "Play"}
      </button>
    </div>
  );
}

export { Timer };
