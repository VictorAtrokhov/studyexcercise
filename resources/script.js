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

const menuItems = document.querySelectorAll(".menuItem");

if (menuItems.length > 0) {
  // Add click event listener to each menu item
  menuItems.forEach(function (menuItem) {
    menuItem.addEventListener("click", function () {
      // Get the corresponding content element
      const contentId = this.getAttribute("data-content");
      const contentElement = document.getElementById(contentId);

      // Hide all content elements first
      document.querySelectorAll(".content").forEach(function (content) {
        content.classList.add("hidden");
      });
      menuItems.forEach((item) => item.classList.remove("selectedMenu"));

      // Show the corresponding content element
      menuItem.classList.add("selectedMenu");
      contentElement.classList.remove("hidden");
    });
  });
}

//Search for products
let searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let searchQuery = document.getElementById("searchInput").value;
  console.log(searchQuery);
  window.location.href = "/products?search=" + encodeURIComponent(searchQuery);
});

function getQuote() {
  // Define a callback function name
  const callbackName = "quoteCallback";

  // Create a script element
  const script = document.createElement("script");

  // Generate a unique callback function name
  window[callbackName] = function (data) {
    // Remove the script tag and callback function
    script.remove();
    delete window[callbackName];

    // Extract quote text and author from the data
    const quoteText = data.quoteText;
    let quoteAuthor = data.quoteAuthor;
    if (!quoteAuthor) {
      quoteAuthor = "Unknown author";
    }
    // Display the quote
    displayQuote(quoteText, quoteAuthor);
  };

  // Set the source of the script element to the JSONP endpoint
  script.src = `https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=${callbackName}`;

  // Append the script tag to the document body to initiate the request
  document.body.appendChild(script);
}

function displayQuote(quoteText, quoteAuthor) {
  const quoteDisplay = document.getElementById("quoteDisplay");
  quoteDisplay.innerHTML = `<p class="quote-text">"${quoteText}"</p><p class="author-text">- <em>${quoteAuthor}</em></p>`;
}

const fetchButton = document.getElementById("ipCountry");
const productCountryContent = document.getElementById("productCountryContent");

if (fetchButton) {
  fetchButton.addEventListener("click", async () => {
    try {
      const response = await fetch("https://get.geojs.io/v1/ip/country.json");
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      const data = await response.text();
      const parsedData = JSON.parse(data);

      // Extract IP and country from the parsed data
      const ip = parsedData.ip;
      const country = parsedData.name;

      productCountryContent.textContent = `Your IP is: ${ip} and your country is ${country}. This country supports delivery of this product.`;
    } catch (error) {
      productCountryContent.textContent =
        "This API might fail if you have some sort of addblock. try without it :)";
      console.error("Error fetching IP and country data:", error);
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  var cookieOverlay = document.getElementById("cookie-overlay");
  var agreeBtn = document.getElementById("agree-btn");
  var dismissBtn = document.getElementById("dismiss-btn");

  if (!getCookie("cookieConsent")) {
    cookieOverlay.style.display = "flex";
  }

  if (getCookie("cookieConsent") === "dismissed") {
    setCookie("cookieConsent", "dismissed", 5);
  }

  agreeBtn.addEventListener("click", function () {
    cookieOverlay.style.display = "none";
    setCookie("cookieConsent", "agreed", 365 * 24 * 60); // Expires in 365 days
  });

  dismissBtn.addEventListener("click", function () {
    cookieOverlay.style.display = "none";
    setCookie("cookieConsent", "dismissed", 5); 
  });
});

// Function to set cookie with expiration in minutes
function setCookie(name, value, minutes) {
  var expires = "";
  if (minutes) {
    var date = new Date();
    date.setTime(date.getTime() + minutes * 60 * 1000);
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

function clearCookie(cookieName) {
  document.cookie = cookieName + "=; path=/;";
  window.location.reload();
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
