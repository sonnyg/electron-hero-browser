'use strict';

// the warning message is not terribly helpful if the file is missing
require('dotenv').config({silent: true});


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
      console.error(error);
    });
} else {
  console.error("Unable to access marvel.com. Environment variables 'MARVEL_PUBLIC_KEY' and 'MARVEL_PRIVATE_KEY' have not been set.")
}
