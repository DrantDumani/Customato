import "./Timer.scss";

function Timer({
  isCountdown,
  toggleCountdown,
  currentTime,
  swapTimerOnBtnClick,
  mode,
}) {
  return (
    <div
      className={`timer-container ${
        mode ? "timer-container--light" : "timer-container--dark"
      }`}
    >
      <ul className="timer-btn-list">
        <button
          className={`timer-btn-list__btn ${
            mode ? "timer-btn-list__btn--light" : "timer-btn-list__btn--dark"
          }`}
          onClick={() => swapTimerOnBtnClick("tomato")}
        >
          Customato
        </button>
        <button
          className={`timer-btn-list__btn ${
            mode ? "timer-btn-list__btn--light" : "timer-btn-list__btn--dark"
          }`}
          onClick={() => swapTimerOnBtnClick("shortBreak")}
        >
          Short Break
        </button>
        <button
          className={`timer-btn-list__btn ${
            mode ? "timer-btn-list__btn--light" : "timer-btn-list__btn--dark"
          }`}
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
        className={`timer-container__btn ${
          mode ? "timer-container__btn--light" : "timer-container__btn--dark"
        }`}
        onClick={toggleCountdown}
      >
        {isCountdown ? "PAUSE" : "PLAY"}
      </button>
    </div>
  );
}

export { Timer };
