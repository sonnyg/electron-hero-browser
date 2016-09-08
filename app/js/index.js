'use strict';

// the path needs to be explicitly defined when running as a packaged app
const path = require('path');
const envPath = path.resolve(__dirname, '..', '.env');
require('dotenv').config({silent: true, path: envPath});

if (process.env.MARVEL_PUBLIC_KEY && process.env.MARVEL_PRIVATE_KEY) {
  const md5 = require('md5');
  const publicKey = process.env.MARVEL_PUBLIC_KEY;
  const privateKey = process.env.MARVEL_PRIVATE_KEY;
  const ts = String(new Date().getTime());
  const hash = md5(`${ts}${privateKey}${publicKey}`);

  const url = `https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}&limit=25`;

  // html template to populate and later insert into view -- this is a callback that formats the character
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
      const html = characters.map(characterHTML).join('');
      const characterList = document.getElementById("character_list");
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
  const errorList = document.getElementById("error_list");
  error_list.innerHTML += `<i>${error.message}</i></br>`;
}
