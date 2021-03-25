var ground;
var bella;
var animal, animalGroup;
var energy=20;
var victoriaGroup;
var janeGroup;


var gameState ="play";


var edges;

function setup() {
  createCanvas(800,400);

  backgroundImg = loadImage("images/forest.jpg");
  animalImg = loadImage("images/animal1.png");
  bellaImg = loadImage("images/bella.png");
  victoriaImg = loadImage("images/victoria.png");
  janeImg = loadImage("images/jane.png");

  edges = createEdgeSprites();
  console.log(edges);
  ground = createSprite(400,380,800,20);
  ground.shapeColor = (0,3,14);


  bella = createSprite(50,300,30,30);
  bella.addImage(bellaImg);
  bella.scale = 0.4;
  bella.shapeColor = ("purple");
  

  /*invisibleGround = createSprite(400,390,800,10);
  invisibleGround.visible = false;*/

  victoriaGroup = new Group();
  janeGroup = new Group();



  animalGroup = new Group();
  
  
}

function draw() {
  background(backgroundImg);
  //console.log(bella.y);
  textSize(15);
  fill("white");
  text("Energy:"+energy,20,20);

  if(gameState== "play"){
    if (bella.isTouching(victoriaGroup)){
      energy = energy+1;
    }
  
    if (bella.isTouching(janeGroup)){
      energy = energy+10;
    }
  
     victoriaGroup.bounceOff(edges);
     victoriaGroup.collide(animalGroup);
     janeGroup.bounceOff(edges[0],[1]);
     janeGroup.bounceOff(victoriaGroup);
     janeGroup.collide(animalGroup);
     janeGroup.bounceOff(bella);
     janeGroup.bounceOff(ground);
     victoriaGroup.bounceOff(ground);
  
  
    
    
    if(keyDown("left")){
      bella.x = bella.x-7;
    }
  
    if(keyDown("right")){
      bella.x = bella.x+7;
    }
    
    if(keyDown("up") && bella.y >=354){
      bella.velocityY = -16;
    }
  
  
    if(keyDown("down") && bella.y <=354){
      bella.velocityY = 2;
    }
  
  
    if(bella.isTouching(animalGroup)){
      animalGroup.destroyEach();
  
     
        energy= energy -5;
  
    }
  
    
  
    
    bella.velocityY = bella.velocityY +0.5;
    
    bella.collide(ground);
  
    bella.collide(edges[0]);
    bella.collide(edges[1]);

    bella.collide(edges);
  
    spawnAnimals();
    spawnJane();
    spawnVictoria()
  
    
    if(energy ==0){
      gameState = "end";
    }

  } else if(gameState == "end"){
    textSize(20);
    fill(0);
    text(" GAME OVER",400,200);

    
  }

  

  drawSprites();
}

function spawnAnimals(){
  if(frameCount% 100 == 0){
    animal = createSprite(800,200,20,20);
    animal.shapeColor ="yellow";
    animal.velocityX = -7;
    animal.y = Math.round(random(100,300));
    animal.addImage(animalImg);
    animal.scale = 0.3;
    animal.lifetime =300;

    animalGroup.add(animal);
  }
}

function spawnVictoria(){
  if(frameCount%600 ==0){
      var victoria = createSprite(30,200,20,20);
      victoria.shapeColor="red";
      victoria.velocityX = 7;
      victoria.y = Math.round(random(50,300));
      victoria.addImage(victoriaImg);
      victoria.lifetime = 400;
      victoriaGroup.add(victoria);
      
    }
  }



function spawnJane(){
  if(frameCount%300==0){
    var jane = createSprite(50,20,20,20);
    jane.shapeColor = "green";
    jane.velocityX=Math.round(random(1, 5));
    jane.velocityY=Math.round(random(4,8));
    jane.addImage(janeImg);
    jane.scale = 0.2;
    jane.lifetime = 200;

    janeGroup.add(jane);


  }

}


