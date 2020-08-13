'use strict';

function renderGallery() {
  const elGallery = document.querySelector('.meme-gallery');
  let strHTML = '';
  console.log('', gImgs);
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
