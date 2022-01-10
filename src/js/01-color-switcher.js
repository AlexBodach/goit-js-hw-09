const refs = {
    buttonStart: document.querySelector('.buttonStart'),
    buttonStop: document.querySelector('.buttonStop'),
    body: document.querySelector('body')
}

let timerId = null;

refs.buttonStart.setAttribute('disabled', false);
refs.buttonStart.disabled = false;

refs.buttonStop.setAttribute('disabled', true);
refs.buttonStop.disabled = true;


function getRandomHexColorForBody() {
    refs.body.style.backgroundColor = 
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;     
};  

function onButtonStartClick() {
    timerId = setInterval(getRandomHexColorForBody, 1000);
    refs.buttonStart.disabled = true;
    refs.buttonStop.disabled = false;
}

function onButtonStopClick() {
    clearInterval(timerId);
    refs.buttonStart.disabled = false;
    refs.buttonStop.disabled = true;
}

refs.buttonStart.addEventListener('click', onButtonStartClick);

refs.buttonStop.addEventListener('click', onButtonStopClick);
