"use strict";

let blob = document.querySelector(".blob");
let heroBg = document.querySelector("body .hero[data-identifier='questions']");
let profileBg = document.querySelector("body .hero[data-identifier='profile']");
let theme = () =>  localStorage.getItem("theme") || "light";
setHeroBg();
if (
    window.matchMedia("(prefers-color-scheme: dark)").matches ||
    theme() == "dark"
) {
    initAnimation();
}

export function setHeroBg() {
    if(heroBg)
    if (localStorage.getItem("theme") === "light") {
        heroBg.style.background = "linear-gradient(to top, #f7797d, #FBD786, #C6FFDD)";
    }else {
        heroBg.style.background = " radial-gradient(#0000ffdb, var(--toogle-btn-text) 60%)";
    }
    if(profileBg) {
        if (localStorage.getItem("theme") === "light") {
            profileBg.style.background = "";
        }else {
            profileBg.style.background = "radial-gradient(rgba(0, 0, 0, 0.148),#0000ff95, var(--toogle-btn-text) 80%)";
        }
    }
}

function initAnimation() {
    if(blob)
    document.addEventListener("mousemove", (event) => {
        let { clientX, clientY } = event;
        let offset = 10;
        if (
            !(
                clientX >= window.innerWidth - offset ||
                clientY >= window.innerHeight - offset
            ) && theme() === "dark"
        ) {
            blob.style.display = "block";
            blob.style.top = clientY + "px";
            blob.style.left = clientX + "px";
            if (clientX - offset <= 0 || clientY - offset <= 0) {
                blob.style.display = "none";
            }
        } else {
            blob.style.display = "none";
        }
    });
}
