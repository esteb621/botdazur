const axios = require('axios');
const cheerio = require('cheerio');

const url = 'https://ftp.lignesdazur.com';

const getLines = async (line) => {
  try {
    const response = await axios.get(url);

    if (response.status === 200) {
      const data = response.data;
      const $ = cheerio.load(data);

      const fileLinks = $('a[href*=".pdf"]');
      const files = [];

      fileLinks.each((index, element) => {
        const filename = $(element).text();
        const fileLink = url + "/" + $(element).attr('href');

        if (filename.startsWith('ligne_') && filename.includes(line)) {
          files.push({
            name: filename, 
            link: fileLink 
          });
        }
      });
      
      return files;
    } else {
      console.log('Échec de la requête.');
      return {};
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des fichiers :', error.message);
    return {};
  }
};

function parseHTML(html) {
  const $ = cheerio.load(html);
  return $.text();
}



const utils = {
  getLines : getLines,
  parseHTML : parseHTML,
}

module.exports = utils;