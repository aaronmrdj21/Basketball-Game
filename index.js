var player1;
var player2;
var devilImg1;
var angelImg2;
var player1X = 170;
var player1Y = 200;
var player1width = 20;
var player1height = 0.9;
var player1SpeedY = 0;
var groundY = 290;
var player2X;
var player2Y = 200;
var player2width;
var player2SpeedY = 0;
var player2height = 0.9;
var player1 = devilImg1;
var player2 = angelImg2;
var canvasbackground;
var bg;
var edgeSize = 5;
var basketballImg;
var boundary;
var loadbasketball;
var jumping1 = false;
var jumping2 = false;
var keyPressed;
var basketballhoop1;
var loadbasketballhoop1;
var basketballhoop2;
var loadbasketballhoop2;
var heightCanvas = 600
var groundX = 990
var bottomEdge = 50;
var player1score = 0;
var player2score = 0;
var showingWinScreen = false;
const WINNING_SCORE = 3;
var gameover = false;
var GRAVITY = 0.5;

function preload() {
  devilImg1 = loadImage("Purple.png");
  angelImg2 = loadImage("Angel emoji.png");
  canvasbackground = loadImage("Basketball court2.png");
  basketballImg = loadImage("Basketball.png");
  loadbasketballhoop1 = loadImage("Basketball hoop 2.png")
  loadbasketballhoop2=loadImage("Basketballhoop2flipped.png");
  mySound = loadSound("Sports Cheer.mp3");
}

function setup() {
  createCanvas(1500, 600);
  //Devil
  player1 = createSprite(width / 4, height - 100);
  player1.addImage(devilImg1);
  player1.scale = 1.9;
  ///Angel
  player2 = createSprite(3 * width / 4, height - 100);
  player2.addImage(angelImg2);
  player2.scale = 1.9;
  ///Basketball
  loadbasketball = createSprite(width / 2, height - 100);
  loadbasketball.addImage(basketballImg);
  loadbasketball.scale = 1.7;
  loadbasketball.velocity.y = loadbasketball.velocity.y + GRAVITY;

  ///basketballhoop Right
  basketballhoop1 = createSprite(1490, 300, 590, 70);
  basketballhoop1.addImage(loadbasketballhoop1);
  basketballhoop1.scale = 0.5;
  ///Basketballhoop left
  basketballhoop2 = createSprite(20, 300, 590, 70);
  basketballhoop2.addImage(loadbasketballhoop2)
  basketballhoop2.scale = 0.5;

  //Invisible game reset barrier for left basketball hoop
  basket2 = createSprite(50, 210, 155, 10);
  // basket2.visible = false;
  //Invisible game reset barrier for Right basketball hoop
  basket1 = createSprite(1450, 210, 155, 10);
  // basket1.visible = false;

  ///These are the multi-coloured barriers around the Canvas
  topEdge = createSprite(width / 2, edgeSize / 4, width, edgeSize);
  leftEdge = createSprite(edgeSize / 3, width / 5, edgeSize, height);
  bottomEdge = createSprite(width / 2, height - edgeSize / 2, width, edgeSize);
  rightEdge = createSprite(width - edgeSize / 2, height / 2, edgeSize, height);


  //////The Barriers of the Canvas:Up,down,Left,Right
  boundary = new Group();
  boundary.add(leftEdge);
  boundary.add(bottomEdge);
  boundary.add(rightEdge);
  boundary.add(topEdge);


  ///A group function for players
  players = new Group();
  players.add(player1);
  players.add(player2);

  //This makes the Ball bounce in a certain way on the canvas


  loadbasketball.setCollider("circle", 0, 550, 25);
  /////This chanes the position of where the ball is   
  loadbasketball.setSpeed(random(2, 3), random(200, 550));
  loadbasketball.setSpeed(random(4, 2), random(550, 900));






}////End of Setup function

