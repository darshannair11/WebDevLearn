var buttonColours=['red','blue','yellow','green'];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

function playSound(name){
    var sound=new Audio("sounds/"+name+".mp3");
    sound.play();
}

function animatePress(currentColour){
    $('#'+currentColour).addClass('pressed');
    setTimeout(function(){
        $('#'+currentColour).removeClass('pressed');
    },100);
}

function checkAnswer(currentLevel){
    if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
        if(gamePattern.length===userClickedPattern.length){
            console.log("Correct");
            setTimeout(nextSequence,1000);
        }
    }
    else{
        playSound('wrong');
        $('body').addClass('game-over');
        setTimeout(function(){
            $('body').removeClass('game-over');
    },200);
    startOver();
}
}

function nextSequence(){
    userClickedPattern=[];
    level++;
    $('h1').text('Level '+level);
    var randomNumber=Math.floor(Math.random()*4);
    var randomChosenColour=buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

$('.btn').click(function(event){
    var userChosenColour=event.target.id;
    userClickedPattern.push(userChosenColour);
    animatePress(userChosenColour);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

$(document).keypress(function(){
    if(started===false){
        started=true;
        $('h1').text('Level '+level);
        nextSequence();
    }
})

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
    $("h1").text("Game Over, Press any key to start over");
}