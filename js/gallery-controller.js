'use strict';

const gElGalleryLinkHam = document.querySelector(
  '.filter-links-hamburger a:first-of-type'
);
const gElMemeLinkHam = document.querySelector(
  '.filter-links-hamburger a:last-of-type'
);
const gElMemeContainer = document.querySelector('.meme-container');
const gElGallery = document.querySelector('.meme-gallery');
const gElGalleryNav = document.querySelector('.navbar');
const gElGalleryAuthor = document.querySelector('.author');
const gElGalleryLink = document.querySelector('.filter-links a:first-of-type');
const gElMyMemesLink = document.querySelector('.filter-links a:last-of-type');
const gElSavedMemesContainer = document.querySelector('.saved-memes-container');
const gElGalleryBg = document.querySelector('.gallery-bg');
const gElNavBar = document.querySelector('.navbar');
const elUploadSector = document.querySelector('.upload-sector');
const gElsavedMemesBg = document.querySelector('.saved-memes-bg');

function renderGallery(searchedTag = 'all') {
  let strHTML = '';
  for (let i = 0; i < gImgs.length; i++) {
    for (let j = 0; j < gImgs[i].keywords.length; j++) {
      if (gImgs[i].keywords[j].includes(searchedTag)) {
        strHTML += `
        <a href="#meme-container"> 
          <img onclick="renderEditor(${gImgs[i].id})" src="${gImgs[i].url}" />
          </a>
          `;
        //break to avoid re rendering the same img who as the some of the words
        break;
      }
    }
  }

  gElGallery.innerHTML = strHTML;
}
function renderTags() {
  const keywords = getKeywords();

  const tagContainer = document.querySelector('.tags');
  let strHTML = '';
  strHTML += '<a onclick="onShowMore()" href="#">More...</a>';
  for (let i = 0; i < keywords.length; i++) {
    strHTML += `
    <a style="font-size:${keywords[i].numOfSearches}px" onclick="onTagClick(this)">${gKeywords[i].tagName}</a>
    `;
  }
  tagContainer.innerHTML = strHTML;
}
function onShowMore() {
  let numOfTags = document.querySelectorAll('.tags a');
  let marginTop = 0;

  for (let i = 0; i < numOfTags.length; i++) {
    marginTop += 0.5;
  }

  gElGalleryNav.style.flexWrap = 'wrap';
  elUploadSector.style.marginTop = `${marginTop}rem`;

  document.querySelector('.tags').style.overflow = 'initial';
}
function onSearch(userKeyword) {
  renderGallery(userKeyword);
}
function onTagClick(elTag) {
  incTagSearch(elTag.innerText);
  onSearch(elTag.innerText);
  elTag.style.fontSize += '50px';
  renderTags();
}
function renderSavedMemes() {
  let strHTML = '';
  gElSavedMemesContainer.classList.add('saved-memes-grid');

  gSavedImgs.forEach((memeImg, idx) => {
    strHTML += `
            <a href="${memeImg}" download="do-u-even-lift">
            <img class="saved-meme-img-${idx}" src="${memeImg}">
            </a>
            `;
  });

  gElSavedMemesContainer.innerHTML = strHTML;
}
function backToMyMemes() {
  updateCurrPage('saved-memes');

  document.querySelector('.saved-memes-wrapper').classList.remove('hidden');
  document.querySelector('.gallery-wrapper').classList.add('hidden');
  document.querySelector('.meme-editor-wrapper').classList.add('hidden');

  if (checkIfStorage('memes')) {
    renderSavedMemes();
  } else {
    gElSavedMemesContainer.classList.add('flex-center');
    gElSavedMemesContainer.innerHTML = `
    <h1 class="no-memes-msg"> You dont have any memes saved. </h1>
  `;
  }
}
function backToEditor() {
  elUploadSector.style.marginTop = 0;
  document.querySelector('.tags').style.overflow = 'hidden';
  updateCurrPage('meme-editor');

  document.querySelector('.meme-editor-wrapper').classList.remove('hidden');
  document.querySelector('.gallery-wrapper').classList.add('hidden');
  document.querySelector('.saved-memes-wrapper').classList.add('hidden');
}
function backToGallery() {
  elUploadSector.style.marginTop = 0;
  if (document.querySelector('.checkbox').checked) {
    changeHamburgerIcon();
  }
  updateCurrPage('gallery');

  document.querySelector('.checkbox').checked = false;

  document.querySelector('.gallery-wrapper').classList.remove('hidden');
  document.querySelector('.meme-editor-wrapper').classList.add('hidden');
  document.querySelector('.saved-memes-wrapper').classList.add('hidden');
}
function onUploadImg(elFileInput) {
  if (elFileInput.files && elFileInput.files[0]) {
    var img = new Image();
    img.src = URL.createObjectURL(elFileInput.files[0]);
    img.onload = addImage;
  }
}
function updateCurrPage(page) {
  switch (page) {
    case 'saved-memes':
      gElGalleryLinkHam.classList.remove('active-page');
      gElGalleryLink.classList.remove('active-page');
      gElMyMemesLink.classList.add('active-page');
      gElMemeLinkHam.classList.add('active-page');
      break;
    case 'meme-editor':
      gElMemeLinkHam.classList.remove('active-page');
      gElMyMemesLink.classList.remove('active-page');
      gElGalleryLink.classList.remove('active-page');
      gElGalleryLinkHam.classList.remove('active-page');
      break;
    case 'gallery':
      gElMemeLinkHam.classList.remove('active-page');
      gElMyMemesLink.classList.remove('active-page');

      gElGalleryLinkHam.classList.add('active-page');
      gElGalleryLink.classList.add('active-page');
      break;
  }
}
function changeHamburgerIcon() {
  document.querySelector('.hamburger-menu label').classList.toggle('fa-bars');
  document.querySelector('.hamburger-menu label').classList.toggle('fa-times');
}
