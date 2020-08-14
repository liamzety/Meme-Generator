'use strict';
let EL_CANVAS;
let CTX;
let gTxtPosX;
let gTxtPosY;
let gTxtFontSize;
document.querySelector('.font-sizer').value = 55;

function init() {
  if (checkIfStorage()) {
    gSavedImgs = loadFromStorage('memes');
  }
  renderTags();
  createGalleryImgs();
  renderGallery();
  EL_CANVAS = document.querySelector('.meme-canvas');
  CTX = EL_CANVAS.getContext('2d');

  gTxtFontSize = gMeme.lines[0].size;
  gMeme.lines[gMeme.selectedLineIdx].x = EL_CANVAS.width;
  gMeme.lines[gMeme.selectedLineIdx].y =
    EL_CANVAS.height - EL_CANVAS.height + gTxtFontSize;
}

function renderEditor(imgId) {
  updateSelectedMeme(imgId);

  backToEditor();
  renderMemeCanvas();
}

function onChangeMemeTxt(elTxtInput) {
  let meme = getgMeme();
  if (meme.lines.length === 0) return;
  changeMemeTxt(elTxtInput.value);
  renderMemeCanvas();
}
function onChangeMemeFont(elFontInput) {
  changeFontSize(elFontInput.value);
  renderMemeCanvas();
}
function onSwitchLine() {
  switchLine();
  let meme = getgMeme();
  //changes value of current text input
  document.querySelector('.meme-text').value =
    meme.lines[meme.selectedLineIdx].txt;
  //changes value of current font sizer input
  document.querySelector('.font-sizer').value =
    meme.lines[meme.selectedLineIdx].size;

  renderMemeCanvas();
}
function onAddLine() {
  addLine();
  onSwitchLine();

  let meme = getgMeme();
  if (meme.lines.length === 2) {
    meme.lines[meme.lines.length - 1].y = EL_CANVAS.height - 10;
  } else if (meme.lines.length > 2) {
    meme.lines[meme.lines.length - 1].y = EL_CANVAS.height / 2;
  }

  renderMemeCanvas();
}
function onDeleteLine() {
  const isDeleted = true;
  deleteLine();
  switchLine(isDeleted);
  let meme = getgMeme();
  if (meme.selectedLineIdx !== 0) {
    //changes value of current text input
    document.querySelector('.meme-text').value =
      meme.lines[meme.selectedLineIdx].txt;
    //changes value of current font sizer input
    document.querySelector('.font-sizer').value =
      meme.lines[meme.selectedLineIdx].size;
  }
  renderMemeCanvas();
}

function onChangeColor() {
  let color = document.querySelector('#palette-txt').value;

  changeTxtColor(color);

  renderMemeCanvas();
}
function onChangeBorderColor() {
  let color = document.querySelector('#palette-border').value;

  changeBorderColor(color);

  renderMemeCanvas();
}
function onChangeFontFam(selectedFont) {
  changeFont(selectedFont);

  renderMemeCanvas();
}
function onSaveMeme() {
  saveMeme();
}
function onDownload() {
  let elLink = document.getElementById('link');
  let isDownloaded = true;
  renderMemeCanvas(isDownloaded);

  let imgContent = EL_CANVAS.toDataURL('image/png');
  elLink.href = imgContent;
}

function onMoveTxt(ev) {
  let meme = getgMeme();
  console.log('', ev);
  switch (ev.key) {
    case 'ArrowRight':
      ev.preventDefault();
      meme.lines[meme.selectedLineIdx].x += 25;
      renderMemeCanvas();
      break;
    case 'ArrowLeft':
      ev.preventDefault();
      meme.lines[meme.selectedLineIdx].x -= 25;
      renderMemeCanvas();
      break;
    case 'ArrowUp':
      ev.preventDefault();
      meme.lines[meme.selectedLineIdx].y -= 25;
      renderMemeCanvas();
      break;
    case 'ArrowDown':
      ev.preventDefault();
      meme.lines[meme.selectedLineIdx].y += 25;
      renderMemeCanvas();
      break;
  }
  //boolean to check if a click was made on canvas + it was done on desktop and not mobile
  //(since mobile is not working as intended)
  if (
    ev.target.className === 'meme-canvas' &&
    ev.type === 'mousedown' &&
    ev.sourceCapabilities.firesTouchEvents !== true
  ) {
    meme.lines[meme.selectedLineIdx].x =
      ev.layerX + ev.pageX - EL_CANVAS.width / 2;

    meme.lines[meme.selectedLineIdx].y =
      ev.layerY + ev.target.offsetTop / EL_CANVAS.height;

    renderMemeCanvas();
  }

  if (ev.type === 'mousedown') {
    switch (ev.target.className) {
      case 'controls-arrow-up controls-btn':
      case 'fas fa-arrow-up':
        meme.lines[meme.selectedLineIdx].y -= 25;
        renderMemeCanvas();

        break;

      case 'controls-arrow-left controls-btn':
      case 'fas fa-arrow-left':
        meme.lines[meme.selectedLineIdx].x -= 25;
        renderMemeCanvas();
        break;

      case 'controls-arrow-down controls-btn':
      case 'fas fa-arrow-down':
        meme.lines[meme.selectedLineIdx].y += 25;
        renderMemeCanvas();
        break;

      case 'controls-arrow-right controls-btn':
      case 'fas fa-arrow-right':
        meme.lines[meme.selectedLineIdx].x += 25;
        renderMemeCanvas();
        break;
    }
  }
}

function renderMemeCanvas(isSaved = false) {
  let meme = getgMeme();
  let currentMemeId = meme.selectedImgId;

  let foundImg = findImg(currentMemeId);
  let img = new Image();
  img.src = foundImg.url;

  CTX.clearRect(0, 0, EL_CANVAS.width, EL_CANVAS.height);
  CTX.drawImage(img, 0, 0);

  for (let i = 0; i < meme.lines.length; i++) {
    gTxtFontSize = +meme.lines[i].size;

    CTX.font = `${gTxtFontSize}px ${meme.lines[i].font} , heb `;
    CTX.fillStyle = meme.lines[i].color;

    CTX.strokeStyle = meme.lines[i].borderColor;
    if (meme.lines[i].selected && !isSaved) {
      CTX.font = `italic ${gTxtFontSize}px ${meme.lines[i].font} , heb `;
    }

    CTX.textAlign = 'center';
    CTX.lineWidth = gTxtFontSize / gTxtFontSize + 0.5;

    CTX.fillText(
      meme.lines[i].txt,
      meme.lines[i].x / 2,
      meme.lines[i].y,
      meme.lines[i].x
    );
    CTX.strokeText(
      meme.lines[i].txt,
      meme.lines[i].x / 2,
      meme.lines[i].y,
      meme.lines[i].x
    );
  }
}

function onOpenSaveModal() {
  console.log('modal');
  onSaveMeme();
  document.querySelector('.save-modal').classList.remove('hidden');
}

function onCloseSaveModal() {
  document.querySelector('.save-modal').classList.add('hidden');
}
function closeAllModals(ev) {
  // closes modals on body click whose target is not the element (currently only 1 boolean cuz only 1 modal.)
  if (ev.target.className !== 'save-modal') {
    document.querySelector('.save-modal').classList.add('hidden');
  }
}
