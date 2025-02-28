# Customato

A pomodoro timer with customizable alarm audio.

Although this is mobile responsive, the best experience is on desktop.

Users can upload their own audio files for the three different timers. You can use the settings menu to customize the timer lengths and interval as well. User settings are saved on the device that was being used at the time.

Local storage is used to store the timer and interval settings. Indexed DB is used to store any uploaded audio files. On devices where indexedDB isn't supported, localstorage will be used for this instead. As localstorage isn't really meant to support that kind of data, Customato may fall back on the default alarm.

## Tech Stack

- React
- React Helmet
- localForage
- JSX
