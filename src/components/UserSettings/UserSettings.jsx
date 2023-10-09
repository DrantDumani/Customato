function UserSettings({
  formTimers,
  formBreakCycle,
  editTimerInfo,
  handleValidSubmission,
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
    <section className="form-container">
      <h4 className="form-container__title">Settings</h4>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (validateValues) handleValidSubmission();
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
              className="timer-form__input"
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
              className="timer-form__input"
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
              className="timer-form__input"
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
              className="timer-form__input"
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

        <button className="timer-form__submit">Save</button>
      </form>
    </section>
  );
}

export { UserSettings };
