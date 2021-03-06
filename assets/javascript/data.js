var triviaArray = [];

var trivia = function () { // triviaObject
    this.correctIndex;
    this.question = "";
    this.choices = [];
    this.gifRef = "";
    isCorrect = function (guess) {
        var answer = false;
        if (guess === this.correctIndex) {
            answer = true;
        }
        return answer;
    }
}

function populateTriviaArray() { // populates the trivia array with trivia questions and answers
    var firstQuestion = new trivia;
    firstQuestion.question = "Einstein was ___  years old when he published his general theory of relativity";
    firstQuestion.choices.push("26", "28", "30", "32");
    firstQuestion.correctIndex = 0;
    firstQuestion.gifRef = "Einstein.gif";

    var secondQuestion = new trivia;
    secondQuestion.question = "The eiffel tower is _____ tall";
    secondQuestion.choices.push("846 feet", "987 feet", "1,063 feet", "1,244 feet");
    secondQuestion.correctIndex = 2;
    secondQuestion.gifRef = "eiffel.gif";

    var thirdQuestion = new trivia;
    thirdQuestion.question = "The statue of liberty was a gift from _____";
    thirdQuestion.choices.push("Germany", "England", "Spain", "France");
    thirdQuestion.correctIndex = 3;
    thirdQuestion.gifRef = "liberty.gif";

    var fourthQuestion = new trivia;
    fourthQuestion.question = "The only president confirmed to have a tattoo is ______";
    fourthQuestion.choices.push("Andrew Jackson", "Ulysses S. Grant", "Theodore Roosevelt", "Barack Obama");
    fourthQuestion.correctIndex = 2;
    fourthQuestion.gifRef = "teddy.gif";

    var fifthQuestion = new trivia
    fifthQuestion.question = "Which of these took the longest to build?";
    fifthQuestion.choices.push("Taj Mahal", "Buckingham Palace", "Brandenburg Gate", "Leaning Tower of Pisa");
    fifthQuestion.correctIndex = 3;
    fifthQuestion.gifRef = "pisa.gif";

    triviaArray.push(firstQuestion, secondQuestion, thirdQuestion, fourthQuestion, fifthQuestion);
};