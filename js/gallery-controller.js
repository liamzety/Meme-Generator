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

function renderTags() {
  const tagContainer = document.querySelector('.tags');
  let strHTML = '';
  strHTML += '<a onclick="onShowMore()" href="#">More...</a>';
  for (let i = 0; i < gKeyWords.length; i++) {
    strHTML += `
    <a style="font-size: ${
      gKeyWords[i].numOfSearches
    }px;" onclick="onTagClick(this,${i})" 
    href="#">${gKeyWords[i].tagNames[gKeyWords[i].tagNames.length - 1]}
    </a>
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

  document.querySelector('.navbar').style.flexWrap = 'wrap';
  document.querySelector('.gallery-bg').style.marginTop = `${marginTop}rem`;

  document.querySelector('.tags').style.overflow = 'initial';
}

function onSearch(val) {
  console.log('not implemented');
  //   gImgs = [];
  //   createGalleryImgs();
  //   gKeyWords.forEach((tag) => {
  //     tag.tagNames.forEach((keyword) => {
  //       if (val !== keyword) return;

  //       // tag found
  //       filterGalleryImgs(val);
  //       renderGallery();
  //     });
  //   });
}

function onTagClick(elTag, idx) {
  incTagSearch(idx);
  onSearch(elTag.innerText);
  elTag.style.fontSize += '50px';

  renderTags();
}

function backToMyMemes() {
  let elSavedMemesContainer = document.querySelector('.saved-memes-container');
  let strHTML = '';

  const elGalleryBg = document.querySelector('.gallery-bg');
  const elNavBar = document.querySelector('.navbar');
  const elAuthorContainer = document.querySelector('.author');
  backToGallery();

  gElGalleryLink.classList.remove('active-page');
  gElGalleryLinkHam.classList.remove('active-page');
  elSavedMemesContainer.classList.remove('hidden');

  gElMemeLinkHam.classList.add('active-page');
  gElMyMemesLink.classList.add('active-page');
  elGalleryBg.classList.add('hidden');
  elNavBar.classList.add('hidden');
  elAuthorContainer.classList.add('hidden');

  if (checkIfStorage()) {
    gSavedImgs.forEach((memeImg, idx) => {
      strHTML += `
      <a href="${memeImg}" download="do-u-even-lift">
      <img class="saved-meme-img-${idx}" src="${memeImg}">
      </a>
      `;
    });
    elSavedMemesContainer.innerHTML = strHTML;
  } else {
    //TODO: DISPLAY MODAL
    alert('no saved memes');
  }
}

function backToEditor() {
  document.querySelector('.saved-memes-container').classList.add('hidden');
  document.querySelector('.gallery-bg').style.marginTop = 0;
  document.querySelector('.tags').style.overflow = 'hidden';
  gElGalleryLink.classList.remove('active-page');
  gElMyMemesLink.classList.remove('active-page');
  gElMemeContainer.classList.remove('hidden');
  gElGallery.classList.add('hidden');
  gElGalleryNav.classList.add('hidden');
  gElGalleryAuthor.classList.add('hidden');
}

function backToGallery() {
  if (document.querySelector('.checkbox').checked) {
    changeHamburgerIcon();
  }
  document.querySelector('.checkbox').checked = false;
  gElGalleryLinkHam.classList.add('active-page');
  gElMemeContainer.classList.add('hidden');
  gElSavedMemesContainer.classList.add('hidden');
  gElGalleryLink.classList.add('active-page');

  gElMemeLinkHam.classList.remove('active-page');
  gElMyMemesLink.classList.remove('active-page');
  gElNavBar.classList.remove('hidden');
  gElGalleryBg.classList.remove('hidden');
  gElGallery.classList.remove('hidden');
  gElGalleryNav.classList.remove('hidden');
  gElGalleryAuthor.classList.remove('hidden');
}

function changeHamburgerIcon() {
  document.querySelector('.hamburger-menu label').classList.toggle('fa-bars');
  document.querySelector('.hamburger-menu label').classList.toggle('fa-times');
}
