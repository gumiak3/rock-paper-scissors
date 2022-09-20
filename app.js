"use strict";
const playerChoiceBtn = document.querySelectorAll(".choice");
const mainContainer = document.getElementById("main-container");
const winnerStatusContainer = document.querySelector(".winner-status");
const playAgainBtn = document.querySelector(".play-again-btn");
const scoreLabel = document.querySelector(".score");
const rulesModalBtn = document.querySelector(".rules-modal-btn");
let playerChoice;
let computerChoice;
let winnerStatus;
let gameState = 1;
let score = 0;
const wins = new Map([
  ["scissors", "paper"],
  ["paper", "rock"],
  ["rock", "scissors"],
]);
const choices = ["rock", "paper", "scissors"];

const init = function () {
  gameState = 1;
  changeState(gameState);
  winnerStatusContainer.classList.add("hidden");
  for (const choice of choices) {
    document.querySelector(`.house-${choice}`).classList.add("hidden");
    document.querySelector(`.house-${choice}`).classList.add("notpicked");
    document.querySelector(`.player-${choice}`).classList.add("hidden");
  }
  document.querySelector(`.house-rock`).classList.remove("hidden");
  document.querySelector(`.player-${playerChoice}`).classList.remove("win");
  document.querySelector(`.house-${computerChoice}`).classList.add("win");
};

const changeState = function (state) {
  mainContainer.classList.remove(
    `game-state-${state > 1 ? state - 1 : state + 2}`
  );
  mainContainer.classList.add(`game-state-${state}`);
};

const showPicks = function () {
  document.querySelector(`.player-${playerChoice}`).classList.remove("hidden"); // shows player's choice
  setTimeout(function () {
    for (const choice of choices) {
      document.querySelector(`.house-${choice}`).classList.add("hidden");
      document.querySelector(`.house-${choice}`).classList.add("notpicked");
    }
    document
      .querySelector(`.house-${computerChoice}`)
      .classList.remove("hidden");
    document
      .querySelector(`.house-${computerChoice}`)
      .classList.remove("notpicked");
    showResults();
  }, 2000);
};

const showResults = function () {
  setTimeout(function () {
    gameState++;
    changeState(gameState);
    winnerStatusContainer.classList.remove("hidden");
    document.getElementById("winner").textContent = winnerStatus;
    updateScore(score);
  }, 2000);
};

const updateScore = function (score) {
  scoreLabel.textContent = score;
};

const getWinner = function (playerChoice, computerChoice) {
  if (
    wins.get(playerChoice) === computerChoice &&
    playerChoice !== computerChoice
  ) {
    console.log(`Player won!`);
    winnerStatus = "you win";
    setTimeout(function () {
      document.querySelector(`.player-${playerChoice}`).classList.add("win");
    }, 4000);
    score++;
  } else if (
    wins.get(playerChoice) !== computerChoice &&
    playerChoice !== computerChoice
  ) {
    console.log(`Computer won!`);
    winnerStatus = "You lose";
    score > 0 ? score-- : score;
    setTimeout(function () {
      document.querySelector(`.house-${computerChoice}`).classList.add("win");
    }, 4000);
  } else {
    console.log("DRAW!");
    winnerStatus = "draw";
  }
  gameState++;
  showPicks();
  changeState(gameState);
};

const getRandomChoice = function () {
  const choices = ["rock", "paper", "scissors"];
  const random = Math.floor(Math.random() * 3);
  computerChoice = choices[random];
  console.log(`computer chose ${computerChoice}`);
};

playerChoiceBtn.forEach(choice => {
  choice.addEventListener("click", () => {
    playerChoice = choice.classList[0];
    getRandomChoice();
    getWinner(playerChoice, computerChoice);
  });
});

const closeModal = function () {
  modalContainer.classList.add("hidden");
  overlay.classList.add("hidden");
};
playAgainBtn.addEventListener("click", init);

const modalContainer = document.querySelector(".modal");

rulesModalBtn.addEventListener("click", function () {
  if (modalContainer.classList.contains("hidden")) {
    modalContainer.classList.remove("hidden");
    overlay.classList.remove("hidden");
  } else {
    closeModal();
  }
});

const exitModalBtn = document.querySelector(".exit-modal-btn");
const overlay = document.querySelector(".overlay");
console.log(exitModalBtn);

exitModalBtn.addEventListener("click", () => {
  closeModal();
});

overlay.addEventListener("click", closeModal);
