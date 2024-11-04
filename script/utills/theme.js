"use strict";

const buttonBox = document.querySelector(".toggle-box");
const btn = document.querySelector(".toggle-icon");
const userDeviceColorMode = window.matchMedia("(prefers-color-scheme: dark)");
function changeButtonState() {
  let buttonState = buttonBox.getAttribute("data-active");
  if (buttonState === "false") {
    /* btn.style.right = 0; */
    btn.style.left = "50%";
    buttonBox.style.background = "blue";
    buttonBox.setAttribute("data-active", "true");
    //Theme operations
    localStorage.setItem("theme", "dark");
    document.body.setAttribute("data-dark-mode", "true");
  } else if (buttonState === "true") {
    btn.style.left = "15%";
    /* btn.style.right = "50%"; */
    buttonBox.style.background = "#c0c0c0";
    buttonBox.setAttribute("data-active", "false");
    //Theme operations
    localStorage.setItem("theme", "light");
    document.body.setAttribute("data-dark-mode", "false");
  }
}
buttonBox.addEventListener("click", changeButtonState);

const setTheme = () => {
  let currentTheme = localStorage.getItem("theme");
  if (currentTheme === "dark") {
    document.body.setAttribute("data-dark-mode", "true");
    btn.style.left = "50%";
    buttonBox.style.background = "blue";
    buttonBox.setAttribute("data-active", "true");
  } else {
    document.body.setAttribute("data-dark-mode", "false");
    btn.style.left = "15%";
    /* btn.style.right = "50%"; */
    buttonBox.style.background = "#c0c0c0";
    buttonBox.setAttribute("data-active", "false");
  }
};

window.addEventListener("DOMContentLoaded", () => {
  if(localStorage.getItem('theme') === null) {
	  userDeviceColorMode
		? localStorage.setItem("theme", "dark")
		: localStorage.setItem("theme", "light");
  }
  setTheme();
});

  userDeviceColorMode.addEventListener("change", () => {
    if(userDeviceColorMode.matches) {
      localStorage.setItem("theme", "dark");
      window.location.reload();
    }
    else {
      localStorage.setItem("theme", "light");
      window.location.reload();
    }
  });
