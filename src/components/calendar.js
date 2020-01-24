import { totalDaysInMonth } from '../util/dates';

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class CalendarState {
  stateListener;
  daysGrid;
  month;
  year;
  constructor() {
    var today = new Date();
    
    this.year = today.getFullYear();
    this.month = today.getMonth();
    this.updateDaysGrid();
    // this.nextMonth = this.nextMonth.bind(this);
    var that = this;
    let next = document.querySelector('.next').addEventListener('click', function (e) {
      e.preventDefault();
      that.nextMonth();
    })
  }
  setStateListener(callback) {
    // TODO
    
  }

  nextMonth() {
    this.year = (this.month === 11 ) ? this.year + 1: this.year;
    this.month = (this.month + 1) % 12;
    this.updateDaysGrid();
  }

  previousMonth() {

  }

  updateDaysGrid() {
    let date = 1;
    let firstDayOfMonth = (new Date(this.year, this.month)).getDay();
    const days = this.daysGrid = [];  // alias as "days" 
    for(var iRow = 0; iRow < 6; iRow++) {
      const row = [];
      days[iRow] = row;
      // [
      //   [null, null, null, { day: 1, weekend: false}, {}],
      //   [null, null, null, { day: 1, weekend: false}, {}]
      // ]

      for(let iCol = 0; iCol < 7; iCol++) {
        if(iRow === 0 && iCol < firstDayOfMonth) { // empty cell
          // empty cell (in front)
          days[iRow][iCol] = null;

        } 
        else if (date > totalDaysInMonth(this.month, this.year)) {
          // empty cell (at the back)
          days[iRow][iCol] = null;
        }
        else { // create cells for each day of month
          days[iRow][iCol] = {
            day: date, 
            weekend: iCol === 0 || iCol === 6 
          };
          ++date;
        }
      }
    }
  }
}

class Calendar {
  constructor() {
    this.state = new CalendarState();
    console.log(this.state)
    this.monthIndicator = document.querySelector('.month-indicator');
    this.cal = document.getElementById("date-grid");
    this.buildMonth();
  }
  initEvents() {
    
  }
  // nextMonth() {
  //   currentYear = (currentMonth === 11) ? currentYear + 1 : currentYear;
  //   currentMonth = (currentMonth + 1) % 12;
    
  //   this.buildMonth(currentMonth, currentYear);
  // }

  // previous() {
  //   currentYear = (currentMonth === 0) ? currentYear - 1 : currentYear;
  //   currentMonth = (currentMonth === 0) ? 11 : currentMonth - 1;
  //   this.buildMonth(currentMonth, currentYear);
  // }
  clearMonth(month, year) {
    this.cal.innerHTML = '';
    this.monthIndicator.innerHTML = months[month] + " " + year;
  }
  buildMonth() {
    const {
      state: {
        daysGrid: days,
        month,
        year
      }
    } = this;
    this.clearMonth(month, year)    

    for (let iRow = 0; iRow < days.length; iRow++) {
      for(let iCol = 0; iCol < days[iRow].length; iCol++ ) {
        const day = days[iRow][iCol];
        if(day) {
          let cell = document.createElement('button');
          cell.textContent = `${day.day}`;
          if (day.weekend) {
            cell.classList.add('red');
          }
          this.cal.appendChild(cell);
        } else {
          let cell = document.createElement('button');
          cell.textContent = '';
          this.cal.appendChild(cell);
        }
      }
    }


  }
}

export default Calendar;



    // let date = 1;
    // let firstDayOfMonth = (new Date(year, month)).getDay();
    // this.clearMonth(month,year);

    // for (var row = 0; row < 6; row++) {
    //   let rowDiv = document.createElement('div');
    //   for (var col = 0; col < 7; col++) {
    //     if (row === 0 && col < firstDayOfMonth) { // we create empty cells if we haven't gotten to first day of the month yet
    //       let cell = document.createElement('button');
    //       let cellContent = document.createTextNode(''); // cell.textContent = '
    //       cell.appendChild(cellContent);
    //       this.cal.appendChild(cell);
    //     }
    //     else if (date > totalDaysInMonth(month, year)) {
    //       break;
    //     }
    //     else {
    //       let cell = document.createElement('button');
    //       let cellContent = document.createTextNode(date);
    //       cell.appendChild(cellContent);
    //       if (col === 0 || col === 6) {
    //         cell.classList.add('red');
    //       }
    //       this.cal.appendChild(cell)
    //       date++
    //     }
    //   }
    // }