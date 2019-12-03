/*  SCORE BOARD */
var score = document.getElementById('score');
var game = document.getElementById('game');
var button = document.getElementById('btn');
var section = document.getElementById('section')
var memGame = document.getElementById('memGame')
var youWon = document.getElementById('youWon')


var flip = new Audio('music/music.mp3');
var match = new Audio('music/match.mp3');
var winnerMusic = new Audio('music/winner.mp3')
var startMusic = new Audio('music/start-music.mp3')




const body = document.querySelector('body')
const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  flip.play();
  
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

 
  if (!hasFlippedCard) {
    // first click
    hasFlippedCard = true;
    firstCard = this;

    return;
  }

  // second click
  secondCard = this;

  checkForMatch();
}
var i=1;
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  if(isMatch){
    match.play();
    disableCards()
    score.textContent = 'SCORE: ' + i++;
    var scoreValue = document.getElementById('score').innerText;
    if(scoreValue == 'SCORE: ' + 6){
      winnerMusic.play();
    
      remove();
    }
    
  }else{
    unflipCards();
  }
  //isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
button.addEventListener('click',function(){
  startMusic.play();
  memGame.classList.add('remove');
  section.classList.remove('remove')
  score.classList.remove('remove');
  score.classList.add('sb');
  button.remove();
  
})

function remove(){
  section.classList.add('remove');
  youWon.classList.remove('remove')
  youWon.style = 'display: flex; justify-content: center; font-size: 60px; font-weight: bold; margin-top:25%; color: white; font-family: Bebas Neue, cursive; font-family: Alatsi, sans-serif;'
}
cards.forEach(card => card.addEventListener('click', flipCard));


