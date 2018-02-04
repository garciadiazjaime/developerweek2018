var editorElement = document.getElementById('editor');
var resultElement = document.getElementById('result');
var undoElement = document.getElementById('undo');
var redoElement = document.getElementById('redo');
var clearElement = document.getElementById('clear');
var setPinElement = document.getElementById('setPin');

var selectedCategory = '';
var categoriesMap = {
  "A": "images/Aid.svg",
  "B": "images/Bathrooms.svg",
  "C": "images/Camping.svg",
  "F": "images/Fancy.svg",
  "M": "images/Munchies.svg",
  "P": "images/Picante.svg",
  "R": "images/Restaurants.svg",
  "S": "images/Stage.svg",
  "L": "images/Toprope.svg",
  "DEFAULT": "images/default.svg"
}

editorElement.addEventListener('changed', function (evt) {
  clearElement.disabled = !evt.detail.canClear;
  undoElement.disabled = !evt.detail.canUndo;
  redoElement.disabled = !evt.detail.canRedo;
});
editorElement.addEventListener('exported', function (evt) {
  if (evt.detail.exports && evt.detail.exports['text/plain']) {
    const key = evt.detail.exports['text/plain'].toUpperCase();
    console.log(key);
    selectedCategory = categoriesMap[key] ? key : 'DEFAULT';
    resultElement.innerHTML = "<img src='" + categoriesMap[selectedCategory] + "'>";
  } else {
    resultElement.innerHTML = '';
  }
});
undoElement.addEventListener('click', function () {
  editorElement.editor.undo();
});
redoElement.addEventListener('click', function () {
  editorElement.editor.redo();
});
clearElement.addEventListener('click', function () {
  clearMyScript();
});
setPinElement.addEventListener('click', function () {
  setPin(categoriesMap[selectedCategory]);
});

function clearMyScript() {
  editorElement.editor.clear();
  selectedCategory = ''
}

function setPin(icon) {
  hidePinSelector();
  if (icon) {
    pins.setIcon(icon);
  }
  clearMyScript();
}

function hidePinSelector() {
  document.getElementById('pin-selector').classList.add('hidden');
}

function showPinSelector() {
  document.getElementById('pin-selector').classList.remove('hidden');
}

/**
 * Attach an editor to the document
 * @param {Element} The DOM element to attach the ink paper
 * @param {Object} The recognition parameters
 */
MyScript.register(editorElement, {
  recognitionParams: {
    type: 'TEXT',
    protocol: 'WEBSOCKET',
    apiVersion: 'V4',
    server: {
      scheme: 'https',
      host: 'webdemoapi.myscript.com',
      applicationKey: '8e362718-90d6-4ce4-b5fe-2ed1234759cc',
      hmacKey: '079e58d8-0758-4a3d-bdae-65a0273de50b'
    },
    v4: {
      text: {
        mimeTypes: ['text/plain']
      },
    }
  }
});
window.addEventListener('resize', function () {
  editorElement.editor.resize();
});
