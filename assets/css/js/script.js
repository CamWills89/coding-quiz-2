var startBtnEl = document.querySelector(".start-btn");
var instructionsEl = document.querySelector(".instructions")
var questionLabelEl = document.querySelector(".question-label")
var questionEl = document.querySelector(".question")
var btnContainerEl = document.querySelector(".btn-container")
var displayEl = document.querySelector(".display")
var timeEl = document.querySelector(".time");
var answerEl = document.querySelector(".btn");
// console.log(answerEl);

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
    // countdown();
    hider()
    // showQuestions();
};

function countdown() {
    var timer = 75;
    var timeInterval = setInterval(function () {
        if (timer == 0) {
            clearInterval(timeInterval);
        } else {
            timer--;
            timeEl.textContent = timer;
            // console.log(timer);
        }
    }, 1000);
};

function hider() {
    //remove instructions and startbtn from page
    instructionsEl.classList.add("hide");
    startBtnEl.classList.add("hide");
    // add question, btn-container, display
    questionLabelEl.classList.remove("hide");
    btnContainerEl.classList.remove("hide");
    displayEl.classList.remove("hide");
}




//Event Listeners
startBtnEl.addEventListener("click", startGame);