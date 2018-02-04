(function(document) {
  'use strict';

  function $(selector) {
      return document.querySelector(selector);
  }

  window.addEventListener('WebComponentsReady', function() {

      var textInput = $('#textInput');
      var textButton = $('#textButton');
      var writeHere = $('.write-here');

      if (textInput.applicationkey === "REPLACE_ME" || textInput.hmackey === "REPLACE_ME" ) {
          $('header').remove();
          $('.warningkeys').classList.remove('hidden');
      } else {

          var listOfInputs = [textInput];
          listOfInputs.forEach(function(input) {
              input.addEventListener('loaded', function() {
                  console.log('mint:loaded')
                  writeHere.classList.remove('hidden');
              });
              input.addEventListener('pointerdown', function() {
                  console.log('mint:pointerdown')
                  writeHere.classList.add('hidden');
              });
              input.addEventListener('pointerup', function() {
                  console.log('mint:pointerup')
                  writeHere.classList.add('hidden');
              });
          });
          writeHere.addEventListener('pointermove', function() {
              writeHere.classList.add('hidden');
          });

          // Manage the tap on the various buttons
          var setButtonsStates = function(isTextButton) {
              writeHere.classList.add('hidden');
              listOfInputs.forEach(function(input) { input.classList.add('hidden'); });

              textButton.active = isTextButton;
              if (isTextButton) {
                  textInput.classList.remove('hidden');
                  textInput.removeAttribute('unloaded');
              }
          };

          // // Initialize the default demo
          setButtonsStates(true, false);
      }
  });

})(document);
