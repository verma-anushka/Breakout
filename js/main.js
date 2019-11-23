

function drawBricks() {

    var totalBricks = 0;

    for(var i = 0; i < levels[1].length; i++){
        for(var j = 0; j < levels[1].length; j++){

            if(levels[1][i][j] != ' ' && brickPattern[i][j].status == "1"){
                // Brick Position
                var brickPositionX = (j*(brickWidth + brickPadding)) + brickLeftOffset;
                var brickPositionY = (i*(brickHeight + brickPadding)) + brickTopOffset;

                // Update Brick Object
                brickPattern[i][j].x = brickPositionX;
                brickPattern[i][j].y = brickPositionY; 

                // Draw on canvas
                ctx.beginPath();
                ctx.rect(brickPositionX, brickPositionY, brickWidth, brickHeight);
                ctx.fillStyle = colors[levels[1][i][j]];
                ctx.fill();
                ctx.closePath();

                totalBricks++;
            }
        }
    }

    console.log(totalBricks);
}

function drawPaddle() {

    // Draw on canvas
    ctx.beginPath();
    ctx.rect(paddlePositionX, canvas.height - paddleHeight - 20, paddleWidth, paddleHeight);
    ctx.fillStyle = "#CCC";
    ctx.fill();
    ctx.closePath();
}

function drawBall() {

    // Draw on canvas
    ctx.beginPath();
    ctx.arc(ballPositionX, ballPositionY, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = "#FFF";
    ctx.fill();
    ctx.closePath();

}
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Score: " + score, 0, 20)
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#FFF";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20)
}

function collision() {
    for (var i = 0; i < brickRows; i++) {
        for (var j = 0; j < brickColumns; j++) {
            var b = brickPattern[i][j];

            if (b.status == 1) {
                if (ballPositionX > b.x && ballPositionX < (b.x + brickWidth) && ballPositionY > b.y && ballPositionY < (b.y + brickHeight)) {
                    dy = -dy;
                    b.status = 0;
                    score++;

                    if (score == brickColumns * brickRows) {
                        gameOver();
                    }
                }
            }
        }
    }
}

function gameOver() {

    isPlaying = false;
    console.log("lost");
    return;
}

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
    }
    if (ballPositionY + dy < ballRadius) {
        dy = -dy;
    }

    else if (ballPositionY + dy > canvas.height - ballRadius - 20 ) { // ball paddle collision

        if (ballPositionX > paddlePositionX && ballPositionX < paddlePositionX + paddleWidth) {
            // dx = 8*((ballPositionX - (paddlePositionX + paddleWidth/2))/ paddleWidth);
            dy = -dy;
        } else { // if no collision
            lives--;
            if (!lives) {
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

document.getElementById("startGame").addEventListener("click", function () {

    // setTimeout(function(){ draw(); }, 3000);
    document.getElementsByClassName("start-game-container")[0].style.display = "none";
    draw();

});
