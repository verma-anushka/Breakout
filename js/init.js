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
var brickPattern = [];

// Player 
var score = 0;
var lives = 3;
var isPlaying = true;

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
