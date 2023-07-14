var quizQuestions = [
  {
    question: "What is the correct way to declare a variable in JavaScript?",
    choices: ["var x = 5;", "let x = 5;?", "const x = 5;", "All of the above"],
    answer: 3 
  },
  {
    question: "Which method is used to add an element at the end of an array in JavaScript?",
    choices: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0
  },
  {
    question: "What is the result of the following expression: 10 + 5",
    choices: ["15", "105", "10" + "5", "Error"],
    answer: 1 
  },
  {
    question: "Which built-in method in JavaScript is used to convert a string to an integer?",
    choices: ["parseInt()", "toInteger()", "toString()", "Math.floor()"],
    answer: 0 
  },
];

var quizDuration = 60;
var timePenalty = 10; 
var currentQuestionIndex = 0;
var timeLeft = quizDuration;
var timerId;

function startQuiz() {
  document.getElementById("start-screen").style.display = "none";
  document.getElementById("quiz-screen").style.display = "block";
  startTimer();
  displayQuestion();
}

function startTimer() {
  timeLeft = quizDuration; 
  timerId = setInterval(function() {
    timeLeft--;
    if (timeLeft <= 0) {
      endQuiz();
    }
    document.getElementById("timer").textContent = "Time: " + timeLeft;
  }, 1000);
}
function displayQuestion() {
  var questionElement = document.getElementById("question");
  var choicesElement = document.getElementById("choices");

questionElement.textContent = quizQuestions[currentQuestionIndex].question;
  choicesElement.innerHTML = "";
  quizQuestions[currentQuestionIndex].choices.forEach(function(choice, index) {
    var li = document.createElement("li");
    li.textContent = choice;
    li.classList.add("choice");
    li.addEventListener("click", function() {
      checkAnswer(index);
    });
    choicesElement.appendChild(li);
  });
}
function checkAnswer(selectedIndex) {
  var currentQuestion = quizQuestions[currentQuestionIndex];
  if (selectedIndex === currentQuestion.answer) {
    
    var result = document.createElement("p");
    result.textContent = "Correct";
    result.classList.add("correct");
    document.getElementById("choices").appendChild(result);
  } else {
    
    var result = document.createElement("p");
    result.textContent = "Wrong";
    result.classList.add("wrong");
    document.getElementById("choices").appendChild(result);
    timeLeft -= timePenalty;
    if (timeLeft <= 0) {
      endQuiz();
    }
  }
  currentQuestionIndex++;
  if (currentQuestionIndex === quizQuestions.length) {
    endQuiz();
  } else {
    setTimeout(function () {
      displayQuestion();
    }, 500); 
  }
}

function saveScore() {
  var initialsInput = document.getElementById("initials");
  var initials = initialsInput.value.trim();
  if (initials !== "") {
    var score = timeLeft;
    saveHighScore(initials, score);
    window.location.href = "highscores.html";
  }
}
function endQuiz() {
  clearInterval(timerId);
  document.getElementById("quiz-screen").style.display = "none";
  document.getElementById("game-over-screen").style.display = "block";
  document.getElementById("final-score").textContent = "Final Score: " + timeLeft;
  document.getElementById("save-score-section").style.display = "block";
}

function saveHighScore(initials, score) {
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  var newScore = { initials: initials, score: score };
  highScores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function goBackToStart() {
  document.getElementById("game-over-screen").style.display = "none";
  document.getElementById("start-screen").style.display = "block";
  timeLeft = quizDuration;
}
function resetHighScores() {
  localStorage.removeItem("highScores");
  displayHighScores();
}
document.getElementById("start-button").addEventListener("click", startQuiz);
document.getElementById("reset-button").addEventListener("click", resetHighScores);
document.getElementById("save-button").addEventListener("click", saveScore);
document.getElementById("go-back-button").addEventListener("click", goBackToStart);



