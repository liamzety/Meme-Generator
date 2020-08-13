'use strict';
let EL_CANVAS;
let CTX;
let gTxtPosX;
let gTxtPosY;
let gTxtFontSize;
document.querySelector('.font-sizer').value = 55;

function init() {
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

  if (gMeme.selectedLineIdx !== 0) {
    //change value of current text input
    document.querySelector('.meme-text').value =
      meme.lines[meme.selectedLineIdx].txt;
    //change value of current font sizer input
    document.querySelector('.font-sizer').value =
      meme.lines[meme.selectedLineIdx].size;
  }
  renderMemeCanvas(currentMemeId, meme);
}

function onDownload() {
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
  console.log('', ev);
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

  switch (ev.type) {
    case 'mousedown':
      console.log('image-width', EL_CANVAS.width);
      console.log('image-height', EL_CANVAS.height);

      gMeme.lines[gMeme.selectedLineIdx].x =
        ev.layerX + ev.pageX - EL_CANVAS.width / 2;
      // ev.screenX + ev.target.offsetLeft;
      console.log('current touched x', gMeme.lines[gMeme.selectedLineIdx].x);

      gMeme.lines[gMeme.selectedLineIdx].y =
        ev.layerY + ev.target.offsetTop - EL_CANVAS.height / 10;
      // ev.screenY - ev.target.offsetTop;
      console.log('current touched y', gMeme.lines[gMeme.selectedLineIdx].y);

      renderMemeCanvas(currentMemeId, meme, false);
      ev.preventDefault();
      break;

    default:
      break;
  }
}

function renderMemeCanvas(imgId = 1, meme, isSaved) {
  let foundImg = findImg(imgId);
  let img = new Image();
  img.src = foundImg.url;

  EL_CANVAS.width = img.width;
  EL_CANVAS.height = img.height;

  CTX.clearRect(0, 0, EL_CANVAS.width, EL_CANVAS.height);
  CTX.drawImage(img, 0, 0);

  for (let i = 0; i < meme.lines.length; i++) {
    gTxtFontSize = +meme.lines[i].size;

    CTX.font = gTxtFontSize + 'px Impact , heb ';
    CTX.fillStyle = '#ffffff';
    if (meme.lines[i].selected && !isSaved) CTX.strokeStyle = 'red';
    else CTX.strokeStyle = 'black';
    CTX.textAlign = 'center';
    CTX.lineWidth = gTxtFontSize / gTxtFontSize + 0.5;

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
  const elCurrentPageLink = document.querySelector('.filter-links a');

  elCurrentPageLink.classList.remove('active-page');
  elMemeContainer.classList.remove('hidden');
  elGallery.classList.add('hidden');
  elGalleryNav.classList.add('hidden');
  elGalleryAuthor.classList.add('hidden');
}

function backToGallery() {
  const elMemeContainer = document.querySelector('.meme-container');
  const elGallery = document.querySelector('.meme-gallery');
  const elGalleryNav = document.querySelector('.navbar');
  const elGalleryAuthor = document.querySelector('.author');
  const elCurrentPageLink = document.querySelector('.filter-links a');
  const elCurrentPageLinkHam = document.querySelector(
    '.filter-links-hamburger a'
  );

  elCurrentPageLink.classList.add('active-page');
  elCurrentPageLinkHam.classList.add('active-page');
  elMemeContainer.classList.add('hidden');
  elGallery.classList.remove('hidden');
  elGalleryNav.classList.remove('hidden');
  elGalleryAuthor.classList.remove('hidden');
}

function backToAbout() {
  backToGallery();
}
function changeHamburgerIcon() {
  document.querySelector('.hamburger-menu label').classList.toggle('fa-bars');
  document.querySelector('.hamburger-menu label').classList.toggle('fa-times');
}
