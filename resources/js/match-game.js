var MatchGame = {};
var pairs = 0;
/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function() {
  MatchGame.renderCards(MatchGame.generateCardValues(), "#game");
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var numbers = [];
  for(var i = 1; i < 9; i++) {
    numbers.push(i);
    numbers.push(i);
  }
  var cards = [];
  while(numbers.length > 0) {
    var random = Math.floor(Math.random() * numbers.length);
    var num = numbers[random];
    cards.push(num);
    numbers.splice(random, 1);
  }
  return cards;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var colors = ["hsl(25, 85%, 65%)", "hsl(55, 85%, 65%)", "hsl(90, 85%, 65%)", "hsl(160, 85%, 65%)", "hsl(220, 85%, 65%)", "hsl(265, 85%, 65%)", "hsl(310, 85%, 65%)", "hsl(360, 85%, 65%)"];
  $($game).empty();
  $($game).data("flippedCards", []);
  for(var j = 0; j < cardValues.length; j++) {
    var $card = $("<div class='col-xs-3 card'></div>")
    var color = colors[cardValues[j] - 1];
    $($card).data("value", cardValues[j]);
    $($card).data("flipped", false);
    $($card).data("color", color);
    $($game).append($card);
  }
  $(".card").click(function() {
    MatchGame.flipCard($(this), "#game");
  });

  $(".button").click(function() {
    MatchGame.renderCards(MatchGame.generateCardValues(), "#game");
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  if($($card).data("flipped")) {
    return;
  }

  $($card).css("background-color", $($card).data("color"));
  $($card).text($($card).data("value"));
  $($card).data("flipped", true);

  var numberFlipped = $($game).data("flippedCards");
  numberFlipped.push($card);

  if(numberFlipped.length === 2) {
    if(numberFlipped[0].data("value") === numberFlipped[1].data("value")) {
      numberFlipped[0].css("background-color", "rgb(153, 153, 153)");
      numberFlipped[0].css("color", "rgb(204, 204, 204)");
      numberFlipped[1].css("background-color", "rgb(153, 153, 153)");
      numberFlipped[1].css("color", "rgb(204, 204, 204)");
      pairs++;
    }
    else {
      window.setTimeout(function() {
        numberFlipped[0].css("background-color", "rgb(32, 64, 86)");
        numberFlipped[0].text("");
        numberFlipped[0].data("flipped", false);
        numberFlipped[1].css("background-color", "rgb(32, 64, 86)");
        numberFlipped[1].text("");
        numberFlipped[1].data("flipped", false);
      }, 500);
    }
    $($game).data("flippedCards", []);
  }

  if(pairs === 8) {
    $(".button").css("display", "block");
  }
};
