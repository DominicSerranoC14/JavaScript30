'use strict';

const buttonList = document.querySelectorAll('.key');
let recordedKeyList = [];
let currentEl;
let recordMode = false;

const recordModeToggle = () => recordMode = !recordMode;

const availableKeyList = () => {
  let keyList = [];
  buttonList.forEach(each => keyList.push(each.dataset.key));
  return keyList;
};

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

const startRecording = (evt) => {
  recordedKeyList.push(evt);
};

const playBackRecordedList = () => {
  let counter = 0;
  recordedKeyList.forEach(each => {
      // Increment the timeout for each note
      counter += 250;
      setTimeout(() => {
        playNote(each);
        addPlayingClass(each);
      }, counter);
  });
};

// Recored button creation
const createRecordButton = () => {
  const recordBtn = document.createElement('button');
  recordBtn.innerText = 'Record';
  document.body.children[0].append(recordBtn);
  recordBtn.addEventListener('click', () => {
    recordedKeyList = [];
    recordModeToggle()
    document.body.children[0].removeChild(recordBtn);
    createPlayButton();
  });
};
createRecordButton();

const createPlayButton = () => {
  const playBtn = document.createElement('button');
  playBtn.innerText = 'Play';
  document.body.children[0].append(playBtn);
  playBtn.addEventListener('click', (e) =>  {
    playBackRecordedList();
    recordModeToggle();
    document.body.children[0].removeChild(playBtn);
    createRecordButton();
  });
};


document.addEventListener('keydown', evt => {
  // Determine if the key that is pressed is a available key
  if (!availableKeyList().includes(evt.key)) {
    return;
  };

  if (!recordMode) {
    playNote(evt.key);
    addPlayingClass(evt.key);
  } else {
    startRecording(evt.key);
    playNote(evt.key);
    addPlayingClass(evt.key);
  };
});

// Add an event listener to each div for the end of the css transfromation
buttonList.forEach(each => each.addEventListener('transitionend', resetClassName));
