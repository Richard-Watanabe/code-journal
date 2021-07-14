/* global data */
/* exported data */

var imageUrlElement = document.querySelector('#photo-url');
var image = document.querySelector('img');
var $form = document.querySelector('form');

function uploadImage(event) {
  var imageUrl = event.target.value;
  image.setAttribute('src', imageUrl);
}

imageUrlElement.addEventListener('input', uploadImage);

function saveEntry(event) {
  event.preventDefault();
  var dataObject = {
    title: $form.elements.title.value,
    photo: $form.elements.photo.value,
    notes: $form.elements.notes.value
  };
  dataObject.entryId = data.nextEntryId;
  data.nextEntryId++;
  data.entries.unshift(dataObject);
  image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $form.reset();
}

$form.addEventListener('submit', saveEntry);

function findEntry(entry) {
  var foundEntry = document.querySelector(entry);
  return foundEntry;
}

findEntry('.dummy2');
