(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
})();

document.addEventListener("DOMContentLoaded", function () {
  var cookieOverlay = document.getElementById("cookie-overlay");
  var agreeBtn = document.getElementById("agree-btn");
  var dismissBtn = document.getElementById("dismiss-btn");
  var blockBtn = document.getElementById("block-btn");

  // Check if cookie consent is already given
  if (!getCookie("cookieConsent")) {
    // Show overlay if cookie is not present
    cookieOverlay.style.display = "flex";
  }

  // Agree to cookies
  agreeBtn.addEventListener("click", function () {
    cookieOverlay.style.display = "none";
    // Set cookie to remember user's choice
    setCookie("cookieConsent", "agreed", 365);
  });

  // Dismiss for this session
  dismissBtn.addEventListener("click", function () {
    cookieOverlay.style.display = "none";
    // Set cookie to remember user's choice with session expiration
    setCookie("cookieConsent", "dismissed", null); // No expiration (session)
  });

  // Block site
  blockBtn.addEventListener("click", function () {
    // Redirect or block access to the site
    // For example:
    // window.location.href = 'blocked.html';
  });

  // Function to set cookie
  function setCookie(name, value, days) {
    var expires = "";
    if (days) {
      var date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  // Function to get cookie value
  function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
});
