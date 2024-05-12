const form = document.getElementById("buyForm");
const fillButton = document.querySelector('#buyForm button[type="button"]');
const resetButton = document.querySelector('#buyForm button[type="reset"]');

if (form) {
  form.addEventListener("submit", async (event) => {
    if (!form.checkValidity()) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // Collect form data
      event.preventDefault();
      const formData = new FormData(form);

      showMessage("Submitting form...", "grey");

      await fetch("/submit", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("response is not OK");
          }
        })
        .then((data) => {
          hideMessage();
          showMessage(
            `Congratulations you have bought: ${data.name}!!! Redirecting to homepage...`,
            "green"
          );
          setTimeout(() => {
            window.location.href = "/";
          }, 5000);
        })
        .catch((error) => {
          console.error("Error:", error);
          hideMessage();
          showMessage("An error occurred while submitting the form.", "red");
        });
    }

    form.classList.add("was-validated");
  });
}

if (fillButton) {
  fillButton.addEventListener("click", function () {
    document.getElementById("firstName").value = "Victor";
    document.getElementById("lastName").value = "Doe";
    document.getElementById("country").value = "Latvia";
    document.getElementById("city").value = "Riga";
    document.getElementById("zipCode").value = "10001";
    document.getElementById("address").value = "123 Street";
    document.getElementById("deliveryType").selectedIndex = 1; // By car
    document.getElementById("commentsArea").value = "Default comment";
    document.getElementById("termcondition").checked = true;
  });
}

if (resetButton) {
  resetButton.addEventListener("click", () => {
    if (form) {
      form.classList.remove("was-validated");
    }
  });
}

const menuItems = document.querySelectorAll('.menuItem');

if (menuItems.length > 0) {
  // Add click event listener to each menu item
  menuItems.forEach(function(menuItem) {
    menuItem.addEventListener('click', function() {
      // Get the corresponding content element
      const contentId = this.getAttribute('data-content');
      const contentElement = document.getElementById(contentId);

      // Hide all content elements first
      document.querySelectorAll('.content').forEach(function(content) {
        content.classList.add('hidden');
      });

      // Show the corresponding content element
      contentElement.classList.remove('hidden');
    });
  });
}


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
});

//Search for products
let searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let searchQuery = document.getElementById("searchInput").value;
  console.log(searchQuery);
  window.location.href = "/products?search=" + encodeURIComponent(searchQuery);
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

function showMessage(message, color) {
  var messageDiv = document.querySelector(".message-container .message");
  var messageContainer = document.querySelector(".message-container");
  messageDiv.textContent = message;
  messageContainer.style.background = color;
  messageContainer.classList.remove("hidden");
}

function hideMessage() {
  var messageContainer = document.querySelector(".message-container");
  messageContainer.classList.add("hidden");
}
