"use strict";
import { isclicked } from "./utills/utilities.js";
import { closeModal } from "./utills/utilities.js";
import { setAOS } from "./utills/utilities.js";
import { displayMessage } from "./utills/utilities.js";
import { supabaseClient } from "./main.js";

const container = document.querySelector(".card-container");
const answersModal = document.querySelector(".modal");
const answersModalClose = document.querySelector(".close");
const answerModal = document.querySelector(".modal-ans");
const answerModalClose = document.querySelector(".modal-ans .close");
const submitQuestionField = document.querySelector("#submitQuestionField");
const submitBtn = document.querySelector("#submitQuestionBtn");

class Answer {
  constructor(answerId, author, date, answer) {
    this.answerId = Number(answerId);
    this.author = author;
    this.date = date;
    this.answer = answer;
  }
}

class Question {
  constructor(
    questionId,
    author,
    dateOfSubmission,
    likes,
    question,
    answers = []
  ) {
    this.questionId = questionId;
    this.author = author;
    this.dateOfSubmission = dateOfSubmission;
    this.likes = likes;
    this.question = question;
    this.answers = answers;
  }
  postAnswer(answer) {
    this.answers.push(answer);
  }
}

let questions = [];

const currentUserName = await getUserInfo();
let currentDate = new Date();
currentDate = currentDate.toLocaleDateString();

async function fetchQuestions() {
  let { data, error } = await supabaseClient
    .from("Questions")
    .select("*, Answers(*)")
    .order("dateOfSubmission", { ascending: false });
  if (data)
    if (data.length === 0) {
      displayMessage("no question found", true);
    } else {
      questions = await Promise.all(
        data.map(async (question) => {
          let answer = (await fetchAnswers(question.questionId)) || [];
          answer = answer.map((answer) => {
            return new Answer(
              answer.id,
              answer.author,
              answer.date,
              answer.answer
            );
          });
          return new Question(
            question.questionId,
            question.author,
            question.dateOfSubmission,
            question.likes,
            question.question,
            answer
          );
        })
      );
      renderQuestions();
    }
}

async function getUserInfo() {
  const { data: session, error: sessionError } =
    await supabaseClient.auth.getSession();
  if (session && session.session.user) {
    const userId = session.session.user.id;
    const { data, error } = await supabaseClient
      .from("Users")
      .select("*")
      .eq("id", userId);

    if (sessionError) {
      console.error("Error fetching user data:", error);
      displayMessage("Error fetching user data", true);
      return null;
    }
    return data[0].userName;
  } else {
    console.error("Session not found");
    displayMessage("Session not found or user is not logged in", true);
    return null;
  }
}

async function updateLikes(questionId, totalLikes) {
  let { data, error } = await supabaseClient
    .from("Questions")
    .update({ likes: totalLikes })
    .eq("questionId", questionId);
}
async function fetchAnswers(questionId) {
  let { data, error } = await supabaseClient
    .from("Answers")
    .select("*")
    .eq("questionId", questionId);
  return data;
}

