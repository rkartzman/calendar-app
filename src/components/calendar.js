import { totalDaysInMonth } from '../util/dates';
var today = new Date();
var currentMonth = today.getMonth();
var currentYear = today.getFullYear();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class Calendar {
  constructor() {
    this.monthIndicator = document.querySelector('.month-indicator');
    this.cal = document.getElementById("date-grid");
    this.buildMonth(currentMonth, currentYear);
  }
  initEvents() {
    
  }
  nextMonth() {
    currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
    currentMonth = (currentMonth + 1) % 12;
    
    this.buildMonth(currentMonth, currentYear);
  }

  previous() {
    currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
    currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
    this.buildMonth(currentMonth, currentYear);
  }
  clearMonth(month, year) {
    this.cal.innerHTML = '';
    this.monthIndicator.innerHTML = months[month] + " " + year;
  }
  buildMonth(month, year) {
    let date = 1;
    let firstDayOfMonth = (new Date(year, month)).getDay();
    this.clearMonth(month,year);

    for (var row = 0; row < 6; row++) {
      let rowDiv = document.createElement('div');
      for (var col = 0; col < 7; col++) {
        if (row === 0 && col < firstDayOfMonth) { // we create empty cells if we haven't gotten to first day of the month yet
          let cell = document.createElement('button');
          let cellContent = document.createTextNode('');
          cell.appendChild(cellContent);
          this.cal.appendChild(cell);
        }
        else if (date > totalDaysInMonth(month, year)) {
          break;
        }
        else {
          let cell = document.createElement('button');
          let cellContent = document.createTextNode(date);
          cell.appendChild(cellContent);
          if (col === 0 || col === 6) {
            cell.classList.add('red');
          }
          this.cal.appendChild(cell)
          date++
        }
      }
    }
  }
}

export default Calendar;