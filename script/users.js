"use strict";

import { supabaseClient } from "./main.js";
import { displayMessage } from "./utills/utilities.js";

const container = document.querySelector(".wrapper");

export default class User {
  constructor(userName, role, achievementPoints, Qans, Qask, userRank, profilePicture) {
    this.userName = userName;
    this.role = role;
    this.achievementPoints = achievementPoints;
    this.Qans = Qans;
    this.Qask = Qask;
    this.userRank = userRank;
    this.profilePicture =
      profilePicture || "/images/defaultProfilePicture.jpg";
  }

  //TODO : Figure out how to get users profile image
}

let Users = [];


export async function fetchUsers() {
  let { data, error } = await supabaseClient.from("Users").select("*");
  if(error) {
    displayMessage("Some unknown error occured ", true);
    return [];
  }
  return data.map((user) => {
    return new User(
      user.userName,
      user.role,
      user.achievementPoints,
      user.questionsAnswered,
      user.questionsAsked,
      user.rank
    )
  });
}
function renderUsers() {
   Users.forEach((user) => {
    let card = document.createElement("div");
    card.classList.add("card", "flex");
    card.innerHTML = `
                <section role="img" class="flex-column">
                <img src="${user.profilePicture}" alt="User profile picture" />
                </section>
                <div class="flex-column info">
                    <h3>${user.userName}</h3>

                    <p><b>Role:</b> <span>${user.role}</span></p>
                    <p><b>Experience points:</b> <span>${user.achievementPoints}</span></p>
                    <button class="btn">View profile</button>
                </div>`;
    card
      .querySelector(".btn")
      .addEventListener("click", () => handleViewProfile(user));
    if (container) container.appendChild(card);
  });
}

const handleViewProfile = (user) => {
  sessionStorage.setItem("selectedUser", JSON.stringify(user));
  window.location.href = "../profile.html";
};

window.onload = async () => {
  Users = await fetchUsers();
  renderUsers();
};
