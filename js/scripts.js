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


// Player Constructor
//===================
function Player(playerName) {
  this.playerName = playerName;
}
