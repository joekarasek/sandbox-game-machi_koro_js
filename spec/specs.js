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
    expect(testPlayer.monuments).to.eql([false,false,false,false]);
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
    var testGame = new Game();
    testGame.cardBank.setStandardBank();
    expect(testDice.dieOne % 1).to.equal(0);
    expect(testDice.dieTwo % 1).to.equal(0);
    expect(testDice.dieOne > 0 && testDice.dieOne < 7).to.equal(true);
    expect(testDice.dieTwo > 0 && testDice.dieTwo < 7).to.equal(true);
  });
});
