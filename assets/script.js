var site = document.querySelector(".site");
var quiz = document.querySelector(".quiz");
var final = document.querySelector(".final");
var questionElement = document.querySelector(".questions");
var answerButtons = document.querySelector(".answer-buttons");
var startButton = document.querySelector(".start-button");
var timerElement = document.querySelector(".timer");
var scores = document.querySelector(".final-score");
var highScoreElement = document.querySelector(".high-scores");
var clearHighScoresButton = document.querySelector(".clear-score");

//var score = 0;
var currentQuestionIndex = 0;
var highScore;
var timer;
var timerCount;

//array of questions and answers for quiz
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
        question: "String values must be enclosed within ________ when being assigned to variables.",
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
            { text: "2. terminal or bash", correct: false},
            { text: "3. for loops", correct: true},
            { text: "4. console.log", correct: false},
        ]
    },
]



//function to start the quiz, still working on it
function startQuiz() {
    //isWin = false;
    currentQuestionIndex = 0;
    timerCount = 75;
    scores.textContent = timerCount;
    startTimer();
    showQuestion();
    site.classList.add("hide");
    quiz.classList.remove("hide");
}


//function to start timer, and triggers stop, and when game ends if you lose or win
function startTimer() {
    timer = setInterval(function() {
      timerCount--;
      timerElement.textContent = timerCount;
      if (timerCount >= 0) {
        if (currentQuestionIndex >= questions.length && timerCount > 0) {
          clearInterval(timer);
          

        }
        
        
      }
      if (timerCount === 0) {
        clearInterval(timer);
        endQuiz();
      }
    }, 1000);
  }

  //function to end quiz if timer reaches 0 before being completed
  function endQuiz() {
    quiz.classList.add("hide");
    final.classList.remove("hide");
  }


//function to display questions and answer choices
function showQuestion() {
    resetState();
    var currentQuestion = questions[currentQuestionIndex];
    var questionNo =currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach((answer, index) => {
        var button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        button.dataset.index = index;
        button.addEventListener("click", selectAnswer);
    });
}

//to not show original question and answer choice from html file
function resetState() {
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

//shows the answer is correct/wrong, maybe same function can be used to throw in the next question, and to add a point to score
function selectAnswer(e) {
    var question = questions[currentQuestionIndex];
    var answerIndex = e.target.dataset.index;
    if(question.answers[answerIndex].correct) {
        console.log("correct");
    } else {
        console.log("wrong!");
        timerCount = timerCount-10;
   }

    currentQuestionIndex++;
   

    if (currentQuestionIndex >= questions.length) {
        showFinal();
    } else {
        showQuestion();
    }
    scores.textContent = timerCount;
}


// function for final page where scores are there, final score is there, and buttons are also shown
function showFinal() {
    quiz.classList.add("hide");
    final.classList.remove("hide");

    
    var finalScores = timerCount;

    var initialsInput = document.getElementById("initials");
    var initials = initialsInput.value;

    if (initials) {
        var score = { initials: initials, score: finalScores };

        var scores = JSON.parse(localStorage.getItem('scores')) || [];
        scores.push(score);

        localStorage.setItem('scores', JSON.stringify(scores));
    }

    clearHighScoresButton.addEventListener("click", function() {
        localStorage.removeItem('scores');
        displayHighScores();
    });

    displayHighScores();

}

function goBack() {
    final.classList.add("hide");
    site.classList.remove("hide");
}


function displayHighScores() {
    var scores = JSON.parse(localStorage.getItem('scores')) || [];
    var highScoreElement = document.querySelector(".high-scores");
    highScoreElement.innerHTML = "";

    scores.forEach(function(score, index) {
        var scoreItem = document.createElement("li");
        scoreItem.textContent = score.initials + " - " + score.score;
        highScoreElement.appendChild(scoreItem);
    });
}


var goBackButton = document.querySelector(".go-back"); 
    goBackButton.addEventListener("click", goBack);
    
startButton.addEventListener("click", startQuiz);


