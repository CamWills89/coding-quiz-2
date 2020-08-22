//query Selectprs
var startBtnEl = document.querySelector(".start-btn");
var instructionsEl = document.querySelector(".instructions")
var questionLabelEl = document.querySelector(".question-label")
var questionEl = document.querySelector(".question")
var btnContainerEl = document.querySelector(".btn-container")
var displayEl = document.querySelector(".display")
var timeEl = document.querySelector(".time");
var endGameEl = document.querySelector(".end-game");
var highScoresEL = document.querySelector(".high-scores");
var submitEL = document.querySelector(".submit");
var skipEl = document.querySelector(".skip");
var goBackEl = document.querySelector(".go-back");
var clearScoresEl = document.querySelector(".clear-scores");

// console.log(submitEL);

//Element Id selectors
var scoreDisplayEl = document.getElementById("score");
var answerBtn1El = document.getElementById("btn-1");
var answerBtn2El = document.getElementById("btn-2");
var answerBtn3El = document.getElementById("btn-3");
var answerBtn4El = document.getElementById("btn-4");

var score = 0;
var correct = 10;

var timer = 0;

var questions = [
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
function startGame() {
    // console.log('clicked');
    countdown();
    startHider();
    showQuestions();
};

function countdown() {
    var timer = 75;
    var timeInterval = setInterval(function () {
        if (timer == 0) {
            clearInterval(timeInterval);
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
    score = 0;
    //display question
    questionEl.textContent = questions[currentQuestion].question;
    //display answers - worked with fellow student (Tony Zeuch) to help me with this
    for (var i = 0; i < answerBtns.length; i++) {
        answerBtns[i].textContent = questions[currentQuestion].answers[i];
    }
};
// answerBtns.addEventListener("click", getNextQuestion)
//this for loop let me create the element, but i couldn't figure out how to shuffle to next answers
// for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
//     console.log(questions[currentQuestion].answers[i]);
// answerEl.textContent = questions[currentQuestion].answers;
//}

// questions[currentQuestion].answers.forEach(function (answer) {
//     console.log(answer);
// });

//this is dynamically creating the buttons.
// var button = document.createElement("button");
// button.setAttribute("data-number", [i])
// button.textContent = questions[currentQuestion].answers[i];
// button.classList.add("btn");
// button.addEventListener("click", getNextQuestion);
// btnContainerEl.appendChild(button)
// console.log(button);

// if (button === questions[currentQuestion].correctAnswer) {
// console.log("yes");
// } else {
//     console.log("no");
// }

function checkAnswer(selection) {
    //check if answer is correct
    if (selection === questions[currentQuestion].correctAnswer) {
        var result = document.getElementById("answer");
        var text = document.createTextNode("Correct!");
        //display result
        result.appendChild(text);
        scoreTracker(correct);
    }
    else {
        var result = document.getElementById("answer");
        var text = document.createTextNode("Incorrect!");
        //display result
        result.appendChild(text);
        // timer -= 10;
    }
    // if (selection === questions[currentQuestion].correctAnswer) {
    //     scoreTracker(correct);
    // }
    setTimeout(function () {
        result.removeChild(text);
        currentQuestion++;
        getNextQuestion();
    }, 250);

};

function getNextQuestion() {
    // console.log("click");
    // currentQuestion++;
    //go to next question
    if (currentQuestion < questions.length) {
        showQuestions();
    } else {
        // console.log("End of game")
        endGame();
    }
    //call showQuestion to display next
};

scoreTracker = function (num) {
    score += num;
    scoreDisplayEl.textContent = score;
    console.log(score);
};

function endGame() {
    //hide questions,score, display and answers
    questionLabelEl.classList.add("hide");
    btnContainerEl.classList.add("hide");
    displayEl.classList.add("hide");
    //show endgame screen
    endGameEl.classList.remove("hide");
    //store initials and score in local storage
    //go to high scores screen

    // if skip is selected, restart game
};

function resetGame() {
    //if skip or go back buttons selected, restart game
    instructionsEl.classList.remove("hide");
    startBtnEl.classList.remove("hide");
    endGameEl.classList.add("hide");
    
   //tried to add the questions array, but it didnt work
    
}

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
startBtnEl.addEventListener("click", startGame);

skipEl.addEventListener("click", resetGame);
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

