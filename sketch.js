var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player,playerImage;
var back,backImage;
var corona,coronaImage;
var soap,soapImage;
var mask,maskImage;
var enemy,enemyImage;
var l;
var obstaclesGroup;
var soapGroup;
var maskGroup;
var gameState;
var gameOver,restart,gi,ri;
var score = 0;

function preload(){
backImage = loadImage("back.jpg");
  playerImage = loadImage("80594-no-nobi-character-doraemon-fictional-to-shinden-thumb.png");
coronaImage = loadImage("icons8-coronavirus-48-1.png");
soapImage = loadImage("icons8-soap-dispenser-48.png");
maskImage = loadImage("icons8-protection-mask-64.png");
enemyImage = loadImage("icons8-bacteria-48.png");
gi = loadImage("—Pngtree—glitch electronic sound fault style_5491381 (1).png");
ri = loadImage("icons8-restart-64.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);
 back = createSprite(windowWidth/2,windowHeight/2)
 back.addImage(backImage);
 back.scale = 3;
 
 
 player = createSprite(200,windowHeight-400);
 player.addImage(playerImage);
 player.scale = 0.5;
 player.x = 49;
  
 l = createSprite(windowWidth/2,windowWidth/4,windowWidth,10);
 b = createSprite(windowWidth/2,windowWidth/12,windowWidth,10);
  gameOver = createSprite(windowWidth/2,windowWidth/2);
   gameOver.addImage(gi);
   
   gameOver.scale = 0.4;
  restart = createSprite(300,450);
  restart.addImage(ri);
  
  obstaclesGroup = new Group();
  soapGroup= new Group();
  maskGroup= new Group();
}

function draw() {
  background(220);
  
 if(gameState===PLAY){
  back.velocityX = +2;
   gameOver.visible = false;
   restart.visible = false;
  if(back.x>400){
    back.x=300;}
  if(soapGroup.isTouching(player)||
     maskGroup.isTouching(player)){
    score++;
  }
   player.velocityY = 3;
  if(keyDown("space")){
    player.velocityY = -3;
  }
 spawnobstacles();
  immunity();
  if(obstaclesGroup.isTouching(player)||player.y>600){
    gameState=END;
  }
  
 }else if(gameState===END){
    back.velocityX = 0;
    player.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    soapGroup.setVelocityXEach(0);
    maskGroup.setVelocityXEach(0);
    gameOver.visible = true;
    restart.visible = true;
   if(mousePressedOver(restart)){
    gameState=PLAY;
    reset();
  }
  }
  
 drawSprites(); 
  textSize(20);
  text("Wash Your Hands",20,80);
  text("Score: "+score,500,80);
}
function spawnobstacles(){
  if(frameCount%200===0){
    corona = createSprite(625,200);
    corona.addImage(coronaImage);
    corona.velocityX = -3;
    corona.y = Math.round(random(35,550));
    corona.lifetime = 800;
    obstaclesGroup.add(corona);
    
  }
  if(frameCount%250===0){
    enemy = createSprite(625,200);
    enemy.addImage(enemyImage);
    enemy.velocityX = -3;
    enemy.y = Math.round(random(35,550));
    enemy.lifetime = 800;
    obstaclesGroup.add(enemy);
  }
}

function immunity(){
  if(frameCount%70===0){
    soap = createSprite(625,100);
    soap.addImage(soapImage);
    soap.velocityX = -10;
    soap.lifetime = 800;
    soapGroup.add(soap);
  }
  if(frameCount%170===0){
    mask = createSprite(625,100);
    mask.addImage(maskImage);
    mask.velocityX = -10;
    mask.lifetime = 800;
    mask.y = Math.round(random(35,550));
    maskGroup.add(mask);
  }
}
function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  player.x = 49;
  player.y = 200;
  
  obstaclesGroup.destroyEach();
  soapGroup.destroyEach();
  maskGroup.destroyEach();
  
  
  
  score = 0;
  
}
