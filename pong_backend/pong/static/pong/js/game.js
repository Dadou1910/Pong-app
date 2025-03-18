const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let paddle1Y = 150, paddle2Y = 150;
const paddleHeight = 100, paddleWidth = 10, ballSize = 10;
let ballX = canvas.width / 2, ballY = canvas.height / 2;
let ballSpeedX = 5, ballSpeedY = 5;

const socket = new WebSocket('ws://localhost:8000/ws/game/');

socket.onmessage = function(event) {
    const data = JSON.parse(event.data);
    const msg = data.message;
    if (msg.paddle1Y) paddle1Y = msg.paddle1Y;
    if (msg.paddle2Y) paddle2Y = msg.paddle2Y;
};

document.addEventListener('keydown', (e) => {
    if (e.key === 'w') paddle1Y -= 20;
    if (e.key === 's') paddle1Y += 20;
    if (e.key === 'ArrowUp') paddle2Y -= 20;
    if (e.key === 'ArrowDown') paddle2Y += 20;
    socket.send(JSON.stringify({ message: { paddle1Y, paddle2Y } }));
});

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.fillRect(10, paddle1Y, paddleWidth, paddleHeight); // Paddle 1
    ctx.fillRect(canvas.width - 20, paddle2Y, paddleWidth, paddleHeight); // Paddle 2
    ctx.fillRect(ballX, ballY, ballSize, ballSize); // Ball

    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if (ballY < 0 || ballY > canvas.height) ballSpeedY = -ballSpeedY;
    if (ballX < 20 && ballY > paddle1Y && ballY < paddle1Y + paddleHeight) ballSpeedX = -ballSpeedX;
    if (ballX > canvas.width - 20 && ballY > paddle2Y && ballY < paddle2Y + paddleHeight) ballSpeedX = -ballSpeedX;
    if (ballX < 0 || ballX > canvas.width) { ballX = canvas.width / 2; ballY = canvas.height / 2; }

    requestAnimationFrame(draw);
}

draw();