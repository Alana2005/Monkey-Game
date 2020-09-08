var monkey, monkeyimage, ground, groundimage, food, foodimage,stone, rocksimage, invisground;


function preload(){ 
  
  monkeyimage=loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png", "Monkey_08.png", "Monkey_09.png","Monkey_10.png"); 
  
  groundimage=loadImage("jungle.jpg"); 
  
  
  rocksimage=loadImage("stone.png"); 
  
  
  foodimage=loadImage("Banana.png"); 
  
}


function setup() {
  createCanvas(400, 400);
  
  //create monkey
  monkey=createSprite(60,380,15,25); 
  monkey.addAnimation("Monkey",monkeyimage); 
  //monkey size 
  monkey.scale=0.2; 
  //Collider for monkey
  monkey.setCollider("circle",0,0,30);

  //create ground
  ground=createSprite(200,200,400,400); 
  ground.addImage("ground", groundimage); 
  ground.x=ground.width/2; 
  
  
  //create invisible ground for monkey to stand on 
  invisground=createSprite(200,383,400,50); 
  invisground.visible=false; 
  
  var stones= new Group();

var foods=new Group();

var SurvivalTime=0;

var PLAY=1;
var END=0;
var gameState=PLAY; 

  
    stroke("black");
  textSize(18);
  
}

function draw() {
  background(220);
  
  //What should happen in gameState PLAY
  if (gameState===PLAY){
    
    //scoring 
    if(monkey.isTouching(foods)){
      SurvivalTime=SurvivalTime+2; 
      foods.destroyEach(); 
      text("SurvialTime: ",345,32); 
    }
    //switching score to change monkey size 
    switch(score){
      case 10: monkey.scale=0.12; 
        break; 
      case 20:monkey.scale=14; 
        break; 
       case 30: monkey.scale=0.16; 
        break;
        case 40:monkey.scale=0.18;
        break; 
        default:break;
    }
    
    ground.velocityX=-4;
    
    //make ground reset when reaches left edge 
    if(ground.x<0){
    ground.x=ground.width/2; 
    }
    
    //make Monkey jump 
    if (keyDown("Space")){
        monkey.velocityY=-8; 
        }
    //add gravity
    monkey.velocityY=monkey.velocityY+2; 
    
  }
    // make gameState END 
    if (monkey.isTouching(stones)){
        gameState=END; 
        }
  
  //END gamestate 
  if (gameState===END){
    ground.velocityX=0; 
    monkey.velocityY=0;
    foods.destroyEach(); 
    stones.destroyEach(); 
  }
  //make monkey collide with the invisible ground
  monkey.collide(invisground); 
  
  spawnfood(); 
  spawnstones();
  
  drawSprites(); 
}


function spawnfood(){
  if (frameCount%80===0){ 
    var food=createSprite(400,200,10,10);
    food.addImage("food",foodimage);
    food.velocityX=-4; 
    food.y=random(180,250); 
    food.lifetime=100; 
    foods.add(food); 
    food.scale=0.05; 
}
}

function spawnstones(){
  if (frameCount%200===0){
    var stone=createSprite(400,370,10,10); 
    stone.addImage("stone",rocksimage);
    stone.velocityX=-3; 
    stone.lifetime=134; 
    stones.add(stone); 
    stone.scale=0.13; 
  }
}