function renderQuestions() {
  container.innerHTML = "";
  questions.forEach((question) => {
    let questionElement = document.createElement("div");
    questionElement.classList.add("card", "flex");
    questionElement.setAttribute("aria-label", "Question");
    questionElement.setAttribute("data-question-id", `${question.questionId}`);
    setAOS(questionElement);
    questionElement.setAttribute("tabindex", "0");
    questionElement.innerHTML = `
                <div class="stats">
                    <h2>${question.question}</h2>
                    <div style="font-weight: 700;">Author: <span id="author-name" style="font-weight: 500;">${question.author}
                            </span></div>
                    <div style="font-weight: 700;">Date: <span id="date-of-submission" style="font-weight: 500;">
                            ${question.dateOfSubmission}</span></div>
                </div>

                <div class="buttons flex-column">
                    <button class="tooltip" data-tooltip='Like this question' data-clicked="false"id="like">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                            <path
                                d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z" />
                        </svg>
                        </button>
                        <span>${question.likes}</span>
                    <div class="tooltip" data-tooltip="Answer this question" id="answer">
                        <svg xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                            <path
                                d="M362.7 19.3L314.3 67.7 444.3 197.7l48.4-48.4c25-25 25-65.5 0-90.5L453.3 19.3c-25-25-65.5-25-90.5 0zm-71 71L58.6 323.5c-10.4 10.4-18 23.3-22.2 37.4L1 481.2C-1.5 489.7 .8 498.8 7 505s15.3 8.5 23.7 6.1l120.3-35.4c14.1-4.2 27-11.8 37.4-22.2L421.7 220.3 291.7 90.3z" />
                        </svg>
                    </div>
                    <div class="tooltip" data-tooltip="view answers" id="answers">
                        <svg viewBox="0 0 640 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.-->
                            <path
                                d="M88.2 309.1c9.8-18.3 6.8-40.8-7.5-55.8C59.4 230.9 48 204 48 176c0-63.5 63.8-128 160-128s160 64.5 160 128s-63.8 128-160 128c-13.1 0-25.8-1.3-37.8-3.6c-10.4-2-21.2-.6-30.7 4.2c-4.1 2.1-8.3 4.1-12.6 6c-16 7.2-32.9 13.5-49.9 18c2.8-4.6 5.4-9.1 7.9-13.6c1.1-1.9 2.2-3.9 3.2-5.9zM208 352c114.9 0 208-78.8 208-176S322.9 0 208 0S0 78.8 0 176c0 41.8 17.2 80.1 45.9 110.3c-.9 1.7-1.9 3.5-2.8 5.1c-10.3 18.4-22.3 36.5-36.6 52.1c-6.6 7-8.3 17.2-4.6 25.9C5.8 378.3 14.4 384 24 384c43 0 86.5-13.3 122.7-29.7c4.8-2.2 9.6-4.5 14.2-6.8c15.1 3 30.9 4.5 47.1 4.5zM432 480c16.2 0 31.9-1.6 47.1-4.5c4.6 2.3 9.4 4.6 14.2 6.8C529.5 498.7 573 512 616 512c9.6 0 18.2-5.7 22-14.5c3.8-8.8 2-19-4.6-25.9c-14.2-15.6-26.2-33.7-36.6-52.1c-.9-1.7-1.9-3.4-2.8-5.1C622.8 384.1 640 345.8 640 304c0-94.4-87.9-171.5-198.2-175.8c4.1 15.2 6.2 31.2 6.2 47.8l0 .6c87.2 6.7 144 67.5 144 127.4c0 28-11.4 54.9-32.7 77.2c-14.3 15-17.3 37.6-7.5 55.8c1.1 2 2.2 4 3.2 5.9c2.5 4.5 5.2 9 7.9 13.6c-17-4.5-33.9-10.7-49.9-18c-4.3-1.9-8.5-3.9-12.6-6c-9.5-4.8-20.3-6.2-30.7-4.2c-12.1 2.4-24.8 3.6-37.8 3.6c-61.7 0-110-26.5-136.8-62.3c-16 5.4-32.8 9.4-50 11.8C279 439.8 350 480 432 480z" />
                        </svg>
                    </div>
                </div>`;

    questionElement
      .querySelector("#like")
      .addEventListener("click", (event) =>
        handleLike(event, question.questionId)
      );
    questionElement
      .querySelector("#answer")
      .addEventListener("click", submitAnswer);
    questionElement
      .querySelector("#answers")
      .addEventListener("click", showAnswers);
    questionElement.addEventListener("click", showAnswers);
    container.appendChild(questionElement);
    if (isLiked(question.questionId)) {
      let likeBtn = questionElement.querySelector("#like");
      likeBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z"/></svg>`;
      likeBtn.setAttribute("data-clicked", "true");
    }
  });
}

