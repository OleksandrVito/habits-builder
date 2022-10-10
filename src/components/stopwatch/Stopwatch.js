import { useEffect, useState, useRef } from "react";
import { setLocalStorageState } from "../../service/changeStorage";
import { getLocalStorageState } from "../../service/changeStorage";
import "./stopwatch.css";

const getCurrentTime = (currentHabit) => {
  let time = {};
  let t;
  if (getLocalStorageState("status", currentHabit) === "active") {
    t =
      Date.parse(new Date()) -
      getLocalStorageState("startPeriod", currentHabit);
  }
  if (
    getLocalStorageState("intermediatePeriod", currentHabit) &&
    getLocalStorageState("intermediatePeriod", currentHabit) > 0 &&
    getLocalStorageState("status", currentHabit) !== "active"
  ) {
    t = getLocalStorageState("intermediatePeriod", currentHabit);
  }
  if (
    getLocalStorageState("intermediatePeriod", currentHabit) &&
    getLocalStorageState("intermediatePeriod", currentHabit) > 0 &&
    getLocalStorageState("status", currentHabit) === "active"
  ) {
    t =
      Date.parse(new Date()) -
      getLocalStorageState("startPeriod", currentHabit) +
      +getLocalStorageState("intermediatePeriod", currentHabit);
  }

  time.seconds = Math.floor((t / 1000) % 60);
  time.minutes = Math.floor((t / 1000 / 60) % 60);
  time.hours = Math.floor((t / 1000 / 60 / 60) % 24);
  return time;
};

