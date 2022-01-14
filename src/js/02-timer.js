import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    input: document.querySelector('#datetime-picker'),
    button: document.querySelector('button'),
    days: document.querySelector('span[data-days]'),
    hours: document.querySelector('span[data-hours]'),
    minuts: document.querySelector('span[data-minutes]'),
    seconds: document.querySelector('span[data-seconds]'),
};

let selectedDataCalendar;
let currentData;
let timer;

refs.button.setAttribute('disabled', false)


flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,    
    onClose(selectedDates) {
      selectedDataCalendar = selectedDates[0].getTime();  
      currentData = this.config.defaultDate.getTime();
      if (currentData > selectedDataCalendar) {
      Notify.failure('Please choose a date in the future');
      return;
    } 
    refs.button.removeAttribute('disabled');
  },
  })

refs.button.addEventListener('click', onButtonStartClick)


function onButtonStartClick () {  
  refs.button.setAttribute('disabled', false);
  refs.input.setAttribute('disabled', false)
  const timerId = setInterval(function() {
    currentData = new Date().getTime()
    const timeForTimer = selectedDataCalendar - currentData;
  
    convertMs(timeForTimer); 
    updateTimerOnPage ();
   
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  timer = {
    days, hours, minutes, seconds
  }

  return timer;
}

function updateTimerOnPage () {
  refs.days.textContent = timer.days;
  refs.hours.textContent = timeFormatTrue(timer.hours);
  refs.minuts.textContent = timeFormatTrue(timer.minutes);
  refs.seconds.textContent = timeFormatTrue(timer.seconds);
}
  

function timeFormatTrue(value) {
  return String(value).padStart(2, '0');
}


