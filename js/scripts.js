// ===================================
//     Game Logic
// ===================================

//Landmark Constructor//

function Landmark(landmarkName, landmarkCost) {
  this.landmarkName = landmarkName;
  this.landmarkCost = landmarkCost;
  this.landmarkActive = false;
}


// Card Constructor
// ================
function Card(cardKey, cardName, cardColor, cardPayout, cardType, cardCost, cardMultiplier) {
  this.cardKey = cardKey;
  this.cardName = cardName;
  this.cardColor = cardColor;
  this.cardPayout = cardPayout;
  this.cardType = cardType;
  this.cardCost = cardCost;
  this.cardMultiplier = cardMultiplier; //is a string equal to cardType that multiplies
}


// Dice Constructor
//===================
function Dice() {
  this.dieOne = 1;
  this.dieTwo = 1;
}
Dice.prototype.roll = function() {
  this.dieOne = Math.floor((Math.random() * 6) + 1);
  this.dieTwo = Math.floor((Math.random() * 6) + 1);
  this.dieOneImgAddress = "img/" + this.dieOne + ".png";
  this.dieTwoImgAddress = "img/" + this.dieTwo + ".png";
}



// Player Constructor
//===================
function Player(playerName) {
  this.playerName = playerName;
  this.cardStack = [];
  this.purse = 3;
  this.landmarks = [
    new Landmark("Train Station", 4),
    new Landmark("Shopping Mall", 10),
    new Landmark("Amusement Park", 16),
    new Landmark("Radio Tower", 22)
  ];
  this.isTurn = false;
  this.dice = new Dice();
}
Player.prototype.rollOneDie = function() {
  this.dice.roll();
  return this.dice.dieOne;
}
Player.prototype.rollTwoDie = function() {
  this.dice.roll();
  return this.dice.dieOne + this.dice.dieTwo;
}
Player.prototype.addCard = function(card) {
  this.purse -= card.cardCost;
  this.cardStack.push(card);
}
Player.prototype.getBluePayout = function(diceValue) {
  var payOut = 0;
  this.cardStack.forEach(function(card) {
    if (card.cardKey.indexOf(diceValue) !== -1 && card.cardColor === "blue") {
      payOut += card.cardPayout;
    }
  });
  this.purse += payOut;
}
Player.prototype.getGreenPayout = function(diceValue) {
  var payOut = 0;
  var isTurn = this.isTurn;
  var thisPlayer = this;
  var multiplier = 0;
  this.cardStack.forEach(function(card) {
    if (card.cardMultiplier !== undefined && card.cardKey.indexOf(diceValue) !== -1) {
      thisPlayer.cardStack.forEach(function(card2) {
        if (card.cardMultiplier === card2.cardType) {
          multiplier++;
        }
      });
      payOut += (multiplier * card.cardPayout);
      multiplier = 0;
    } else if (card.cardKey.indexOf(diceValue) !== -1 && isTurn === true) {
      payOut += card.cardPayout;
    }
  });
  this.purse += payOut;
}
Player.prototype.requestRedPayout = function(){
  var requestedAmount = 0;
  this.cardStack.forEach(function(card) {
    if (card.cardColor === "red") {
      requestedAmount += card.cardPayout;
    }
  });
  return requestedAmount;
}
Player.prototype.giveRedPayout = function(playerToPay, amountToPay) {
  if (this.purse >= amountToPay) {
    this.purse -= amountToPay;
    playerToPay.purse += amountToPay
  } else {
    playerToPay.purse += this.purse;
    this.purse = 0;
  }
}

Player.prototype.hasWon = function() {
  if (this.landmarks[0].landmarkActive && this.landmarks[1].landmarkActive && this.landmarks[2].landmarkActive && this.landmarks[3].landmarkActive) {
    return true;
  }
  return false;
}
// Player.prototype.endTurn = function() {
//   this.turn = false;
//
// }
// CardBank Constructor
//=====================
function CardBank() {
  this.cards = [];
}
CardBank.prototype.emptyBank = function() {
  this.cards = [];
}
      //Returns true and false if successful, and removes the card from the cardbank.cards array
CardBank.prototype.removeCard = function(cardNameToRemove) {
  var isPresent = false;
  var loopIndex = 0;
  var cardLocations = [];
  this.cards.forEach(function(card) {
    if(card.cardName === cardNameToRemove) {
      cardLocations.push(loopIndex);
      isPresent = true;
    }
    loopIndex++;
  });
  if (cardLocations !== []) {
    this.cards.splice(cardLocations[0], 1);
  }
  return isPresent;
}


CardBank.prototype.setStandardBank = function() {
  var temp_arr = [
    new Card([1], "Wheat Field", "blue", 1, "wheat", 1),
    new Card([2,3], "Bakery", "green", 1, "store", 1),
    new Card([2], "Ranch", "blue", 1, "cow", 1),
    new Card([3], "Cafe", "red", 1, "cafe", 2),
    new Card([4], "Convenience Store", "green", 3, "store", 2),
    new Card([5], "Forest", "blue", 1, "cog", 3),
    new Card([7], "Cheese Factory", "green", 3, "factory", 5, "cow"),
    new Card([8], "Furniture Factory", "green", 3, "factory", 3, "cog"),
    new Card([9], "Mine", "blue", 5, "cog", 6),
    new Card([9,10], "Family Restaurant", "red", 2, "cafe", 3),
    new Card([10], "Apple Orchard", "blue", 3, "wheat", 3),
    new Card([11,12], "Fruit Market", "green", 2, "factory", 2, "wheat")
  ];

  for (var i = 0; i < temp_arr.length; i++) {
      var card = temp_arr[i];
      for (var j = 6; j > 0; j--) {
        this.cards.push(card);
      }
  }
}


// Game Constructor
//=====================
function Game() {
  // Will contain players, cardBank, activePlayerIndex,
  this.cardBank = new CardBank();
  this.cardBank.setStandardBank();
  this.players = [];
  this.activePlayerIndex = 0;
}
// method for adding players to game
Game.prototype.addPlayer = function(playerToAdd) {
  this.players.push(playerToAdd);
}
// next turn method
Game.prototype.updateActivePlayerIndex = function() {
  if (this.activePlayerIndex < this.players.length-1) {
    this.activePlayerIndex ++;
  } else {
    this.activePlayerIndex = 0;
  }
}
// ??? method to determine who goes first
