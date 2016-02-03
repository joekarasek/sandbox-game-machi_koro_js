// ===================================
//     Game Logic
// ===================================

// Landmark Constructors
// ====================
function Landmark(landmarkName, landmarkCost) {
  this.landmarkName = landmarkName;
  this.landmarkCost = landmarkCost;
  this.landmarkActive = false;
}


// Card Constructor
// ================
function Card(cardKey, cardName, cardColor, cardPayout, cardType, cardCost, cardMultiplier, cardURL) {
  this.cardKey = cardKey;
  this.cardName = cardName;
  this.cardColor = cardColor;
  this.cardPayout = cardPayout;
  this.cardType = cardType;
  this.cardCost = cardCost;
  this.cardMultiplier = cardMultiplier; //is a string equal to cardType that multiplies
  this.cardURL = cardURL;
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
  this.cardStack = [
    new Card([1], "Wheat Field", "blue", 1, "wheat", 1, '', "img/wheat1.jpg"),
    new Card([2,3], "Bakery", "green", 1, "store", 1, '', "img/bakery2-3.jpg")
    ];
  this.purse = 3;
  this.landmarks = [
    new Landmark("Train Station", 4),
    new Landmark("Shopping Mall", 10),
    new Landmark("Amusement Park", 16),
    new Landmark("Radio Tower", 22)
    ];
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
Player.prototype.landmarkTrue = function(landmark) {
  this.purse -= landmark.landmarkCost;
  this.landmarks.forEach(function(landmark2){
    if (landmark2.landmarkName === landmark.landmarkName) {
      landmark2.landmarkActive = true;
    }
  });
}
Player.prototype.getBluePayout = function(diceValue) {
  var payOut = 0;
  this.cardStack.forEach(function(card) {
    if (card.cardKey.indexOf(diceValue) !== -1 && card.cardColor === "blue") {
      payOut += card.cardPayout;
    }
  });
  this.purse += payOut;
}
Player.prototype.getGreenPayout = function(diceValue, currentGame) {
  var payOut = 0;
  var multiplier = 0;
  var that = this;
  this.cardStack.forEach(function(card) {
    if (card.cardMultiplier !== '' && card.cardKey.indexOf(diceValue) !== -1 && card.cardColor === "green") {
      that.cardStack.forEach(function(card2) {
        if (card.cardMultiplier === card2.cardType) {
          multiplier++;
        }
      });
      payOut += (multiplier * card.cardPayout);
      multiplier = 0;
    } else if (card.cardKey.indexOf(diceValue) !== -1 && card.cardColor === "green") {
      payOut += card.cardPayout;
    }
  });
  currentGame.players[currentGame.activePlayerIndex].purse += payOut;
}
Player.prototype.requestRedPayout = function(){
  var requestedAmount = 0;
  this.cardStack.forEach(function(card) {
    if (card.cardColor === "red") {
      requestedAmount += card.cardPayout;
    }
  });
  return requestedAmount;
}
Player.prototype.giveRedPayout = function(playerToPay, amountToPay) {
  if (this.purse >= amountToPay) {
    this.purse -= amountToPay;
    playerToPay.purse += amountToPay
  } else {
    playerToPay.purse += this.purse;
    this.purse = 0;
  }
}
Player.prototype.hasWon = function() {
  if (this.landmarks[0].landmarkActive && this.landmarks[1].landmarkActive && this.landmarks[2].landmarkActive && this.landmarks[3].landmarkActive) {
    return true;
  }
  return false;
}

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
    new Card([1], "Wheat Field", "blue", 1, "wheat", 1, '', 'img/wheat1.jpg'),
    new Card([2,3], "Bakery", "green", 1, "store", 1, '', 'img/bakery2-3.jpg'),
    new Card([2], "Ranch", "blue", 1, "cow", 1, '', 'img/ranch2.jpg'),
    new Card([3], "Cafe", "red", 1, "cafe", 2, '', 'img/cafe3.jpg'),
    new Card([4], "Convenience Store", "green", 3, "store", 2, '', 'img/convenience4.jpg'),
    new Card([5], "Forest", "blue", 1, "cog", 3, '', 'img/forest5.jpg'),
    new Card([7], "Cheese Factory", "green", 3, "factory", 5, "cow", 'img/cheese7.jpg'),
    new Card([8], "Furniture Factory", "green", 3, "factory", 3, "cog", 'img/furniture8.jpg'),
    new Card([9], "Mine", "blue", 5, "cog", 6, '', 'img/mine9.jpg'),
    new Card([9,10], "Family Restaurant", "red", 2, "cafe", 3, '', 'img/family9-10.jpg'),
    new Card([10], "Apple Orchard", "blue", 3, "wheat", 3, '', 'img/apple10.jpg'),
    new Card([11,12], "Fruit Market", "green", 2, "factory", 2, "wheat", 'img/fruit11-12.jpg')
  ];

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
  this.cardBank.setStandardBank();
  this.players = [];
  this.activePlayerIndex = 0;
}
// method for adding players to game
Game.prototype.addPlayer = function(playerToAdd) {
  this.players.push(playerToAdd);
}
// next turn method
Game.prototype.updateActivePlayerIndex = function() {
  // this.players[this.activePlayerIndex].isTurn = false;
  if (this.activePlayerIndex < this.players.length-1) {
    this.activePlayerIndex ++;
  } else {
    this.activePlayerIndex = 0;
  }
  // this.players[this.activePlayerIndex].isTurn = true;
}
Game.prototype.canActivePlayerRollTwoDice = function() {
  if (this.players[this.activePlayerIndex].landmarks[0].landmarkActive) {
    return true;
  }
  return false;
}
// ??? method to determine who goes first


