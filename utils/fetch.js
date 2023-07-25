const fetch = require("node-fetch");
let e621 = require('e621-api').default;
let enums = require('e621-api/build/enums');
let wrapper = new e621('Node-test-1.0', null, null, 3);

async function fetchYiff() {
  const types = ["jpg", "png", "gif"];
  let apiUrl = `https://v2.yiff.rest/furry/yiff/gay?types=${types.join(",")}`;



  const response = await fetch(apiUrl, {
    headers: {
      "User-Agent": process.env.USER_AGENT,
      "Authorization": process.env.API_KEY,
    },
  });

  return await response.json();
}

async function fetchByArtist(artist) {
    const types = ["jpg", "png", "gif"];
    let apiUrl = `https://v2.yiff.rest/furry/yiff/gay?types=${types.join(",")}`;
    
  
  
    const response = await fetch(apiUrl, {
      headers: {
        "User-Agent": process.env.USER_AGENT,
        "Authorization": process.env.API_KEY,
      },
    });
  
    return await response.json();
  }
  
module.exports = { fetchYiff };
