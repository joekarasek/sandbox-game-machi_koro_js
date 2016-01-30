// ===================================
//     Game Logic
// ===================================

// Card Constructor
// ================
function Card(cardKey, cardName, cardColor, cardPayout, cardType) {
  this.cardKey = cardKey;
  this.cardName = cardName;
  this.cardColor = cardColor;
  this.cardPayout = cardPayout;
  this.cardType = cardType;
}


// Dice Constructor
//===================
function Dice() {

}


// Player Constructor
//===================
function Player(playerName) {
  this.playerName = playerName;
  this.cardStack = [];
  this.purse = 3;
  this.monuments = [false,false,false,false];
}


// CardBank Constructor
//=====================