function renderAnswers(answers) {
  const answersContainer = document.querySelector(".modal .wrapper");
  answersContainer.innerHTML = "";
  answers.forEach((ans) => {
    let answer = document.createElement("div");
    answer.classList.add("card", "flex");
    answer.setAttribute("data-answer-id", ans.answerId);
    answer.innerHTML = `
                    <div class="stats">
                        <h2>${ans.answer}</h2>
                        <div style="font-weight: 700;">Author: <span id="author-name" style="font-weight: 500;">${ans.author}
                                </span></div>
                        <div style="font-weight: 700;">Date: <span id="date-of-submission" style="font-weight: 500;">
                                ${ans.date}</span></div>
                    </div>`;
    answersContainer.appendChild(answer);
  });
  answersModal.style.display = "grid";
}

const getQuestion = (event) => {
  if (submitQuestionField.value === "") {
    alert("please enter the question before submitting");
    return;
  }
  let userQuestion = submitQuestionField.value;
  submitQuestionField.value = "";
  return userQuestion;
};

const postQuestion = async () => {
  let questionToSubmit = getQuestion();
  if (questionToSubmit) {
    try {
      let { data, error } = await supabaseClient.from("Questions").insert([
        {
          question: questionToSubmit,
          author: currentUserName,
        },
      ]);
    } catch (error) {
      displayMessage("There was some error uploading question" + error, true);
    }
    fetchQuestions();
  }
};

const handleLike = (event, questionId) => {
  event.stopPropagation();
  let btn = event.target.closest("#like");
  let totalLikesDisplay = btn.closest(".buttons").querySelector("span");
  let question = questions.find(
    (question) => question.questionId === questionId
  );
  let totalLikes = question ? question.likes : 0;
  console.log(totalLikes);
  let userLikedQuestions = getLikedQuestions() || [];
  if (isclicked(btn)) {
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
      <path
      d="M323.8 34.8c-38.2-10.9-78.1 11.2-89 49.4l-5.7 20c-3.7 13-10.4 25-19.5 35l-51.3 56.4c-8.9 9.8-8.2 25 1.6 33.9s25 8.2 33.9-1.6l51.3-56.4c14.1-15.5 24.4-34 30.1-54.1l5.7-20c3.6-12.7 16.9-20.1 29.7-16.5s20.1 16.9 16.5 29.7l-5.7 20c-5.7 19.9-14.7 38.7-26.6 55.5c-5.2 7.3-5.8 16.9-1.7 24.9s12.3 13 21.3 13L448 224c8.8 0 16 7.2 16 16c0 6.8-4.3 12.7-10.4 15c-7.4 2.8-13 9-14.9 16.7s.1 15.8 5.3 21.7c2.5 2.8 4 6.5 4 10.6c0 7.8-5.6 14.3-13 15.7c-8.2 1.6-15.1 7.3-18 15.2s-1.6 16.7 3.6 23.3c2.1 2.7 3.4 6.1 3.4 9.9c0 6.7-4.2 12.6-10.2 14.9c-11.5 4.5-17.7 16.9-14.4 28.8c.4 1.3 .6 2.8 .6 4.3c0 8.8-7.2 16-16 16l-97.5 0c-12.6 0-25-3.7-35.5-10.7l-61.7-41.1c-11-7.4-25.9-4.4-33.3 6.7s-4.4 25.9 6.7 33.3l61.7 41.1c18.4 12.3 40 18.8 62.1 18.8l97.5 0c34.7 0 62.9-27.6 64-62c14.6-11.7 24-29.7 24-50c0-4.5-.5-8.8-1.3-13c15.4-11.7 25.3-30.2 25.3-51c0-6.5-1-12.8-2.8-18.7C504.8 273.7 512 257.7 512 240c0-35.3-28.6-64-64-64l-92.3 0c4.7-10.4 8.7-21.2 11.8-32.2l5.7-20c10.9-38.2-11.2-78.1-49.4-89zM32 192c-17.7 0-32 14.3-32 32L0 448c0 17.7 14.3 32 32 32l64 0c17.7 0 32-14.3 32-32l0-224c0-17.7-14.3-32-32-32l-64 0z"
      />
      </svg>`;
    totalLikes -= 1;
    userLikedQuestions = userLikedQuestions.filter((Id) => Id !== questionId);
    localStorage.setItem("likedQuestions", JSON.stringify(userLikedQuestions));
    updateLikes(questionId, totalLikes);
  } else {
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2l144 0c26.5 0 48 21.5 48 48c0 18.5-10.5 34.6-25.9 42.6C497 275.4 504 288.9 504 304c0 23.4-16.8 42.9-38.9 47.1c4.4 7.3 6.9 15.8 6.9 24.9c0 21.3-13.9 39.4-33.1 45.6c.7 3.3 1.1 6.8 1.1 10.4c0 26.5-21.5 48-48 48l-97.5 0c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3l0-38.3 0-48 0-24.9c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192l64 0c17.7 0 32 14.3 32 32l0 224c0 17.7-14.3 32-32 32l-64 0c-17.7 0-32-14.3-32-32L0 224c0-17.7 14.3-32 32-32z"/></svg>`;
    totalLikes += 1;
    userLikedQuestions.push(questionId);
    localStorage.setItem("likedQuestions", JSON.stringify(userLikedQuestions));
    updateLikes(questionId, totalLikes);
  }
  totalLikesDisplay.textContent = totalLikes;
};

