'use strict';

let gImgs = [];

let gKeyWords = [
  { tagNames: ['all', 'happy'], numOfSearches: 15 },
  { tagNames: ['all', 'funny', 'puk'], numOfSearches: 15 },
  { tagNames: ['all', 'מצחיק'], numOfSearches: 15 },
  { tagNames: ['all', 'boring'], numOfSearches: 15 },
  { tagNames: ['all', 'עוד תינוק'], numOfSearches: 15 },
  { tagNames: ['all', 'baby'], numOfSearches: 15 },
  { tagNames: ['all', 'cocumber'], numOfSearches: 15 },
  { tagNames: ['all', 'baby'], numOfSearches: 15 },
  { tagNames: ['all', 'לא מצחיק'], numOfSearches: 15 },
  { tagNames: ['all', 'wow'], numOfSearches: 15 },
  { tagNames: ['all', 'food'], numOfSearches: 15 },
  { tagNames: ['all', 'baby'], numOfSearches: 15 },
  { tagNames: ['all', 'cows'], numOfSearches: 15 },
  { tagNames: ['all', 'jokes'], numOfSearches: 15 },
  { tagNames: ['all', 'baby'], numOfSearches: 15 },
  { tagNames: ['all', 'games'], numOfSearches: 15 },
  { tagNames: ['all', 'alpha'], numOfSearches: 15 },
  { tagNames: ['all', 'תינוק'], numOfSearches: 15 },
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
