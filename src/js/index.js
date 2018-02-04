(function (document) {
  'use strict';

  function $(selector) {
    return document.querySelector(selector);
  }

  window.addEventListener('WebComponentsReady', () => {
    const textInput = $('#textInput');
    const writeHere = $('.write-here');

    if (textInput.applicationkey === "REPLACE_ME" || textInput.hmackey === "REPLACE_ME") {
      $('header').remove();
      $('.warningkeys').classList.remove('hidden');
    } else {
      const listOfInputs = [textInput];
      listOfInputs.forEach(function (input) {
        input.addEventListener('loaded', () => {
          console.log('mint:loaded')
          writeHere.classList.remove('hidden');
        });
        input.addEventListener('pointerdown', () => {
          console.log('mint:pointerdown')
          writeHere.classList.add('hidden');
        });
        input.addEventListener('pointerup', () => {
          console.log('mint:pointerup')
          writeHere.classList.add('hidden');
        });
      });
      writeHere.addEventListener('pointermove', () => {
        writeHere.classList.add('hidden');
      });

      const setButtonsStates = () => {
        writeHere.classList.add('hidden');
        listOfInputs.forEach(function (input) {
          input.classList.add('hidden');
        });

        textInput.classList.remove('hidden');
        textInput.removeAttribute('unloaded');
      };

      // // Initialize the default demo
      setButtonsStates();
    }
  });

})(document);
