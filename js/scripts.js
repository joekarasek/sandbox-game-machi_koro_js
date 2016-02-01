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
  this.monuments = [false,false,false,false];
  this.turn = false;
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
//
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
CardBank.prototype.setStandardBank = function() {
  var wheatFields = 4;
  do {
    this.cards.push(new Card([1], "Wheat Field", "blue", 1, "wheat"));
    wheatFields--;
  } while(wheatFields>0);
}

// Game Constructor
//=====================
function Game() {
  // Will contain players, cardBank, activePlayerIndex,
  this.cardBank = new CardBank();
  this.cardBank.setStandardBank();
}
