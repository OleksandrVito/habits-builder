import { useEffect } from "react";
import "./add-habit-form.css";

const AddHabitForm = ({ styleAddHabitForm, changeStyle, changeHabitList }) => {
  useEffect(() => {
    setTimeout(() => {
      document.getElementById("add_habit_form_input").focus();
    }, 500);
  }, [styleAddHabitForm]);

  const clearInput = () => {
    setTimeout(() => {
      document.getElementById("add_habit_form_input").value = "";
    }, 500);
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      changeStyle(0, "hidden");
      changeHabitList(document.getElementById("add_habit_form_input").value);
      clearInput();
    }
  };

  return (
    <div
      className="backgroud"
      style={{
        opacity: `${styleAddHabitForm.opacity}`,
        visibility: `${styleAddHabitForm.visibility}`,
        height: `${styleAddHabitForm.height}`,
      }}
      onClick={(e) => {
        if (e.target.classList.contains("backgroud")) {
          changeStyle(0, "hidden");
          clearInput();
        }
      }}
    >
      <div
        className="add_habit_form"
        style={{
          opacity: `${styleAddHabitForm.opacity}`,
          visibility: `${styleAddHabitForm.visibility}`,
        }}
      >
        <input
          id="add_habit_form_input"
          type="text"
          maxLength={25}
          placeholder="Add name to your habit"
          onKeyDown={onEnterPress}
        />
        <span
          className="material-symbols-outlined"
          onClick={() => {
            changeStyle(0, "hidden");
            changeHabitList(
              document.getElementById("add_habit_form_input").value
            );
            clearInput();
          }}
        >
          done
        </span>
      </div>
    </div>
  );
};

export default AddHabitForm;
