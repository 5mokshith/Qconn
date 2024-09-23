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

export const setAOS = (element) => {
    let dataAOS = ['slide-right','slide-left'];
    element.setAttribute('data-aos',dataAOS[Math.floor(Math.random()*2)]);
    if(element.getAttribute('data-aos') === 'slide-right')
        element.setAttribute('data-aos','fade-right');
    else
        element.setAttribute('data-aos','fade-left');
    element.setAttribute('data-aos-delay','500');
}