// ===========================
//     User Interface
// ===========================
var addNewPlayerToGame = function(game) {
  if ($('form#playerSetup input').val() === '') {
    alert("You must assign a player name to add a player.");
    return;
  }
  if (game.players.length > 3) {
    alert("This game is shitty with more than 4 people.");
    return;
  }
  var newPlayer = new Player( $('form#playerSetup input').val());
  game.addPlayer(newPlayer);
  $('#playerList').append('<li>'+$('form#playerSetup input').val()+'</li>');
  $('form#playerSetup input').val('');
  $('form#playerSetup input').focus();
  if (game.players.length >=2) {
    $('#startGameButton').show();
  }
  return newPlayer;
}
var hideAndShowDivs = function(divToHide, divToShow) {
  $(divToHide).hide();
  $(divToShow).show();
}
var populatePlayer = function(player, currentGame, count) {
  $('.main_game_div').append('<div class="player" id="player'+
      count+
      '">'+
      '<div class="row player__info">'+
        '<div class="col-md-4">'+
          '<h2 class="player__name">'+player.playerName+'</h2>'+
        '</div>'+
        '<div class="col-md-4">'+
          '<h2 class="player__landmarks">Landmarks</h2>'+
        '</div>'+
        '<div class="col-md-4">'+
          '<h2 class="player__coins">Coins: '+player.purse+'</h2>'+
        '</div>'+
      '</div>'+
      '<div class="player__cards">'+
        '<div class="row card__row">'+
        '</div>'+
        '<div class="row card__row">'+
        '</div>'+
      '</div>'+
      '<div class="player__buttons">'+
        '<button class="button__roll1">Roll 1</button>'+
        '<button class="button__roll2">Roll 2</button>'+
        '<button class="button__end-turn">End Turn</button>'+
      '</div>'+
    '</div>'
  );
  populatePlayerCards();

  // event handler for end turn button
  $('.button__end-turn').last().click(function() {
    disableRollButtons($('.button__roll1'),$('.button__roll2'));
    var oldTarget = "#player"+currentGame.activePlayerIndex;
    $(oldTarget).css("background-color", "white");
    $(oldTarget+" .button__end-turn").prop("disabled", true);
    currentGame.updateActivePlayerIndex();
    var newTarget = "#player"+currentGame.activePlayerIndex;
    $(newTarget).css("background-color", "#52A5D8");
    $(newTarget+" .button__end-turn").prop("disabled", false);
    enableRollButtons($(newTarget+" .button__roll1"), $(newTarget+" .button__roll2"));
  });

  // event handler for rolling one dice
  $('.button__roll1').last().click(function() {
    currentGame.players[currentGame.activePlayerIndex].rollOneDie();
    // update display of dice
    $(".die-pic1").attr("src", currentGame.players[currentGame.activePlayerIndex].dice.dieOneImgAddress);
    $(".die-pic2").css("opacity", "0.2");
    // disable further rolls
    // run payouts
    var dieValue = currentGame.players[currentGame.activePlayerIndex].dice.dieOne;
    currentGame.players[currentGame.activePlayerIndex].getGreenPayout(dieValue, currentGame);
    currentGame.players.forEach(function(playerToPayout) {
      playerToPayout.getBluePayout(dieValue);
    });
    disableRollButtons($('.button__roll1'),$('.button__roll2'));
  });
  // event handler for rolling two dice
  $('.button__roll2').last().click(function() {
    disableRollButtons($('.button__roll1'),$('.button__roll2'));
    var dieValue = currentGame.players[currentGame.activePlayerIndex].rollTwoDie();
    // update display of dice
    $(".die-pic1").attr("src", currentGame.players[currentGame.activePlayerIndex].dice.dieOneImgAddress);
    $(".die-pic2").css("opacity", "1");
    $(".die-pic2").attr("src", currentGame.players[currentGame.activePlayerIndex].dice.dieTwoImgAddress);
    // disable further rolls
    // disableRollButtons($('.button__roll1'),$('.button__roll2'));
    // run payouts
    currentGame.players.forEach(function(player) {
      player.getBluePayout(dieValue);
    });
    currentGame.players[currentGame.activePlayerIndex].getGreenPayout(dieValue, currentGame);
  });
  //run function to update purse UIs
  // event handler for roll two dice button
  //run check on all players for payouts
  //run function to update purse UIs
}
var disableRollButtons = function(button1, button2) {
  button1.prop('disabled', true);
  button2.prop('disabled', true);
}
var enableRollButtons = function(button1, button2) {
  button1.prop('disabled', false);
  button2.prop('disabled', false);
}
var populatePlayerCards = function() {
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
    $('.player').last().find('.card__row').first().append('<div class="col-xs-2 card">'+
                              '<img class="js__not-owned" src="img/'+cardURL+'.jpg" alt="card'+ 'Image">'+
                              '<p class="card__quantity">No Cards</p>'+
                            '</div>'
    );
  });
  rowTwoCardURLs.forEach(function(cardURL) {
    $('.player').last().find('.card__row').last().append('<div class="col-xs-2 card">'+
                              '<img class="js__not-owned" src="img/'+cardURL+'.jpg" alt="card'+ 'Image">'+
                              '<p class="card__quantity">No Cards</p>'+
                            '</div>'
    );
  });
}

