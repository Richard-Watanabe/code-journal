/* global data */
/* exported data */

var $imageUrlElement = document.querySelector('#photo-url');
var $titleElement = document.querySelector('#title');
var $notesElement = document.querySelector('#notes');
var $image = document.querySelector('img');
var $form = document.querySelector('form');
var $ul = document.querySelector('ul');
var $h1 = document.querySelector('.form-title');
var $parent = document.querySelector('ul');
var $body = document.querySelector('body');
var $view = document.querySelectorAll('.view');
var $noEntry = document.querySelector('.noEntry');
var $newButton = document.querySelector('.new-button');

$imageUrlElement.addEventListener('input', uploadImage);
$form.addEventListener('submit', saveEntry);
window.addEventListener('DOMContentLoaded', addEntry);
window.addEventListener('DOMContentLoaded', stayOnView);
$ul.addEventListener('click', showEditForm);
$body.addEventListener('click', linkSwitch);
$newButton.addEventListener('click', refreshForm);

function uploadImage(event) {
  var imageUrl = event.target.value;
  $image.setAttribute('src', imageUrl);
}

function saveEntry(event) {
  event.preventDefault();
  var dataObject = {
    title: $form.elements.title.value,
    photo: $form.elements.photo.value,
    notes: $form.elements.notes.value
  };
  dataObject.entryId = data.nextEntryId;
  data.nextEntryId++;
  switchView('entries');
  if ($h1.textContent === 'New Entry') {
    $image.setAttribute('src', 'images/placeholder-image-square.jpg');
    var addNew = createDom(dataObject);
    $parent.prepend(addNew);
    data.entries.unshift(dataObject);
    $noEntry.className = 'hidden';
    $form.reset();
  } else {
    data.editing.title = $form.elements.title.value;
    data.editing.photo = $form.elements.photo.value;
    data.editing.notes = $form.elements.notes.value;
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === data.editing.entryId) {
        data.entries[i] = data.editing;
        var $list = document.querySelectorAll('[data-entry-id]');
        var addEdit = createDom(data.editing);
        $list[i].replaceWith(addEdit);
        switchView('entries');
        $form.reset();
      }
    }
  }
}

function createDom(entry) {
  var newList = document.createElement('li');
  newList.setAttribute('data-entry-id', entry.entryId);
  newList.setAttribute('class', 'mainlist');

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

function stayOnView(event) {
  switchView(data.view);
}

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

if (data.entries.length !== 0) {
  $noEntry.className = 'hidden';
}

function showEditForm(event) {
  if (event.target.matches('i')) {
    switchView('entry-form');
    var stringId = event.target.closest('li').getAttribute('data-entry-id');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseInt(stringId)) {
        data.editing = data.entries[i];
      }
    }
    switchView('entry-form');
    $titleElement.setAttribute('value', data.editing.title);
    $imageUrlElement.setAttribute('value', data.editing.photo);
    $image.setAttribute('src', data.editing.photo);
    $notesElement.textContent = data.editing.notes;
    $h1.textContent = 'Edit Entry';
  }
}

function refreshForm(event) {
  $titleElement.setAttribute('value', '');
  $imageUrlElement.setAttribute('value', '');
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $notesElement.textContent = '';
  $h1.textContent = 'New Entry';
}
