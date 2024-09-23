'use strict'

import User from "./users.js";

const profilePicture = document.querySelector('.profile-picture img');
const userName = document.querySelector('.details h1');
const userRole = document.querySelector('.details h3');
const questionsAnswered = document.querySelector('.questions-answered span');
const questionsAsked = document.querySelector('.questions-asked span');
const achievements = document.querySelector('.achievements span');

let currentUser = getUser();

function renderUser() {
    let selectedUser = JSON.parse(sessionStorage.getItem('selectedUser'));
    if(selectedUser) {
        profilePicture.src = selectedUser.profilePicture;
        userName.textContent = selectedUser.userName;
        userRole.textContent = selectedUser.role;
        questionsAnswered.textContent = selectedUser.Qans;
        questionsAsked.textContent = selectedUser.Qask;
        achievements.textContent = selectedUser.achievementPoints;
        sessionStorage.removeItem('selectedUser');
    }
    else {
        profilePicture.src = currentUser.profilePicture;
        userName.textContent = currentUser.userName;
        userRole.textContent = currentUser.role;
        questionsAnswered.textContent = currentUser.Qans;
        questionsAsked.textContent = currentUser.Qask;
        achievements.textContent = currentUser.achievementPoints;
    }
}

function getUser() {
    return new User('Mokshith rao','student',5,10,5);
}



window.onload = () => {
    renderUser();
}