import { useState } from "react";
import Quote from "./components/quote/Quote";
import Stopwatch from "./components/stopwatch/Stopwatch";
import Calendar from "./components/calendar/Calendar";
import HabitsList from "./components/habits-list/Habits-list";
import changeBackground from "./service/changeBackgroun";
import "./App.css";

function App() {
  const [background, setBackgroud] = useState(
    localStorage.getItem("background")
      ? JSON.parse(localStorage.getItem("background"))
      : {
          background: `linear-gradient(123deg, #2E99B0 0%, #2E99B0 40%, #FCD77F calc(40% + 1px), #FCD77F 60%, #FF2E4C calc(60% + 1px), #FF2E4C 75%, #1E1548 calc(75% + 1px), #1E1548 100%)`,
        }
  );
  const day = new Date().getDate();
  const [currentHabit, setCurrentHabit] = useState("");
  const [choiceView, setChoiceView] = useState("Stopwatch");
  const [viewBlock, setViewBlock] = useState({
    display: "block",
  });
  const [viewElem, setViewElem] = useState({
    opacity: 0,
  });

  const setLocalStorageState = (property, value) => {
    const day = new Date().getDate();
    const copy = { ...JSON.parse(localStorage.getItem("state")) };
    copy[day][property] = value;
    const newState = { ...JSON.parse(localStorage.getItem("state")), ...copy };
    localStorage.setItem("state", JSON.stringify(newState));
  };

  const changeCurrentHabit = (habit, changeIndicator) => {
    if (habit === currentHabit && changeIndicator === false) {
      setCurrentHabit("");
    } else if (changeIndicator === true) {
      setCurrentHabit(habit);
    }

    if (
      !Object.keys(JSON.parse(localStorage.getItem("state"))[day]).includes(
        habit
      )
    ) {
      setLocalStorageState(habit, { status: "inactive" });
    }
  };

  const changeView = (Choice) => {
    setChoiceView(Choice);
  };

  const changeViewBlock = (style) => {
    setViewBlock(style);
    if (viewElem.transform === "translateY(0)") {
      setViewElem({
        transform: "translateY(-250%)",
        opacity: 0,
        transition: "all 0.8s",
      });
    } else {
      setViewElem({
        transform: "translateY(0)",
        opacity: 1,
        transition: "transform 0.8s",
      });
    }
  };

  return (
    <div className="App" style={background}>
      <button
        style={viewElem}
        className="back_btn"
        onClick={() => {
          changeViewBlock({
            transform: "translateY(0)",
            transition: "all 0.8s",
          });
        }}
      >
        <span className="material-symbols-outlined">navigate_before</span>
      </button>
      <div>
        {choiceView === "Stopwatch" ? (
          <div>
            <Quote style={viewElem} />
            <Stopwatch currentHabit={currentHabit} style={viewElem} />
          </div>
        ) : (
          <Calendar habit={choiceView} style={viewElem} />
        )}
      </div>
      <HabitsList
        changeCurrentHabit={changeCurrentHabit}
        changeView={changeView}
        style={viewBlock}
        changeViewBlock={changeViewBlock}
      />
      <button
        className="changeBackground_btn"
        onClick={() => {
          setBackgroud(changeBackground());
        }}
      >
        <span class="material-symbols-outlined">settings</span>
        {/* <span className="material-symbols-outlined">settings_suggest</span> */}
      </button>
    </div>
  );
}

export default App;
