"use strict"
const questions = document.querySelectorAll('.card');
const likeButton = document.querySelectorAll('.card-container .card .buttons #like');
const writeAnswer = document.querySelectorAll('.card .buttons #answer');
const viewAnswers = document.querySelectorAll('.card .buttons #answers');

const AnswersModal = document.querySelector('.modal');

likeButton.forEach(btn => {
    btn.addEventListener('click', (event) => {
        if(!isclicked(btn)) {
            let totalLikesDisplay = btn.querySelector('span');
            let totalLikes = Number(totalLikesDisplay.textContent);
            totalLikes += 1;
            totalLikesDisplay.textContent = totalLikes;
        }
    });
});

writeAnswer.forEach(btn => {
    btn.addEventListener('click', event => console.log('hello'));
})

viewAnswers.forEach( btn => {
    btn.addEventListener('click', showAnswers());
})

const showAnswers = questionId => {

}

const isclicked = btn => {
   let clicked = btn.getAttribute('data-clicked');
   if(clicked === 'false') {
    btn.setAttribute('data-clicked','true');
    return false;
   }
   return true;
};