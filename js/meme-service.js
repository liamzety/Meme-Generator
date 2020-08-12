'use strict';
const gKeywords = { happy: 12, 'funny puk': 1 };

const gImgs = [];

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'I never eat Falafel',
      size: 55,
      align: 'left',
      color: 'red',
      y: 0,
      x: 0,
      selected: true,
    },
  ],
};

function createGalleryImgs() {
  for (let i = 0; i < 18; i++) {
    gImgs.push({
      id: i,
      url: `imgs/${i + 1}.jpg`,
      keywords: ['happy'],
    });
  }
}

function updateSelectedMeme(imgId) {
  let foundImg = findImg(imgId);

  gMeme.selectedImgId = foundImg.id;
  console.log('', gMeme);
}
function changeMemeTxt(val) {
  gMeme.lines[gMeme.selectedLineIdx].txt = val;
}
function switchLine(isDeleted = false) {
  if (gMeme.selectedLineIdx === 0 || !isDeleted) {
    if (gMeme.selectedLineIdx >= gMeme.lines.length - 1) {
      //make the loop to select the first txt after reaching the end of txts
      gMeme.selectedLineIdx = 0;
    } else {
      gMeme.selectedLineIdx++;
    }
  } else {
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
    txt: 'I never eat Falafel',
    size: 55,
    align: 'left',
    color: 'red',
    x: EL_CANVAS.width,
    y: EL_CANVAS.height - EL_CANVAS.height + gTxtFontSize,
    selected: false,
  });
}

function deleteLine() {
  if (gMeme.selectedLineIdx === 0) return;
  gMeme.lines = gMeme.lines.filter((meme) => {
    return !meme.selected;
  });
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
