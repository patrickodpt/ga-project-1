// saves container for node of wrapper div
let coverImage = document.querySelector('#wrapper')
let scoreDivElem = document.querySelector('#scoreDiv')
let playGameButton = document.querySelector('#playGame')

//initialize global objects/arrays/functions
let playerHand = [{name: 'playerHand'}];
let dealerHand = [{name: 'dealerHand'}];
let shuffledDeck = [];
let playing = true;
let score = 0;

//set addEventListener:
document.querySelector('#hit').addEventListener('click', function() {hit(playerHand)})
document.querySelector('#stand').addEventListener('click', () => {dealersTurn()})

//function to start game
playGameButton.addEventListener('click', () => {
  coverImage.style.visibility = 'hidden';
  //call shuffle function
  shuffleTheDeck();
  //call firstDeal
  firstDeal();

  if (playing == false) {
    playerHand = resetHand(playerHand);
    dealerHand = resetHand(dealerHand);
    playing = true;
  }

  document.querySelector('#hit').style.visibility = "visible";
  document.querySelector('#stand').style.visibility = "visible";

  // playGameButton.remove();

});


//functions below:
//define shuffle function
const shuffleTheDeck = function () {
  while (deck.length > 0){
    let randomIndex = Math.floor(Math.random() * 52)
    shuffledDeck.push(...deck.splice(randomIndex, 1))
  }
}

//define generic deal function
const dealCard = function (targetHand) {
  let dealtCard = shuffledDeck.pop();
  targetHand.push(dealtCard);
  let dealtCardImage = document.createElement('img');
  dealtCardImage.className = 'card';

  // if the dealer got his first card, don't show it.
  if ((targetHand[0].name == 'dealerHand') && (dealerHand.length < 3)) {
    // dealtCardImage.setAttribute('id', 'first-card') //might not need this id.
    dealtCardImage.setAttribute('src', 'card-images/JPEG/blue_back.jpg');
    document.querySelector(`#${targetHand[0].name}`).appendChild(dealtCardImage)
  } else {
    //deal card and set src to image in card object
    dealtCardImage.setAttribute('src', dealtCard.image);
    document.querySelector(`#${targetHand[0].name}`).appendChild(dealtCardImage)
  }
  console.log(dealtCard);
};

//define first deal.
const firstDeal = function () {
  console.log([...playerHand])
  // deal player 2 cards
  do {
    dealCard(playerHand);
  } while (playerHand.length < 3); //need to be three because inital length is 1 as object for name exists
  // deal dealer 2 cards
  do {
    dealCard(dealerHand);
  } while (dealerHand.length < 3);
}

//define hit function, which calls bustCheck and aceCheck if bust is true.
const hit = function(targetHand) {
  dealCard(targetHand);
  console.log(targetHand);
  if (bustCheck(valueCheck(targetHand))) {
     if (aceCheck(targetHand) == false) {
         if (targetHand[0].name == 'playerHand') {
           scoreDivElem.innerHTML = "PLAYER LOSES: BUSTED"
           gameOver();
         } else if (targetHand[0].name == 'dealerHand') {
           scoreDivElem.innerHTML = "DEALER LOSES: BUSTED"
           gameOver();
         }
       }
     }
   console.log("valueCheck in hit()", valueCheck(targetHand))
   return valueCheck(targetHand)
}


//checks current value of hand
const valueCheck = function(targetHand) {
  let handValue = 0;
  for (let i = 1; i < (targetHand.length); i++) {
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

// logically, ace only matters if going to bust
// if going to bust, ace converts to value 1, returns true, else returns false
const aceCheck = function(targetHand) {
  let aceCheck = false;
  for (let i = 1; i < (targetHand.length); i++) {
    if (targetHand[i].value == 11) {
      targetHand[i].value = 1
      return aceCheck = true;
    }
  }
  //returns whether or not ace present and value conversion occurs
  return aceCheck
}

//contains dealer logic.
const dealersTurn = function () {
  console.log("The dealer is going now");
  //show card
  // let firstCardImage = dealerHand[1].image
  document.querySelector('#dealerHand > .card').setAttribute('src', dealerHand[1].image)

  let handValue = valueCheck(dealerHand);

  while (handValue < 17) {
    handValue = hit(dealerHand);
    console.log("The dealer hit. Now has: ", handValue);
  }
  if (handValue == 21) {
    console.log("The deal has blackjack: ", handValue);
    winCheck();
  } else if (handValue >= 17 && handValue < 21) {
    console.log("The dealer has a strong hand: ", handValue);
    winCheck();
  }
};

const winCheck = function () {
  let finalPlayerHandValue = valueCheck(playerHand)
  let finalDealerHandValue = valueCheck(dealerHand)
  if (finalDealerHandValue > finalPlayerHandValue) {
    console.log("dealer wins");
    scoreDivElem.innerHTML = "DEALER WINS"
    gameOver();
  } else if (finalDealerHandValue < finalPlayerHandValue) {
    console.log("player wins");
    scoreDivElem.innerHTML = "PLAYER WINS"
    gameOver();
  } else if (finalDealerHandValue == finalPlayerHandValue) {
    console.log("It's a tie!");
    scoreDivElem.innerHTML = "TIES"
    gameOver();
  }
};

const resetHand = function (targetHand) {
  document.querySelectorAll(`#${targetHand[0].name} > .card`).forEach(node => node.remove())
  targetHand = [ targetHand[0] ]
  return targetHand
}

const gameOver = function () {
  document.querySelector('#hit').style.visibility = "hidden";
  document.querySelector('#stand').style.visibility = "hidden";
  playGameButton.style["font-size"] = '10px';
  playing = false;
  document.querySelector('#info-row').appendChild(playGameButton);
}
