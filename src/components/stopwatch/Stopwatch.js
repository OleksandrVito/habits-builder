import { useEffect, useState, useRef } from "react";
import "./stopwatch.css";

const getCurrentTime = () => {
  let time = {};
  const t =
    Date.parse(new Date()) -
    localStorage.getItem("startPeriod") +
    +localStorage.getItem("intermediatePeriod");
  time.seconds = Math.floor((t / 1000) % 60);
  time.minutes = Math.floor((t / 1000 / 60) % 60);
  time.hours = Math.floor((t / 1000 / 60 / 60) % 24);
  console.log(t);
  return time;
};

const Stopwatch = ({ currentHabit }) => {
  const [seconds, setSeconds] = useState(() => {
    if (localStorage.getItem("status") === "active") {
      return getCurrentTime().seconds;
    } else {
      return 0;
    }
  });
  const [minutes, setMinutes] = useState(() => {
    if (localStorage.getItem("status") === "active") {
      return getCurrentTime().minutes;
    } else {
      return 0;
    }
  });
  const [hours, setHours] = useState(() => {
    if (localStorage.getItem("status") === "active") {
      return getCurrentTime().hours;
    } else {
      return 0;
    }
  });
  const [status, setStatus] = useState(null);
  const intervalRef = useRef();

  const startClock = () => {
    if (localStorage.getItem("status") !== "active") {
      localStorage.setItem("startPeriod", Date.parse(new Date()));
    }
  };

  const pauseClock = () => {
    if (localStorage.getItem("status") === "active") {
      localStorage.setItem("pausePeriod", Date.parse(new Date()));
      let intermediatePeriod =
        +localStorage.getItem("intermediatePeriod") +
        (Date.parse(new Date()) - +localStorage.getItem("startPeriod"));
      localStorage.setItem("intermediatePeriod", intermediatePeriod);
    }
  };

  const stopClock = () => {
    localStorage.setItem("intermediatePeriod", 0);
    // localStorage.setItem("stopPeriod", Date.parse(new Date()));
    let period = { seconds: seconds, minutes: minutes, hours: hours };
    localStorage.setItem("period", JSON.stringify(period));
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
  };

  //функція для зміни часу
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (
        (seconds >= 0 && status === "start") ||
        localStorage.getItem("status") === "active"
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
    if (status === "stop") {
      setSeconds(0);
      setMinutes(0);
      setHours(0);
    } else if (localStorage.getItem("status") === "inactive") {
      updateClock();
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
    <section className="stop-watch-section">
      <h1>
        TIME for {currentHabit}
        <span>:</span>
      </h1>
      <div className="timer">
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
          onClick={() => {
            start();
            startClock();
            setStatus("start");
            localStorage.setItem("status", "active");
          }}
        >
          <span>start</span>
        </button>
        <button
          onClick={() => {
            clearInterval(intervalRef.current);
            pauseClock();
            setStatus("pause");
            localStorage.setItem("status", "inactive");
          }}
        >
          <span>pause</span>
        </button>
        <button
          onClick={() => {
            clearInterval(intervalRef.current);
            stopClock();
            setStatus("stop");
            localStorage.setItem("status", "inactive");
          }}
        >
          <span>stop</span>
        </button>
      </div>
    </section>
  );
};

export default Stopwatch;
