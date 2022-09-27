import "./habit-item.css";

const HabitItem = ({ habit, onDelete, changeCurrentHabit, changeStyle }) => {
  let classBlockName = "habit";
  if (habit == null) {
    classBlockName = "null";
  }

  const openStopWatch = () => {
    changeCurrentHabit(habit);
    console.log(habit);
  };

  return (
    <div className={classBlockName} tabIndex={0}>
      <h4>{habit}</h4>
      <span
        className="material-symbols-outlined"
        onClick={() => {
          onDelete(habit);
          changeStyle(0, "hidden", 2);
        }}
      >
        close
      </span>
      <div className="button_block">
        <button onClick={openStopWatch}>stopwatch</button>
        <button>history</button>
      </div>
      <div className="text">Please make it your habit!</div>
    </div>
  );
};

export default HabitItem;
