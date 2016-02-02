describe('Landmark', function(){
  it('creates a landmark card with the correct properties', function() {
    var testLandmark = new Landmark("Train Station", 4);
    expect(testLandmark.landmarkName).to.equal("Train Station");
    expect(testLandmark.landmarkCost).to.equal(4);
    expect(testLandmark.landmarkActive).to.equal(false);
  });
  it('pushes landmarks in LandmarkInitializer into player landmarks array', function() {
    var testPlayer = new Player("Michaela");
    var testLandmark = new Landmark("Train Station", 4);
    expect()
  })
});

describe('Card', function() {
  // check the initial values
  it('creates a game card with the correct properties', function() {
    var testCard = new Card([1], "Wheat Field", "blue", 1, "wheat");
    expect(testCard.cardName).to.equal("Wheat Field");
    expect(testCard.cardKey).to.eql([1]);
    expect(testCard.cardColor).to.equal("blue");
    expect(testCard.cardPayout).to.equal(1);
    expect(testCard.cardType).to.equal("wheat");
  });
});
describe('Player', function() {
  // check the initial values
  it('creates a Player with the correct initial property values', function() {
    var testPlayer = new Player("Michaela");
    expect(testPlayer.playerName).to.equal("Michaela");
    expect(testPlayer.purse).to.equal(3);
    expect(testPlayer.cardStack).to.eql([]);
    expect(testPlayer.landmarks).to.eql([
      new Landmark("Train Station", 4),
      new Landmark("Shopping Mall", 10),
      new Landmark("Amusement Park", 16),
      new Landmark("Radio Tower", 22)
    ]);
  });
  it('rollOneDie will roll the player dice and return the value of one die', function(){
    var testPlayer = new Player("Michaela");
    expect(testPlayer.rollOneDie()).to.equal(testPlayer.dice.dieOne);
  });
  it('has a method rollTwoDie that returns the value of both dice', function(){
    var testPlayer = new Player("Michaela");
    expect(testPlayer.rollTwoDie()).to.equal(testPlayer.dice.dieOne+testPlayer.dice.dieTwo);
  });
  it('has a method hasWon that returns false if any of the landmarks are not purchased (false)', function(){
    var testPlayer = new Player("Michaela");
    testPlayer.landmarks[2].landmarkActive = true;
    expect(testPlayer.hasWon()).to.equal(false);
  });
  it('has a method hasWon that returns true if all the landmarks have been bought', function(){
    var testPlayer = new Player("Michaela");
    testPlayer.landmarks[0].landmarkActive = true;
    testPlayer.landmarks[1].landmarkActive = true;
    testPlayer.landmarks[2].landmarkActive = true;
    testPlayer.landmarks[3].landmarkActive = true;
    expect(testPlayer.hasWon()).to.equal(true);
  });
  it('has a method addCard that adds card to cardStack', function(){
    var testPlayer = new Player("Michaela");
    var testCard = new Card([2], "Ranch", "blue", 1, "cow", 1);
    testPlayer.addCard(testCard);
    expect(testPlayer.cardStack[0]).to.eql(testCard);
    expect(testPlayer.purse).to.equal(2);
  });
  it('has a method addLandmark that changes landmarkActive to true', function(){
    var testPlayer = new Player("Michela");
    var testObjectLandmark = new Landmark("Train Station", 4);
    testPlayer.landmarkTrue(testObjectLandmark);
    expect(testPlayer.landmarks[0].landmarkActive).to.equal(true);
  });
  it('has a method getBluePayout that adds the right amount of payout for blue cards', function(){
    var testPlayer = new Player("Michaela");
    var testCard = new Card([2], "Ranch", "blue", 1, "cow", 1);
    testPlayer.addCard(testCard);
    testPlayer.getBluePayout(2);
    expect(testPlayer.purse).to.equal(3);
    var testCard2 = new Card([1,2], "Ranch", "blue", 1, "cow", 1);
    testPlayer.addCard(testCard2);
    testPlayer.getBluePayout(2);
    expect(testPlayer.purse).to.equal(4);
  });
  it('has a method getGreenPayout that adds the right amount of payout for greem cards, only if isTurn is true', function(){
    var testPlayer = new Player("Michaela");
    testPlayer.isTurn = true;
    var testCard = new Card([2], "Ranch", "green", 1, "cow", 1);
    testPlayer.addCard(testCard);
    testPlayer.getGreenPayout(2);
    expect(testPlayer.purse).to.equal(3);
    var testCard2 = new Card([1,2], "Ranch", "green", 1, "cow", 1);
    testPlayer.addCard(testCard2);
    testPlayer.getGreenPayout(2);
    expect(testPlayer.purse).to.equal(4);
    testPlayer.isTurn = false;
    testPlayer.getGreenPayout(2);
    expect(testPlayer.purse).to.equal(4);
  });
  it('has a method getGreenPayout that adds the right amount of payout for green "factory" cards, only if isTurn is true', function(){
    var testPlayer = new Player("Michaela");
    testPlayer.isTurn = true;
    var testFactoryCard = new Card([8], "Furniture Factory", "green", 3, "factory", 3, "cog");
    var testFactory2Card = new Card([11,12], "Fruit Market", "green", 2, "factory", 2, "wheat");
    var testCogCard = new Card([5], "Forest", "blue", 1, "cog", 3);
    var testWheatCard = new Card([1], "Wheat Field", "blue", 1, "wheat", 1);
    testPlayer.addCard(testCogCard);
    testPlayer.addCard(testCogCard);
    testPlayer.addCard(testFactoryCard);
    testPlayer.purse = 0;
    testPlayer.getGreenPayout(8);
    expect(testPlayer.purse).to.equal(6);
    testPlayer.addCard(testWheatCard);
    testPlayer.addCard(testWheatCard);
    testPlayer.addCard(testWheatCard);
    testPlayer.purse = 0;
    testPlayer.getGreenPayout(11);
    expect(testPlayer.purse).to.equal(0);
    testPlayer.addCard(testFactory2Card);
    testPlayer.purse = 0;
    testPlayer.getGreenPayout(11);
    expect(testPlayer.purse).to.equal(6);
  });
  it('has a method giveRedPayout that takes money from the purse and gives it to another player', function() {
    var testPlayerGiving = new Player("Michaela");
    var testPlayerReceiving = new Player("Mao");
    testPlayerGiving.giveRedPayout(testPlayerReceiving, 3);
    expect(testPlayerReceiving.purse).to.equal(6);
    expect(testPlayerGiving.purse).to.equal(0);
    testPlayerGiving.purse = 1;
    testPlayerGiving.giveRedPayout(testPlayerReceiving, 3);
    expect(testPlayerReceiving.purse).to.equal(7);
    expect(testPlayerGiving.purse).to.equal(0);
  });
  it('has a method requestRedPayout that returns the right amount of money to request from another player', function() {
    var testPlayer = new Player("Michaela");
    var testCard = new Card([3], "Cafe", "red", 1, "cafe", 2);
    testPlayer.addCard(testCard);
    expect(testPlayer.requestRedPayout()).to.equal(1);
    testPlayer.addCard(testCard);
    testPlayer.addCard(testCard);
    expect(testPlayer.requestRedPayout()).to.equal(3);
  });
});
describe('Dice', function() {
  // check the initial values
  it('creates a Dice object with the proper initial properties', function() {
    var testDice = new Dice();
    expect(testDice.dieOne).to.equal(1);
    expect(testDice.dieTwo).to.equal(1);
  });
  // check roll method
  it('.roll() method assigns two new integer values to dieOne and dieTwo properties', function() {
    var testDice = new Dice();
    testDice.roll();
    expect(testDice.dieOne % 1).to.equal(0);
    expect(testDice.dieTwo % 1).to.equal(0);
    expect(testDice.dieOne > 0 && testDice.dieOne < 7).to.equal(true);
    expect(testDice.dieTwo > 0 && testDice.dieTwo < 7).to.equal(true);
  });
});
describe('CardBank', function() {
  it('creates an empty cardBank', function() {
    var testCardBank = new CardBank();
    expect(testCardBank.cards).to.eql([]);
  });
  it('has a method to fill the cardBank with the standard card set (see testCardBank object in console)', function() {
    var testCardBank = new CardBank();
    testCardBank.setStandardBank();
    // expect(testCardBank.cards).to.eql([]);
  });
  it('has a removeCard method that returns false if the card is not present',function() {
    var testCardBank = new CardBank();
    expect(testCardBank.removeCard("Forest")).to.equal(false);
  });
  it('has a removeCard method that returns true and removes the card if the card is present',function() {
    var testCardBank = new CardBank();
    testCardBank.setStandardBank();
    expect(testCardBank.removeCard("Bakery")).to.equal(true);
  });
});
describe('Game', function() {
  //test the Game Constructor
  it('creates a Game object with the correct properties', function () {
    var testGame = new Game();
    expect(testGame.cardBank.cards.length > 0).to.equal(true);
    expect(testGame.players).to.eql([]);
    expect(testGame.activePlayerIndex).to.equal(0);
  });
  it('has a method addPlayer that adds a player to the games player array', function () {
    var testGame = new Game();
    var testPlayer = new Player("Michaela");
    testGame.addPlayer(testPlayer);
    expect(testGame.players[0]).to.eql(testPlayer);
    var testPlayer2 = new Player("Mao");
    testGame.addPlayer(testPlayer2);
    expect(testGame.players[1].playerName).to.equal("Mao");
  });
  it('has a method updateActivePlayerIndex that updates the activePlayerIndex', function () {
    var testGame = new Game();
    var testPlayer = new Player("Michaela");
    var testPlayer2 = new Player("Bob");
    var testPlayer3 = new Player("Steve");
    testGame.addPlayer(testPlayer);
    testGame.addPlayer(testPlayer2);
    testGame.addPlayer(testPlayer3);
    testGame.players[0].isTurn = true;
    expect(testGame.players[0].isTurn).to.equal(true);
    expect(testGame.activePlayerIndex).to.equal(0);
    testGame.updateActivePlayerIndex();
    expect(testGame.activePlayerIndex).to.equal(1);
    expect(testGame.players[0].isTurn).to.equal(false);
    expect(testGame.players[1].isTurn).to.equal(true);
    testGame.updateActivePlayerIndex();
    expect(testGame.activePlayerIndex).to.equal(2);
    testGame.updateActivePlayerIndex();
    expect(testGame.players[1].isTurn).to.equal(false);
    expect(testGame.players[2].isTurn).to.equal(false);
    expect(testGame.players[0].isTurn).to.equal(true);
    expect(testGame.activePlayerIndex).to.equal(0);
    testGame.updateActivePlayerIndex();
    expect(testGame.activePlayerIndex).to.equal(1);
  });
  it('has a method canActivePlayerRollTwoDice that returns true or false if they can roll two dice', function() {
    var testGame = new Game();
    var testPlayer = new Player("Michaela");
    expect(testGame.canActivePlayerRollTwoDice()).to.equal(false);
    testPlayer.addLandmark("Train Station");
    expect(testGame.canActivePlayerRollTwoDice()).to.equal(true);
  })
});
