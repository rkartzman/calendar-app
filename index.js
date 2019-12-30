import {totalDaysInMonth} from './src/util/dates';
import Calendar from './src/components/calendar';


class App {
  constructor() {
    // imports here 
    let calendar = new Calendar();
    let prev = document.querySelector('.prev').addEventListener('click', function (e) {
      e.preventDefault();
      calendar.previous();
    })

    let next = document.querySelector('.next').addEventListener('click', function (e) {
      e.preventDefault();
      calendar.nextMonth();
    })
    
  }
}

const app = new App();