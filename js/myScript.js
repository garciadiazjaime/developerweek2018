
    var editorElement = document.getElementById('editor');
    var resultElement = document.getElementById('result');
    var undoElement = document.getElementById('undo');
    var redoElement = document.getElementById('redo');
    var clearElement = document.getElementById('clear');
    editorElement.addEventListener('changed', function(evt) {
        clearElement.disabled = !evt.detail.canClear;
        undoElement.disabled = !evt.detail.canUndo;
        redoElement.disabled = !evt.detail.canRedo;
    });
    editorElement.addEventListener('exported', function(evt) {
        var exports = evt.detail.exports;
        if (exports && exports['text/plain']) {
            console.log(exports['text/plain']);
            if(exports['text/plain'] == "M") {
              resultElement.innerHTML = "<img src='https://lh3.googleusercontent.com/gN6iBKP1b2GTXZZoCxhyXiYIAh8QJ_8xzlhEK6csyDadA4GdkEdIEy9Bc8s5jozt1g=w300' width='50' height='50'>";
              pins.setIcon(1)

            }
            else {
              resultElement.innerHTML = '<span>' + exports['text/plain'] + '</span>';
            }

        } else {
            resultElement.innerHTML = '';
        }
    });
    undoElement.addEventListener('click', function() {
        editorElement.editor.undo();
    });
    redoElement.addEventListener('click', function() {
        editorElement.editor.redo();
    });
    clearElement.addEventListener('click', function() {
        editorElement.editor.clear();
    });
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
    window.addEventListener('resize', function() {
        editorElement.editor.resize();
    });
