//function to start game
function startGame() {
}
//initialize global objects/arrays/functions
let playerHand = [[],[]]; // first array is value, second array is suit
let dealerHand = [[],[]]; // cards are related by reference
let deck = {
  spade: ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  heart: ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  diamond: ['2','3','4','5','6','7','8','9','10','J','Q','K','A'],
  club: ['2','3','4','5','6','7','8','9','10','J','Q','K','A']
};
const suitRoll = () => {return Math.floor(Math.random() * 4)}//output will be between 0-3
const cardRoll = () => {return Math.floor(Math.random() * 13)} //output will be between 0-12 (13 nums)
let finalDealerHandValue;
let finalPlayerHandValue;

//function to randomly deal card from deck object
function dealCard(targetHand) {
  // called on click of deal button
  // returns card from deck
  let currentSuit = suitRoll(); //returns num between 0-4 which will be used to select suit
  let currentCard = cardRoll(); //returns num between 0-11 which will be num index
  let dealtCardValue; //initalize card to be dealt VALUE
  let dealtCardSuit;
  if (currentSuit == 0) {
    dealtCardSuit = 'spade'
    dealtCardValue = deck.spade[currentCard]; //store randomly selected card in variable
    deck.spade.splice(currentCard, 1); //remove selected card from deck object
  } else if (currentSuit == 1) {
    dealtCardSuit = 'heart'
    dealtCardValue = deck.heart[currentCard];
    deck.heart.splice(currentCard, 1);
  } else if (currentSuit == 2) {
    dealtCardSuit = 'diamond'
    dealtCardValue = deck.diamond[currentCard];
    deck.diamond.splice(currentCard, 1);
  } else if (currentSuit == 3) {
    dealtCardSuit = 'club'
    dealtCardValue = deck.club[currentCard];
    deck.club.splice(currentCard, 1);
  } else {
    console.log("I shouldn't be here")
  }

  if (dealtCardValue) {
    // console.log(dealtCard) //strangely this returns a card if dealCard is called again.
    targetHand[0].push(dealtCardValue)
    targetHand[1].push(dealtCardSuit)
    return 0
  }
  console.log("I ran again")
  return dealCard(targetHand)
};

//gives two cards to each hand to start game
function dealStartingHands() {
  do {
    dealCard(playerHand)
  } while (playerHand[0].length < 2)
  do {
    dealCard(dealerHand)
  } while (dealerHand[0].length < 2)
}

//initial hands are dealt here.
dealStartingHands()

console.log("Intial Player Hand is: ", playerHand[0])
console.log("Visible Dealer Card is: ", dealerHand[0][0])

//define function to be called when hit button is clicked
function hit(handToHit) {
  console.log("hand pre-hit: ", handToHit)
  dealCard(handToHit)
  console.log("hand post-hit: ", handToHit)
  checkBust(handToHit)
}

//NEED TO WRITE BUST CONDITION::::::::::::::::
function checkBust(handToCheck) {
  let bust;
  if (evaluateHand(handToCheck) > 21) {
    bust = true;
  }
}
//NEED TO WRITE ACE CHECK!!!!!!!!!
function aceCheck(handToCheck){
  //check for ace here
}


//evaluate hand ::::TODO:::: possibly doing too much with this.
function evaluateHand(handToEvaluate) {
  // check value of dealer hand
  let handValue = 0;
  //evaluateCard hold string value of card from hand
  for (let i = 0; i < handToEvaluate[0].length; i++) {
    let evaluateCard = handToEvaluate[0][i];
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

document.querySelector('#hit').addEventListener('click', function() {hit(playerHand)})
// document.querySelector('button').addEventListener('click', function() {console.log("I WAS CLICK")})
document.querySelector('#stand').addEventListener('click', () => {
  finalDealerHandValue = dealerPlays();
  finalPlayerHandValue = evaluateHand(playerHand);
  winCheck(finalDealerHandValue, finalPlayerHandValue);
})


// //::::TEST::::
// console.log("dealerHand is: ", dealerHand)
// console.log("Dealer Hand Value: ", evaluateHand(dealerHand))
// //::::TEST::::


//write dealerPlays function
function dealerPlays() {
  let inPlayHandValue = evaluateHand(dealerHand);
  while (inPlayHandValue < 17) {
    hit(dealerHand);
    inPlayHandValue = evaluateHand(dealerHand);
  }
  if (inPlayHandValue >= 17 && inPlayHandValue < 22) {
    console.log("The dealer stands. Total hand value: ", inPlayHandValue);
  } else if (inPlayHandValue > 21) {
    console.log("The dealer busts with a hand value of: ", inPlayHandValue);
    inPlayHandValue = 0; //sets value to 0 to prevent win
  }
  return inPlayHandValue;
}

// after dealerPlays check who wins
function winCheck(dealerHandValue, playerHandValue) {
  // compare value of dHand to pHand
  // if dHand > pHand: dealer wins
  if (dealerHandValue > playerHandValue) {
    console.log("dealer wins")
  } else if (dealerHandValue < playerHandValue) {
    console.log("player wins")
  } else if (dealerHandValue == playerHandValue) {
    console.log("It's a tie!")
  }
}
