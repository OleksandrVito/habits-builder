export const setLocalStorageState = (property, value, currentHabit) => {
  const day = new Date().getDate();
  const copy = { ...JSON.parse(localStorage.getItem("state")) };
  copy[day][currentHabit][property] = value;
  const newState = { ...JSON.parse(localStorage.getItem("state")), ...copy };
  // console.log("this", newState);
  localStorage.setItem("state", JSON.stringify(newState));
};

export const getLocalStorageState = (property, currentHabit) => {
  const day = new Date().getDate();
  // console.log(currentHabit);
  // console.log(JSON.parse(localStorage.getItem("state"))[day][currentHabit]);
  if (localStorage.getItem("state")) {
    if (JSON.parse(localStorage.getItem("state"))[day]) {
      if (JSON.parse(localStorage.getItem("state"))[day][currentHabit]) {
        return JSON.parse(localStorage.getItem("state"))[day][currentHabit][
          property
        ];
      } else return 0;
    } else return 0;
  } else return 0;
};

export const getLocalStorageHistory = (property, currentHabit) => {
  const periodArray = [];
  if (localStorage.getItem("state")) {
    for (const key in JSON.parse(localStorage.getItem("state"))) {
      if (
        JSON.parse(localStorage.getItem("state"))[key] &&
        JSON.parse(localStorage.getItem("state"))[key][currentHabit] &&
        JSON.parse(localStorage.getItem("state"))[key][currentHabit][property]
      ) {
        periodArray.push(
          JSON.parse(localStorage.getItem("state"))[key][currentHabit][property]
        );
      }
    }
    const day = new Date().getDate();
    if (
      !JSON.parse(localStorage.getItem("state"))[day - 1] ||
      !JSON.parse(localStorage.getItem("state"))[day - 1][currentHabit] ||
      !JSON.parse(localStorage.getItem("state"))[day - 1][currentHabit][
        property
      ]
    ) {
      if (
        JSON.parse(localStorage.getItem("state"))[day] &&
        JSON.parse(localStorage.getItem("state"))[day][currentHabit] &&
        JSON.parse(localStorage.getItem("state"))[day][currentHabit][property]
      ) {
        return [
          JSON.parse(localStorage.getItem("state"))[day][currentHabit][
            property
          ],
        ];
      } else return null;
    }
    if (periodArray.length === 0) {
      return null;
    }
    return periodArray;
  } else return 0;
};
