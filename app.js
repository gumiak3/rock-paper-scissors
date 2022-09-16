"use strict";
const playerChoiceBtn = document.querySelectorAll(".choice");

let playerChoice;
let computerChoice;
let winner;
let gameState = 1;
const wins = new Map([
  ["scissors", "paper"],
  ["paper", "rock"],
  ["rock", "scissors"],
]);

// player: 'scissors' computer: 'paper' if wins.get(playerChoice)===computerChoice -> computer wins else if wins.get(playerChoice)!==computerChoice && playerChoice!==computerChoice, player wins

const changeState = function (state) {
  document.querySelector(`.game-state-${state - 1}`).classList.add("hidden");
  document.querySelector(`.game-state-${state}`).classList.remove("hidden");
};

const showPicks = function () {
  document.querySelector(`.player-${playerChoice}`).classList.remove("hidden"); // shows player's choice
  const choices = ["rock", "paper", "scissors"];
  setInterval(function () {
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
  }, 2000);
};

const getWinner = function (playerChoice, computerChoice) {
  if (
    wins.get(playerChoice) === computerChoice &&
    playerChoice !== computerChoice
  ) {
    console.log(`Player won!`);
    winner = "player";
  } else if (
    wins.get(playerChoice) !== computerChoice &&
    playerChoice !== computerChoice
  ) {
    console.log(`Computer won!`);
    winner = "computer";
  } else {
    console.log("DRAW!");
    winner = "draw";
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
