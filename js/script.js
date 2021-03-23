/*
  This JS is from the following project:
  https://github.com/bushblade/Full-Screen-Touch-Slider
*/

const slider = document.querySelector(".slider-container"),
  slides = Array.from(document.querySelectorAll(".slide"));

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID = 0,
  currentIndex = 0;

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector("img");
  slideImage.addEventListener("dragstart", e => e.preventDefault());

  // Touch events
  slide.addEventListener("touchstart", touchStart(index));
  slide.addEventListener("touchend", touchEnd);
  slide.addEventListener("touchmove", touchMove);

  // Mouse events
  slide.addEventListener("mousedown", touchStart(index));
  slide.addEventListener("mouseup", touchEnd);
  slide.addEventListener("mouseleave", touchEnd);
  slide.addEventListener("mousemove", touchMove);
});

// // Disable context menu
// window.oncontextmenu = function(event) {
//   event.preventDefault();
//   event.stopPropagation();
//   return false;
// };

function touchStart(index) {
  return function(event) {
    currentIndex = index;
    startPos = getPositionX(event);
    isDragging = true;

    // https://css-tricks.com/using-requestanimationframe/
    animationID = requestAnimationFrame(animation);
    slider.classList.add("grabbing");
  };
}

function touchEnd() {
  isDragging = false;
  cancelAnimationFrame(animationID);

  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex += 1;

  if (movedBy > 100 && currentIndex > 0) currentIndex -= 1;

  setBackground();

  setPositionByIndex();

  slider.classList.remove("grabbing");
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function getPositionX(event) {
  return event.type.includes("mouse") ? event.pageX : event.touches[0].clientX;
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;
  setSliderPosition();
}

// Set background
function setBackground() {
  backProduct = document.querySelector(".background-product");

  if (currentIndex == 0) {
    backProduct.style.height = "100%";
    backProduct.style = "clip-path: polygon(0 0, 100% 0%, 100% 100%, 0% 100%)";
  } else {
    backProduct.style.height = "";
    backProduct.style =
      "clip-path:polygon(0 0, 100% 0%, 100% 71%, 0% 100%);height: 50%;";
  }
}

// Move to home
const toHome = document.querySelector("header>h3");

toHome.onclick = function() {
  slider.style.transform = `translateX(0px)`;
  currentIndex = 0;
  console.log(currentIndex);
  setBackground();
};

// Info in panel
const cupertino_panel = document.querySelector(".cupertino-pane>h1");

function infoPanel() {
  if (currentIndex == 1) {
    cupertino_panel.innerHTML = "Headphones";
  } else if (currentIndex == 2) {
    cupertino_panel.innerHTML = "Headphones";
  } else if (currentIndex == 3) {
    cupertino_panel.innerHTML = "LG V-series";
  }
}

// Serch panel
const search = document.querySelector("header>.fa-search"),
  menu = document.querySelector("header>.fa-bars"),
  searchModal = document.querySelector(".modal-search"),
  closeModal = document.querySelectorAll(".fa-times"),
  menuModal = document.querySelector(".modal-menu"),
  modal = document.querySelectorAll(".modal");

////// Close Modal
closeModal.forEach(close => {
  close.onclick = function() {
    toActive();
    let timeId = setTimeout(modalNone, 600);
    function modalNone() {
      searchModal.style.display = "none";
    }
  };
});

///// Open Modal
search.onclick = function() {
  searchModal.style.display = "block";
  let timerId = setTimeout(toActive, 50);
};

menu.onclick = function() {
  menuModal.style.display = "block";
  let timerId = setTimeout(toActive, 50);
};

menu.onclick = function() {
  menuModal.style.display = "block";
  let timerId = setTimeout(toActive, 50);
};

function toActive() {
  if (searchModal.style.display == "block") {
    searchModal.classList.toggle("active");
    console.log("search");
  } else if (menuModal.style.display == "block") {
    menuModal.classList.toggle("active");
    console.log("menu");
  }
}

const btns = document.querySelectorAll(".btn"),
  pane = document.querySelector(".pane"),
  cupertino_pane = document.querySelector(".cupertino-pane");

btns.forEach(btn => {
  btn.onclick = function() {
    renderPane();
  };
});

function renderPane() {
  var myPane = new CupertinoPane(
    ".cupertino-pane", // Pane container selector
    {
      parentElement: "body", // Parent container
      breaks: {
        middle: { enabled: true, height: 300, bounce: true },
        bottom: { enabled: true, height: 80 }
      },
      onDrag: () => console.log("Drag event")
    }
  );
  myPane.present({ animate: true });
  infoPanel();
}
