"use strict";

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
      profilePicture || "../images/defaultProfilePicture.jpg";
  }

  //TODO : Figure out how to get users profile image
}

// TODO : Get users data from server
export const Users = [
  new User("Javascript", "student", 5, 10, 5, 1),
  new User("Mokshith rao", "student", 5, 10, 5, 2),
  new User("Ramakrishna", "student", 5, 10, 5, 3),
];

function renderUsers() {
  Users.forEach((user) => {
    let card = document.createElement("div");
    card.classList.add("card", "flex");
    card.innerHTML = `
                <section role="img" class="flex-column">
                    <a href="#"><img src="${user.profilePicture}" alt="User profile picture" /></a>
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

window.onload = () => {
  renderUsers();
};
