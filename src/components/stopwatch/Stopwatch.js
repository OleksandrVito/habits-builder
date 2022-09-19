import { useEffect, useState, useRef } from "react";
import "./stopwatch.css";

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [indicator, setIndicator] = useState(null);
  const intervalRef = useRef();

  let time;
  if (localStorage.getItem("time")) {
    time = JSON.parse(localStorage.getItem("time"));
  } else {
    time = {};
  }

  const startClock = () => {
    time.start = new Date();
    localStorage.setItem("time", JSON.stringify(time));
  };

  const stopClock = () => {
    time.stop = new Date();
    time.period = Date.parse(time.stop) - Date.parse(time.start);
    localStorage.setItem("time", JSON.stringify(time));
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
      if (seconds >= 0 && indicator === "start") {
        updateClock();
      }
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, [seconds]);

  const start = () => {
    if (seconds === 0 && minutes === 0 && hours === 0) {
      setTimeout(() => {
        updateClock();
      }, 1000);
    } else if (indicator === "pause") {
      setTimeout(() => {
        updateClock();
      }, 1000);
    } else if (indicator === "stop") {
      setSeconds(0);
      setMinutes(0);
      setHours(0);
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
        TIME<span>:</span>
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
            setIndicator("start");
          }}
        >
          <span>start</span>
        </button>
        <button
          onClick={() => {
            clearInterval(intervalRef.current);
            setIndicator("pause");
          }}
        >
          <span>pause</span>
        </button>
        <button
          onClick={() => {
            clearInterval(intervalRef.current);
            setIndicator("stop");
            stopClock();
          }}
        >
          <span>stop</span>
        </button>
      </div>
    </section>
  );
};

export default Stopwatch;
