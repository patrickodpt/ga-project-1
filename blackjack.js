//function to start game
function startGame() {
  //on button click load gameboard
}
//initialize global objects/arrays
let playerHand = [];
let dealerHand = [];
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
    return dealtCard; //yet this consistently returns "undefined" if run a dealCard() is called below
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

//gives two cards to each hand to start game
function dealStartingHands() {
  do {
    playerHand.push(dealCard())
  } while (playerHand.length < 2)
  do {
    dealerHand.push(dealCard())
  } while (dealerHand.length < 2)
}
//initial hands are dealt here.
dealStartingHands()

console.log("Calling parseInt(.pop()) on dealerHand returns: ", typeof(parseInt(dealerHand.pop())))
console.log("Calling parseInt(.pop()) on dealerHand returns: ", parseInt(dealerHand.pop()))

//define function to be called when hit button is clicked
function hit() {
  playerHand.push(dealCard())
}

//this function only calls a single func, thus unnecessary
// function stand() {
//    //run dealers play
//    dealerPlays()
// }

//evaluate hand
function evaluateHand (handToEvaluate) {
  // check value of dealer hand
  let handValue = 0;
  //evaluateCard hold string value of card from hand
  let evaluateCard = handToEvaluate.pop();

  //check if parsing returns number, K Q J, or A.
  if (typeof(parseInt(evaluateCard)) == number) {
    handValue += parseInt(evaluateCard);
  } else if (evaluateCard == 'K' || evaluateCard == 'Q' || evaluateCard == 'J') {
    handValue += 10;
  } else if (evaluateCard == 'A') {
    //need to write logic to handle Ace situation. May be best to write external function for this.
  }
  // if value is >17 stay
  // else hit
}
//
// // after dealerPlays check who wins
// function winCheck(pHandValue, dHandValue) {
//   // compare value of dHand to pHand
//   // if dHand > pHand: dealer wins
//   // if dHand < pHand: player wins
//   // if dHand == pHand: timeout, no one wins / tie
// }
