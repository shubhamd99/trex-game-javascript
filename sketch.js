var speed;
var y;
var yVelocity;
var onGround;
var score;

var obstacles = [];
var horizon;

function setup() {
    createCanvas(600, 200);
    textAlign(CENTER);

    horizon = height - 40;
    y = 20;
    score = yVelocity = 0;
    speed = 6;
    onGround = false;
}

function draw() {
    background(51);

    // draw horizon
    stroke(255);
    line(0, horizon, width, horizon);

    fill('#999999');
    ellipse(40, y, 40);

    if (frameCount % 120 === 0) {
        speed *= 1.05;
    }

    if (frameCount % 30 === 0) {
        var n = noise(frameCount);
        if (n > 0.5)
            newObstacle(n);
    }


    score++;
    textSize(20);
    text("Score: " + score, width / 2, 30);

    updateObstacles();
    handleTrex();
}

function updateObstacles() {
    for (var i = obstacles.length - 1; i >= 0; i--) {
        obstacles[i].x -= speed;
        var x = obstacles[i].x;
        var size = obstacles[i].size;
        var s2 = size / 2;


        if ( x > -30 ) {
            // if it's onscreen
            rect(x, horizon - size, size, size);
            var x1 = x + s2;
            var y1 = horizon - s2;

            // 40 - diameter & 20 - radius
            if (dist(x1, y1, 40, y) < s2 + 20) {
                // collision

                textSize(40);
                text("GAME OVER", width/2, height/2);
                textSize(20);
                text("Press F5 to restart", width/2, height/2 + 40);
                noLoop();
            }
        } else {
            // delete from array
            obstacles.splice(i, 1);
        }
    }
}

function newObstacle(n) {


    var obs = new Obstacle(n * 50, null);

    obstacles.push(obs);
}

function handleTrex() {

    if (y + 20 + yVelocity < horizon) {
        yVelocity += map(frameCount, 0, 3600, 0.7, 2);
        onGround = false;
    } else {
        yVelocity = 0;
        onGround = true;
    }

    if ( mouseIsPressed || keyIsDown(UP_ARROW) || keyIsDown(32) || keyIsDown(13)) {

        if (onGround) {
            yVelocity -= map(frameCount, 0, 3600, 9, 15);
            onGround = false;
        }
    }

        // movement
        y += yVelocity;
}