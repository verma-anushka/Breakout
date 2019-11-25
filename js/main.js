// GAME LOGIC

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
    ctx.fillText("Score: " + score, 10, 30)
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
                if( ballPositionX >= b.x && ballPositionX <= (b.x + brickWidth) 
                    && ballPositionY >= b.y && ballPositionY <= (b.y + brickHeight) 
                    && b.x != 0 && b.y != 0
                ) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    // console.log(ballPositionX);
                    // console.log(ballPositionY);
                    // console.log(b.x);
                    // console.log(b.y);
                    // console.log(b.x + brickWidth);
                    // console.log(b.y + brickHeight);
                    if (totalBricks == 1) {
                        draw();
                        gameWon();
                    }
                }
            }
        }
    }
}
function gameWon() {

    isPlaying = false;
    canvas.style.opacity = 0.5;
    console.log("won!");
    return;

}

function gameOver() {

    isPlaying = false;
    canvas.style.opacity = 0.5;
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

// draw();
document.getElementById("startGame").addEventListener("click", function () {

    // setTimeout(function(){ draw(); }, 3000);
    document.getElementsByClassName("start-game-container")[0].style.display = "none";
    document.getElementById("levels-container").style.display = "none";
    draw();

});
