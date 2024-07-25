"use strict";

let head = document.querySelector("h1");
let hero_section = document.querySelector(".hero-section");
let box = document.querySelector(".box");
let box1 = document.querySelector(".box-1");
let box2 = document.querySelector(".box-2");
let part = document.querySelector(".part");
let btncontaine = document.querySelector(".btn-containe");
let game = document.querySelectorAll(".game");
let play = document.querySelector(".play");
const playAgain = document.querySelector(".play-again");
const msg = document.querySelector(".message");
const cancelBtn = document.querySelector(".cancel");
let playGame = false;
let currPlayer = "p1";

const userChoices = {
  p1: "",
  p2: "",
};
const options = ["rock", "paper", "scissors"];

function checkWinner(p1Choice, p2Choice) {
  playAgain.classList.remove("hidden");
  cancelBtn.classList.remove("hidden");
  msg.classList.remove("hidden");

  if (p1Choice === p2Choice) {
    msg.textContent = "It's a Draw";
    return;
  }

  if (
    (p1Choice === "rock" && p2Choice === "scissors") ||
    (p1Choice === "paper" && p2Choice === "rock") ||
    (p1Choice === "scissors" && p2Choice === "paper")
  ) {
    msg.textContent = "Player 1 Wins";
    return;
  }

  msg.textContent = "Player 2 Wins";
  return;
}

function moves() {
  for (let i = 0; i < game.length; i++) {
    game[i].addEventListener("click", function () {
      if (!userChoices.p1 || !userChoices.p2) {
        const elPlayer = game[i].dataset.player;

        if (elPlayer === currPlayer) {
          userChoices[elPlayer] = game[i].dataset.itemName;

          for (let j = 0; j < game.length; j++) {
            if (
              game[j].dataset.player === currPlayer &&
              game[j].dataset.itemName !== userChoices[elPlayer]
            ) {
              game[j].classList.add("hidden");
            }
          }

          if (userChoices.p1 && userChoices.p2) {
            checkWinner(userChoices.p1, userChoices.p2);
            return;
          }

          currPlayer = currPlayer === "p1" ? "p2" : "p1";
        }
      }
    });
  }
}

function reset() {
  playAgain.classList.add("hidden");
  cancelBtn.classList.add("hidden");
  msg.classList.add("hidden");
  currPlayer = "p1";
  userChoices.p1 = "";
  userChoices.p2 = "";
}

function onCancel() {
  reset();

  play.classList.remove("hidden");
  for (let i = 0; i < game.length; i++) {
    game[i].classList.add("hidden");
  }
}

function onPlayAgain() {
  reset();

  play.classList.add("hidden");
  for (let i = 0; i < game.length; i++) {
    game[i].classList.remove("hidden");
  }
}

// This will be executed first when we click on the play button
play.addEventListener("click", function () {
  play.classList.add("hidden");
  for (let i = 0; i < game.length; i++) {
    game[i].classList.remove("hidden");
  }
  moves();
});

cancelBtn.addEventListener("click", onCancel);
playAgain.addEventListener("click", onPlayAgain);
