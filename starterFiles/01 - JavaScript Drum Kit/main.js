'use strict';

const buttonList = document.querySelectorAll('.key');
let currentEl;

const playNote = key => {
  let audio = document.querySelector(`audio[data-key=${key}]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
};

// function resetClassName(e) {
const resetClassName = (evt) => {
  if (evt.propertyName !== 'transform') return;
  evt.path[0].classList.remove('playing');
};

const addPlayingClass = key => {
  currentEl = document.querySelector(`div[data-key=${key}]`);
  currentEl.classList.add('playing');
};

document.addEventListener('keydown', evt => {
  playNote(evt.key);
  addPlayingClass(evt.key);
});

// Add an event listener to each div for the end of the css transfromation
buttonList.forEach(each => each.addEventListener('transitionend', resetClassName));
