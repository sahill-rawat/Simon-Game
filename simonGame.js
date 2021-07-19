var colors = ["green", "red", "yellow", "blue"];
var levelOrder = [];
var userOrder = [];
var lvl = 0;
var start = false;

$(document).keypress( ()=> 
{
    if(!start)
    {
        $("#level-title").html("Level " + lvl);
        nextSequence();
        start = true;
    }
});

$(".btn").click ( function()
{
    var color = $(this).attr("id");
    userOrder.push(color);
    animatePress(color);
    playSound(color);
    check(userOrder.length-1);
});

function nextSequence()
{
    userOrder = [];
    lvl++;
    $("#level-title").html("Level " + lvl);
    var random = Math.floor(Math.random()*4);
    var color = colors[random];
    levelOrder.push(color);
    $("#" + color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(color);
}

function check(level)
{
    if(userOrder[level] === levelOrder[level])
    {
        if(userOrder.length === levelOrder.length)
        {
            setTimeout( ()=> { nextSequence(); }, 1000);
        }
    }
    else
    {
        playSound("wrong");
        $("#level-title").html("Game Over - Press any key to restart.");
        $("body").addClass("game-over");
        setTimeout( ()=> { $("body").removeClass("game-over"); }, 500);
        newGame();
    }
}

function playSound(color)
{
    var audio = new Audio("sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(color)
{
    $("#" + color).addClass("pressed");
    setTimeout( ()=> { $("#" + color).removeClass("pressed") }, 200);
}

function newGame()
{
    levelOrder = [];
    lvl = 0;
    start = false;
}