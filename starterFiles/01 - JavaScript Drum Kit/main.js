'use strict';

const buttonList = document.querySelectorAll('.key');
let currentKey;

const playNote = key => document.querySelector(`audio[data-key=${key}]`).play();
const resetClassName = nodeList => nodeList.forEach(each => each.className = "key");

const addPlayingClass = el => {
  resetClassName(buttonList);
  el.className += " playing ";

  setTimeout(() => {
    resetClassName(buttonList);
  }, 200)
};

document.addEventListener('keydown', evt => {
  buttonList.forEach(each => {
    (each.dataset.key === evt.key) ? playNote(evt.key): false;
    (each.dataset.key === evt.key) ? addPlayingClass(each): false;
  });
});
