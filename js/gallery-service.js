'use strict';

let gImgs = [];

let gKeywords = [
  { tagName: 'all' },
  { tagName: 'politics', numOfSearches: 15 },
  { tagName: 'animals', numOfSearches: 15 },
  { tagName: 'funny', numOfSearches: 15 },
  { tagName: 'baby', numOfSearches: 15 },
  { tagName: 'movies', numOfSearches: 15 },
  { tagName: 'crazy', numOfSearches: 15 },
  { tagName: 'cartoon', numOfSearches: 15 },
  { tagName: 'party', numOfSearches: 15 },
];

let gTags = [
  'politics',
  'baby',
  'animals',
  'funny',
  'baby',
  'politics',
  'funny',
  'party',
  'movies',
  'movies',
  'movies',
  'politics',
  'cartoon',
  'funny',
  'crazy',
];

function createGalleryImgs() {
  gTags.forEach((tag, idx) => {
    gImgs.push({
      id: getRandomArbitrary(0, 1000000),
      url: `./img/${idx + 1}.jpg`,
      keywords: ['all', tag],
    });
  });
}

function addImage() {
  gImgs.unshift({
    id: getRandomArbitrary(0, 1000000),
    url: this.src,
    keywords: ['all', 'custom'],
  });

  renderGallery();
}

function getKeywords() {
  return gKeywords;
}

function incTagSearch(tagName) {
  if (tagName === 'all') return;
  for (let i = 0; i < gKeywords.length; i++) {
    if (gKeywords[i].tagName === tagName) {
      gKeywords[i].numOfSearches++;
    }
  }
  saveToStorage('keywords', gKeywords);
}