const getAnswer = (event) => {
  return new Promise((resolve, reject) => {
    const userAnswerInput = answerModal.querySelector("textarea");
    const submitBtn = answerModal.querySelector(".modal-ans button");
    submitBtn.addEventListener("click", () => {
      let answer = userAnswerInput.value;
      if (answer === "") {
        window.alert("Please enter correct answer ");
        reject("User entered a incorrect answer");
        return;
      }
      answerModal.style.display = "none";
      submitBtn.disabled = true;
      resolve(answer);
    });
    userAnswerInput.value = "";
  });
};

async function submitAnswer(event) {
  event.stopPropagation();
  try {
    let questionId = event.target
      .closest(".card")
      .getAttribute("data-question-id");
    let currentQuestion = questions.find(
      (question) => question.questionId === questionId
    );
    answerModal.style.display = "block";
    try {
      let answer = await getAnswer();
      let { data, error } = await supabaseClient.from("Answers").insert([
        {
          author: currentUserName,
          questionId: questionId,
          answer: answer,
        },
      ]);
      let fetchedAnswer = await supabaseClient
        .from("Answers")
        .select(" * ")
        .eq("questionId", questionId)
        .eq("answer", answer);
      currentQuestion.postAnswer(
        new Answer(
          fetchedAnswer.data[0].id,
          currentUserName,
          fetchedAnswer.data[0].date,
          fetchedAnswer.data[0].answer
        )
      );
    } catch {
      displayMessage("error try again " + error, true);
    }
  } catch {
  } finally {
    const submitBtn = document.querySelector(".modal-ans button");
    submitBtn.disabled = false;
  }
}

const showAnswers = (event) => {
  let questionId = event.target
    .closest(".card")
    .getAttribute("data-question-id");
  let currentQuestion = questions.find(
    (question) => question.questionId === questionId
  );
  renderAnswers(currentQuestion.answers);
};

const renderStats = () => {
  let questionsAnswered = (document.querySelector(
    ".stat-info .questions-asked"
  ).textContent = "100");
  let questionsAsked = (document.querySelector(
    ".stat-info .questions-answered"
  ).textContent = "200");
  try {
    let { data, error } = supabaseClient.from("Questions").select(" * ");
    console.log(data);
  } catch (error) {}
  // TODO : get these stats from the server
};

submitBtn.addEventListener("click", postQuestion);
answersModalClose.addEventListener("click", closeModal);
answerModalClose.addEventListener("click", closeModal);

window.onload = () => {
  renderQuestions();
  renderStats();
};
fetchQuestions();

const getLikedQuestions = () => {
  let likes = JSON.parse(localStorage.getItem("likedQuestions")) || [];
  return likes;
};

function isLiked(questionId) {
  let likedQuestions = getLikedQuestions();
  if (likedQuestions.find((id) => id === questionId)) return true;
  return false;
}
