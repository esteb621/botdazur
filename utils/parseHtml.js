function parseHTML(html) {
    const $ = cheerio.load(html);
    return $.text();
  }