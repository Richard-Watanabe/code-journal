/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

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
  dataObject.nextEntryId = data.nextEntryId++;
  data.entries.unshift(dataObject);
  // console.log(dataObject);
  // console.log(data);
}

$form.addEventListener('submit', save);
