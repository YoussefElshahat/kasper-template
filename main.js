// nav functinalty

var listElemnt = document.getElementsByClassName("nav");
for (let index = 0; index < listElemnt.length; index++) {
  listElemnt[index].addEventListener("mouseover", () => {
    listElemnt[index].style.color = "#19c8fa";
    // listElemnt[index].style.borderBottom = "1px solid #19c8fa";
  });
}
for (let index = 0; index < listElemnt.length; index++) {
  listElemnt[index].addEventListener("mouseleave", () => {
    listElemnt[index].style.color = "white";
    listElemnt[index].style.borderBottom = "none";
  });
}

// Search
// var searcIcone = document.getElementById("search-icone");
// var searchBar = document.getElementById("searchBar");

// //Add a function to remove the underline and bold from the matched text by restoring the original content.
// function resetSearchHighlights() {
//   let elements = document.querySelectorAll("body *");

//   elements.forEach(function (element) {
//     if (element.children.length === 0 && element.textContent.trim() !== "") {
//       // Remove any <span class="underline"> tags
//       element.innerHTML = element.textContent; // Reset the element to its original text
//     }
//   });
// }
// document.getElementById("search-icone").addEventListener("click", function () {
//   resetSearchHighlights(); // Reset previous highlights

//   let searchTerm = searchBar.value;
//   let filter = searchTerm.toUpperCase();
//   let elements = document.querySelectorAll("body *"); // Select all elements inside the body
//   let found = false; // Flag to check if we found a match

//   elements.forEach(function (element) {
//     // Skip elements that don't have direct text content (like scripts or iframes)
//     if (element.children.length === 0 && element.textContent.trim() !== "") {
//       let elementText = element.textContent.toUpperCase();
//       let originalText = element.textContent;

//       // Reset any previous highlights
//       element.innerHTML = originalText;

//       if (elementText.indexOf(filter) > -1 && searchTerm !== "") {
//         // Underline the matched text
//         let regex = new RegExp(`(${searchTerm})`, "gi");
//         let underlinedText = originalText.replace(
//           regex,
//           '<span class="underline">$1</span>'
//         );
//         element.innerHTML = underlinedText;

//         if (!found) {
//           // Scroll to the first occurrence
//           let firstMatch = element.querySelector(".underline");
//           if (firstMatch) {
//             firstMatch.scrollIntoView({ behavior: "smooth", block: "center" });
//             found = true; // Set the flag to true to prevent scrolling to subsequent matches
//           }
//         }
//       }
//     }
//   });
// });

//Toggle Menue

var toggle = document.getElementById("toggle");
var ul = document.getElementById("menue");

function showMenu() {
  ul.classList.add("shortmenue");
}

function hideMenu() {
  ul.classList.remove("shortmenue");
}

toggle.addEventListener("mouseover", showMenu);
toggle.addEventListener("mouseleave", () => {
  setTimeout(() => {
    if (!ul.matches(":hover")) {
      hideMenu();
    }
  }, 100);
});

// start Landing
let landing = document.getElementsByClassName("landing")[0];
let leftIcon = document.getElementsByClassName("left-icon")[0];
let rightIcon = document.getElementsByClassName("right-icon")[0];
let bullets = document.getElementsByClassName("bullet");

let images = [
  "./images/landing1.jpg",
  "./images/landing2.jpg",
  "./images/landing3.jpg",
];

let currentIndex = 0;

function updateBackgroundImage() {
  landing.style.backgroundImage = `url('${images[currentIndex]}')`;

  // Remove active class from all bullets
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].classList.remove("active-bullet");
  }

  // Add active class to the current bullet
  bullets[currentIndex].classList.add("active-bullet");
}

leftIcon.addEventListener("click", () => {
  currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
  updateBackgroundImage();
});

rightIcon.addEventListener("click", () => {
  currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
  updateBackgroundImage();
});

// Initialize with the first image
updateBackgroundImage();

// Handle touch events
landing.addEventListener("touchstart", handleTouchStart, false);
landing.addEventListener("touchmove", handleTouchMove, false);

let xDown = null;
let yDown = null;

function getTouches(evt) {
  return evt.touches || evt.originalEvent.touches;
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  let xUp = evt.touches[0].clientX;
  let yUp = evt.touches[0].clientY;

  let xDiff = xDown - xUp;
  let yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    if (xDiff > 0) {
      // Swipe left
      currentIndex = currentIndex < images.length - 1 ? currentIndex + 1 : 0;
    } else {
      // Swipe right
      currentIndex = currentIndex > 0 ? currentIndex - 1 : images.length - 1;
    }
    updateBackgroundImage();
  }
  // Reset values
  xDown = null;
  yDown = null;
}
// End Landing

// Start Portofolio

/// Shuffling
document.addEventListener("DOMContentLoaded", function () {
  const filterButtons = document.querySelectorAll(".shuffle li");
  const boxes = document.querySelectorAll(".imgs-container .box");

  // Define media queries
  const mediaQueryMedium = window.matchMedia("(min-width: 768px)");
  const mediaQueryLarge = window.matchMedia("(min-width: 1199px)");

  function getScreenSize() {
    if (mediaQueryLarge.matches) {
      return "large";
    } else if (mediaQueryMedium.matches) {
      return "medium";
    } else {
      return "small";
    }
  }

  function applyFilter() {
    const screenSize = getScreenSize();
    const activeFilter = document
      .querySelector(".shuffle li.active")
      .getAttribute("data-filter");

    // Filtered boxes based on the selected category
    let filteredBoxes = Array.from(boxes).filter((box) => {
      return (
        activeFilter === "all" ||
        box.getAttribute("data-category") === activeFilter
      );
    });

    // Apply styles based on screen size and number of filtered boxes
    filteredBoxes.forEach((box) => {
      box.classList.add("active");
      if (screenSize === "large" && filteredBoxes.length <= 2) {
        box.style.flexBasis = "50%";
      } else if (screenSize === "large") {
        box.style.flexBasis = "25%";
      } else if (screenSize === "medium") {
        box.style.flexBasis = "50%";
      } else {
        box.style.flexBasis = "100%";
      }
    });

    // Hide non-filtered boxes
    boxes.forEach((box) => {
      if (!filteredBoxes.includes(box)) {
        box.classList.remove("active");
        box.style.flexBasis = "";
      }
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      applyFilter();
    });
  });

  // Trigger the click event on the "All" filter to show all items by default
  document.querySelector('.shuffle li[data-filter="all"]').click();

  // Add event listeners to update the layout if the viewport size changes
  function updateLayoutOnResize() {
    applyFilter();
  }

  mediaQueryMedium.addEventListener("change", updateLayoutOnResize);
  mediaQueryLarge.addEventListener("change", updateLayoutOnResize);
});

// End Portofolio
