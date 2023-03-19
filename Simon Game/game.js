const buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var start = true;


console.log(start);
$(document).on("keydown", function() {
    if (start === true) {
    nextSequence();
  }
});


function nextSequence() {
  start = false;
  level++;
  $("h1").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomColor = buttonColors[randomNumber];
  gamePattern.push(randomColor);
  $("#" + randomColor).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  var soundName = "sounds/" + randomColor + ".mp3";
  playSong(soundName);
}
$(".btn").on("click", function() {

  var userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  var soundName = "sounds/" + userChosenColor + ".mp3";
  playSong(soundName);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length - 1);



})

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
  }, 100);

}

function playSong(name) {
  var sound = new Audio(name);
  sound.play();


}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] !== userClickedPattern[currentLevel]) {

    playSong("sounds/wrong.mp3");
    $("body").addClass("game-over");
    setTimeout(function() {$("body").removeClass("game-over");}, 200);
    $("h1").text("Game Over, Press Any Key to Restart");
    startOver();
  }
  else if (userClickedPattern.length === gamePattern.length) {
      userClickedPattern = [];
      setTimeout(nextSequence, 1000);
    }






}

function startOver() {

  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  start = true;


}
