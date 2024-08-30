"use strict"

export const isclicked = (btn) => {
    let clicked = btn.getAttribute("data-clicked");
    if (clicked === "false") {
        btn.setAttribute("data-clicked", "true");
        return false;
    }
    return true;
};

export const closeModal = (event) => {
    let btn = event.target.closest('.close');
    let modalName = btn.getAttribute('data-modal');
    let currentModal = undefined;
    switch(modalName) {
        case 'show-answers':
            currentModal = document.querySelector('.modal');
            currentModal.style.display = "none";
            break;
        case 'write-answer':
            currentModal = document.querySelector('.modal-ans');
            currentModal.style.display = "none";
        default :
            break;
    }
}