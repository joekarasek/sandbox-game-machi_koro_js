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
  // add cost
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
  var wheatFields = 6;
  do {
    this.cards.push(new Card([1], "Wheat Field", "blue", 1, "wheat", 1));
    wheatFields--;
  } while(wheatFields>0);
  var bakery = 6;
  do {
    this.cards.push(new Card([2,3], "Bakery", "green", 1, "store", 1));
    bakery--;
  } while(bakery>0);
  var ranch = 6;
  do {
    this.cards.push(new Card([2], "Ranch", "blue", 1, "cow", 1));
    ranch--;
  } while(ranch>0);
  var cafe= 6;
  do {
    this.cards.push(new Card([3], "Cafe", "red", 1, "cafe", 2));
    cafe--;
  } while(cafe>0);
  var convenienceStore = 6;
  do {
    this.cards.push(new Card([4], "Convenience Store", "green", 3, "store", 2));
    convenienceStore--;
  } while(convenienceStore>0);
  var forest = 6;
  do {
    this.cards.push(new Card([5], "Forest", "blue", 1, "cog", 3));
    forest--;
  } while(forest>0);
  var cheeseFactory = 6;
  do {
    this.cards.push(new Card([7], "Cheese Factory", "green", 3, "factory", 5));
    cheeseFactory--;
  } while(cheeseFactory>0);
  var furnitureFactory = 6;
  do {
    this.cards.push(new Card([8], "Furniture Factory", "green", 3, "factory", 3));
    furnitureFactory--;
  } while(furnitureFactory>0);
  var mine = 6;
  do {
    this.cards.push(new Card([9], "Mine", "blue", 5, "cog", 6));
    mine--;
  } while(mine>0);
  var familyRestaurant = 6;
  do {
    this.cards.push(new Card([9,10], "Family Restaurant", "red", 2, "cafe", 3));
    familyRestaurant--;
  } while(familyRestaurant>0);
  var appleOrchard = 6;
  do {
    this.cards.push(new Card([10], "Apple Orchard", "blue", 3, "wheat", 3));
    appleOrchard--;
  } while(appleOrchard>0);
  var fruitMarket = 6;
  do {
    this.cards.push(new Card([11,12], "Fruit Market", "green", 2, "fruit", 2));
    fruitMarket--;
  } while(fruitMarket>0);
}

// Game Constructor
//=====================
function Game() {
  // Will contain players, cardBank, activePlayerIndex,
  this.cardBank = new CardBank();
  // this.cardBank.setStandardBank();
}
