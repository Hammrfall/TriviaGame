//Global variables
var gamestate = 0;
/* 0 - reset
   1 -guessing
   2-results */
var guessedIndex = -1;
var guessMade = false;
var currentTrivia;
var currentTriviaIndex = -1;
var wins = 0;
var losses = 0;
var unAnswered = 0;
var triviaArray = []
var gameTimeMax = 30;
var gameTime = gameTimeMax;
var GameCountDown;

var trivia = function () { // triviaObject
    this.correctIndex;
    this.question = ""
    this.choices = []
    this.gifRef
    isCorrect = function (index) {
        var answer = false;
        if (index === this.correctIndex) {
            answer = true;
        }
        return answer;
    }

} //end of trivia object

var gameTimer = setInterval(function () {
    GameCountDown--;
    if (GameCountDown >= 0 && guessMade === false) {
        var secondsString;
        if (GameCountDown >= 10) {
            secondsString = GameCountDown;
        } else if (GameCountDown == 0) {
            secondsString = "00";
        } else {
            secondsString = "0" + GameCountDown;
        }
        $("#timerdisplay").text("00:" + secondsString);
        if (GameCountDown == 0) {
            checkAnswer();
        }
    }
}, 1000);

$(document).ready(function () {
    populateTriviaArray();
    resetGame();
});

function resetGame() {
    guessedIndex = -1;
    currentTriviaIndex = -1;
    wins = 0;
    losses = 0;
    unAnswered = 0;
    getNextTrivia();
    populatePage();
}

function populateTriviaArray() {
    // populates the trivia array with trivia questions and answers

    var firstQuestion = new trivia;
    firstQuestion.question = "Einstein was ___  years old when he published his general theory of relativity";
    var guess1 = "26"
    firstQuestion.choices.push(guess1);
    var guess2 = "28";
    firstQuestion.choices.push(guess2);
    var guess3 = "30";
    firstQuestion.choices.push(guess3);
    var guess4 = "32";
    firstQuestion.choices.push(guess4);
    firstQuestion.correctIndex = 0;
    triviaArray.push(firstQuestion);

    var secondQuestion = new trivia;
    secondQuestion.question = "The eiffel tower is _____ tall";
    var guess1 = "846 ft"
    secondQuestion.choices.push(guess1);
    var guess2 = "987 ft";
    secondQuestion.choices.push(guess2);
    var guess3 = "1,063 feet";
    secondQuestion.choices.push(guess3);
    var guess4 = "1,244 feet";
    secondQuestion.choices.push(guess4);
    secondQuestion.correctIndex = 2;
    triviaArray.push(secondQuestion);

    var thirdQuestion = new trivia;
    thirdQuestion.question = "The statue of liberty was a gift from _____";
    var guess1 = "Germany"
    thirdQuestion.choices.push(guess1);
    var guess2 = "England";
    thirdQuestion.choices.push(guess2);
    var guess3 = "Spain";
    thirdQuestion.choices.push(guess3);
    var guess4 = "France";
    thirdQuestion.choices.push(guess4);
    thirdQuestion.correctIndex = 3;
    triviaArray.push(thirdQuestion);
};

function getNextTrivia() {
    currentTriviaIndex++;
    if (currentTriviaIndex < triviaArray.length) {
        currentTrivia = triviaArray[currentTriviaIndex];
        guessedIndex = -1;
        GameCountDown = gameTimeMax;
        $("#timerdisplay").text("00:" + GameCountDown);
        guessMade = false;
        gameTimer.start; 
    }
    //ToDo:  create an else that calls an end of game function, and that function sets a timer to restart the game

}

function populatePage() {
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
    if (guessedIndex < 0) {
        guessMade = true;
        guessedIndex = $(this).attr('value');
        $(this).css("background", "rgb(67, 176, 42");
        checkAnswer();
    }
});

function checkAnswer() {
    gamestate = 2;
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
    //ToDo: code to display gif
    var newGameTimer = setTimeout(function () {
        getNextTrivia();
        populatePage();
    }, 3000);
}