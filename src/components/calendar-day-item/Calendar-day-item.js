import "./calendar-day-item.css";

const CalendarDayItem = ({ num, time }) => {
  return (
    <div
      className="calendar_day_item"
      // style={time > 0 ? { background: "white" } : { display: "none" }}
    >
      <span>{time > 0 ? `${(time / 60).toFixed(1)} min` : null}</span>
      <p>{num}</p>
    </div>
  );
};

export default CalendarDayItem;
