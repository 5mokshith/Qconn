"use strict";

import { supabaseClient } from "./main.js";
const profilePicture = document.querySelector(".profile-picture img");
const userName = document.querySelector(".details h1");
const userRole = document.querySelector(".details h3");
const questionsAnswered = document.querySelector(".questions-answered span");
const questionsAsked = document.querySelector(".questions-asked span");
const achievements = document.querySelector(".achievements span");

let currentUser;

function renderUser() {
  let selectedUser = JSON.parse(sessionStorage.getItem("selectedUser"));
  if (selectedUser) {
    profilePicture.src = selectedUser.profilePicture;
    userName.textContent = selectedUser.userName;
    userRole.textContent = selectedUser.role;
    questionsAnswered.textContent = selectedUser.Qans;
    questionsAsked.textContent = selectedUser.Qask;
    achievements.textContent = selectedUser.achievementPoints;
    sessionStorage.removeItem("selectedUser");
  } else if(currentUser) {
    profilePicture.src = currentUser.profilePicture;
    userName.textContent = currentUser.userName;
    userRole.textContent = currentUser.role;
    questionsAnswered.textContent = currentUser.questionsAnswered;
    questionsAsked.textContent = currentUser.questionsAsked;
    achievements.textContent = currentUser.achievementPoints;
  }
}

async function getUser() {
  try {
    let {data:session, error:sessionError} = await supabaseClient.auth.getSession();
    let currentUserId = session.session.user.id;
    let { data: currentUser, error} = await supabaseClient.from("Users").select("*").eq("id", currentUserId);
    console.log(currentUser[0]);
    if(sessionError || error) {
      return;
    }
    return currentUser[0];
  }
  catch(error) {
    console.error(error);
  }
}

window.onload = async () => {
  currentUser = await getUser();
  renderUser();
};
