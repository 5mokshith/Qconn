"use strict";

import { displayMessage } from "./utills/utilities.js";

const supabaseURL = "https://lnfuimkyyghqtjgartur.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxuZnVpbWt5eWdocXRqZ2FydHVyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjgzNzY0NDMsImV4cCI6MjA0Mzk1MjQ0M30.H3R0E7Nz-mRNc9czDRKuz_I66oL070MGcgqaqV0dQiI";
export const supabaseClient = supabase.createClient(supabaseURL, supabaseKey, {
  auth: {
    persistSession: true, // Ensure sessions are persisted
  },
});

async function getUsers() {
  try {
    let response = await supabaseClient.from("Users").select("*");
    if (response.error) {
      throw response.error.message;
    }
    return response.data;
  } catch (error) {
    console.error(error);
  }
}
export async function signUp(formElement) {
  let formData = new FormData(formElement);
  const firstName = formData.get("first-name");
  const lastName = formData.get("last-name");
  const email = formData.get("email");
  const password = formData.get("password");
  const isTeacher = formData.get("teacher") ? "teacher" : "student";

  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
  });
  if (error) {
    displayMessage(error.message);
    console.log(error);
  } if (data) {
    let userId = data.user.id;
    displayMessage("Sign-up succesfull please sign-in to continue", false);
    await insertUser(userId, firstName + " " + lastName, isTeacher);
  }
}

async function insertUser(userId, name, role) {
  const data = await supabaseClient.from("Users").insert([
    {
      id: userId,
      userName: name,
      role: role,
    },
  ]);
  if (data.error) {
    console.error(data.error);
    displayMessage(data.error.message)
  } else {
    window.location.href = "../additionalPages/sign-in.html";
  }
}

export async function signIn(formElement) {
  const formData = new FormData(formElement);
  const email = formData.get("email");
  const password = formData.get("password");

  if (!email || !password) {
    displayMessage("Please enter the details correctly");
  }

  let state = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password,
  });
  if (state.error) {
    displayMessage(state.error.message || "you don't have a account or there might be an error");
  } else {
    if (window.opener) {
      window.opener.location.href = "../index.html";
    }
    else {
      displayMessage("Log-in successfull thank you !",false);
      window.location.href = "../index.html";
      localStorage.setItem("userLoggedIn", "true");
      window.close();
    }
  }
}

const signInBtn = document.querySelector("#sign-in");
const signUpBtn = document.querySelector("#sign-up");
const logOutBtn = document.querySelector("#log-out");

async function isAuth() {
  try {
    let { data, error } = await supabaseClient.auth.getSession();
    if (signInBtn || signUpBtn || logOutBtn) {
      if (data.session) {
        signInBtn.style.display = "none";
        signUpBtn.style.display = "none";
        logOutBtn.style.display = "flex";
        return "true";
      } else {
        logOutBtn.style.display = "none";
        signInBtn.style.display = "block";
        signUpBtn.style.display = "block";
        return "false";
      }
    }
  } catch (error) {
    displayMessage(error.message);
    console.log(error);
  }
}

async function logOut() {
  try {
    const { error } = await supabaseClient.auth.signOut();

    if (error) {
      throw new Error(error.message);
    } else {
      logOutBtn.style.display = "none";
      signInBtn.style.display = "block";
      signUpBtn.style.display = "block";
    }
  } catch (error) {
    console.error("Logout failed:", error.message);
    displayMessage(
      "An error occurred while logging out. Please try again."
    );
  }
}

if (logOutBtn) {
  logOutBtn.addEventListener("click", () => {
    logOut();
  });
}


const restrictedLinks = document.querySelectorAll("a[data-required-login = 'true']");
restrictedLinks.forEach(link => {
  link.addEventListener("click", async (event) => {
    if (await isAuth() === "false") {
      event.preventDefault();
      if(window.open("../additionalPages/sign-in.html", "_blank")) return;
      window.location.href = "../additionalPages/sign-in.html";
    }
  });
});

setTimeout(() => {
  isAuth();
}, 1000)
