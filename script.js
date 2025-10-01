// Récupération des éléments HTML5
const daysTag = document.querySelector(".days");
const currentDate = document.querySelector(".current__date");
const prevNextIcon = document.querySelectorAll(".icons span");

// getting new date, current year and month
let date = new Date();
let currYear = date.getFullYear();
let currMonth = date.getMonth();

// storing full name of all months in array
const months = [
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

// renderCalendar function declaration
const renderCalendar = () => {
  // getting first day of month position
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
  console.log(`firstDayofMonth : ${firstDayofMonth}`);
  // getting last date of month
  let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
  console.log(`lastDateofMonth : ${lastDateofMonth}`);
  // getting last day of month position
  let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
  console.log(`lastDayofMonth : ${lastDayofMonth}`);
  // getting last date of previous month
  let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
  console.log(`lastDateofLastMonth : ${lastDateofLastMonth}`);
  let liTag = "";

  // for loop
  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }

  // for loop
  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }

  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};
// calling renderCalendar function
renderCalendar();

// getting prev and next icons
prevNextIcon.forEach((icon) => {
  // adding click event on both icons
  icon.addEventListener("click", () => {
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

    // if current month is less than 0 or greater than 11
    if (currMonth < 0 || currMonth > 11) {
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
  });
});