// populate a player div
// show available/purchased cards
// hide unavailable cards
// highlight active players div
// update UI with players current purse value
// update UI card counts
//UI function at end of game to reset everything


$(document).ready(function() {
  var currentGame = new Game();
  $('form#playerSetup input').focus();

  $('.intro_screen').click(function() {
    hideAndShowDivs('.intro_screen','.player_creation');
  });

  $('form#playerSetup').submit(function(event) {
    event.preventDefault();
    var playerToAdd = addNewPlayerToGame(currentGame);
    // run populate player function, pass in playerToAdd
  });

  $('#startGameButton').click(function() {
    hideAndShowDivs(".player_creation", ".game__board");
    console.log(currentGame);
    var count = 0;
    currentGame.players.forEach(function(player) {
      populatePlayer(player, currentGame, count);
      count++;
    });
    $('button').prop("disabled", true);
    $('#player0 button').prop("disabled", false);
    $('#player0').css("background-color", "#52A5D8");
  });
  // $('#startGameButton').click(function() {
  //   hideAndShowDivs(".player_page", ".rule_link");
  // });

  // event handler for click on bank card, will remove from bank and add to player, update UI, if player can afford it, end turn if successful

  // event handler for button end turn without purchase

  //event handler for purchasing landmark, ends turn
      //include a check for winner
});
