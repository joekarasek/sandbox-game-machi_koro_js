// ===================================
//     Game Logic
// ===================================

// Card Constructor
// ================
function Card(cardKey, cardName, cardColor, cardPayout, cardType, cardCost) {
  this.cardKey = cardKey;
  this.cardName = cardName;
  this.cardColor = cardColor;
  this.cardPayout = cardPayout;
  this.cardType = cardType;
  this.cardCost = cardCost;
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
  this.landmarks = [false,false,false,false];
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
    new Card([7], "Cheese Factory", "green", 3, "factory", 5),
    new Card([8], "Furniture Factory", "green", 3, "factory", 3),
    new Card([9], "Mine", "blue", 5, "cog", 6),
    new Card([9,10], "Family Restaurant", "red", 2, "cafe", 3),
    new Card([10], "Apple Orchard", "blue", 3, "wheat", 3),
    new Card([11,12], "Fruit Market", "green", 2, "fruit", 2)
  ]

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
  // this.cardBank.setStandardBank();
}
