'use strict';
//For selecting elements using their id, any of the below methods are good
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
//To select IDs using querySelector # is used
const score1El = document.getElementById('score--1');
//To select IDs using getElementID we don't need #
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
//Selecting the current score elements of both the players
const diceEl = document.querySelector('.dice');
//Selector for dice
const btnNew = document.querySelector('.btn--new');
//Selector for New game button
const btnRoll = document.querySelector('.btn--roll');
//Selector the roll button
const btnHold = document.querySelector('.btn--hold');
//Selector for hold button

//Starting conditions
let scores, currentScore, activePlayer, playing;

const init = function () {
  //scores are the scores here for both the players
  scores = [0, 0];
  currentScore = 0;
  //currentScore tells the score of the active player
  activePlayer = 0;
  //activePlayer can be 0 or 1 depending upon which player is active at that time
  playing = true;
  //After the new game starts, the playing becomes true

  score0El.textContent = 0;
  score1El.textContent = 0;
  //Scores of player 0 and 1
  current0El.textContent = 0;
  current1El.textContent = 0;
  //current chance score for player 0 and 1

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  //When the new game starts, the player winner class which is used to mark the victory of any player is removed from both the players
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  //On starting new game, the new game starts with player 0 so active--player class is added to player 0
  diceEl.classList.add('hidden');
  //When none of the die is rolled, the die is hidden
};

init();
//When the first game starts, the init() here is called just for that
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //The cuurent score of our activePlayer becomes 0
  currentScore = 0;
  //The current score of the player that we have switched
  activePlayer = activePlayer === 0 ? 1 : 0;
  //Switching of the active player
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  //Active player class is switched upon switching the players
};

//Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1; //Rolling die and getting a number between 1 and 6
    diceEl.classList.remove('hidden'); // Removing the hidden class from our dice

    diceEl.src = `dice-${dice}.png`; //Rolling and displaying the dice according to the generated number

    if (dice !== 1) {
      currentScore += dice; //Increasing current score according to our generated number
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      //Displaying the current score of our activePlayer
    } else {
      //Switch to next player if dice rolls 1
      switchPlayer();
    }
  }
});
//This event listener is for the hold button
btnHold.addEventListener('click', function () {
  if (playing) {
    //When the playing state is active and hold button is pressed, the score of the current player is increased
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //The score of the active player is set on the screen
    if (scores[activePlayer] >= 100) {
      //This is the condition for the winning of game, so if score of player turns 100,a number of things occur
      playing = false; //Playing is changed to false
      diceEl.classList.add('hidden'); //Dice is hidden
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      //The active player is set to be the winner
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //The player-active class is removed form our active player
    } else {
      //If score is less than 100, then simply the switch player function is called
      switchPlayer();
    }
  }
});
// This event listener is for the new game button
btnNew.addEventListener('click', init);
