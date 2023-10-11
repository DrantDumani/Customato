import "./UserSettings.scss";

function UserSettings({
  formTimers,
  formBreakCycle,
  editTimerInfo,
  handleValidSubmission,
  toggleSettings,
  mode,
}) {
  const formValueNames = ["tomato", "shortBreak", "longBreak", "cycle"];
  const validateValues = (form) => {
    for (let name of formValueNames) {
      switch (name) {
        case "tomato":
        case "shortBreak":
        case "longBreak":
        case "cycle":
          if (
            !Number.isInteger(form[name].value) ||
            Number(form[name].value < 0)
          ) {
            return false;
          }
      }
    }
  };

  return (
    <div className="modal-container">
      <section
        className={`form-container ${
          mode ? "form-container--light" : "form-container--dark"
        }`}
      >
        <div className="form-container__flex">
          <h4 className="form-container__title">Settings</h4>
          <button
            onClick={toggleSettings}
            className={`form-container__exit-btn ${
              mode
                ? "form-container__exit-btn--light"
                : "form-container__exit-btn--dark"
            }`}
          >
            X
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (validateValues) {
              handleValidSubmission();
              toggleSettings();
            }
          }}
          className="timer-form"
        >
          <fieldset className="timer-form__fieldset">
            <legend className="timer-form__legend">Timer</legend>
            <div className="timer-form__label-container">
              <label className="timer-form__label" htmlFor="tomato">
                Customato
              </label>
              <input
                type="number"
                className={`timer-form__input ${
                  mode ? "timer-form__input--light" : "timer-form__input--dark"
                }`}
                id="tomato"
                name="tomato"
                value={formTimers.tomato}
                onChange={editTimerInfo}
              />
            </div>
            <div className="timer-form__label-container">
              <label className="timer-form__label" htmlFor="shortBreak">
                Short Break
              </label>
              <input
                type="number"
                className={`timer-form__input ${
                  mode ? "timer-form__input--light" : "timer-form__input--dark"
                }`}
                id="shortBreak"
                name="shortBreak"
                value={formTimers.shortBreak}
                onChange={editTimerInfo}
              />
            </div>
            <div className="timer-form__label-container">
              <label className="timer-form__label" htmlFor="longBreak">
                Long Break
              </label>
              <input
                type="number"
                className={`timer-form__input ${
                  mode ? "timer-form__input--light" : "timer-form__input--dark"
                }`}
                id="longBreak"
                name="longBreak"
                value={formTimers.longBreak}
                onChange={editTimerInfo}
              />
            </div>
            <div className="timer-form__label-container">
              <label className="timer-form__label" htmlFor="cycle">
                Long Break Cycle
              </label>
              <input
                type="number"
                className={`timer-form__input ${
                  mode ? "timer-form__input--light" : "timer-form__input--dark"
                }`}
                id="cycle"
                name="cycle"
                value={formBreakCycle}
                onChange={editTimerInfo}
              />
            </div>
          </fieldset>
          <fieldset className="timer-form__fieldset">
            <legend className="timer-form__legend">Audio</legend>
          </fieldset>
          <fieldset className="timer-form__fieldset">
            <legend className="timer-form__legend">Appearance</legend>
          </fieldset>
          <button
            className={`timer-form__submit-btn ${
              mode
                ? "timer-form__submit-btn--light"
                : "timer-form__submit-btn--dark"
            }`}
          >
            Save
          </button>
        </form>
      </section>
    </div>
  );
}

export { UserSettings };
