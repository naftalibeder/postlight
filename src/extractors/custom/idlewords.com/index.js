export const IdlewordsComExtractor = {
  domain: 'idlewords.com',

  title: {
    selectors: ['title'],
  },

  author: {
    selectors: [
      // enter author selectors
    ],
  },

  date_published: {
    selectors: [
      // enter selectors
    ],
  },

  dek: {
    selectors: [
      // enter selectors
    ],
  },

  lead_image_url: {
    selectors: [['td > a > img', 'src']],
  },

  content: {
    selectors: ['#main'],

    transforms: {
      table: 'div',
      tr: 'div',
      td: 'div',
    },

    clean: [],
  },
};
