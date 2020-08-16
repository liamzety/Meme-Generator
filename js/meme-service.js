'use strict';

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Click to move me',
      size: 55,
      color: '#ffff',
      font: 'Impact',
      borderColor: 'black',
      y: 0,
      x: 0,
      selected: true,
    },
  ],
};

function updateSelectedMeme(imgId) {
  let foundImg = findImg(imgId);

  gMeme.selectedImgId = foundImg.id;
}
function changeMemeTxt(val) {
  gMeme.lines[gMeme.selectedLineIdx].txt = val;
}
function switchLine(isDeleted = false) {
  if (gMeme.selectedLineIdx === 0 || !isDeleted) {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
      //makes the loop to select the first txt after reaching the end of txts
      gMeme.selectedLineIdx = 0;
    } else {
      gMeme.selectedLineIdx++;
    }
  } else if (gMeme.selectedLineIdx !== 0) {
    gMeme.selectedLineIdx--;
  }

  gMeme.lines.forEach((meme, idx) => {
    if (idx === gMeme.selectedLineIdx) {
      meme.selected = true;
    } else {
      meme.selected = false;
    }
  });
}

function changeFontSize(fontSize) {
  gMeme.lines[gMeme.selectedLineIdx].size = fontSize;
}

function addLine() {
  gMeme.lines.push({
    txt: 'The struggle is real..',
    size: 55,
    color: '#ffff',
    font: 'Impact',
    borderColor: 'black',
    x: EL_CANVAS.width,
    y: EL_CANVAS.height - EL_CANVAS.height + gTxtFontSize,
    selected: false,
  });
}

function deleteLine() {
  gMeme.lines = gMeme.lines.filter((meme) => {
    return !meme.selected;
  });
}
function changeTxtColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].color = color;
}
function changeBorderColor(color) {
  gMeme.lines[gMeme.selectedLineIdx].borderColor = color;
}
function changeFont(selectedFont) {
  gMeme.lines[gMeme.selectedLineIdx].font = selectedFont;
}
function findImg(imgId) {
  let foundImg = gImgs.find((img) => {
    return imgId === img.id;
  });

  return foundImg;
}
function getgMeme() {
  return gMeme;
}

function saveMeme() {
  let imgContent = EL_CANVAS.toDataURL('image/png');
  gSavedImgs.push(imgContent);
  saveToStorage('memes', gSavedImgs);
}
