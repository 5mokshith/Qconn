"use strict";
import { Users } from "./users.js";
const table = document.querySelector("table");
const searchBar = document.querySelector("input[type=search]")

function renderProfiles(users = Users) {
  table.querySelectorAll("tr:not(:first-child)").forEach(row => row.remove());
  users.forEach((user,index) => {

    let tableRow = document.createElement("tr");

    //Adding ranking
    let ranking = document.createElement('td');
    ranking.textContent = user.userRank || index + 1;
    let tableDataName = document.createElement("td");

    let profilePic = document.createElement("img");
    profilePic.src = user.profilePicture;
    profilePic.alt = user.userName + "'s profile picture";
    profilePic.style.width = "50px"; 
    profilePic.style.marginInlineEnd = "50px"; 
    profilePic.style.borderRadius = "50%";
    
    //userName
    tableDataName.appendChild(profilePic);
    tableDataName.innerHTML = tableDataName.innerHTML + user.userName;

    //Other data :)
    let tableDataQask = document.createElement("td");
    tableDataQask.textContent = user.Qask;
    let tableDataQans = document.createElement("td");
    tableDataQans.textContent = user.Qans;
    let tableDataAchievementPoints = document.createElement("td");
    tableDataAchievementPoints.textContent = user.achievementPoints;
    let tableDataRole = document.createElement("td")
    tableDataRole.textContent = user.role;


    tableRow.append(ranking, tableDataName, tableDataQans, tableDataQask, tableDataAchievementPoints, tableDataRole);
    table.append(tableRow);
  });
}


searchBar.addEventListener('input',(event) => {
  let searchValue = event.target.value.toLowerCase();
  let filteredUsers = Users.filter(user => {
    return user.userName.toLowerCase().includes(searchValue);
  });
  renderProfiles(filteredUsers);
});

window.addEventListener('DOMContentLoaded',()=>{
    renderProfiles();
})
