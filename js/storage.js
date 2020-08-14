'use strict';

let gSavedImgs = []; // on page init this variable gets the meme arr

function checkIfStorage() {
  let memes = loadFromStorage('memes');

  if (memes === null || memes.length === 0) return false;
  else return true;
}

function saveToStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val));
}

function loadFromStorage(key) {
  var val = localStorage.getItem(key);
  return JSON.parse(val);
}
