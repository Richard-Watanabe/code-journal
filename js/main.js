/* global data */
/* exported data */

var $imageUrlElement = document.querySelector('#photo-url');
var $image = document.querySelector('img');
var $form = document.querySelector('form');

function uploadImage(event) {
  var imageUrl = event.target.value;
  $image.setAttribute('src', imageUrl);
}

$imageUrlElement.addEventListener('input', uploadImage);

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
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  var addNew = createDom(dataObject);
  $parent.prepend(addNew);
  $noEntry.className = 'hidden';
  $form.reset();
  switchView('entries');
}

$form.addEventListener('submit', saveEntry);

var $parent = document.querySelector('ul');

function createDom(entry) {
  var newList = document.createElement('li');
  newList.setAttribute('data-entry-id', entry.entryId);

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

  var newIcon = document.createElement('i');
  newIcon.setAttribute('class', 'fas fa-pen icon');

  var newP = document.createElement('p');
  newP.textContent = entry.notes;

  columnDiv2.appendChild(newH2);
  columnDiv2.appendChild(newIcon);
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
    $parent.appendChild(entryNew);
  }
}

window.addEventListener('DOMContentLoaded', addEntry);

function stayOnView(event) {
  switchView(data.view);
}

window.addEventListener('DOMContentLoaded', stayOnView);

var $body = document.querySelector('body');
var $view = document.querySelectorAll('.view');

function switchView(name) {
  data.view = name;
  for (var i = 0; i < $view.length; i++) {
    if (name === $view[i].getAttribute('data-view')) {
      $view[i].className = 'view container';
    } else {
      $view[i].className = 'view container hidden';
    }
  }
}

function linkSwitch(event) {
  if (event.target.matches('.link')) {
    var targetDataView = event.target.getAttribute('data-view');
    switchView(targetDataView);
  }
}

$body.addEventListener('click', linkSwitch);

var $noEntry = document.querySelector('.noEntry');
if (data.entries.length !== 0) {
  $noEntry.className = 'hidden';
}
