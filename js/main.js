// GAME LOGIC

// Bricks
function drawBricks() {

    totalBricks = 0;
    for(var i = 0; i < levels[chosenLevel].length; i++){
        for(var j = 0; j < levels[chosenLevel][i].length; j++){

            if(levels[chosenLevel][i][j] >= 'a' && levels[chosenLevel][i][j] <= 'z' && brickPattern[i][j].status == "1"){

                // Brick Position
                var brickPositionX = (j*(brickWidth + brickPadding)) + brickLeftOffset;
                var brickPositionY = (i*(brickHeight + brickPadding)) + brickTopOffset;

                // Update Brick Object
                brickPattern[i][j].x = brickPositionX;
                brickPattern[i][j].y = brickPositionY; 

                // Draw on canvas
                ctx.beginPath();
                ctx.rect(brickPositionX, brickPositionY, brickWidth, brickHeight);
                ctx.fillStyle = colors[levels[chosenLevel][i][j]];
                ctx.fill();
                ctx.closePath();
                totalBricks++;

            }else if(levels[chosenLevel][i][j] == ' '){
                continue;
            }
        }
    }
}

// Ball
function drawBall() {
    ctx.beginPath();
    ctx.arc(ballPositionX, ballPositionY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();
}

// Paddle
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddlePositionX, canvas.height - paddleHeight - 20, paddleWidth, paddleHeight);
    ctx.fillStyle = "#CCC";
    ctx.fill();
    ctx.closePath();
}

// Score
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Score: " + score, 10, 30)
}

// Lives
function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20)
}

// Collision Detection
function collision() {
    for (var i = 0; i < brickRows; i++) {
        for (var j = 0; j < brickColumns; j++) {
            var b = brickPattern[i][j];

            if (b.status == 1) {
                if( ballPositionX >= b.x && ballPositionX <= (b.x + brickWidth) 
                    && ballPositionY >= b.y && ballPositionY <= (b.y + brickHeight) 
                    && b.x != 0 && b.y != 0
                ) {
                    dy = -dy;
                    b.status = 0;
                    score++;

                    if (totalBricks == 1) {
                        draw();
                        gameWon();
                    }
                }
            }
        }
    }
}

// Game End
function gameOver() {
    isPlaying = false;
    canvas.style.opacity = 0.5;
    document.getElementById("won").classList.add("no-show");
    document.getElementById("lost").classList.remove("no-show");
    document.getElementById("playAgain").classList.remove("no-show");
    console.log("lost");
}

// Game End
function gameWon() {
    isPlaying = false;
    canvas.style.opacity = 0.5;
    document.getElementById("lost").classList.add("no-show");
    document.getElementById("won").classList.remove("no-show");
    document.getElementById("playAgain").classList.remove("no-show");
    console.log("won!");
}

// Main function
function draw() {

    if (!isPlaying) {
        return;
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBricks();
    drawBall();
    drawPaddle();
    drawScore();
    drawLives();
    collision();

    if (ballPositionX + dx > canvas.width - ballRadius || ballPositionX + dx < ballRadius) {
        dx = -dx;
        if(dx > 0){
            dx += 0.1;
        }else{
            dx -= 0.1;
        }
    }

    if (ballPositionY + dy < ballRadius) {
        dy = -dy;
    }
    else if (ballPositionY + dy > canvas.height - ballRadius - 20 ) { // ball-paddle collision

        if (ballPositionX > paddlePositionX && ballPositionX < paddlePositionX + paddleWidth) {
            if(dx<0){
                dx -= 0.5*Math.abs((ballPositionX - (paddlePositionX + paddleWidth/2))/ paddleWidth);
            }else{
                dx += 0.5*Math.abs((ballPositionX - (paddlePositionX + paddleWidth/2))/ paddleWidth);
            }
            dy = -dy;
        } else { // if no collision
            lives--;
            if (!lives) {
                draw();
                canvas.style.opacity = "0.5";
                gameOver();
            }
            else { // reassign ball coordinates
                ballPositionX = canvas.width / 2;
                ballPositionY = canvas.height - 30;
                dx = 3;
                dy = -3;
                paddlePositionX = (canvas.width - paddleWidth) / 2;
                // paddlePositionY = canvas.height - paddleHeight;
            }
        }
    }

    if (isRightPressed && paddlePositionX < canvas.width - paddleWidth) {
        paddlePositionX += 14;
    }
    else if (isLeftPressed && paddlePositionX > 0) {
        paddlePositionX -= 14;
    }

    ballPositionX += dx;
    ballPositionY += dy;

    requestAnimationFrame(draw); // recursively draw the elements

}

// Start Game
function startGame() {
    
    initBricks();

    document.getElementById("won").classList.add("no-show");
    document.getElementById("lost").classList.add("no-show");
    document.getElementById("playAgain").classList.add("no-show");
    document.getElementById("start-game-container").style.display = "block";
    document.getElementById("levels-container").style.display = "block";
    canvas.style.display = "none";

    document.getElementById("start-game-container").addEventListener("click", function () {

        isPlaying = true;
        canvas.style.opacity = 1;
        document.getElementById("start-game-container").style.display = "none";
        document.getElementById("levels-container").style.display = "none";
        canvas.style.display = "block";

        draw();

    });
}

// Event Listeners
document.addEventListener("keydown", keyDown, false); // (any) key pressed down
document.addEventListener("keyup", keyUp, false); // no key pressed
document.addEventListener("mousemove", mouseMove, false); // no key pressed

function keyUp(e) {
    if (e.keyCode == 37) {
        isLeftPressed = false;
    }
    if (e.keyCode == 39) {
        isRightPressed = false;
    }
}

function keyDown(e) {
    if (e.keyCode == 37) {
        isLeftPressed = true;
    }
    if (e.keyCode == 39) {
        isRightPressed = true;
    }
}

function mouseMove(e) {
    var relativePositionX = e.clientX - canvas.offsetLeft;
    if (relativePositionX > 0 && relativePositionX < canvas.width) {
        paddlePositionX = relativePositionX - paddleWidth / 2;
    }
}

document.getElementById("playAgain").addEventListener("click", function () {
    document.location.reload();
});

startGame();
