var quiz = document.querySelector(".site");
var questionElement = document.querySelector(".questions");
var answerButtons = document.querySelector(".answer-buttons");
var startButton =document.querySelector(".start-button");

var score = 0;
var currentQuestionIndex = 0;
var timer;
var timerCount;

//questions and answers for quiz
var questions = [
    {
        question: "Commonly used data types DO Not Include:",
        answers: [
            { text: "1. strings", correct: false},
            { text: "2. booleans", correct: true},
            { text: "3. alerts", correct: false},
            { text: "4. numbers", correct: false},
        ]
    },
    {
        question: "The condition in an if / else statement is enclosed with ________.",
        answers: [
            { text: "1. quotes", correct: false},
            { text: "2. curly brackets", correct: false},
            { text: "3. parenthesis", correct: true},
            { text: "4. square brackets", correct: false},
        ]
    },
    {
        question: "Arrays in Javascript can be used to store ________.",
        answers: [
            { text: "1. numbers and strings", correct: false},
            { text: "2. other arrays", correct: false},
            { text: "3. booleans", correct: false},
            { text: "4. all of the above", correct: true},
        ]
    },
    {
        question: "string values must be enlocsed within ________ when being assigned to variables.",
        answers: [
            { text: "1. commas", correct: false},
            { text: "2. curly brackets", correct: true},
            { text: "3. quotes", correct: false},
            { text: "4. parenthesis", correct: false},
        ]
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: [
            { text: "1. Javascript", correct: false},
            { text: "2. terminal/bash", correct: false},
            { text: "3. for loops", correct: true},
            { text: "4. console.log", correct: false},
        ]
    },
]



//function to start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    timerCount = 75;
    showQuestion();
}

//function to display questions and answer choices
function showQuestion() {
    resetState();
    var currentQuestion = questions[currentQuestionIndex];
    var questionNo =currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e) {
    var selectedBtn = e.target;
    var isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect) {
        score++;
    }
}
//isCorrect.addEventListener("click", ()=>{
    //if(currentQuestionIndex < questions.length) {
        
    //}
//})

startQuiz();





startButton.addEventListener("click", startQuiz);



var goBackButton = document.querySelector(".go-back");
//create a function to go back, name it goBack
goBackButton.addEventListener("click", goBack);

var clearScore = document.querySelector(".clear-score");
//create a function to clear high scores, name it clearHighScore
clearScore = addEventListener("click", clearHighScore);