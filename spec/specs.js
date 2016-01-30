describe('Card', function() {
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
  it('creates a Player with the correct playerName', function() {
    var testPlayer = new Player("Michaela");
    expect(testPlayer.playerName).to.equal("Michaela");
    expect(testPlayer.purse).to.equal(3);
    expect(testPlayer.cardStack).to.eql([]);
    expect(testPlayer.monuments).to.eql([false,false,false,false]);
  });
});
