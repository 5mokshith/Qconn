class User {
  constructor(userName, role, achievementPoints, Qans, Qask) {
    this.userName = userName;
    this.role = role;
    this.achievementPoints = achievementPoints;
    this.Qans = Qans;
    this.Qask = Qask;
  }
}

const Users = [];

async function getUser() {
    await  fetch('https://supersimpleBackend.dev/products').then(response => response.json())
    .then(Data => console.log(Data))
    .catch(error => console.error(error));
}

getUser();
