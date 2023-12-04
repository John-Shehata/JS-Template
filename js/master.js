let colorLis = document.querySelectorAll(".colors-list li");
let randomBackEl = document.querySelectorAll(".random-backgrounds span");
let bgOption = true;
let bulletsSpans = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let randomInterval;

// Check local storage of color
if (localStorage.getItem("color_option")) {
  document.documentElement.style.setProperty(
    "--main-color",
    localStorage.getItem("color_option")
  );
  colorLis.forEach((color) => {
    color.classList.remove("active");
    if (color.dataset.color === localStorage.getItem("color_option")) {
      color.classList.add("active");
    }
  });
}
// Check local storage of background option
if (localStorage.getItem("background_option") != null) {
  randomBackEl.forEach((span) => {
    span.classList.remove("active");
  });
  if (localStorage.getItem("background_option") === "true") {
    bgOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    bgOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

// Check local storage of bullets option
if (localStorage.getItem("bullets_option")) {
  bulletsSpans.forEach((span) => {
    span.classList.remove("active");
  });
  if (localStorage.getItem("bullets_option") === "block"){
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}

// Main Settings Box
document.querySelector(".toggle-settings .fa-gear").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

// Switch Colors
// Loop for colors
colorLis.forEach((li) => {
  // When clicked a color
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.dataset.color
    );
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(colorLis, e);
  });
});

// Switch Random Background Option
// Loop On All Spans
randomBackEl.forEach((span) => {
  // When clicked a span
  span.addEventListener("click", (e) => {
    handleActive(randomBackEl, e);

    if (e.target.dataset.background === "yes") {
      bgOption = true;
      randomImage();
      localStorage.setItem("background_option", true);
    } else {
      bgOption = false;
      clearInterval(randomInterval);
      localStorage.setItem("background_option", false);
    }
  });
});

// Landing Page
let landingPage = document.querySelector(".landing-page");
let landingPageImgs = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Random Image
function randomImage() {
  if (bgOption) {
    randomInterval = setInterval(function () {
      let randomImage = Math.floor(Math.random() * landingPageImgs.length);
      landingPage.style.backgroundImage =
        'url("imgs/' + landingPageImgs[randomImage] + '")';
    }, 1000);
  }
}
randomImage();

// Skills progress
let skillSec = document.querySelector(".skills");
window.addEventListener("scroll", () => {
  if (window.scrollY >= skillSec.offsetTop - 300) {
    let allSkills = document.querySelectorAll(".skills .skill-progress span");
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
});

// Create Popup With The Image
let ourGallery = document.querySelectorAll(".gallery img");

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Create Overlay Element
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    document.body.appendChild(overlay);

    // Create The Popup Box
    let popupBox = document.createElement("div");
    popupBox.className = "popup-box";

    if (img.alt !== null) {
      // Create Heading
      let imgHeading = document.createElement("h3");
      let imgText = document.createTextNode(img.alt);
      imgHeading.appendChild(imgText);
      popupBox.appendChild(imgHeading);
    }

    // Create The Image
    let popupImage = document.createElement("img");
    popupImage.src = e.target.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);

    // Create The Close Span
    let closeButton = document.createElement("span");
    let closeButtonText = document.createTextNode("X");
    closeButton.appendChild(closeButtonText);
    closeButton.className = "close-button";
    popupBox.appendChild(closeButton);
  });
});

// Close Popup
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove The Current Popup
    e.target.parentNode.remove();
    // Remove Overlay
    document.querySelector(".popup-overlay").remove();
  }
});

// Scroll of bullets and nav items
let allBullets = document.querySelectorAll(".nav-bullets .bullet");
let Links = document.querySelectorAll(".links a");

// Function Scroll to any section
function scrollToSection(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSection(allBullets);
scrollToSection(Links);

// Function handle active classes
function handleActive(elements, ev) {
  elements.forEach((ele) => {
    ele.classList.remove("active");
  });
  ev.target.classList.add("active");
}

// Switch of bullets option
bulletsSpans.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "show") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handleActive(bulletsSpans, e);
  });
});

// Reset Button 
document.querySelector(".reset-options").onclick = function() {
  localStorage.clear();
  window.location.reload();
}

// Toggle Menu 
let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {
  e.stopPropagation();
  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};

// Click Anywhere Outside Menu And Toggle Button
document.addEventListener("click", (e) => {
  if (e.target !== toggleBtn && e.target !== tLinks) {
    // Check If Menu Is Open
    if (tLinks.classList.contains("open")) {
      toggleBtn.classList.toggle("menu-active");
      tLinks.classList.toggle("open");
    }
  }
});
// Stop Propagation On Menu 
tLinks.onclick = function (e) {
  e.stopPropagation();
}