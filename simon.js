var buttonColours = ["red" , "blue" , "green" , "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;


$( ".btn" ).click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
  } );

  $(document).keypress(function(){
    if(!started){
      $("#level-title").text("level" + level);
      nextSequence();
      started = true;
      
    }
  });
  

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
     if(userClickedPattern.length === gamePattern.length){
         setTimeout(function(){
             nextSequence();
         },1000);
     }
    }
   else{
     playSound("wrong");
     $("body").addClass("game-over");
     $("#level-title").text("Game over, Press any key to restart!");
 
     setTimeout(function() {
         $("body").removeClass("game-over");
     },200);
 
     startOver();
   }
 }

function nextSequence() {
    userClickedPattern = [];
    level++;
    $("#level-title").text("level" + level);
    var randomNumber = Math.floor( Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
   }



  function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
  }

 function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
       setTimeout(function() {
    $("#" + currentColor).removeClass("pressed");
     }, 100);
 } 




function startOver(){
     gamePattern = [];
     level = 0;
     started = false;
}
