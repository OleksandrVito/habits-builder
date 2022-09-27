import HabitItem from "../habit-item/Habit-item";
import AddHabitForm from "../add-habit-form/Add-habit-form";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./habits-list.css";

const HabitsList = ({ changeCurrentHabit }) => {
  const [habitList, setHabitList] = useState(
    localStorage.getItem("habitList")
      ? localStorage.getItem("habitList").split(",")
      : []
  );

  const [styleAddHabitForm, setStyleAddHabitForm] = useState({
    opacity: 0,
    visibility: "hidden",
    height: `100px`,
  });

  const onDelete = (element) => {
    let num = habitList.indexOf(element);
    let list = [...habitList];
    list.splice(num, 1);
    setHabitList(list);
    localStorage.setItem("habitList", list);
  };

  const changeStyle = (num, property, k = 1) => {
    setStyleAddHabitForm({
      opacity: num,
      visibility: property,
      height: `${
        document.querySelector(".habits_list_block").scrollHeight / k
      }px`,
    });
  };

  const elements = habitList.map((element) => {
    return (
      <HabitItem
        key={uuidv4()}
        habit={element}
        onDelete={() => onDelete(element)}
        changeCurrentHabit={changeCurrentHabit}
        changeStyle={changeStyle}
      />
    );
  });

  const changeHabitList = (habitName) => {
    let list = [...habitList];
    if (habitName) {
      list.push(habitName);
      setHabitList(list);
      localStorage.setItem("habitList", list);
    }
  };

  return (
    <div className="habits_list_container">
      <h3 className="habits_list_title">Your habits list</h3>
      <div className="habits_list_block">
        {elements.length > 0 ? elements : <HabitItem habit={null} />}
        <button
          className="add_habit"
          onClick={() => {
            changeStyle(100, "visible");
          }}
        >
          +
        </button>
        <AddHabitForm
          styleAddHabitForm={styleAddHabitForm}
          changeStyle={changeStyle}
          changeHabitList={changeHabitList}
        />
      </div>
    </div>
  );
};

export default HabitsList;