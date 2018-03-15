//Global variables
/* The global variable TriviaArray,
is declared in the data.js file.
It is an array of trivia objects, 
defined and populated in the data.js file */
var gameState = 0;
/* 0 - reset
   1 -guessing
   2-results 
   3 - game end */
var guessedIndex = -1;
var guessMade = false;
var currentTrivia;
var currentTriviaIndex = -1;
var wins = 0;
var losses = 0;
var unAnswered = 0;
var gameTimeMax = 30;
var gameTime = gameTimeMax;
var GameCountDown;

var gameTimer = setInterval(function () {
    GameCountDown--;
    if (GameCountDown >= 0 && guessMade === false) {
        var secondsString;
        if (GameCountDown >= 10) {
            secondsString = GameCountDown;
        } else {
            secondsString = "0" + GameCountDown;
        }
        $("#timerdisplay").text("00:" + secondsString);
        if (GameCountDown == 0) {
            checkAnswer()
        };
    }
}, 1000);

$(document).ready(function () {
    populateTriviaArray(); //calls function in the data.js file
    resetGame();
    gameTimer.start;
});

function resetGame() {
    guessedIndex = -1;
    currentTriviaIndex = -1;
    wins = 0;
    losses = 0;
    unAnswered = 0;
    GameCountDown = gameTimeMax
    getNextTrivia();
}

function getNextTrivia() {
    currentTriviaIndex++;
    if (currentTriviaIndex < triviaArray.length) {
        currentTrivia = triviaArray[currentTriviaIndex];
        guessedIndex = -1;
        GameCountDown = gameTimeMax;
        $("#timerdisplay").text("00:" + GameCountDown);
        guessMade = false;
        gameState = 1
        populatePage();
    } else {
        gameEnd()
    }
}

function populatePage() {
    $("#timerdisplay").text("00:" + gameTimeMax)
    $("#question").text(currentTrivia.question);
    var idString;
    for (var i = 0; i < 4; i++) {
        idString = "#label" + (i + 1);
        $(idString).html(currentTrivia.choices[i]);
    }
    $(".choice").css("background", "rgb(0, 133, 202)");
    $("#message").text("Can you beat the timer ?");
}

$(".choice").click("click", function () {
    if (guessedIndex < 0 && gameState === 1) {
        guessMade = true;
        guessedIndex = $(this).attr('value');
        $(this).css("background", "rgb(67, 176, 42");
        checkAnswer();
    }
});

function checkAnswer() {
    gameState = 2;
    if (guessedIndex == -1) {
        $("#message").text("You ran out of time");
        unAnswered++;
        var rightID = "#label" + (currentTrivia.correctIndex + 1);
        $(rightID).css("background", "rgb(67, 176, 42");

    } else if (guessedIndex == currentTrivia.correctIndex) {
        $("#message").text("That is correct!");
        wins++;
    } else {
        $("#message").text("That is incorrect!");
        // turn their choice red, turn correct choice green
        var wrongIndex = Number(guessedIndex) + 1;
        var wrongID = "#label" + (wrongIndex);
        var rightID = "#label" + (currentTrivia.correctIndex + 1);
        $(wrongID).css("background", "rgb(246, 80, 88");
        $(rightID).css("background", "rgb(67, 176, 42");
        losses++;
    }
    $("#gifholder").html('<img src="assets/images/' + currentTrivia.gifRef + '" alt="animatedGif" >');
    var newGameTimer = setTimeout(function () {
        $("#gifholder").html("")
        getNextTrivia();
    }, 7000);
}

function gameEnd() {
    gameState = 3
    $("#message").text("GAME OVER.  You guessed " + wins + " correctly; " + losses + " incorrectly and had " + unAnswered + " unanswered.");
    var GameTimer = setTimeout(function () {
        currentTriviaIndex = -1
        resetGame()
    }, 10000);
}