import { useState } from "react";
import Quote from "./components/quote/Quote";
import Stopwatch from "./components/stopwatch/Stopwatch";
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

  const [currentHabit, setCurrentHabit] = useState("Sex");

  const changeCurrentHabit = (habit) => {
    setCurrentHabit(habit);
  };

  return (
    <div className="App" style={background}>
      <div>
        <Quote />
        <Stopwatch currentHabit={currentHabit} />
      </div>
      <HabitsList changeCurrentHabit={changeCurrentHabit} />
      <button
        className="changeBackground_btn"
        onClick={() => {
          setBackgroud(changeBackground());
        }}
      >
        <span className="material-symbols-outlined">settings_suggest</span>
      </button>
    </div>
  );
}

export default App;
