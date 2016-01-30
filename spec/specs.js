describe('Card', function() {
  it('creates a game card with the correct properties', function() {
    var testCard = new Card(1, "Wheat Field", "blue", 1, "wheat");
    expect(testCard.cardName).to.equal("Wheat Field");
    expect(testCard.cardKey).to.equal(1);
    expect(testCard.cardColor).to.equal("blue");
    expect(testCard.cardPayout).to.equal(1);
    expect(testCard.cardType).to.equal("wheat");
  });
});
