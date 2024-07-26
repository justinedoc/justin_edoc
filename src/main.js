"use strict";

//// NAVBAR TOGGLE ////
const toggleMenu = () => {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".mobile-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
};

//// NAVBAR TOGGLE ENDS ////

//// TEXT ANIMATION ////

let TxtRotate = function (el, toRotate, period) {
  this.toRotate = toRotate;
  this.el = el;
  this.loopNum = 0;
  this.period = parseInt(period, 10) || 2000;
  this.txt = "";
  this.tick();
  this.isDeleting = false;
};

TxtRotate.prototype.tick = function () {
  let i = this.loopNum % this.toRotate.length;
  let fullTxt = this.toRotate[i];

  if (this.isDeleting) {
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  this.el.innerHTML = '<span class="wrap">' + this.txt + "</span>";

  let that = this;
  let delta = 300 - Math.random() * 100;

  if (this.isDeleting) {
    delta /= 2;
  }

  if (!this.isDeleting && this.txt === fullTxt) {
    delta = this.period;
    this.isDeleting = true;
  } else if (this.isDeleting && this.txt === "") {
    this.isDeleting = false;
    this.loopNum++;
    delta = 500;
  }

  setTimeout(function () {
    that.tick();
  }, delta);
};

window.onload = function () {
  let elements = document.getElementsByClassName("txt-rotate");
  for (let i = 0; i < elements.length; i++) {
    let toRotate = elements[i].getAttribute("data-rotate");
    let period = elements[i].getAttribute("data-period");
    if (toRotate) {
      new TxtRotate(elements[i], JSON.parse(toRotate), period);
    }
  }
};

//// TEXT ANIMATION ENDS ////

//// SECTION SCROLL-NAV ANIMATION ////

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".links");

window.onscroll = () => {
  sections.forEach((sect) => {
    const top = window.scrollY,
      offset = sect.offsetTop,
      height = sect.offsetHeight,
      id = sect.getAttribute("id");

    if (top >= offset && top < offset + height) {
      navLinks.forEach((link) => {
        link.classList.remove("onVisit");
      });

      document
        .querySelector(".nav-links a[href*=" + id + "]")
        .classList.add("onVisit");
    }
  });
};

//// SECTION SCROLL-NAV ANIMATION ENDS ////

//// REVEALING HIDDEN TEXT ////

document.querySelector(".read_more").addEventListener("click", () => {
  const aboutText = document.querySelectorAll(".text");
  for (let i = 0; i < aboutText.length; i++) {
    aboutText[i].classList.toggle("active");
  }
});

//// RH ENDS ////

///// SCROLL-X ANIMATION /////

const sliderBtns = document.querySelectorAll(".slider_btn");
const [left, right] = sliderBtns;

const scrollers = document.querySelectorAll(".slider");
const addAnimation = function () {
  scrollers.forEach((scroller) => {
    scroller.setAttribute("data-animated", true);

    const scrollerInner = scroller.querySelector(".slide-track");
    const scrollerContent = Array.from(scrollerInner.children);

    for (let item of scrollerContent) {
      const duplicatedItem = item.cloneNode(true);
      duplicatedItem.setAttribute("aria-hidden", true);
      scrollerInner.appendChild(duplicatedItem);
    }
  });
};

addAnimation();

////// END OF SCROLL-X ANIMATION /////

//// SCROLL-X ANIMATION CONTROLS ////

const nextPrev = (btn, dir) => {
  btn.addEventListener("click", () => {
    scrollers.forEach((scroller) => {
      scroller.setAttribute("data-direction", dir);
    });
  });
};
nextPrev(left, "right");
nextPrev(right, "left");

const playBtnWrapper = document.querySelector(".play__btn");
const playBtn = document.querySelector(".play_btn");
const pause = (btn) => {
  btn.addEventListener("click", () => {
    scrollers.forEach((scroller) => {
      scroller.classList.toggle("pause");

      if (scroller.classList.contains("pause")) {
        playBtnWrapper.children[0].classList.replace("bx-play", "bx-pause");
      } else {
        playBtnWrapper.children[0].classList.replace("bx-pause", "bx-play");
      }
    });
  });
};
pause(playBtn);

