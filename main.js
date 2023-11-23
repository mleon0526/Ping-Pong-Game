const gameScoreText =  document.querySelector("#gameScoreText");
const restartButton =  document.querySelector("#restartButton");
const gameSpace =  document.querySelector("#gameSpace");
/*context or ctx*/const board  = gameSpace.getContext("2d");
const widthGame = gameSpace.width;
const heightGame = gameSpace.height;
const gameBackground = "navy";
const ball = "white";
  /*paddle1Color*/const player1 = "lightskyblue";
  /*paddle2Color*/const player2 = "lightgray";
const player1Border = "white";
const player2Border = "white";
const ballBorder = "black";
const radiusBall = 12.5;
const playerSpeed = 40;

let idInterval;
let speedBall;
let xBall = widthGame / 2;
let yBall = heightGame / 2;
let directionBallX = 0;
let directionBallY = 0;
let scoreOfPlayer1 = 0;
let scoreOfPlayer2 = 0;
let racket1 = {
    width: 25,
    height: 100,
    x:0,
    y:0
};
let racket2 = {
    width: 25,
    height: 100,
    x: widthGame - 25,
    y: heightGame - 100
};

window.addEventListener("keydown", alterDirection);
restartButton.addEventListener("click", resetGame);

startGame();

function startGame(){
  ballCreation();
  tickNext();
};
function tickNext(){
  idInterval = setTimeout( () => {
    cleanBoard();
    drawRackets();
    ballMove();
    ballDraw(xBall, yBall);
    collisionCheck();
    tickNext();

  }, 10)
};
function cleanBoard(){
  board.fillStyle = gameBackground;
  board.fillRect( 0, 0, widthGame, heightGame);
};
function drawRackets(){
  board.stokeStyle = player1Border;

  board.fillStyle = player1;
  board.fillRect(racket1.x, racket1.y, racket1.width, racket1.height);
  board.strokeRect(racket1.x, racket1.y, racket1.width, racket1.height);

  board.fillStyle = player2;
  board.fillRect(racket2.x, racket2.y, racket2.width, racket2.height);
  board.strokeRect(racket2.x, racket2.y, racket2.width, racket2.height);
};
function ballCreation(){
   speedBall = 1;
   if(Math.round(Math.random()) ==1){
    directionBallX = 1;
   }
   else{
    directionBallX = -1;
   }
   if(Math.round(Math.random()) ==1){
    directionBallY = 1;
   }
   else{
    directionBallY = -1;
   }
   xBall = widthGame / 2;
   yBall = heightGame / 2;
   ballDraw( xBall, yBall);
};
function ballMove(){
  xBall += (speedBall * directionBallX);
  yBall += (speedBall * directionBallY);
};
function ballDraw(xBall, yBall){
  board.fillStyle = ball;
  board.strokeStyle = ballBorder;
  board.lineWidth = 2;
  board.beginPath();
  board.arc(xBall, yBall, radiusBall, 0, 2 * Math.PI);
  board.stroke();
  board.fill();
};
function collisionCheck() {
  if (yBall - radiusBall <= 0 || yBall + radiusBall >= heightGame) {
    directionBallY *= -1;
  }
  if(xBall <= 0){
    scoreOfPlayer2 +=1;
    scoreUpdate();
    ballCreation();
    return;
  }
  if(xBall >= widthGame){
    scoreOfPlayer1 +=1;
    scoreUpdate();
    ballCreation();
    return;
  }
  if (xBall <= (racket1.x + racket1.width + radiusBall)) {
    if (yBall > racket1.y && yBall < racket1.y + racket1.height) {
      xBall = (racket1.x + racket1.width) + radiusBall; // if ball get's stuck
      directionBallX *= -1;
      speedBall += 0.5;
    }
  }
  
  if (xBall >= (racket2.x - radiusBall)) {
    if (yBall > racket2.y && yBall < racket2.y + racket2.height) {
      xBall = racket2.x - radiusBall; // if ball get's stuck
      directionBallX *= -1;
      speedBall += 0.25;
    }
  }
};
function alterDirection(event) {
  const pressedKey = event.keyCode;
  const racketUP1 = 38;  // Assuming this is the keycode for the up arrow key
  const racketDOWN1 = 40;
  const racketUP2 = 87;  // Assuming this is the keycode for the 'W' key
  const racketDOWN2 = 83;  // Assuming this is the keycode for the 'S' key

  switch(pressedKey) {
    case racketUP1:
      if(racket2.y > 0) {
        racket2.y -= playerSpeed;
      }
      break;
    case racketDOWN1:
      if(racket2.y < heightGame - racket2.height) {
        racket2.y += playerSpeed;
      }
      break;
    case racketUP2:
      if(racket1.y > 0) {
        racket1.y -= playerSpeed;
      }
      break;
    case racketDOWN2:
      if(racket1.y < heightGame - racket1.height) {
        racket1.y += playerSpeed;
      }
      break;
  }
}


function scoreUpdate(){
   gameScoreText.textContent = scoreOfPlayer1 + " : " + scoreOfPlayer2; 
};
function resetGame() {
  scoreOfPlayer1 = 0;
  scoreOfPlayer2 = 0;

  racket1 = {
    width: 25,
    height: 100,
    x: 0,
    y: 0
  };

  racket2 = {
    width: 25,
    height: 100,
    x: widthGame - 25,
    y: heightGame - 100
  };

  // Reset speedBall to default value
  speedBall = 1;

  xBall = widthGame / 2;
  yBall = heightGame / 2;
  directionBallX = 0;
  directionBallY = 0;

  scoreUpdate();
  clearInterval(idInterval);

  // Call ballCreation after resetting speedBall
  ballCreation();
  // Call startGame after resetting speedBall
  startGame();
}






