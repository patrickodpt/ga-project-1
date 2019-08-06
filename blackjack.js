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
// ::::TEST::::
// console.log(deck.spade)
// deck.spade.splice(5, 1)
// console.log(deck.spade)
// console.log(deck.heart[12])
const suitRoll = () => {return Math.floor(Math.random() * 4)}//output will be between 0-3
const cardRoll = () => {return Math.floor(Math.random() * 13)} //output will be between 0-12 (13 nums)

//function to randomly deal card from deck object
function dealCard() {
  // called on click of deal button
  // returns card from deck
  let currentSuit = suitRoll(); //returns num between 0-4 which will be used to select suit
  console.log("Current Suit: ", currentSuit) // ::::TEST::::
  let currentCard = cardRoll(); //returns num between 0-11 which will be num index
  console.log("Current Card: ", currentCard) // ::::TEST::::

  let dealtCard; //initalize card to be dealt

  if (currentSuit == 0) {
    dealtCard = deck.spade[currentCard]; //store randomly selected card in variable
    deck.spade.splice(currentCard, 1); //remove selected card from deck object
  } else if (currentSuit == 1) {
    dealtCard = deck.heart[currentCard];
    deck.heart.splice(currentCard, 1);
  } else if (currentSuit == 2) {
    dealtCard = deck.diamond[currentCard];
    deck.diamond.splice(currentCard, 1);
  } else if (currentSuit == 3) {
    dealtCard = deck.club[currentCard];
    deck.club.splice(currentCard, 1);
  } else {
    console.log("I don't know where I am, but I shouldn't be here")
  }

  // console.log(dealtCard) // ::::TEST::::
  // TODO:::: BELOW REMAINS BROKEN AS OF NOW.
  if (dealtCard) {
    console.log(dealtCard) //strangely this returns a card if dealCard is called again.
    return dealtCard; //yet this consistently returns "undefined"
  }

  console.log("I ran again")
  dealCard()
};

console.log(dealCard())
console.log(dealCard())
console.log(dealCard())
console.log(dealCard())
console.log(dealCard())
console.log(dealCard())
console.log(dealCard())
console.log(dealCard())
console.log(dealCard())
console.log(dealCard())
console.log(dealCard())
console.log(dealCard())


console.log(deck)


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
