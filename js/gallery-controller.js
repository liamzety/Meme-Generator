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

function renderGallery() {
  const elGallery = document.querySelector('.meme-gallery');
  let strHTML = '';
  for (let i = 0; i < gImgs.length; i++) {
    strHTML += `
      <img onclick="renderEditor(${gImgs[i].id})" src="${gImgs[i].url}" />
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

  gElGalleryNav.style.flexWrap = 'wrap';
  elUploadSector.style.marginTop = `${marginTop}rem`;

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
  backToGallery();

  elUploadSector.style.marginTop = 0;
  gElGalleryLink.classList.remove('active-page');
  gElGalleryLinkHam.classList.remove('active-page');
  gElSavedMemesContainer.classList.remove('hidden');
  gElsavedMemesBg.classList.remove('hidden');

  elUploadSector.classList.add('hidden');
  gElMemeLinkHam.classList.add('active-page');
  gElMyMemesLink.classList.add('active-page');
  gElGalleryBg.classList.add('hidden');
  gElNavBar.classList.add('hidden');
  gElGalleryAuthor.classList.add('hidden');
  gElsavedMemesBg.classList.add('min-height-75vh');
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
  document.querySelector('.saved-memes-container').classList.add('hidden');
  elUploadSector.style.marginTop = 0;
  document.querySelector('.tags').style.overflow = 'hidden';
  gElGalleryLink.classList.remove('active-page');
  gElMyMemesLink.classList.remove('active-page');
  gElMemeContainer.classList.remove('hidden');

  gElSavedMemesContainer.classList.remove('flex-center');
  gElSavedMemesContainer.classList.remove('saved-memes-grid');

  elUploadSector.classList.add('hidden');
  gElGallery.classList.add('hidden');
  gElGalleryNav.classList.add('hidden');
  gElGalleryAuthor.classList.add('hidden');
}

function backToGallery() {
  elUploadSector.style.marginTop = 0;
  if (document.querySelector('.checkbox').checked) {
    changeHamburgerIcon();
  }
  document.querySelector('.checkbox').checked = false;
  gElGalleryLinkHam.classList.add('active-page');
  gElMemeContainer.classList.add('hidden');
  gElSavedMemesContainer.classList.add('hidden');
  gElsavedMemesBg.classList.add('hidden');
  gElGalleryLink.classList.add('active-page');

  gElSavedMemesContainer.classList.remove('saved-memes-grid');
  gElMemeLinkHam.classList.remove('active-page');
  gElMyMemesLink.classList.remove('active-page');

  elUploadSector.classList.remove('hidden');
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

function onUploadImg(elFileInput) {
  if (elFileInput.files && elFileInput.files[0]) {
    var img = new Image(); // $('img')[0]
    img.src = URL.createObjectURL(elFileInput.files[0]); // set src to blob url
    img.onload = addImage;
    renderGallery(false);
  }
}
