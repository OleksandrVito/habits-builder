import CalendarDayItem from "../calendar-day-item/Calendar-day-item";
import { getLocalStorageState } from "../../service/changeStorage";
import { getLocalStorageHistory } from "../../service/changeStorage";

import { v4 as uuidv4 } from "uuid";

import "./calendar.css";

const Calendar = ({ habit, style }) => {
  const dayItem = [];

  if (getLocalStorageHistory("t", habit)) {
    for (let i = 0; i < 30; i++) {
      dayItem.push(
        <CalendarDayItem
          key={uuidv4()}
          num={i + 1}
          time={
            getLocalStorageHistory("t", habit)
              ? getLocalStorageHistory("t", habit)[i]
              : 0
          }
        />
      );
    }
  }

  return (
    <section className="calendar-section" style={style}>
      <h1 className="calendar_title">{habit} progress:</h1>
      <div className="message">
        {getLocalStorageHistory("t", habit)
          ? getLocalStorageHistory("t", habit).length < 30
            ? getLocalStorageState("t", habit)
              ? `Keep going! ${
                  30 - getLocalStorageHistory("t", habit).length
                } days left!`
              : "Repeat today"
            : `You did it! Congrats! ${getLocalStorageHistory("t", habit)}`
          : "Just start!"}
      </div>
      <div className="calendar_container">{dayItem}</div>
    </section>
  );
};

export default Calendar;
