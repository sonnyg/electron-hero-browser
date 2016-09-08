'use strict';

// the path needs to be explicitly defined when running as a packaged app
const path = require('path');
const envPath = path.resolve(__dirname, '..', '.env');
require('dotenv').config({silent: true, path: envPath});

if (process.env.MARVEL_PUBLIC_KEY && process.env.MARVEL_PRIVATE_KEY) {
  var md5 = require('md5');
  var publicKey = process.env.MARVEL_PUBLIC_KEY;
  var privateKey = process.env.MARVEL_PRIVATE_KEY;
  var ts = String(new Date().getTime());
  var hash = md5(`${ts}${privateKey}${publicKey}`);

  var url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=25`;

  // html template to populate and later insert into view
  const characterHTML = (character) => `
    <div class="character">
      <h2>${character.name}</h2>
      <img src="${character.thumbnail.path}.${character.thumbnail.extension}" />
    </div>
    `;

  fetch(url)
    .then(resp => resp.json())
    .then(json => json.data.results)
    .then(characters => {
      var html = characters.map(characterHTML).join('');
      var characterList = document.getElementById("character_list");
      characterList.innerHTML = html;

      new Notification(document.title, {
        body: 'Super Heroes Loaded!'
      });
    })
    .catch((error) => {
      logError(error);
    });
} else {
  logError(new Error("Unable to access marvel.com. Environment variables 'MARVEL_PUBLIC_KEY' and 'MARVEL_PRIVATE_KEY' have not been set."));
}

function logError(error) {
  console.error(error);
  var errorList = document.getElementById("error_list");
  error_list.innerHTML += `<i>${error.message}</i></br>`;
}
