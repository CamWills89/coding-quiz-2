//query Selectprs
var startBtnEl = document.querySelector(".start-btn");
var instructionsEl = document.querySelector(".instructions");
var questionLabelEl = document.querySelector(".question-label");
var questionEl = document.querySelector(".question");
var btnContainerEl = document.querySelector(".btn-container");
var displayEl = document.querySelector(".display");
var timeEl = document.querySelector(".time");
var endGameEl = document.querySelector(".end-game");
var highScoresEL = document.querySelector(".high-scores");
var submitEL = document.querySelector(".submit");
var skipEl = document.querySelector(".skip");
var goBackEl = document.querySelector(".go-back");
var clearScoresEl = document.querySelector(".clear-scores");
var currentScoreEl = document.querySelector(".current-score");
var highScoresListEL = document.querySelector(".high-scores.list")

// console.log(highScoresListEL);

//Element Id selectors
var scoreDisplayEl = document.getElementById("score");
var answerBtn1El = document.getElementById("btn-1");
var answerBtn2El = document.getElementById("btn-2");
var answerBtn3El = document.getElementById("btn-3");
var answerBtn4El = document.getElementById("btn-4");

var score = 0;
var correct = 10;

var timer;
var timeInterval;

const questions = [
    {
        question: "Inside which HTML element do we put the JavaScript?",
        answers: ["<script>", "<javascript>", "<js>", "<scripting>"],
        correctAnswer: 0,
    },
    {
        question: "How to write an IF statement in JavaScript?",
        answers: ["if i == 5 then", "if i = 5 then", "if(i == 5)", "if i = 5"],
        correctAnswer: 2,
    },
    {
        question: "Which operator is used to assign a value to a variable?",
        answers: ["=", "-", "x", "*"],
        correctAnswer: 0,
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        answers: ["<script href='xxx.js'>", "<script name='xxx.js'>", "<script src='xxx.js'>", "<script file='xxx.js'>"],
        correctAnswer: 2,
    },
    {
        question: "How do you write 'Hello World' in an alert box?",
        answers: ["msgBox('Hello World');", "alertBox('Hello World');", "msg('Hello World');", "alert('Hello World');"],
        correctAnswer: 3
    }
];

var answerBtns = [];
answerBtns.push(answerBtn1El);
answerBtns.push(answerBtn2El);
answerBtns.push(answerBtn3El);
answerBtns.push(answerBtn4El);

// console.log(questions);
var currentQuestion = 0;
//need to start timer
//need to remove hide classes from answers and add hide to start screen
//need to loop through array to display questions and answers
//check answers
//track score
//remove time for wrong answers
function startQuiz() {
    // console.log('clicked');
    timer = 75;
    countdown();
    showQuestions();
};

function countdown() {
    // timer = 75;
    timeInterval = setInterval(function () {
        if (timer == 0) {

            // console.log("game over!");
            endGame();
        } else {
            timer--;
            timeEl.textContent = (": " + timer);
            // console.log(timer);
        }
    }, 1000);
};

// console.log(questionEl);
function showQuestions() {
    //display question
    questionEl.textContent = questions[currentQuestion].question;
    //display answers - worked with fellow student (Tony Zeuch) to help me with this
    for (var i = 0; i < answerBtns.length; i++) {
        answerBtns[i].textContent = questions[currentQuestion].answers[i];
    }
};

function checkAnswer(selection) {
    //check if answer is correct
    if (selection === questions[currentQuestion].correctAnswer) {
        var result = document.getElementById("answer");
        var text = document.createTextNode("Correct!");
        //display result
        result.appendChild(text);
        //add score
        scoreTracker(correct);
    }
    else {
        var result = document.getElementById("answer");
        var text = document.createTextNode("Incorrect!");
        //display result
        result.appendChild(text);
        // deduct 10 seconds from time
        timer -= 10;
    }
    //setting delay before moving to next question to see if answer was right/wrong
    setTimeout(function () {
        result.removeChild(text);
        currentQuestion++;
        getNextQuestion();
    }, 300);

};

function getNextQuestion() {
    //go to next question
    if (currentQuestion < questions.length) {
        //call showQuestion to display next question
        showQuestions();
    } else {
        endGame();
    }
};

//Update score and score Display
scoreTracker = function (num) {
    score += num;
    scoreDisplayEl.textContent = score;
};

//show endgame screen and stop the clock
function endGame() {
    //hide questions,score, display and answers
    questionLabelEl.classList.add("hide");
    btnContainerEl.classList.add("hide");
    displayEl.classList.add("hide");
    //show endgame screen
    endGameEl.classList.remove("hide");
    //stop timer
    clearInterval(timeInterval);

    //disabling the submit button until user types in value (initials) to the input field.
    var input = document.querySelector("#initials")
    input.addEventListener("keyup", function () {
        submitEL.disabled = !input.value
    });
    setHighScores();
};

//submitting scores to local storage onclick
function setHighScores() {
    //show score
    var currentScore = score;
    // timeleft = timer
    // console.log(timeleft);
    currentScoreEl.textContent = currentScore;

    //get highscores from localStorage or return an empty array if there aren't any
    var highScores = JSON.parse(localStorage.getItem("highScores")) || [];

    //submit highscores to local storage and add them to highScores already stored.
    submitEL.addEventListener("click", function (event) {
        event.preventDefault();

        var initials = document.querySelector("#initials").value

        var mostRecentScore = {
            score: currentScore,
            initials: initials
        }
        highScores.push(mostRecentScore);

        localStorage.setItem("highScores", JSON.stringify(mostRecentScore));
        showHighScoresList();
    });
}

//show highscores screen and display list from localStorage
function showHighScoresList() {
    //remove end game screen
    endGameEl.classList.add("hide");
    //show high scores screen
    highScoresEL.classList.remove("hide")

    //get highscores from localStorage
    // var highScoresListEL = document.querySelector(".high-scores.list")
    scoresList = JSON.parse(localStorage.getItem("highScores")) || [];
    console.log(scoresList);

    ListEl = document.createElement("li");
    ListEl.textContent = scoresList.initials + "- " + scoresList.score;
    highScoresListEL.appendChild(ListEl);


    //clear scores from local storage
    clearScoresEl.addEventListener("click", function(){
        localStorage.clear();
    })
};

// //if skip or go back buttons selected, restart game
function resetGame() {
    location.reload();
};


function startHider() {
    //remove instructions and startbtn from page
    instructionsEl.classList.add("hide");
    startBtnEl.classList.add("hide");

    // add question, btn-container, display
    questionLabelEl.classList.remove("hide");
    btnContainerEl.classList.remove("hide");
    displayEl.classList.remove("hide");
};

//Event Listeners
startBtnEl.addEventListener("click", function () {
    startHider();
    startQuiz();
});

//reset game if these are selected
skipEl.addEventListener("click", resetGame);
goBackEl.addEventListener("click", resetGame)

//answer buttons for answer checks
answerBtn1El.addEventListener("click", function () {
    checkAnswer(0);
});
answerBtn2El.addEventListener("click", function () {
    checkAnswer(1);
});
answerBtn3El.addEventListener("click", function () {
    checkAnswer(2);
});
answerBtn4El.addEventListener("click", function () {
    checkAnswer(3);
});