/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var imageUrlElement = document.querySelector('#photo-url');
var image = document.querySelector('img');
var $form = document.querySelector('form');

function uploadImage(event) {
  var imageUrl = event.target.value;
  image.setAttribute('src', imageUrl);
}

imageUrlElement.addEventListener('input', uploadImage);

var dataObject = {};
function saveEntry(event) {
  event.preventDefault();
  dataObject.title = $form.elements.title.value;
  dataObject.photo = $form.elements.photo.value;
  dataObject.notes = $form.elements.notes.value;
  dataObject.nextEntryId = data.nextEntryId++;
  data.entries.unshift(dataObject);
  image.setAttribute('src', 'images/placeholder-image-square.jpg');
  var newEntry = JSON.stringify(dataObject);
  localStorage.setItem('new-entry', newEntry);
  var dataModel = JSON.stringify(data);
  localStorage.setItem('data-model', dataModel);
  $form.reset();
  // console.log(dataObject);
  // console.log(data);
}

var newEntryJSON = localStorage.getItem('new-entry');
var newDataJSON = localStorage.getItem('data-model');

if (newEntryJSON !== null) {
  dataObject = JSON.parse(newEntryJSON);
}

if (newDataJSON !== null) {
  data = JSON.parse(newDataJSON);
}

function saveData(event) {
  var newEntry = JSON.stringify(dataObject);
  localStorage.setItem('new-entry', newEntry);
  var dataModel = JSON.stringify(data);
  localStorage.setItem('data-model', dataModel);
}

window.addEventListener('beforeunload', saveData);
$form.addEventListener('submit', saveEntry);
