var playerImage,player;
var alienImage,alien, backgroundImage,Background;
var bulletImage,tempbullet,bullet,alien1Group,alien2Group,alien3Group,bulletGroup;
var score=0;
var heartImage,heart1,heart2,heart3;
var count=4;
var gameoverImage,gameover;
var restartImage,restart;
var gameState="play"
var coinImage,coin,coin1Group,coin2Group,coin3Group;
var coinsound;
var countalien=1;
var countcoin=1;
function preload(){

  playerImage = loadImage("goku.png");
  alienImage = loadImage("alien.png");
  backgroundImage  = loadImage("background flying hamester.png");
  bulletImage = loadImage("blast.png");
  heartImage = loadImage("life_heart_symbol-removebg-preview.png")
  restartImage = loadImage("red_reset-removebg-preview.png");
  gameoverImage = loadImage("gameover_mgh-1-removebg-preview.png");
  coinImage = loadImage("gold_coins-removebg-preview.png");
 coinsound = loadSound("coin-sound.mp3");
  
}

function setup() {
  createCanvas(500,400);

  Background = createSprite(200,200,10,10);
  Background.addImage(backgroundImage);
  Background.scale=1;
 
  
  player = createSprite(50,200,20,50);
  player.addImage(playerImage);
  player.scale=0.2;
  
  heart1 = createSprite(40,50,20,50);
  heart1.addImage(heartImage);
  heart1.scale=0.1;
  heart1.depth=player.depth-1;
  
  heart2 = createSprite(65,50,20,50);
  heart2.addImage(heartImage);
  heart2.scale=0.1;
  heart2.depth=player.depth-1;
  
  heart3 = createSprite(90,50,20,50);
  heart3.addImage(heartImage);
  heart3.scale=0.1;
  heart3.depth=player.depth-1;
  
  gameover = createSprite(250,200,10,10);
  gameover.addImage(gameoverImage);
  gameover.scale=0.3;
  
  restart = createSprite(250,265,10,10);
  restart.addImage(restartImage);
  restart.scale=0.2;
  
  alien1Group=createGroup();
  alien2Group=createGroup();
  alien3Group=createGroup();
  
  bulletGroup=createGroup();
  coin1Group=createGroup();
  coin2Group=createGroup();
  coin3Group=createGroup();
}

function draw() {
  background(180);
  
  Background.velocityX=-4;
  if(gameState==="play")
  {
    gameover.visible=false;
    restart.visible=false;
    spawnaliens();
    spawncoins();
    player.setCollider("rectangle", 0,10,145,130);
    if(keyDown("up")&&player.y>30){
       player.y = player.y - 8;
    }
    if(keyDown("down")&&player.y<370){
       player.y = player.y + 8;
    }
    if(keyWentDown("space")){
       temp=Bullet(); 
    }
    if(bulletGroup.isTouching(alien1Group)){
      bulletGroup.destroyEach();
      alien1Group.destroyEach();
      score=score+1;   
    }
    if(bulletGroup.isTouching(alien2Group)){
      bulletGroup.destroyEach();
      alien2Group.destroyEach();
      score=score+1;   
    }
    if(bulletGroup.isTouching(alien3Group)){
      bulletGroup.destroyEach();
      alien3Group.destroyEach();
      score=score+1;   
    }
    if(player.isTouching(coin1Group)){
      coinsound.play();
      coin1Group.destroyEach();
      score=score+1;   
    }
    if(player.isTouching(coin2Group)){
      coinsound.play();
      coin2Group.destroyEach();
      score=score+1;   
    }
    if(player.isTouching(coin3Group)){
      coinsound.play();
      coin3Group.destroyEach();
      score=score+1;   
    }
    if(player.isTouching(alien1Group)){
      alien1Group.destroyEach();
      count=count-1;
      if(count===3)
      {
          heart3.visible=false;
      }
      if(count===2)
      {
          heart2.visible=false;
      }
      if(count===1)
      {
          heart1.visible=false;
          gameState="End"
      }
    }
    if(player.isTouching(alien2Group)){
      alien2Group.destroyEach();
      count=count-1;
      if(count===3)
      {
          heart3.visible=false;
      }
      if(count===2)
      {
          heart2.visible=false;
      }
      if(count===1)
      {
          heart1.visible=false;
          gameState="End"
      }
    }  
    if(player.isTouching(alien3Group)){
      alien3Group.destroyEach();
      count=count-1;
      if(count===3)
      {
          heart3.visible=false;
      }
      if(count===2)
      {
          heart2.visible=false;
      }
      if(count===1)
      {
          heart1.visible=false;
          gameState="End"
      }
    }
  }   
  if(Background.x<0){
    Background.x=Background.width/2;
  }
  drawSprites();
  fill("purple");
  textSize(18);
  text("Score: "+score,380,50)
  
  if(gameState==="End"){
    alien.velocityX=0;
    player.visible=false;
    Background.velocityX=0;
    gameover.visible=true;
    restart.visible=true;
    coin1Group.destroyEach();
    coin2Group.destroyEach();
    coin3Group.destroyEach();
    bulletGroup.destroyEach();
    alien1Group.destroyEach();
    alien2Group.destroyEach();
    alien3Group.destroyEach();
  }
  if(mousePressedOver(restart)&&gameState==="End"){
    reset();
  }
}
function Bullet()
{
  bullet=createSprite(90,200,10,10);
     
  bullet.addImage(bulletImage);
  bullet.scale=0.1;
  bullet.y=player.y+5;
  bullet.velocityX=10;
  bullet.lifetime=50;
 // return bullet;
  bulletGroup.add(bullet);
}

function spawnaliens(){
  if(frameCount%60===0){
     alien = createSprite(470,Math.round(random(40,380))) 
    alien.setCollider("rectangle",0,0,alien.width,alien.height);
  alien.debug = false
     alien.addImage(alienImage);
     alien.scale=0.3;
     alien.velocityX=-(3+(score/4))
     alien.lifetime=166.66;
     if(countalien===1)
     {
       countalien=countalien+1;
       alien1Group.add(alien);
     }
     else if(countalien===2)
     {
       countalien=countalien+1;
       alien2Group.add(alien);
     }
     else
     {
        alien3Group.add(alien);
        countalien=1;
     }
  
  }
}
function spawncoins(){
  if(frameCount%60===0){
    coin=createSprite(470,Math.round(random(30,370)))
    coin.addImage(coinImage);
    coin.scale=0.2;
    coin.velocityX=-4;
    coin.lifetime=250;
    
    if(countcoin===1)
     {
       countcoin=countcoin+1;
       coin1Group.add(coin);
     }
     else if(countcoin===2)
     {
       countcoin=countcoin+1;
       coin2Group.add(coin);
     }
     else
     {
        coin3Group.add(coin);
        countcoin=1;
     }
  }
}

function reset(){
   gameState="play"
   score=0;
   gameover.visible=false;
   restart.visible=false;
   player.visible=true;
   player.y=200;
   heart1.visible=true;
   heart2.visible=true;
   heart3.visible=true;
   count=4;
}