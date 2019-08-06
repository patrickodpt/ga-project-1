//function
function startGame() {
  //on button click load gameboard
}

//initialize global objects/arrays
let pHand = []
let dHand = []
let deck = {
  spade: ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  heart: ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  diamond: ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  club: ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
}


const suitRoll = () => {return Math.floor(Math.random() * 4)}//output will be between 0-3
const cardRoll = () => {return Math.floor(Math.random() * 13)} //output will be between 0-12

function deal() {
  // called on click of deal button
  // returns card from deck

  let currentSuit = suitRoll()
  if (currentSuit < 1) {
      return deck.spade[0].pop()
  } elseif (currentSuit > 0 && currentSuit <= 2) {

  } elseif (currentSuit > 1 && currentSuit <= 2) {

  } elseif (currentSuit > 2 && currentSuit <= 3) {

  } else {
    console.log("something in random rolls went wrong,")
  }
}

deal()

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
