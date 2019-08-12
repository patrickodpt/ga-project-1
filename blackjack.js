// saves container for node of wrapper div
let notificationElem = document.querySelector('#notificationDiv')
let playGameButton = document.querySelector('#playGame')
let deckImage = document.querySelector('#deck-image')

//initialize global objects/arrays/functions
let playerHand = [{name: 'playerHand'}];
let dealerHand = [{name: 'dealerHand'}];
let deckCopy = [...deck] //make copy to allow 6 decks to be created by shuffleTheDeck()
let shuffledDeck = [];
let playing = true;
let score = 0;
let counter = 0

//set addEventListener:
document.querySelector('#hit').addEventListener('click', function() {
  let currentValue = hit(playerHand);
  if (currentValue <= 21) {
    document.querySelector('#playerHandValue').innerHTML = currentValue;
  } else if (currentValue > 21) {
    document.querySelector('#playerHandValue').innerHTML = "B";
  }
})
document.querySelector('#stand').addEventListener('click', () => {dealersTurn()})

//function to start game
playGameButton.addEventListener('click', () => {
  //hide landing page with button
  document.querySelector('#wrapper').style.visibility = 'hidden';

  //condition for resetting game
  if (playing == false) {
    deckCopy = [...deck];
    shuffledDeck = [];
    playerHand = resetHand(playerHand);
    dealerHand = resetHand(dealerHand);
    notificationElem.innerHTML = "GOOD LUCK!"
    playGameButton.remove();
    document.querySelector('#deck').appendChild(deckImage);
    playing = true;
  }

  if (score > 9000 && counter === 0) {
    over9000();
    counter++
  }

  //call shuffle function
  shuffleTheDeck();

  //call firstDeal
  firstDeal();

  //display player's hand value
  document.querySelector('#playerHandValue').innerHTML = valueCheck(playerHand)

  //reveal only dealers second card value.
  document.querySelector('#dealerHandValue').innerHTML = dealerHand[2].value;

  document.querySelector('#hit').style.visibility = "visible";
  document.querySelector('#stand').style.visibility = "visible";
});

//functions below:
//define shuffle function
const shuffleTheDeck = function () {
  for (let i = 0; i < 6; i++) { //allows deck to be n number of decks combined. casino BJ uses 6-8.
    while (deckCopy.length > 0){
      let randomIndex = Math.floor(Math.random() * 52)
      shuffledDeck.push(...deckCopy.splice(randomIndex, 1))
    }
    deckCopy = [...deck]
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
    dealtCardImage.setAttribute('src', 'card-images/JPEG/blue_back.jpg');
    document.querySelector(`#${targetHand[0].name}`).appendChild(dealtCardImage)
  } else {
    //deal card and set src to image in card object
    dealtCardImage.setAttribute('src', dealtCard.image);
    document.querySelector(`#${targetHand[0].name}`).appendChild(dealtCardImage)
  }
};

//define first deal.
const firstDeal = function () {
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
  if (bustCheck(valueCheck(targetHand))) {
    let aceBool = aceCheck(targetHand);
    // need to bust even if aceCheck is true and returns a smaller value
    if (aceBool == false || (aceBool == true && valueCheck(targetHand) > 21)){
       if (targetHand[0].name == 'playerHand') {
         notificationElem.innerHTML = "YOU BUSTED";
         gameOver();
       } else if (targetHand[0].name == 'dealerHand') {
         score += 1; //need to work score counter
         notificationElem.innerHTML = "DEALER BUSTED";
         gameOver();
       }
     }
   }
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
  for (let i = 1; i < targetHand.length; i++) {
    //if unconverted ace is available:
    if (targetHand[i].value == 11) {
      if (valueCheck(targetHand) > 21){
        targetHand[i].value = 1
        aceCheck = true;
      }
    }
  }
  //returns whether or not ace present and value conversion occurs
  return aceCheck
}

const aceReset = function() {
  //explict: loop through playerHand and reset any ace value.
  for (let i = 1; i < playerHand.length; i++) {
    if (playerHand[i].value == 1){
      playerHand[i].value = 11;
    }
  }
    //explict: loop through dealerHand and reset any ace value.
  for (let i = 1; i < dealerHand.length; i++) {
    if (dealerHand[i].value == 1){
      dealerHand[i].value = 11;
    }
  }
}

//contains dealer logic.
const dealersTurn = function () {

  //show card
  document.querySelector('#dealerHand > .card').setAttribute('src', dealerHand[1].image);

  let handValue = valueCheck(dealerHand);
  while (handValue < 17) {
    handValue = hit(dealerHand);
  }

  if (handValue <= 21) {
    document.querySelector('#dealerHandValue').innerHTML = valueCheck(dealerHand);
  } else if (handValue > 21) {
    document.querySelector('#dealerHandValue').innerHTML = "B";
  }

  //verbose due to early development bug. May be able to refractor now.
  if (handValue == 21) {
    winCheck();
  } else if (handValue >= 17 && handValue < 21) {
    winCheck();
  } else if (handValue > 21) {
    gameOver();
  }
};

//compares hand values after dealer's turn, if no one busted.
const winCheck = function () {
  if (valueCheck(dealerHand) > valueCheck(playerHand)) {
    notificationElem.innerHTML = "DEALER WINS?";
    gameOver();
  } else if (valueCheck(dealerHand) < valueCheck(playerHand)) {
    score += 1;
    notificationElem.innerHTML = "PLAYER WINS!";
    gameOver();
  } else if (valueCheck(dealerHand) == valueCheck(playerHand)) {
    notificationElem.innerHTML = "YOU TIED!"
    gameOver();
  }
};

//removes all card nodes from targetHand DOM node and resets targetHand array.
const resetHand = function (targetHand) {
  document.querySelectorAll(`#${targetHand[0].name} > .card`).forEach(node => node.remove());
  targetHand = [targetHand[0]];
  return targetHand
}

const gameOver = function () {
  aceReset(); // resets adjusted ace values from 1 back to 11.
  playing = false;

  //visual changes below.
  document.querySelector('#hit').style.visibility = "hidden";
  document.querySelector('#stand').style.visibility = "hidden";
  playGameButton.style.width = '350px';
  playGameButton.style.height = '130px';
  playGameButton.innerHTML = "CLICK TO PLAY AGAIN!"
  deckImage.remove();
  document.querySelector('#deck').appendChild(playGameButton);
  document.querySelector('#score').innerHTML = `YOUR SCORE: ${score}`
}
