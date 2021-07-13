/* global data */
/* exported data */

var imageUrlElement = document.querySelector('#photo-url');
var image = document.querySelector('img');
// var titleElement = document.querySelector('#title');
// var notesElement = document.querySelector('#notes');
var $form = document.querySelector('form');

function uploadImage(event) {
  var imageUrl = event.target.value;
  image.setAttribute('src', imageUrl);
}

imageUrlElement.addEventListener('input', uploadImage);

var dataObject = {};
function save(event) {
  event.preventDefault();
  dataObject.title = $form.elements.title.value;
  dataObject.photo = $form.elements.photo.value;
  dataObject.notes = $form.elements.notes.value;
  // console.log(dataObject);
}

$form.addEventListener('submit', save);
