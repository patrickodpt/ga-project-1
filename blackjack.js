//function to start game
function startGame() {
}
//initialize global objects/arrays/functions
let playerHand = [];
let dealerHand = [];
let shuffledDeck = [];

// //::::TESTS::::
// document.querySelector('img').setAttribute('src', deck[0].image)
// console.log(deck[43].image)
// console.log(deck[21].card)
// console.log(deck[22].card)
// console.log(deck[23].suit)
// //::::TEST::::

//define shuffle function
const shuffleTheDeck = function () {
  while (deck.length > 0){
    let randomIndex = Math.floor(Math.random() * 52)
    shuffledDeck.push(...deck.splice(randomIndex, 1))
  }
}

//call shuffle function
shuffleTheDeck()
//::::TEST:::: console.log(shuffledDeck) :::: SEEMS TO WORK!

//define generic deal function
const dealCard = function (targetHand) {
  targetHand.push(shuffledDeck.pop());
};

//define first deal.
const firstDeal = function () {
  // deal player 2 cards
  do {
    dealCard(playerHand);
  } while (playerHand.length < 2);
  // deal dealer 2 cards
  do {
    dealCard(dealerHand);
  } while (dealerHand.length < 2);
}

//call firstDeal
firstDeal();
//::::TEST::::
console.log(playerHand)
console.log(dealerHand)

const hit = function(targetHand) {
  dealCard(targetHand);
  console.log(targetHand);
}

//give #hit element event listener for click to call hit()
document.querySelector('#hit').addEventListener('click', function() {hit(playerHand)})

const valueCheck = function(targetHand) {
  let handValue = 0;
  for (let i = 0; i < targetHand.length; i++) {
    handValue += targetHand[i].value
  }
  //returns number
  return handValue
}

//returns boolean for if player/dealer busts
const bustCheck = function(handValue) {
  let bust;
  if (handValue <= 21 ) {
    bust = false;
    return bust
  }
  bust = true;
  //returns bool if handValue is > 21
  return bust
}


const aceCheck = function(targetHand) {
  let aceCheck;
  for (let i = 0; i < targetHand.length) {
    if targetHand[i].
  }
}


valueCheck(playerHand)
valueCheck(dealerHand)



// // document.querySelector('button').addEventListener('click', function() {console.log("I WAS CLICK")})
// document.querySelector('#stand').addEventListener('click', () => {
//   finalDealerHandValue = dealerPlays();
//   finalPlayerHandValue = evaluateHand(playerHand);
//   winCheck(finalDealerHandValue, finalPlayerHandValue);
// })




// ::::TODO:::DISPLAY CARDS AS DEALT
// const displayNewCard = function (i) {
//   let newCardInPlay = document.createElement('img')
//   newCardInPlay.className = "card"
//   newCardInPlay.setAttribute('src', playerHand[i].image)
//   document.querySelector('#playerHand').appendChild(newCardInPlay)
// }










while (playing = true) {
  //all game logic until game ends.
  break
}




// ::::BELOW IS PREVIOUS CODE::::
//
// const suitRoll = () => {return Math.floor(Math.random() * 4)}//output will be between 0-3
// const cardRoll = () => {return Math.floor(Math.random() * 13)} //output will be between 0-12 (13 nums)
// let finalDealerHandValue = 0;
// let finalPlayerHandValue = 0;
//
// //function to randomly deal card from deck object
// function dealCard(targetHand) {
//   // called on click of deal button
//   // returns card from deck
//   let currentSuit = suitRoll(); //returns num between 0-4 which will be used to select suit
//   let currentCard = cardRoll(); //returns num between 0-11 which will be num index
//   let dealtCardValue; //initalize card to be dealt VALUE
//   let dealtCardSuit;
//   if (currentSuit == 0) {
//     dealtCardSuit = 'spade'
//     dealtCardValue = deck.spade[currentCard]; //store randomly selected card in variable
//     deck.spade.splice(currentCard, 1); //remove selected card from deck object
//   } else if (currentSuit == 1) {
//     dealtCardSuit = 'heart'
//     dealtCardValue = deck.heart[currentCard];
//     deck.heart.splice(currentCard, 1);
//   } else if (currentSuit == 2) {
//     dealtCardSuit = 'diamond'
//     dealtCardValue = deck.diamond[currentCard];
//     deck.diamond.splice(currentCard, 1);
//   } else if (currentSuit == 3) {
//     dealtCardSuit = 'club'
//     dealtCardValue = deck.club[currentCard];
//     deck.club.splice(currentCard, 1);
//   } else {
//     console.log("I shouldn't be here")
//   }
//
//   let name = arguments[0]
//   console.log("name of arguments:", name)
//
//   if (dealtCardValue) {
//     // console.log(dealtCard) //strangely this returns a card if dealCard is called again.
//     targetHand[0].push(dealtCardValue)
//     targetHand[1].push(dealtCardSuit)
//     return 0
//   }
//   console.log("I ran again")
//   return dealCard(targetHand)
// };
//

