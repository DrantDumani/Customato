import { useState, useRef, useEffect } from "react";
import { Timer } from "../Timer/Timer";
import { UserSettings } from "../UserSettings/UserSettings";
import sfx from "../../assets/audio/beep.mp3";
import "./TimerContainer.scss";
import localforage from "localforage";
import { Helmet } from "react-helmet-async";

function TimerContainer({ displaySettings, mode, toggleSettings }) {
  const [timers, setTimers] = useState({
    tomato: 25,
    shortBreak: 5,
    longBreak: 15,
  });

  const [alarmAudio, setAlarmAudio] = useState({
    bank: [],
  });

  const [isCountdown, setIsCountdown] = useState(false);
  const [activeTimer, setActiveTimer] = useState("tomato");
  const [currentTime, setCurrentTime] = useState(timers[activeTimer] * 60000);
  const timerRef = useRef(currentTime);
  const cycleRef = useRef(0);
  const [longBreakCycle, setLongBreakCycle] = useState(4);
  const [formTimers, setFormTimers] = useState({ ...timers });
  const [formBreakCycle, setFormBreakCycle] = useState(longBreakCycle);

  const assignAlarm = (alarmName, timerName) => {
    const newAlarmAudio = structuredClone(alarmAudio);
    const selectedAlarm = alarmAudio.bank.find((el) => el.name === alarmName);
    newAlarmAudio[timerName] = selectedAlarm;
    setAlarmAudio(newAlarmAudio);
    localforage.setItem("alarmAudio", newAlarmAudio);
  };

  const addAudio = (audio) => {
    const newBank = [...alarmAudio.bank];
    newBank.push(audio);
    const newAlarmAudio = { ...alarmAudio, bank: newBank };
    setAlarmAudio(newAlarmAudio);
    localforage.setItem("alarmAudio", newAlarmAudio);
  };

  const deleteAudio = (audioName) => {
    const newAlarmAudio = { ...alarmAudio };
    const newBank = alarmAudio.bank.filter((el) => el.name !== audioName);
    const timerNames = ["tomato", "shortBreak", "longBreak"];
    timerNames.forEach((tName) => {
      if (newAlarmAudio[tName]?.name === audioName) {
        newAlarmAudio[tName] = "";
      }
    });
    newAlarmAudio.bank = newBank;
    setAlarmAudio(newAlarmAudio);
    localforage.setItem("alarmAudio", newAlarmAudio);
  };

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

    localforage.getItem("alarmAudio").then((arr) => {
      if (arr !== null) {
        setAlarmAudio(arr);
      }
    });
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
    let chosenAlarm;
    const customAlarm = alarmAudio[activeTimer];
    if (customAlarm && /audio/.test(customAlarm.type)) {
      chosenAlarm = new Audio(URL.createObjectURL(customAlarm));
    } else {
      chosenAlarm = new Audio(sfx);
    }
    chosenAlarm.addEventListener("ended", () =>
      URL.revokeObjectURL(chosenAlarm.src)
    );

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
          chosenAlarm.play();
          setCurrentTime(timers[nextActiveTimer] * 60000);
          timerRef.current = timers[nextActiveTimer] * 60000;
        }
      }, 1000);
      return () => clearInterval(id);
    }
  }, [activeTimer, isCountdown, longBreakCycle, timers, alarmAudio]);

  return (
    <>
      <Helmet>
        <title>
          {isCountdown
            ? `${String(Math.floor(currentTime / 60000)).padStart(
                2,
                "0"
              )}:${String(Math.floor(currentTime % 60000) / 1000).padStart(
                2,
                "0"
              )} Customato`
            : "Customato"}
        </title>
      </Helmet>
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
            alarmAudio={alarmAudio}
            assignAlarm={assignAlarm}
            addAudio={addAudio}
            deleteAudio={deleteAudio}
          />
        )}
      </main>
    </>
  );
}

export { TimerContainer };
