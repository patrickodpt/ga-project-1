//function to start game
function startGame() {
  //on button click load gameboard
}

//initialize global objects/arrays
let pHand = [];
let dHand = [];
let deck = {
  spade: ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  heart: ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  diamond: ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  club: ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
};


const suitRoll = () => {return Math.floor(Math.random() * 5)}//output will be between 0-4
const cardRoll = () => {return Math.floor(Math.random() * 12)} //output will be between 0-11 (12 nums)

function dealCard() {
  // called on click of deal button
  // returns card from deck
  let currentSuit = suitRoll()
  let currentCard = cardRoll() //returns num between 0-11 which will be num index

  if (currentSuit >= 0 && currentSuit < 1) {
      //get card from spade array

      return deck.spade
  } elseif (currentSuit >= 1 && currentSuit < 2) {
      //get card from heart array
  } elseif (currentSuit >= 2 && currentSuit < 3) {
      //get card from diamond array
  } elseif (currentSuit >= 3 && currentSuit < 4) {
    //get card from club array
  } else {
    console.log("something in random rolls went wrong,");
  }
};

dealCard()

//
// if (pHand.length < 2){
//   // call deal() to give card to pHand.push
// } elseif (dHand.length <2) {
//   // call deal() to give card to dHand.push
// }
//
//
// function hit() {
//   //get card from deck
//   //append card to pHand
// }
//
// function stand() {
//   //run dealers play
// }
//
// function dealerPlays () {
//   // check value of dealer hand
//   // if value is >17 stay
//   // else hit
// }
// // after dealerPlays check who wins
// function winCheck(pHandValue, dHandValue) {
//   // compare value of dHand to pHand
//   // if dHand > pHand: dealer wins
//   // if dHand < pHand: player wins
//   // if dHand == pHand: timeout, no one wins / tie
// }
