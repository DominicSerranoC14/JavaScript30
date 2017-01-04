'use strict';

const buttonList = document.querySelectorAll('.key');
let recordedKeyList = [];
let currentEl;
let recordBtnTimestamp;
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

const startRecording = (keyObj) => {
  recordedKeyList.push(keyObj);
};

const playBackRecordedList = () => {
  let counter = 0;
  recordedKeyList.forEach(each => {
      // Increment the timeout for each note
      counter = each.time - recordBtnTimestamp;
      setTimeout(() => {
        playNote(each.key);
        addPlayingClass(each.key);
      }, counter);
  });
};

// Recored button creation
const createRecordButton = () => {
  const recordBtn = document.createElement('button');
  recordBtn.innerText = 'Record';
  document.body.children[0].append(recordBtn);
  recordBtn.addEventListener('click', (evt) => {
    recordBtnTimestamp = evt.timeStamp;
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
  console.dir(evt.timeStamp);
  // Determine if the key that is pressed is a available key
  if (!availableKeyList().includes(evt.key)) {
    return;
  };
  let keyObj = {
    key: evt.key,
    time: evt.timeStamp
  };
  if (!recordMode) {
    playNote(keyObj.key);
    addPlayingClass(keyObj.key);
  } else {
    startRecording(keyObj);
    playNote(keyObj.key);
    addPlayingClass(keyObj.key);
  };
});

// Add an event listener to each div for the end of the css transfromation
buttonList.forEach(each => each.addEventListener('transitionend', resetClassName));
