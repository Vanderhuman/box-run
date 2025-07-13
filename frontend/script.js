let isPlaying = false;
let score = 0;
let obstacleSpeed = 3;
let interval;
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const player = { x: 50, y: 170, w: 20, h: 20, vy: 0, jumping: false };
let obstacle = { x: 600, y: 160, w: 20, h: 20 }; // y = 170 agar di tanah


function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw ground line
  ctx.strokeStyle = '#333';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, 190); // y = 190, sedikit di bawah kotak
  ctx.lineTo(canvas.width, 190);
  ctx.stroke();

  // Draw player (kotak hitam)
  ctx.fillStyle = 'black';
  ctx.fillRect(player.x, player.y, player.w, player.h);

  // Draw obstacle
  ctx.fillStyle = 'red';
  ctx.fillRect(obstacle.x, obstacle.y, obstacle.w, obstacle.h);
}

function update() {
  // Player gravity
  if (player.jumping) {
    player.vy += 1.5;
    player.y += player.vy;
    if (player.y >= 150) {
      player.y = 150;
      player.jumping = false;
      player.vy = 0;
    }
  }
  // Obstacle movement
  obstacle.x -= obstacleSpeed;
  if (obstacle.x < -20) {
    obstacle.x = 600;
    score += 100;
    document.getElementById('score').innerText = `Score: ${score}`;
    // Tambah kesulitan tiap kelipatan 1000
    if (score % 1000 === 0) obstacleSpeed += 1;
  }
  // Collision
  if (
    player.x < obstacle.x + obstacle.w &&
    player.x + player.w > obstacle.x &&
    player.y < obstacle.y + obstacle.h &&
    player.y + player.h > obstacle.y
  ) {
    gameOver();
  }
}

function gameLoop() {
  update();
  draw();
}

function startGame() {
  isPlaying = true;
  score = 0;
  obstacleSpeed = 3;
  obstacle.x = 600;
  document.getElementById('score').innerText = `Score: ${score}`;
  interval = setInterval(gameLoop, 30);
}

function gameOver() {
  clearInterval(interval);
  isPlaying = false;
  document.getElementById('result').innerText = 'Game Over!';
}

document.getElementById('playBtn').onclick = () => {
  if (!isPlaying) {
    document.getElementById('result').innerText = '';
    startGame();
  }
};
document.getElementById('exitBtn').onclick = () => {
  clearInterval(interval);
  isPlaying = false;
  document.getElementById('result').innerText = 'Exited the game.';
};

// Jump on spacebar
document.addEventListener('keydown', (e) => {
  if (e.code === 'Space' && !player.jumping && isPlaying) {
    player.jumping = true;
    player.vy = -18;
  }
});