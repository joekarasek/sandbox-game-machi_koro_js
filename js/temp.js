var addModalContent = function(currentGame) {
  $('.modal-body').append('<div class="bank__cards">'+
    '<div class="row bank__row">'+
    '</div>'+
    '<div class="row bank__row">'+
    '</div>'
  );
  populateCardBank();
  }
var populateCardBank = function() {
  // two arrays of card names for each row
  var rowOneCardURLs = [
    "wheat1",
    "bakery2-3",
    "ranch2",
    "cafe3",
    "convenience4",
    "forest5"
  ];
  var rowTwoCardURLs = [
    "cheese7",
    "furniture8",
    "mine9",
    "family9-10",
    "apple10",
    "fruit11-12"
  ];
  // two 6 long loops to poputate each row
  rowOneCardURLs.forEach(function(cardURL) {
    $('.bank__cards').find('.bank__row').first().append('<div class="col-xs-2 card">'+
                              '<img class="js__not-owned" src="img/'+cardURL+'.jpg" alt="card'+ 'Image">'+
                              '<p class="card__quantity">No Cards</p>'+
                            '</div>'
    );
  });
  rowTwoCardURLs.forEach(function(cardURL) {
    $('.bank__cards').find('.bank__row').last().append('<div class="col-xs-2 card">'+
                              '<img class="js__not-owned" src="img/'+cardURL+'.jpg" alt="card'+ 'Image">'+
                              '<p class="card__quantity">No Cards</p>'+
                            '</div>'
    );
  });
}
