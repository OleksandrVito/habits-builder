import "./habit-item.css";

const HabitItem = ({ habit, onDelete }) => {
  let classBlockName = "habit";
  if (habit == null) {
    classBlockName = "null";
  }

  return (
    <div className={classBlockName}>
      <h4>{habit}</h4>
      <span
        className="material-symbols-outlined"
        onClick={() => {
          onDelete(habit);
        }}
      >
        close
      </span>
      <div className="button_block">
        <button>stopwatch</button>
        <button>history</button>
      </div>
      <div className="text">Please make it your habit!</div>
    </div>
  );
};

export default HabitItem;
