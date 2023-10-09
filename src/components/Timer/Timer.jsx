function Timer({
  isCountdown,
  toggleCountdown,
  currentTime,
  swapTimerOnBtnClick,
}) {
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

      <button className="timer-container__btn" onClick={toggleCountdown}>
        {isCountdown ? "Pause" : "Play"}
      </button>
    </div>
  );
}

export { Timer };