//// END OF SCROLL-X CONTROLS ////

//// DARKMODE FUNCTIONALITY ////

const container = document.querySelector(".container");
const modeToggleBtn = document.querySelectorAll(".toggle_icon");
const icons = document.querySelectorAll(".toggle_icon i");

// FUCNCTION TO ACTIVATE DARKMODE

const activateDarkMode = (boo) => {
  if (boo) {
    container.id = `dark-container`;
  } else {
    container.id = `light-mode`;
  }

  icons.forEach((icon) => {
    boo
      ? icon.classList.add("bx-sun") // SWAPPING ICONS BASED ON THE CURRENT THEME
      : icon.classList.replace("bx-sun", "bx-moon");
  });

  // STORING THE CURRENT THEME

  const darkModeActivated = container.id === `dark-container`;
  localStorage.setItem("theme", darkModeActivated ? "dark" : "light");
  console.log("darkmode toggled: ", darkModeActivated ? "on" : "off");
};

const darkMode = () => {
  // CHECKING CURRENT DEVICE THEME

  let isDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  // WATCHING THE DEVICE'S THEME FOR CHANGE

  const currentTheme = window.matchMedia("(prefers-color-scheme: dark)");
  currentTheme.addEventListener("change", () => {
    isDark = isDark ? false : true;
    activateDarkMode(isDark);
  });

  // TOGGLE BETWEEN MODES WITH BUTTON

  modeToggleBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      isDark = isDark ? false : true;
      activateDarkMode(isDark);
    });
  });

  if (!window.matchMedia("(prefers-color-scheme: dark)").matches) {
    modeToggleBtn.forEach((btn) => {
      btn.click();
    });
  }

  // LOADING SAVED THEME ON PAGELOAD

  document.addEventListener("DOMContentLoaded", () => {
    const savedTheme = localStorage.getItem("theme");
    switch (savedTheme) {
      case "light":
        container.id = `light-mode`;
        isDark = false;
        break;
      case "dark":
        container.id = `dark-container`;
        isDark = true;
        break;
    }

    // SWAPPING ICONS
    icons.forEach((icon) => {
      isDark
        ? icon.classList.add("bx-sun")
        : icon.classList.replace("bx-sun", "bx-moon");
    });
  });
};

darkMode();

///// DARKMODE FUNCTIONALITY IMPLEMENTATION ENDS ////

///// PAGE AND SCROLL-Y ANIMATIONS ////

const canAnimate = function () {
  myReveal({
    origin: "top",
    distance: "30px",
    duration: 1000,
    delay: 200,
    reset: true,
  });

  myReveal().reveal(
    ".text-container, #contact .btn, #home .section_pic_container",
    { origin: "top" }
  );

  myReveal().reveal(
    ".section_text_p1, #about .section_pic_container,#experience .experience-sub-title, .head h2, .section_text_p, #home .btn-container",
    { origin: "left" }
  );

  myReveal().reveal(
    ".title, .btn-wrapper, .head p, .contact-info-container li, .name_1, .intro",
    { origin: "right" }
  );

  myReveal().reveal(
    "#about .details-containers, .text_1 , .article-container article, .input-section, label, #contact i,  .change-text,  footer ul li",
    {
      origin: "bottom",
    }
  );

  anime({
    targets: ".social-icons i",
    translateX: [100, 0],
    duration: 1000,
    opacity: [0, 1],
    delay: anime.stagger(300, { easing: "easeOutQuad" }, { from: "last" }),
  });
};

//// PAGE AND SCROLL-Y ANIMATIONS ENDS ////

//// INITIALIZING SCROLL-Y ANIMATIONS ////

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  canAnimate();
}
