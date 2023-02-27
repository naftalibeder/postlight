import assert from 'assert';
import URL from 'url';
import cheerio from 'cheerio';

import Parser from 'mercury';
import getExtractor from 'extractors/get-extractor';
import { excerptContentRange } from 'utils/text';

const fs = require('fs');

describe('IdlewordsComExtractor', () => {
  describe('initial test case', () => {
    let result;
    let url;
    beforeAll(() => {
      url = 'https://idlewords.com/talks/superintelligence.htm';
      const html = fs.readFileSync('./fixtures/idlewords.com.html');
      result = Parser.parse(url, { html, fallback: false });
    });

    it('is selected properly', () => {
      // This test should be passing by default.
      // It sanity checks that the correct parser
      // is being selected for URLs from this domain
      const extractor = getExtractor(url);
      assert.equal(extractor.domain, URL.parse(url).hostname);
    });

    it('returns the title', async () => {
      const { title } = await result;

      assert.equal(title, `Superintelligence: The Idea That Eats Smart People`);
    });

    // it('returns the author', async () => {
    //   const { author } = await result;

    //   assert.equal(author, '');
    // });

    it('returns the lead_image_url', async () => {
      const { lead_image_url } = await result;

      assert.equal(
        lead_image_url,
        `https://static.pinboard.in/si/thumbs/si.001.thumb.jpg`
      );
    });

    it('returns the content', async () => {
      const { content } = await result;

      const $ = cheerio.load(content || '');
      const text = $('*')
        .first()
        .text();

      const slice1 = excerptContentRange(text, -46, -35);

      assert.equal(
        slice1,
        'In the absence of effective leadership from those at the top'
      );
    });
  });
});
