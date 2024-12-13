// Select the container for the calendar
let monthsWrapper = document.querySelector(".months-wrapper");
let yearTxt = document.querySelector(".current-year");

// Define the year for the calendar
const displayYear = 2025;

// Define months and days
const months = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
                "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"];

const days = ["Su", "M", "T", "W", "Th", "F", "Sa"];

// Function to generate the calendar
function generateCalendar() {
  // Set the year text
  yearTxt.textContent = displayYear;

  // Clear the months wrapper (in case of multiple renders)
  monthsWrapper.innerHTML = "";

  // Loop through each month to generate the calendar
  months.forEach((month, monthIndex) => {
    // Create the container for each month
    const monthWrap = document.createElement("div");
    monthWrap.className = "month-wrapper";

    // Add the header for the month
    monthWrap.innerHTML = `
      <div class="month-header">
        <h3 class="month">${month}</h3>
      </div>
      <ul class="weeks"></ul>
      <ul class="days"></ul>
    `;

    // Add week days (Sun, Mon, ...) to the weeks section
    const weeksWrapper = monthWrap.querySelector(".weeks");
    weeksWrapper.innerHTML = days.map((day) => `<li>${day}</li>`).join("");

    // Generate the dates for the current month
    const daysWrapper = monthWrap.querySelector(".days");
    generateDates(daysWrapper, monthIndex);

    // Add the month container to the calendar
    monthsWrapper.appendChild(monthWrap);
  });
}

// Define holiday data
const holidays = [
  { date: "2025-01-01", name: "New Year's Day", url: "holidays/new-years-day.html" },
  { date: "2025-01-29", name: "Lunar New Year's Day", url: "holidays/lunar-year-day.html" },
  { date: "2025-02-25", name: "People Power Anniversary", url: "holidays/people-power.html" },
  { date: "2025-03-31", name: "Eid al-Fitr", url: "holidays/eid-al-fitr.html" },
  { date: "2025-04-09", name: "Araw ng Kagitingan", url: "holidays/day-of-valor.html" },
  { date: "2025-04-17", name: "Maundy Thursday", url: "holidays/maundy-thu.html" },
  { date: "2025-04-18", name: "Good Friday", url: "holidays/good-friday.html" },
  { date: "2025-04-19", name: "Black Saturday", url: "holidays/black-sat.html" },
  { date: "2025-05-01", name: "Labor Day", url: "holidays/labor-day.html" },
  { date: "2025-06-07", name: "Eid al-Adha", url: "holidays/eid-al-adha.html" },
  { date: "2025-06-12", name: "Independence Day", url: "holidays/independence-day.html" },
  { date: "2025-08-21", name: "Ninoy Aquino Day", url: "holidays/ninoy-aquino-day.html" },
  { date: "2025-08-25", name: "National Heroes Day", url: "holidays/heroes-day.html" },
  { date: "2025-11-01", name: "All Saints' Day", url: "holidays/all-saints-day.html" },
  { date: "2025-11-02", name: "All Souls' Day", url: "holidays/all-souls-day.html" },
  { date: "2025-11-30", name: "Bonifacio Day", url: "holidays/bonifacio-day.html" },
  { date: "2025-12-08", name: "Immaculate Conception", url: "holidays/immaculate-day.html" },
  { date: "2025-12-24", name: "Christmas Eve", url: "holidays/xmas-eve.html" },
  { date: "2025-12-25", name: "Christmas Day", url: "holidays/xmas-day.html" },
  { date: "2025-12-30", name: "Rizal Day", url: "holidays/rizal-day.html" },
  { date: "2025-12-31", name: "New Year's Eve", url: "holidays/new-years-eve.html" },
];

// Function to generate dates for a specific month
function generateDates(daysWrapper, monthIndex) {
  const lastDateOfMonth = new Date(displayYear, monthIndex + 1, 0).getDate();
  const firstDayOfMonth = new Date(displayYear, monthIndex, 1).getDay();
  const lastDayOfMonth = new Date(displayYear, monthIndex, lastDateOfMonth).getDay();
  const lastDateOfPrevMonth = new Date(displayYear, monthIndex, 0).getDate();

  let liTag = "";

  // Add inactive days from the previous month
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    liTag += `<li class="inactive">${lastDateOfPrevMonth - i}</li>`;
  }

  // Add the actual dates of the current month
  for (let i = 1; i <= lastDateOfMonth; i++) {
    const currentDate = `${displayYear}-${String(monthIndex + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
    const holiday = holidays.find(h => h.date === currentDate);

    if (holiday) {
      // Highlight holidays and make them clickable
      liTag += `
        <li class="holiday" title="${holiday.name}">
          <a href="${holiday.url}" target="_blank">${i}</a>
        </li>`;
    } else {
      liTag += `<li>${i}</li>`;
    }
  }

  // Add inactive days for the next month
  for (let i = 1; i <= (6 - lastDayOfMonth); i++) {
    liTag += `<li class="inactive">${i}</li>`;
  }

  daysWrapper.innerHTML = liTag;
}

// Generate the calendar
generateCalendar();
