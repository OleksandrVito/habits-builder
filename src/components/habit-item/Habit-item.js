import "./habit-item.css";

const HabitItem = ({
  habit,
  onDelete,
  changeCurrentHabit,
  changeStyle,
  changeView,
  changeViewBlock,
}) => {
  let classBlockName = "habit";
  if (habit == null) {
    classBlockName = "null";
  }

  const openStopWatch = () => {
    changeCurrentHabit(habit, true);
    changeView("Stopwatch");
    changeViewBlock({
      transform: "translateY(-120%)",
      transition: "all 0.8s",
    });
  };

  const openCalender = () => {
    changeView(habit);
    changeViewBlock({
      transform: "translateY(-120%)",
      transition: "all 0.8s",
    });
  };

  return (
    <div className={classBlockName} tabIndex={0}>
      <h4>{habit}</h4>
      <span
        className="material-symbols-outlined"
        onClick={() => {
          onDelete(habit);
          changeStyle(0, "hidden", 2);
          changeCurrentHabit(habit, false);
          changeView("Stopwatch");
        }}
      >
        close
      </span>
      <div className="button_block">
        <button onClick={openStopWatch}>stopwatch</button>
        <button onClick={openCalender}>history</button>
      </div>
      <div className="text">Please make it your habit!</div>
    </div>
  );
};

export default HabitItem;
