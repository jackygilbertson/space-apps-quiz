window.requestAnimFrame = (function(callback){
    return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback){
        window.setTimeout(callback, 1000 / 60);
    };
})();

function animate(lastTime, ball){
    var stage = ball.getStage();
    var layer = ball.getLayer();
    var date = new Date();
    var time = date.getTime();
    var timeDiff = time - lastTime;

    // update
    updateBall(timeDiff, ball);

    // draw
    layer.draw();

    // request new frame
    requestAnimFrame(function(){
        animate(time, ball);
    });
}

function updateBall(timeDiff, ball){
    var stage = ball.getStage();
    var ballX = ball.x;
    var ballY = ball.y;

    // physics variables
    var gravity = 20; // px / second^2
    var speedIncrementFromGravityEachFrame = gravity * timeDiff / 1000;
    var collisionDamper = 0.2; // 20% energy loss
    var floorFriction = 5; // px / second^2
    var floorFrictionSpeedReduction = floorFriction * timeDiff / 1000;

    // if dragging and dropping
    if (ball.drag.moving) {
        var mousePos = stage.getMousePosition();

        if (mousePos !== null) {
            var mouseX = mousePos.x;
            var mouseY = mousePos.y;

            var c = 0.06 * timeDiff;
            ball.vx = c * (mouseX - ball.lastMouseX);
            ball.vy = c * (mouseY - ball.lastMouseY);
            ball.lastMouseX = mouseX;
            ball.lastMouseY = mouseY;
        }
    }
    else {
        // gravity
        ball.vy += speedIncrementFromGravityEachFrame;
        ballX += ball.vx;
        ballY += ball.vy;

        // ceiling condition
        if (ballY < ball.radius) {
            ballY = ball.radius;
            ball.vy *= -1;
            ball.vy *= (1 - collisionDamper);
        }

        // floor condition
        if (ballY > (stage.height - ball.radius)) {
            ballY = stage.height - ball.radius;
            ball.vy *= -1;
            ball.vy *= (1 - collisionDamper);
        }

        // floor friction
        if (ballY == stage.height - ball.radius) {
            if (ball.vx > 0.1) {
                ball.vx -= floorFrictionSpeedReduction;
            }
            else if (ball.vx < -0.1) {
                ball.vx += floorFrictionSpeedReduction;
            }
            else {
                ball.vx = 0;
            }
        }

        // right wall condition
        if (ballX > (stage.width - ball.radius)) {
            ballX = stage.width - ball.radius;
            ball.vx *= -1;
            ball.vx *= (1 - collisionDamper);
        }

        // left wall condition
        if (ballX < (ball.radius)) {
            ballX = ball.radius;
            ball.vx *= -1;
            ball.vx *= (1 - collisionDamper);
        }
    }

    ball.setPosition(ballX, ballY);
}

window.onload = function(){
    var stage = new Kinetic.Stage("canvascontainer", 578, 200);
    var layer = new Kinetic.Layer();
    var radius = 50;

    var ball = new Kinetic.Shape(function(){
        var context = this.getContext();
        context.beginPath();
        context.arc(0, 0, radius, 0, 2 * Math.PI, false);
        context.fillStyle = "yellow";
        context.fill();
    });

    // add custom properties
    ball.vx = 0;
    ball.vy = 0;
    ball.radius = radius;

    ball.on("dragstart", function(){
        ball.vx = 0;
        ball.vy = 0;
    });

    ball.on("mouseover", function(){
        document.body.style.cursor = "pointer";
    });

    ball.on("mouseout", function(){
        document.body.style.cursor = "default";
    });

    ball.setPosition(stage.width / 2, stage.height / 2);

    ball.draggable(true);

    layer.add(ball);
    stage.add(layer);

    var date = new Date();
    var time = date.getTime();
    animate(time, ball);
};