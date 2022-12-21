// create array game pattern

var gamePattern = [];
// array placeholder

var buttonColours = ["red", "blue", "green", "yellow"];

var userClickedPattern = [];

// keypress use when user type any keys on the keyboard

var started = false; // default value of program is off

var level = 0; // default level of the game is 0

$(document).keypress(function(){

    if(!started){
        // change h1
        $("#level-title").text("Level "+level);
        newSequence();
        started = true;
    }

});

// check which button will be clicked and add to event handler

$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);

    // add the sound when users click

    playSound(userChosenColour);

    animatePress(userChosenColour);

    console.log("user" + userClickedPattern);
});

// check user answer
function checkAnswer(currentLevel){

    // check user choose and program pattern

    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        // check length equal or not

        if(gamePattern.length === userClickedPattern.length){

            // set next sequence for 1000ms
            setTimeout(function(){
                newSequence()
            , 1000});
        }
    }else{
        // play a wrong sound
        wrongSound();
        // change background color when user clicks wrong

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 500);

        // change h1 title to game over

        $("h1").text("Game over, Press any key to start!");

        // start program again

        StartOver();
        console.log("wrong");
    }

    
}

// create restart function to reset the game

function StartOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
// create function

function newSequence(){

    //reset userClickedPattern
    userClickedPattern = [];
    // increment level
    level++;

    // change h1 associate with level

    $("#level-title").text("Level " + level);
    console.log(level);
    // create random number
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    // push randomChosenColour to game pattern

    gamePattern.push(randomChosenColour);

    // choose button using jQuery

    $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100)

    playSound (randomChosenColour);
   
    console.log("game " + gamePattern);
}


// animation function

function animatePress(currentColor){

    // check to see which button will click and change background color

    $("#"+currentColor).addClass("pressed");

    // set delay by using removeClass function 
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed"); 
    }, 100);
}





// keyboard sound
function playSound(name){
    // make a sound
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

//wrong sound

function wrongSound(){
   // make a sound
   var audio = new Audio("sounds/wrong.mp3");
   audio.play(); 
}


