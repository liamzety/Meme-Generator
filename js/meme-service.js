'use strict';

let gMeme = {
  selectedImgId: 1,
  selectedLineIdx: 0,
  lines: [
    {
      txt: 'Puki Mafioso',
      size: 55,
      align: 'left',
      color: 'red',
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
      //make the loop to select the first txt after reaching the end of txts
      gMeme.selectedLineIdx = 0;
    } else {
      gMeme.selectedLineIdx++;
    }
  } else if (gMeme.selectedLineIdx !== 0) {
    gMeme.selectedLineIdx--;
  }
  console.log('', gMeme.selectedLineIdx);
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
// TODO: figure this shit out
function resetTxt() {
  gMeme = {
    selectedImgId: gMeme.selectedImgId,
    selectedLineIdx: 0,
    lines: [
      {
        txt: 'reset',
        size: 55,
        align: 'left',
        color: 'red',
        y: 0,
        x: 0,
        selected: true,
      },
    ],
  };
  console.log('', gMeme);
}

function addLine() {
  gMeme.lines.push({
    txt: 'The struggle is real..',
    size: 55,
    align: 'left',
    color: 'red',
    x: EL_CANVAS.width,
    y: EL_CANVAS.height - EL_CANVAS.height + gTxtFontSize,
    selected: false,
  });
}

function deleteLine() {
  //if (gMeme.selectedLineIdx === 0) return;
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
