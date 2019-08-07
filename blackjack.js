//function to start game
function startGame() {
  //on button click load gameboard
}
//initialize global objects/arrays/functions
let playerHand = [];
let dealerHand = [];
let deck = {
  spade: ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  heart: ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  diamond: ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  club: ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
};
const suitRoll = () => {return Math.floor(Math.random() * 4)}//output will be between 0-3
const cardRoll = () => {return Math.floor(Math.random() * 13)} //output will be between 0-12 (13 nums)

//function to randomly deal card from deck object
function dealCard() {
  // called on click of deal button
  // returns card from deck
  let currentSuit = suitRoll(); //returns num between 0-4 which will be used to select suit
  // console.log("Current Suit: ", currentSuit) // ::::TEST::::
  let currentCard = cardRoll(); //returns num between 0-11 which will be num index
  // console.log("Current Card: ", currentCard) // ::::TEST::::
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

  if (dealtCard) {
    // console.log(dealtCard) //strangely this returns a card if dealCard is called again.
    return dealtCard; //yet this consistently returns "undefined" if run a dealCard() is called below
  }
  console.log("I ran again")
  return dealCard()
};

// //::::TEST::::
// for (let i = 0; i < 8; i++) {
//   console.log(dealCard())
// }
// console.log(deck)
//::::TEST::::

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

// ::::TEST::::
// console.log("dealerHand is: ", dealerHand)
// console.log("playerHand is: ", playerHand)
// ::::TEST::::

//define function to be called when hit button is clicked
function hit(handToHit) {
  handToHit.push(dealCard())
}

// ::::TEST::::
// console.log("Dealer Hand Value: ", evaluateHand(dealerHand))
// console.log("Player Hand Value: ", evaluateHand(playerHand))
//
// hit(dealerHand)
// hit(dealerHand)
// hit(playerHand)
// hit(playerHand)
//
// console.log("dealerHand is: ", dealerHand)
// console.log("playerHand is: ", playerHand)
// ::::TEST::::

//this function only calls a single func, thus unnecessary
// function stand() {
//    //run dealers play
//    dealerPlays()
// }

//evaluate hand ::::TODO:::: possibly doing too much with this.
function evaluateHand (handToEvaluate) {
  // check value of dealer hand
  let handValue = 0;
  //evaluateCard hold string value of card from hand
  for (let i = 0; i < handToEvaluate.length; i++) {
    let evaluateCard = handToEvaluate[i];
    let cardValue = parseInt(evaluateCard);
    //check if parsing returns number, K Q J, or A.
    if (cardValue >= 2 && cardValue <= 10) {
      handValue += cardValue;
    } else if (evaluateCard == 'K' || evaluateCard == 'Q' || evaluateCard == 'J') {
      handValue += 10;
    } else if (evaluateCard == 'A') {
      //need to write logic to handle Ace situation. May be best to write external function for this.
      if (handValue + 11 <= 21) {
        handValue += 11;
      } else if (handValue + 11 > 21) {
        handValue += 1;
      }
    }
  }
  return handValue;
}

console.log("dealerHand is: ", dealerHand)
console.log("Dealer Hand Value: ", evaluateHand(dealerHand))

//write dealerPlays function
// ::::TODO:::: Needs a lot of work, logic possibly way off. Need to go back to function layout.
function dealerPlays() {
  let inPlayHandValue = evaluateHand(dealerHand);
  while (inPlayHandValue < 17) {
    hit(dealerHand);
    inPlayHandValue = evaluateHand(dealerHand);
  }
  if (inPlayHandValue >= 17 && inPlayHandValue < 22) {
    console.log("The dealer stands. Total hand value: ", inPlayHandValue)
  } else if (inPlayHandValue > 21) {
    console.log("The dealer busts with a hand value of: ", inPlayHandValue)
  }
}

dealerPlays()


//
// // after dealerPlays check who wins
// function winCheck(pHandValue, dHandValue) {
//   // compare value of dHand to pHand
//   // if dHand > pHand: dealer wins
//   // if dHand < pHand: player wins
//   // if dHand == pHand: timeout, no one wins / tie
// }
