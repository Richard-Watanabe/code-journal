/* global data */
/* exported data */

var $imageUrlElement = document.querySelector('#photo-url');
var $imageUrlElementEdit = document.querySelector('#photo-url-edit');
var $titleElementEdit = document.querySelector('#title-edit');
var $notesElementEdit = document.querySelector('#notes-edit');
var $image = document.querySelector('.entry-image');
var $imageEdit = document.querySelector('.edit-image');
var $formEntry = document.querySelector('.entry-form');
var $formEdit = document.querySelector('.edit-form');

function uploadImage(event) {
  var imageUrl = event.target.value;
  $image.setAttribute('src', imageUrl);
}

function uploadImageEdit(event) {
  var imageUrlEdit = event.target.value;
  $imageEdit.setAttribute('src', imageUrlEdit);
}

$imageUrlElementEdit.addEventListener('input', uploadImageEdit);
$imageUrlElement.addEventListener('input', uploadImage);

function saveEntry(event) {
  event.preventDefault();
  var dataObject = {
    title: $formEntry.elements.title.value,
    photo: $formEntry.elements.photo.value,
    notes: $formEntry.elements.notes.value
  };
  dataObject.entryId = data.nextEntryId;
  data.nextEntryId++;
  $image.setAttribute('src', 'images/placeholder-image-square.jpg');
  $noEntry.className = 'hidden';
  $formEntry.reset();
  switchView('entries');
  var addNew = createDom(dataObject);
  $parent.prepend(addNew);
  data.entries.unshift(dataObject);
}

function editEntry(event) {
  event.preventDefault();
  var dataObjectEdited = {
    title: $formEdit.elements.title.value,
    photo: $formEdit.elements.photo.value,
    notes: $formEdit.elements.notes.value
  };
  $noEntry.className = 'hidden';
  switchView('entries');
  //   for (var i = 0; i < data.entries.length; i++) {
  //     if (data.entries[i].entryId === data.editing.entryId) {
  //       var addNew = createDom(dataObjectEdited);
  //       $parent.prepend(addNew);
  //       $parent.removeChild();
  //     }
  //   }
  // }
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === data.editing.entryId) {
      data.entries.splice(i, 1, dataObjectEdited);
    }
  }
}

$formEntry.addEventListener('submit', saveEntry);
$formEdit.addEventListener('submit', editEntry);

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
  newIcon.setAttribute('class', 'fas fa-pen icon link');
  newIcon.setAttribute('data-view', 'edit-form');

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

var $ul = document.querySelector('ul');

function showEditForm(event) {
  if (event.target.matches('i')) {
    var stringId = event.target.closest('li').getAttribute('data-entry-id');
    for (var i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === parseInt(stringId)) {
        data.editing = data.entries[i];
      }
    }
    $titleElementEdit.setAttribute('value', data.editing.title);
    $imageUrlElementEdit.setAttribute('value', data.editing.photo);
    $imageEdit.setAttribute('src', data.editing.photo);
    $notesElementEdit.textContent = data.editing.notes;
    switchView('edit-form');
  }
}

$ul.addEventListener('click', showEditForm);
