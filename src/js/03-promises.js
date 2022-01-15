import { Notify } from 'notiflix/build/notiflix-notify-aio';

let position = null;
let step = null;
let amount = null;
let textForPromise = null;    

const refs = {
  form: document.querySelector('.form'),
  position: document.querySelector('input[name=delay]'),
  step: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
}


refs.form.addEventListener('submit', onButtonClick);

function onButtonClick(e) {
  e.preventDefault();

  position = Number(refs.position.value);
  step = Number(refs.step.value);
  amount = Number(refs.amount.value);  
  
  for(let i = 1; i <= amount; i += 1 ) { 
       textForPromise = position + (step * (i - 1));

    createPromise({ i, textForPromise, step })
    .then(({ i, textForPromise }) => {
      Notify.success(`✅ Fulfilled promise ${i} in ${textForPromise} ms`);
    })
    .catch(({ i, textForPromise }) => {
      Notify.failure(`❌ Rejected promise ${i} in ${textForPromise} ms`);
    });
  }   
}

function createPromise(position, amount) {
  return new Promise((resolve, reject) => {
   setTimeout(() =>{      
    const shouldResolve = Math.random() > 0.3;
    
    if (shouldResolve) {
      resolve(position, amount);
    } else {
      reject(position, amount);
      }    
   }, time (position))
  }) 
}
  
const time = (position) => position.textForPromise;
