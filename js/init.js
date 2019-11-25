// VARIABLES

var canvas = document.getElementsByTagName("canvas")[0]; // element
// var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d"); // object

// Ball
var ballRadius = 10;
var ballPositionX = canvas.width / 2;
var ballPositionY = canvas.height - 30;
var dx = 4, dy = -4;

// Paddle
var paddleHeight = 10;
var paddleWidth = 150;
var paddlePositionX = (canvas.width - paddleWidth) / 2;
// var paddlePositionY = canvas.height - paddleHeight;

var isRightPressed = false, isLeftPressed = false;

// Brick
var brickRows = 10;
var brickColumns = 10;
var brickWidth = 90;
var brickHeight = 20;
var brickPadding = 1.5;
var brickLeftOffset = 80;
var brickTopOffset = 80;
var totalBricks = 0;
var brickPattern = [];

// Player 
var score = 0;
var lives = 3;
var isPlaying = true;

// Levels
var totalLevels = 7;
var chosenLevel = 1;
var allLevels = [  document.getElementById("level-1"), document.getElementById("level-2"), 
                document.getElementById("level-3"), document.getElementById("level-4"),
                document.getElementById("level-5"), document.getElementById("level-6"),
                document.getElementById("level-7")];


function initBricks() {

    for (var i = 0; i < brickRows; i++) {
        brickPattern[i] = [];
            for (var j = 0; j < brickColumns; j++) {
            
            brickPattern[i][j] = { // Brick Object
                x: 0,
                y: 0,
                status: 1
            }
        }
    }
}

initBricks();

allLevels[0].addEventListener("click", function () {
    allLevels = [  document.getElementById("level-1"), document.getElementById("level-2"), 
                document.getElementById("level-3"), document.getElementById("level-4"),
                document.getElementById("level-5"), document.getElementById("level-6"),
                document.getElementById("level-7")];
    allLevels[0].classList.add("disable-css-transitions");
    for(var i=0; i<totalLevels; i++){
        if(i!=0){
            allLevels[i].classList.remove("disable-css-transitions");
        }
    }
    chosenLevel = 1;
});

allLevels[1].addEventListener("click", function () {
    allLevels = [  document.getElementById("level-1"), document.getElementById("level-2"), 
                document.getElementById("level-3"), document.getElementById("level-4"),
                document.getElementById("level-5"), document.getElementById("level-6"),
                document.getElementById("level-7")];
    allLevels[1].classList.add("disable-css-transitions");
    for(var i=0; i<totalLevels; i++){
        if(i!=1){
            allLevels[i].classList.remove("disable-css-transitions");
        }
    }
    chosenLevel = 2;
});

allLevels[2].addEventListener("click", function () {
    allLevels = [  document.getElementById("level-1"), document.getElementById("level-2"), 
                document.getElementById("level-3"), document.getElementById("level-4"),
                document.getElementById("level-5"), document.getElementById("level-6"),
                document.getElementById("level-7")];
    allLevels[2].classList.add("disable-css-transitions");
    for(var i=0; i<totalLevels; i++){
        if(i!=2){
            allLevels[i].classList.remove("disable-css-transitions");
        }
    }
    chosenLevel = 3;
});

allLevels[3].addEventListener("click", function () {
    allLevels = [  document.getElementById("level-1"), document.getElementById("level-2"), 
                document.getElementById("level-3"), document.getElementById("level-4"),
                document.getElementById("level-5"), document.getElementById("level-6"),
                document.getElementById("level-7")];
    allLevels[3].classList.add("disable-css-transitions");
    for(var i=0; i<totalLevels; i++){
        if(i!=3){
            allLevels[i].classList.remove("disable-css-transitions");
        }
    }
    chosenLevel = 4;
});

allLevels[4].addEventListener("click", function () {
    allLevels = [  document.getElementById("level-1"), document.getElementById("level-2"), 
                document.getElementById("level-3"), document.getElementById("level-4"),
                document.getElementById("level-5"), document.getElementById("level-6"),
                document.getElementById("level-7")];
    allLevels[4].classList.add("disable-css-transitions");
    for(var i=0; i<totalLevels; i++){
        if(i!=4){
            allLevels[i].classList.remove("disable-css-transitions");
        }
    }
    chosenLevel = 5;
});

allLevels[5].addEventListener("click", function () {
    allLevels = [  document.getElementById("level-1"), document.getElementById("level-2"), 
                document.getElementById("level-3"), document.getElementById("level-4"),
                document.getElementById("level-5"), document.getElementById("level-6"),
                document.getElementById("level-7")];
    allLevels[5].classList.add("disable-css-transitions");
    for(var i=0; i<totalLevels; i++){
        if(i!=5){
            allLevels[i].classList.remove("disable-css-transitions");
        }
    }
    chosenLevel = 6;
});

allLevels[6].addEventListener("click", function () {
    allLevels = [  document.getElementById("level-1"), document.getElementById("level-2"), 
                document.getElementById("level-3"), document.getElementById("level-4"),
                document.getElementById("level-5"), document.getElementById("level-6"),
                document.getElementById("level-7")];
    allLevels[6].classList.add("disable-css-transitions");
    for(var i=0; i<totalLevels; i++){
        if(i!=6){
            allLevels[i].classList.remove("disable-css-transitions");
        }
    }
    chosenLevel = 7;
});
