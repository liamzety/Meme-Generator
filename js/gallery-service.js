'use strict';

let gImgs = [];

let gKeyWords = [
  { tagNames: ['all', 'happy'], numOfSearches: 15 },
  { tagNames: ['all', 'funny', 'puk'], numOfSearches: 15 },
  { tagNames: ['all', 'baby'], numOfSearches: 15 },
  { tagNames: ['all', 'baby'], numOfSearches: 15 },
  { tagNames: ['all', 'baby'], numOfSearches: 15 },
  { tagNames: ['all', 'baby'], numOfSearches: 15 },
  { tagNames: ['all', 'baby'], numOfSearches: 15 },
  { tagNames: ['all', 'baby'], numOfSearches: 15 },
  { tagNames: ['all', 'baby'], numOfSearches: 15 },
  { tagNames: ['all', 'baby'], numOfSearches: 15 },
  { tagNames: ['all', 'baby'], numOfSearches: 15 },
];

function createGalleryImgs() {
  gKeyWords.forEach((tag, idx) => {
    gImgs.push({
      id: idx,
      url: `./imgs/${idx + 1}.jpg`,
      keywords: tag.tagNames,
    });
  });
}

// function filterGalleryImgs(keyword) {
//   console.log('', gImgs);
//   gImgs.forEach((image, idx) => {
//     let isExsits = image.keywords.some((tag) => {
//       return tag !== keyword;
//     });
//     if (!isExsits) {
//       gImgs = [gImgs[idx]];
//     }
//   });
// }

function incTagSearch(idx) {
  gKeyWords[idx].numOfSearches++;
}
