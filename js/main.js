/* global data */
/* exported data */

var imageUrl = document.querySelector('#photo-url');
var image = document.querySelector('img');

function update(event) {
  var imageUrl = event.target.value;
  image.setAttribute('src', imageUrl);
}

imageUrl.addEventListener('input', update);

var saveButton = document.querySelector('.save-button');

saveButton.addEventListener('submit');
