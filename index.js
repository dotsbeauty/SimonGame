const colour= ['blue', 'red', 'yellow', 'green']
var gamePattern = []
var userClickedPattern = []
var level = 1;
var lastlevel = level;
var start = false;

function nextSequence(){
    var randomNumber= Math.floor(Math.random()*4);
    var randomColour = colour[randomNumber];
    gamePattern.push(randomColour);
}

$(document).on("keypress", function(event){
    if(!start){
        nextSequence();
        showGamePattern();
        $("#level-title").text("Level " + level);
        $(".score").hide();
        start = true; 
    } 
})

$('.btn').on("click", function(event){
    if(start){   
        var userClickedButton = event.target.id;
        
        animatePress(userClickedButton);
        playSound(userClickedButton);

        userClickedPattern.push(userClickedButton);
        if(subList() && userClickedPattern.length === gamePattern.length){
            level++;
            userClickedPattern = [];
            nextSequence();
            showGamePattern();
            $("#level-title").text("Level " + level);
            lastlevel = level;
        }
        else if (!subList()){
            gameOver();
        }
    }
})

function animatePress(colour){
    $("#"+colour).addClass("pressed");

    setTimeout(function(){
        $("#"+colour).removeClass("pressed")
    },100);
}

function playSound(name){
    const audio = new Audio("sounds/"+ name +".mp3");
    audio.play();
}

function showGamePattern(){
    let start = 0;
    let pattern = setInterval(thisFunction, 1000);

    function thisFunction(){
        if(start<gamePattern.length){
            var currentColour = gamePattern[start];
            animatePress(currentColour);
            playSound(currentColour)
            start++;
        }
        else{
            clearInterval(pattern); 
        }
    }
}

function subList(){
    for(var i =0; i < userClickedPattern.length; i++){
        if(userClickedPattern[i] != gamePattern[i])
        return false
    }

    return true
}

function gameOver(){
    level= 0;
    userClickedPattern = [];
    gamePattern = [];
    start = false;

    $('body').css("background-color","red");
    $("h1").text("Game over!!");
    $(".score").toggle();
    $(".score").text("Your Score: "+ lastlevel);
    playSound("wrong");

    setTimeout(function(){
        $('body').css("background-color","#011F3F");
        $("h1").text("Press any key to restart");
        $(".score").text("Highscore: "+ lastlevel);
    },1500)

}