/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var oldEntryJSON = localStorage.getItem('code-journal-local-storage');

if (oldEntryJSON !== null) {
  var oldData = JSON.parse(oldEntryJSON);
  data = oldData;
}

function saveData(event) {
  var newEntry = JSON.stringify(data);
  localStorage.setItem('code-journal-local-storage', newEntry);
}

window.addEventListener('beforeunload', saveData);