function draw() {


  ///This is the Gave over screen
  if (showingWinScreen) {
    textSize(90);
    if (player1score >= WINNING_SCORE) {
      text("left player won!", 500, 200);
      text("Better Luck next time Right Player", 100, 600);
    }
    else {
      if (player2score >= WINNING_SCORE) {
        text("right player won!", width - 200, 200);
      }
    }
  }

  background(canvasbackground);
  ///This makes the ball bounce with gravity
  loadbasketball.velocity.y = loadbasketball.velocity.y + GRAVITY;

  ///Makes the Ball not go of the Sides of The Canvas
  if (loadbasketball.position.x < 50) {
    loadbasketball.velocity.x = loadbasketball.velocity.x * -1
  }
  if (loadbasketball.position.x > 1450) {
    loadbasketball.velocity.x = loadbasketball.velocity.x * -1
  }
  /////Makes the Ball got go of the Top and Bottom of the Canvas
  if (loadbasketball.position.y > 550) {
    loadbasketball.velocity.y = loadbasketball.velocity.y * -1
  }
  if (loadbasketball.position.y < 50) {
    loadbasketball.velocity.y = loadbasketball.velocity.y * -1
  }

  ///Thiis Makes the players able to hit the ball upward
  loadbasketball.collide(player1);
  loadbasketball.collide(player2);
  ///This makes a barrier on the basketball hoop 
  loadbasketball.collide(basketballhoop1);
  loadbasketball.collide(basketballhoop2);

  ///Makes the invisible barrier overlap the hoops
  if (loadbasketball.overlap(basket2)) {
    //This gave 
    console.log("player 1 score")
    player1score++;
    resetGame();
  }///This makes the score + 1 when is hits the basketball hoop
  if (loadbasketball.overlap(basket1)) {
    console.log("player 2 score")
    player2score++;

    resetGame();//When the ball touches the basketball hoop it will reset

  }




  ///This allows the players to bounce with other players
  players.bounce(players);
  ///This makes the players stay on the Ground
  players.collide(boundary);
  ////Thid allows the players to bounce with the basketball
  players.bounce(loadbasketball);


  ////This makes the players stay still
  player1.velocity.x = 0;
  player2.velocity.x = 0;
  //This makes the speed of players
  player1.position.y += player1SpeedY;
  player2.position.y += player2SpeedY;



  player1.velocity.y = 0;
  player2.velocity.y = 0;
  drawEverything();
  drawSprites();
  moveLeftandRight();
  //player 1 movement code
  player1Y += player1SpeedY;
  //is the player colliding with the ground?
  if (player1Y + player1height > groundY) {

    //snap the player's bottom to the ground's position
    player1Y = groundY - player1height;

    //stop the player falling
    player1SpeedY = 0;

    //allow jumping again
    jumping1 = false;
  }
  //player is not colliding with the ground
  else {
    //gravity accelerates the movement speed
    player1SpeedY++;
  }

  //player 2 movement code
  player2Y += player2SpeedY;
  //is the player colliding with the ground? 
  if (player2Y + player2height > groundY) {

    //snap the player's bottom to the ground's position
    player2Y = groundY - player2height;

    //stop the player falling
    player2SpeedY = 0;

    //allow jumping again
    jumping2 = false;
  }
  //player is not colliding with the ground
  else {
    //gravity accelerates the movement speed
    player2SpeedY++;
  }


  textSize(50);
  text(player2score, 950, 50);
  text(player1score, 460, 50);

}////End of Draw function


function drawEverything() {
  fill(51);
  noStroke();
  //This is the win screen that shows when the game is over
  if (showingWinScreen) {
    textSize(90);
    if (player1score >= WINNING_SCORE) {
      text("left player won!", 200, 200);
    }
    else {
      if (player2score >= WINNING_SCORE) {
        text("right player won!", width - 900, 200);
      }
    }

    textSize(30);
    text("Press ctrl+R to play again", width / 2, height - 200);
    return;
  }
} //end of draweverything








function moveLeftandRight() {
  ///This allows movement for player 1 and 2
  if (showingWinScreen) {
    return;
  }
  //This is the sound 
  if (keyIsDown(71)) {
    mySound.setVolume(0.5);
    mySound.play();
  }
  if (keyIsDown(68)) {//D button
    player1.velocity.x = 7;
  }

  if (keyIsDown(37)) {///left Arrow
    player2.velocity.x = -7;
  }
  if (keyIsDown(39)) {//Right Arrow
    player2.velocity.x = 7;
  }
  if (keyIsDown(65)) {//A button
    player1.velocity.x = -7;
  }




}///END OF MoveLeftandRight Function


function keyPressed() {
  ///Player 1

  if (keyCode === 87) {///W button
    if (!jumping1) {

      //going up
      player1SpeedY = -26;

      //disallow jumping while    already jumping
      jumping1 = true;
    }
    else {


    }
  }
  ///player 2
  if (keyCode === 38) {///Up Arrow
    if (!jumping2) {

      player2SpeedY = -26;

      jumping2 = true;
    }
    else {

    }

  }



}///End of Key Pressed function



function resetGame() {

  if (player1score >= WINNING_SCORE || player2score >= WINNING_SCORE) {
    showingWinScreen = true;
  }


  player2.position.x = 3 * width / 4;
  player1.position.y = height - 100
  player1.position.x = width / 4
  player2.position.y = height - 100


  loadbasketball.position.x = width / 2;
  loadbasketball.position.y = height - 100;


}///  end of Reset Game function

