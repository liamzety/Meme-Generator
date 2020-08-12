'use strict';
let EL_CANVAS;
let CTX;
let gTxtPosX;
let gTxtPosY;
let gTxtFontSize;
document.querySelector('.font-sizer').value = 55;

function init() {
  createGalleryImgs();
  renderGallery();
  EL_CANVAS = document.querySelector('.meme-canvas');
  CTX = EL_CANVAS.getContext('2d');

  gTxtFontSize = gMeme.lines[0].size;
  gMeme.lines[gMeme.selectedLineIdx].x = EL_CANVAS.width;
  gMeme.lines[gMeme.selectedLineIdx].y =
    EL_CANVAS.height - EL_CANVAS.height + gTxtFontSize;
}

function renderGallery() {
  const elGallery = document.querySelector('.meme-gallery');
  let strHTML = '';

  for (let i = 0; i < gImgs.length; i++) {
    strHTML += `
    <img onclick="renderEditor( ${gImgs[i].id})" src="${gImgs[i].url}" />
    `;
  }

  elGallery.innerHTML = strHTML;
}

function renderEditor(imgId) {
  updateSelectedMeme(imgId);
  let currentMeme = getgMeme();

  handleRenders();
  renderMemeCanvas(imgId, currentMeme);
}

function onChangeMemeTxt(elTxtInput) {
  changeMemeTxt(elTxtInput.value);

  let meme = getgMeme();
  let currentMemeId = meme.selectedImgId;

  renderMemeCanvas(currentMemeId, meme);
}
function onChangeMemeFont(elFontInput) {
  changeFontSize(elFontInput.value);

  let meme = getgMeme();
  let currentMemeId = meme.selectedImgId;

  renderMemeCanvas(currentMemeId, meme);
}
function onSwitchLine() {
  switchLine();
  let meme = getgMeme();
  let currentMemeId = meme.selectedImgId;

  //change value of current text input
  document.querySelector('.meme-text').value =
    meme.lines[meme.selectedLineIdx].txt;
  //change value of current font sizer input
  document.querySelector('.font-sizer').value =
    meme.lines[meme.selectedLineIdx].size;

  renderMemeCanvas(currentMemeId, meme);
}
function onAddLine() {
  addLine();
  onSwitchLine();
  let meme = getgMeme();
  let currentMemeId = meme.selectedImgId;
  console.log('', meme.lines.length - 1);
  if (meme.lines.length === 2) {
    meme.lines[meme.lines.length - 1].y = EL_CANVAS.height - 10;
  } else if (meme.lines.length > 2) {
    meme.lines[meme.lines.length - 1].y = EL_CANVAS.height / 2;
  }

  renderMemeCanvas(currentMemeId, meme);
}
function onDeleteLine() {
  const isDeleted = true;
  deleteLine();
  switchLine(isDeleted);
  let meme = getgMeme();
  let currentMemeId = meme.selectedImgId;

  //change value of current text input
  document.querySelector('.meme-text').value =
    meme.lines[meme.selectedLineIdx].txt;
  //change value of current font sizer input
  document.querySelector('.font-sizer').value =
    meme.lines[meme.selectedLineIdx].size;
  renderMemeCanvas(currentMemeId, meme);
}

function onSaveImg() {
  let isSaved = true;

  let meme = getgMeme();
  let currentMemeId = meme.selectedImgId;

  renderMemeCanvas(currentMemeId, meme, isSaved);

  var link = document.getElementById('link');
  link.setAttribute('download', 'do-u-even-lift.png');
  link.setAttribute(
    'href',
    EL_CANVAS.toDataURL('image/png').replace('image/png', 'image/octet-stream')
  );
  link.click();
}

function onMoveTxt(ev) {
  let meme = getgMeme();
  let currentMemeId = meme.selectedImgId;

  switch (ev.key) {
    case 'ArrowRight':
      ev.preventDefault();
      gMeme.lines[gMeme.selectedLineIdx].x += 10;

      renderMemeCanvas(currentMemeId, meme, false);
      break;
    case 'ArrowLeft':
      ev.preventDefault();
      gMeme.lines[gMeme.selectedLineIdx].x -= 10;

      renderMemeCanvas(currentMemeId, meme, false);
      break;
    case 'ArrowUp':
      ev.preventDefault();
      gMeme.lines[gMeme.selectedLineIdx].y -= 10;
      renderMemeCanvas(currentMemeId, meme, false);
      break;
    case 'ArrowDown':
      ev.preventDefault();
      gMeme.lines[gMeme.selectedLineIdx].y += 10;
      renderMemeCanvas(currentMemeId, meme, false);
      break;

    default:
      break;
  }
}

function renderMemeCanvas(imgId, meme, isSaved) {
  let foundImg = findImg(imgId);
  let img = new Image();
  img.src = foundImg.url;

  EL_CANVAS.width = img.width;
  EL_CANVAS.height = img.height;

  CTX.clearRect(0, 0, EL_CANVAS.width, EL_CANVAS.height);
  CTX.drawImage(img, 0, 0);

  for (let i = 0; i < meme.lines.length; i++) {
    let fontSize = +meme.lines[i].size;

    CTX.font = fontSize + 'px Impact , heb ';
    CTX.fillStyle = '#ffffff';
    if (meme.lines[i].selected && !isSaved) CTX.strokeStyle = 'red';
    else CTX.strokeStyle = 'black';
    CTX.textAlign = 'center';
    CTX.lineWidth = fontSize / fontSize + 0.5;

    CTX.fillText(
      meme.lines[i].txt,
      gMeme.lines[i].x / 2,
      gMeme.lines[i].y,
      gMeme.lines[i].x
    );
    CTX.strokeText(
      meme.lines[i].txt,
      gMeme.lines[i].x / 2,
      gMeme.lines[i].y,
      gMeme.lines[i].x
    );
  }
}

function handleRenders() {
  const elMemeContainer = document.querySelector('.meme-container');
  const elGallery = document.querySelector('.meme-gallery');
  const elGalleryNav = document.querySelector('.navbar');
  const elGalleryAuthor = document.querySelector('.author');

  elMemeContainer.classList.toggle('hidden');
  elGallery.classList.toggle('hidden');
  elGalleryNav.classList.toggle('hidden');
  elGalleryAuthor.classList.toggle('hidden');
}
