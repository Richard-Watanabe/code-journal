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
  window.location.reload();
}

$form.addEventListener('submit', saveEntry);

var parent = document.querySelector('ul');

function createDom(entry) {
  var newList = document.createElement('li');

  var rowDiv = document.createElement('div');
  rowDiv.setAttribute('class', 'row');

  var columnDiv = document.createElement('div');
  columnDiv.setAttribute('class', 'column-half cover');

  var newImage = document.createElement('img');
  newImage.setAttribute('src', entry.photo);

  var columnDiv2 = document.createElement('div');
  columnDiv2.setAttribute('class', 'column-half');

  var newH2 = document.createElement('h2');
  newH2.setAttribute('class', 'less-margin');
  newH2.textContent = entry.title;

  var newP = document.createElement('p');
  newP.textContent = entry.notes;

  columnDiv2.appendChild(newH2);
  columnDiv2.appendChild(newP);

  rowDiv.appendChild(columnDiv);
  rowDiv.appendChild(columnDiv2);

  columnDiv.appendChild(newImage);

  newList.appendChild(rowDiv);

  return newList;
}

function addEntry(event) {
  for (var i = 0; i < data.entries.length; i++) {
    var entryNew = createDom(data.entries[i]);
    parent.appendChild(entryNew);
  }
}

window.addEventListener('DOMContentLoaded', addEntry);

var newButton = document.querySelector('.new-button');
var newModal = document.querySelector('.new');
var viewEntries = document.querySelector('.view');

function popUpNew(event) {
  newModal.className = 'container new';
  viewEntries.className = 'hidden view';
}

newButton.addEventListener('click', popUpNew);

var entriesButton = document.querySelector('.entries');

function goToEntries(event) {
  viewEntries.className = 'view';
  newModal.className = 'hidden container new';
}

entriesButton.addEventListener('click', goToEntries);
