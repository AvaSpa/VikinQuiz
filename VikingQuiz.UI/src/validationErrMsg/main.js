(function () {
   var passwordId = "#password";
   var confirmPasswordId = "#confirmPassword";
   var validity = {};

   validity.showErrorMessages = function (errorMessagesContainer, typesToShow) {
      // only show the first error message matching the array of types
      // must be used on a ".container < [data-display-on="value"]" type of HTML elements

      var i;
      var j;
      var msg;
      var messages = errorMessagesContainer.find("[data-display-on]");

      if (typesToShow.length) {
         // only show the ones who match the list
         for (i = 0; i < messages.length; i++) {
            msg = messages[i].attributes["data-display-on"].value;

            j = 0;
            do {
               if (msg.indexOf(typesToShow[j]) !== -1) {
                  $(messages[i]).removeClass("hidden");
                  return;
               } else {
                  $(messages[i]).addClass("hidden");
               }
               j++;
            } while (j < typesToShow.length)
         }
      } else {
         // hide everything if list is empty
         for (i = 0; i < messages.length; i++) {
            $(messages[i]).addClass("hidden");
         }
      }
   };


   validity.getValidityStates = function getValidityStates(inputElement) {
      var validityStates = [];
      var validity = inputElement.validity;

      if (validity.customError) {
         validityStates.push(inputElement.validationMessage);
      }

      for (var state in validity) {
         if (validity[state] && state !== "valid" && state !== "customError") {
            validityStates.push(state);
         }
      }
      return validityStates;
   };



   validity.showInputErrorMessages = function (evt) {
      evt.preventDefault();
      var target = evt.target;
      errorStates = validity.getValidityStates(target);
      container = $(target).next(".error-messages-container");
      validity.showErrorMessages(container, errorStates);
   };



   function checkPasswordValidity(originalPassId, confirmPassId) {
      var isPassSame = $(originalPassId).val() === $(confirmPassId).val();
      if (isPassSame) {
         $(originalPassId)[0].setCustomValidity("");
      } else {
         $(originalPassId)[0].setCustomValidity("passwordNotMatching");
      }
   }


   function addValidityEvents() {
      $("input").on("invalid", validity.showInputErrorMessages);
      $("input").on("change", validity.showInputErrorMessages);
      $("form").on("submit", function (evt) {
         var target = evt.target;
         evt.preventDefault();
         checkPasswordValidity(passwordId, confirmPasswordId)

         if (evt.target.checkValidity()) {
            target.submit();
         }
      });

      $(passwordId + "," + confirmPasswordId).on("change", function () {
         checkPasswordValidity(passwordId, confirmPasswordId);
      });
   }

   addValidityEvents();
})();