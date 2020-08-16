function init() {
  if (checkIfStorage('memes')) gSavedImgs = loadFromStorage('memes');
  createGalleryImgs();
  if (checkIfStorage('keywords')) gKeywords = loadFromStorage('keywords');
  renderTags();
  backToGallery();
  renderGallery();

  EL_CANVAS = document.querySelector('.meme-canvas');
  CTX = EL_CANVAS.getContext('2d');

  gTxtFontSize = gMeme.lines[0].size;
  gMeme.lines[gMeme.selectedLineIdx].x = EL_CANVAS.width;
  gMeme.lines[gMeme.selectedLineIdx].y =
    EL_CANVAS.height - EL_CANVAS.height + gTxtFontSize;
}
