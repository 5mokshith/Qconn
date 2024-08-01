"use strict";
const themeSelector = document.querySelector(".toogle-btn");

const setTheme = () => {
    let currentTheme = localStorage.getItem("theme") || "light";
    if (currentTheme === "dark") {
        document.body.setAttribute("data-dark-mode", "true");
        themeSelector.textContent = "Light mode";
    } else {
        document.body.setAttribute("data-dark-mode", "false");
        localStorage.setItem("theme", "light");
    }
};


themeSelector.addEventListener("click", () => {
    if (document.body.getAttribute("data-dark-mode") === "true") {
        document.body.setAttribute("data-dark-mode", "false");
        localStorage.setItem("theme", "light");
        themeSelector.textContent = "Dark mode";
    } else if (document.body.getAttribute("data-dark-mode") === "false") {
        document.body.setAttribute("data-dark-mode", "true");
        localStorage.setItem("theme", "dark");
        themeSelector.textContent = "Light mode";
    }
    themeSelector.classList.add("toogle-active");
});

themeSelector.addEventListener("animationend", () => {
    themeSelector.classList.remove("toogle-active");
});

window.onload = () => {
    setTheme();
};