//
// //initial hands are dealt here.
// dealStartingHands()
//
// console.log("Intial Player Hand is: ", playerHand[0])
// console.log("Visible Dealer Card is: ", dealerHand[0][0])
//
// //define function to be called when hit button is clicked
// function hit(handToHit) {
//   console.log("hand pre-hit: ", handToHit[0])
//   dealCard(handToHit)
//   console.log("hand post-hit: ", handToHit[0])
//   checkBust(handToHit)
// }
//
// //NEED TO WRITE BUST CONDITION::::::::::::::::
// //returns false or true or new handValue if ace present
// function checkBust(handToCheck) {
//   let bust = false;
//   let ace = aceCheck(handToCheck)
//   let handValue = evaluateHand(handToCheck)
//   if ((handValue > 21) && !ace) {
//     console.log("player busted", handToCheck[0])
//     return bust = true;
//   } else if ((handValue) > 21 && ace) {
//     handValue -= 10;
//     return handValue;
//   } else if (handValue <= 21) {
//     return bust;
//   } else {
//     console.log("I SHOULD NOT BE HERE::::checkBust")
//   }
// }
// //NEED TO WRITE ACE CHECK!!!!!!!!!
// function aceCheck(handToCheck){
//   let acePresent = false;
//   for (let i = 0; i < handToCheck[0].length; i++) {
//     if (handToCheck[0][i] == 'A') {
//       handToCheck[0][i] = 'usedAce'
//       return acePresent = true;
//     }
//   }
//   return acePresent;
// }
//
// //evaluate hand ::::TODO:::: possibly doing too much with this.
// function evaluateHand(handToEvaluate) {
//   // check value of dealer hand
//   let evaluatedValue = 0;
//   //evaluateCard hold string value of card from hand
//   for (let i = 0; i < handToEvaluate[0].length; i++) {
//     let evaluateCard = handToEvaluate[0][i];
//     let cardValue = parseInt(evaluateCard);
//     //check if parsing returns number, K Q J, or A.
//     if (cardValue >= 2 && cardValue <= 10) {
//       evaluatedValue += cardValue;
//     } else if (evaluateCard == 'K' || evaluateCard == 'Q' || evaluateCard == 'J') {
//       evaluatedValue += 10;
//     } else if (evaluateCard == 'A') {
//       evaluatedValue += 11;
//     } else if (evaluateCard == 'usedAce') {
//       evaluatedValue += 1;
//     } else {
//       console.log("I SHOULD NOT BE HERE::::evaluateHand")
//     }
//   }
//   return evaluatedValue;
// }
//
// document.querySelector('#hit').addEventListener('click', function() {hit(playerHand)})
// // document.querySelector('button').addEventListener('click', function() {console.log("I WAS CLICK")})
// document.querySelector('#stand').addEventListener('click', () => {
//   finalDealerHandValue = dealerPlays();
//   finalPlayerHandValue = evaluateHand(playerHand);
//   winCheck(finalDealerHandValue, finalPlayerHandValue);
// })
//
// //write dealerPlays function
// function dealerPlays() {
//   let inPlayHandValue = evaluateHand(dealerHand);
//   while (inPlayHandValue < 17) {
//     hit(dealerHand);
//     inPlayHandValue = evaluateHand(dealerHand);
//   }
//   if (inPlayHandValue >= 17 && inPlayHandValue < 22) {
//     console.log("The dealer stands. Total hand value: ", inPlayHandValue);
//   } else if (inPlayHandValue > 21) {
//     console.log("The dealer busts with a hand value of: ", inPlayHandValue);
//     inPlayHandValue = 0; //sets value to 0 to prevent win
//   }
//   return inPlayHandValue;
// }
//
// // after dealerPlays check who wins
// function winCheck(dealerHandValue, playerHandValue) {
//   // compare value of dHand to pHand
//   // if dHand > pHand: dealer wins
//   if (dealerHandValue > playerHandValue) {
//     console.log("dealer wins")
//   } else if (dealerHandValue < playerHandValue) {
//     console.log("player wins")
//   } else if (dealerHandValue == playerHandValue) {
//     console.log("It's a tie!")
//   }
// }
