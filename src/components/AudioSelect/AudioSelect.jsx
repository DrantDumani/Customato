import "./AudioSelect.scss";

const labelNames = {
  tomato: "Customato",
  shortBreak: "S. Break",
  longBreak: "L. Break",
};

function AudioSelect({ mode, alarmAudio, timerName, assignAlarm }) {
  return (
    <>
      <label className="timer-form__label" htmlFor={timerName}>
        {`${labelNames[timerName]} Alarm`}
      </label>
      <select
        onChange={(e) => {
          assignAlarm(e.target.value, timerName);
        }}
        className={`timer-form__input ${
          mode ? "timer-form__input--light" : "timer-form__input--dark"
        }`}
        id={`${timerName}Alarm`}
        name={timerName}
        value={alarmAudio[timerName]?.name || ""}
      >
        <option value="">Default</option>
        {alarmAudio.bank.map((el, i) => {
          return (
            <option key={"select" + i} value={el.name}>
              {el.name}
            </option>
          );
        })}
      </select>
    </>
  );
}

export { AudioSelect };
