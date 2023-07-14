function getHighScores() {
  var highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  return highScores;
}
function saveHighScore(initials, score) {
  var highScores = getHighScores();
  var newScore = { initials: initials, score: score };
  highScores.push(newScore);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}
function displayHighScores() {
  var highScores = getHighScores();
  var scoresList = document.getElementById("scores-list");
  scoresList.innerHTML = "";

  highScores.forEach(function(score) {
    var li = document.createElement("li");
    li.textContent = score.initials + " - " + score.score;
    scoresList.appendChild(li);
  });
}
function saveScore() {
  var initialsInput = document.getElementById("initials");
  var initials = initialsInput.value.trim();
  var finalScore = parseInt(document.getElementById("final-score").textContent.split(": ")[1]);

  if (initials !== "" && !isNaN(finalScore)) {
    saveHighScore(initials, finalScore);
    window.location.href = "highscores.html";
  }
}
function resetHighScores() {
  localStorage.removeItem("highScores");
  displayHighScores();
}
function goBackToStart() {
  window.location.href = "index.html";
}
document.getElementById("reset-button").addEventListener("click", resetHighScores);
document.getElementById("go-back-button").addEventListener("click", goBackToStart);
displayHighScores();
document.getElementById("save-button").addEventListener("click", saveScore);