const Stopwatch = ({ currentHabit, style }) => {
  const [seconds, setSeconds] = useState(() => {
    if (getLocalStorageState("status", currentHabit) === "active") {
      return getCurrentTime(currentHabit).seconds;
    } else {
      if (getLocalStorageState("intermediatePeriod", currentHabit) !== 0) {
        return getCurrentTime(currentHabit).seconds;
      } else {
        return 0;
      }
    }
  });
  const [minutes, setMinutes] = useState(() => {
    if (getLocalStorageState("status", currentHabit) === "active") {
      return getCurrentTime(currentHabit).minutes;
    } else {
      if (getLocalStorageState("intermediatePeriod", currentHabit) !== 0) {
        return getCurrentTime(currentHabit).minutes;
      } else {
        return 0;
      }
    }
  });
  const [hours, setHours] = useState(() => {
    if (getLocalStorageState("status", currentHabit) === "active") {
      return getCurrentTime(currentHabit).hours;
    } else {
      if (getLocalStorageState("intermediatePeriod", currentHabit) !== 0) {
        return getCurrentTime(currentHabit).hours;
      } else {
        return 0;
      }
    }
  });
  const [status, setStatus] = useState();
  const intervalRef = useRef();
  const [backgroundTimer, setBackgroundTimer] = useState({ display: "none" });

  //рендеримо новий таймер при зміні звички
  useEffect(() => {
    setSeconds(() => {
      if (getLocalStorageState("status", currentHabit) === "active") {
        return getCurrentTime(currentHabit).seconds;
      } else {
        if (
          getLocalStorageState("intermediatePeriod", currentHabit) &&
          getLocalStorageState("intermediatePeriod", currentHabit) !== 0
        ) {
          return getCurrentTime(currentHabit).seconds;
        } else {
          return 0;
        }
      }
    });

    setMinutes(() => {
      if (getLocalStorageState("status", currentHabit) === "active") {
        return getCurrentTime(currentHabit).minutes;
      } else {
        if (
          getLocalStorageState("intermediatePeriod", currentHabit) &&
          getLocalStorageState("intermediatePeriod", currentHabit) !== 0
        ) {
          return getCurrentTime(currentHabit).minutes;
        } else {
          return 0;
        }
      }
    });
    setHours(() => {
      if (getLocalStorageState("status", currentHabit) === "active") {
        return getCurrentTime(currentHabit).hours;
      } else {
        if (
          getLocalStorageState("intermediatePeriod", currentHabit) &&
          getLocalStorageState("intermediatePeriod", currentHabit) !== 0
        ) {
          return getCurrentTime(currentHabit).hours;
        } else {
          return 0;
        }
      }
    });

    if (currentHabit === "") {
      setBackgroundTimer({ display: "block" });
    } else {
      setBackgroundTimer({ display: "none" });
    }
  }, [currentHabit]);

  const startClock = () => {
    if (
      getLocalStorageState("status", currentHabit) !== "active" &&
      getLocalStorageState("intermediatePeriod", currentHabit) === 0
    ) {
      setLocalStorageState("startPeriod", Date.parse(new Date()), currentHabit);
      if (seconds > 0 || minutes > 0 || hours > 0) {
        setSeconds(0);
        setMinutes(0);
        setHours(0);
      }
    } else if (
      getLocalStorageState("status", currentHabit) !== "active" &&
      // status === `pause${currentHabit}`
      getLocalStorageState("intermediatePeriod", currentHabit) !== 0
    ) {
      setLocalStorageState("startPeriod", Date.parse(new Date()), currentHabit);
      updateClock();
    } else if (
      getLocalStorageState("status", currentHabit) !== "active" &&
      !getLocalStorageState("intermediatePeriod", currentHabit)
    ) {
      setLocalStorageState("startPeriod", Date.parse(new Date()), currentHabit);
      updateClock();
    }
  };

  const pauseClock = () => {
    if (getLocalStorageState("status", currentHabit) === "active") {
      // setLocalStorageState("pauseMoment", Date.parse(new Date()), currentHabit);
      let intermediatePeriod;
      if (!getLocalStorageState("intermediatePeriod", currentHabit)) {
        intermediatePeriod =
          Date.parse(new Date()) -
          +getLocalStorageState("startPeriod", currentHabit);
      } else {
        intermediatePeriod =
          +getLocalStorageState("intermediatePeriod", currentHabit) +
          Date.parse(new Date()) -
          +getLocalStorageState("startPeriod", currentHabit);
      }
      setLocalStorageState(
        "intermediatePeriod",
        intermediatePeriod,
        currentHabit
      );
    }
  };

  const stopClock = () => {
    setLocalStorageState("intermediatePeriod", 0, currentHabit);
    let period = { seconds: seconds, minutes: minutes, hours: hours };
    let t =
      hours * 60 * 60 +
      minutes * 60 +
      seconds +
      (+getLocalStorageState("t", currentHabit)
        ? getLocalStorageState("t", currentHabit)
        : 0);
    setLocalStorageState("period", JSON.stringify(period), currentHabit);
    setLocalStorageState("t", t, currentHabit);
  };

  const updateClock = () => {
    setSeconds(seconds + 1);
    if (seconds === 59) {
      setSeconds(0);
      setMinutes(minutes + 1);
    }
    if (minutes === 59) {
      setMinutes(0);
      setHours(hours + 1);
    }
    if (hours === 23) {
      setHours(0);
    }
  };

  //функція для зміни часу
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (
        (seconds > 0 && status === `start${currentHabit}`) ||
        getLocalStorageState("status", currentHabit) === "active"
      ) {
        updateClock();
      }
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [seconds]);

  //функція запуску таймера
  const start = () => {
    if (status === `stop${currentHabit}`) {
      setLocalStorageState("intermediatePeriod", 0, currentHabit);
      setSeconds(0);
      setMinutes(0);
      setHours(0);
      if (
        getLocalStorageState("status", currentHabit) === "inactive" &&
        seconds === 0 &&
        minutes === 0 &&
        hours === 0
      ) {
        updateClock();
      }
      //
    }
  };

  //функція для добавлення нулів
  const getZero = (num) => {
    if (num >= 0 && num < 10) {
      return `0${num}`;
    } else {
      return num;
    }
  };

  return (
    <section className="stop-watch-section" style={style}>
      <h1>
        {currentHabit ? `TIME for ${currentHabit}` : `Choose your habit`}
        <span>{currentHabit ? ":" : "!"}</span>
      </h1>
      <div className="timer">
        <div className="backgroundContainer" style={backgroundTimer}></div>
        <div className="container">
          <div className="block">
            <h2 id="hours">{getZero(hours)}</h2>
            <span>hours</span>
          </div>
          <div className="block">
            <h2 id="minutes">{getZero(minutes)}</h2>
            <span>minutes</span>
          </div>
          <div className="block">
            <h2 id="seconds">{getZero(seconds)}</h2>
            <span>seconds</span>
          </div>
        </div>
      </div>
      <div className="button_block">
        <button
          disabled={currentHabit ? false : true}
          onClick={() => {
            start();
            startClock();
            setStatus(`start${currentHabit}`);
            setLocalStorageState("status", "active", currentHabit);
          }}
        >
          <span>start</span>
        </button>
        <button
          disabled={currentHabit ? false : true}
          onClick={() => {
            clearInterval(intervalRef.current);
            pauseClock();
            setStatus(`pause${currentHabit}`);
            setLocalStorageState("status", "inactive", currentHabit);
          }}
        >
          <span>pause</span>
        </button>
        <button
          disabled={currentHabit ? false : true}
          onClick={() => {
            clearInterval(intervalRef.current);
            stopClock();
            setStatus(`stop${currentHabit}`);
            setLocalStorageState("status", "inactive", currentHabit);
            // setLocalStorageState(
            //   "startPeriod",
            //   Date.parse(new Date()),
            //   currentHabit
            // );
          }}
        >
          <span>stop</span>
        </button>
      </div>
    </section>
  );
};

export default Stopwatch;
