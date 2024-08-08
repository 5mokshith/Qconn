"use strict";

const buttonBox = document.querySelector(".toggle-box");
const btn = document.querySelector(".toggle-icon");

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
  let currentTheme = localStorage.getItem("theme") || "light";
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

window.onload = () => {
  setTheme();
};
