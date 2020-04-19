// alert("Player 1 has entered the game!");
var buttonColours = ["red","blue","green","yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;

//Start game by pressing a key
$(document).keydown(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});


//Start fuctionality with click to enable phone use
$("#level-title").on("tap",function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function(){
  //Stops clicking buttons and causing game over before a key is pressed
  if (started) {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  }
});


function checkAnswer(currentLevel){
  if  (gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success")
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function(){
      nextSequence();
  }, 1000);
 }
 }
 else {
  console.log("Wrong");
  var audio = new Audio("sounds/wrong.mp3");
  audio.play();
  $("body").addClass("game-over");
  $("#level-title").html("GAME OVER<br>press any key to restart!");
  startOver();
   
  setTimeout(function(){
   $("body").removeClass("game-over");
   }, 200);
 }
}


function nextSequence(){
  userClickedPattern= [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function startOver(){
  gamePattern = [];
  started = 0;
  level = 0;
}

function playSound(name){
  var audio = new Audio("sounds/"+name+".mp3");
  audio.play();
}

function animatePress(currentColour){
  $("#" + currentColour).addClass("pressed");
  
  setTimeout(function(){
  $("#" + currentColour).removeClass("pressed");
  }, 100);
}
