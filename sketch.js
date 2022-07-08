//const Engine = Matter.Engine;
//const World = Matter.World;
//const Bodies = Matter.Bodies;
//const Constraint = Matter.Constraint;



var spidermanImg, spiderman, GreenGobImg, GreenGob;
var bg, bg_image;
var webs, websImg, webGroup;
var GameOver, Reset, GameOverImg,ResetImg
//var engine, world, angle;

var GreenGoblinsGroup;
var score;
var angle;

var PLAY = 1;
var END = 0;

var gameState = PLAY;

var GameOverSound;


function preload(){

    spidermanImg = loadImage("assets/Spiderman.png");
    GreenGobImg = loadImage("assets/GreenGoblin.png");
    bg_image = loadImage("assets/Background.png");
    websImg = loadImage("assets/SpiderWebs.png");
    GameOverImg = loadImage("assets/GameOver.png");
    ResetImg = loadImage("assets/Restart.png");

}



function setup(){

    createCanvas(1200, 700);
    //engine = Engine.create();
    //world = engine.world;
 
    bg = createSprite(600, 350);
    bg.addImage( bg_image);
    bg.scale = 0.5;
    
    angleMode(DEGREES);
    angle = 15;
 
    webGroup = new Group;

    GreenGoblinsGroup = new Group;
    spiderman = createSprite(150,350,angle);
    spiderman.addImage(spidermanImg);
    spiderman.scale = 0.05;



    GameOver = createSprite(600,350);
    GameOver.addImage(GameOverImg);
    GameOver.scale = 0.75;

    Reset = createSprite(80, 100);
    Reset.addImage(ResetImg);
    Reset.scale = 0.05;
    Reset.visible = false;


    score = 0; 
    stroke("White");
    fill("White");
    textSize(20); 



    //GreenGob = createSprite(900,500);
    //GreenGob.addImage(GreenGobImg);
    //GreenGob.scale = 0.25;

    if(gameState === END){
        GameOverSound.play();
    }
    
    
}




function draw(){

    background(0);
/*  */
   spiderman.visible = true;
    //GreenGob.visible = true;
    
    if(gameState === PLAY){

        GameOver.visible = false;
        if(keyIsDown(LEFT_ARROW)){
            spiderman.x -= 3.5;
        }
    
        if(keyIsDown(RIGHT_ARROW)){
            spiderman.x += 3.5;
        }
        if(keyIsDown(UP_ARROW)){
            spiderman.y -=3.5;
        }
        if(keyIsDown(DOWN_ARROW)){
            spiderman.y += 3.5;
        }

        spawnGoblins();
        shootWebs();
    
        
    if(webGroup.overlap(GreenGoblinsGroup)){
        GreenGoblinsGroup[0].destroy();
        webGroup[0].destroy();
        score += 5;
     }

    }
   if(GreenGoblinsGroup.collide(spiderman)){
        spiderman.velocityY = 0;
        spiderman.visible = false;
        gameState = END;
        
   }
 else if(gameState === END){
    Reset.visible = true;
    GameOver.visible = true;
    GreenGoblinsGroup.setVisibleEach = false;
    GreenGoblinsGroup.lifetime = 0;
    text("Please click the Reset Button to Play Again ", 600,50);

    if(mousePressedOver(Reset)){
        reset();
    }  
    
    
 }

 /*if(score % 10 === 0){
    GreenGoblinsGroup.velocityX -=6;

 }*/

    drawSprites();
    text("Score: "+score, 200,50);

}

function spawnGoblins(){
    
    if(World.frameCount % 150 === 0){
        GreenGob = createSprite(1200,600);
        GreenGob.y = Math.round(random(600,400));
        GreenGob.addImage(GreenGobImg);
        GreenGob.velocityX = -(6 + score/10);
        GreenGoblinsGroup.add(GreenGob);
        GreenGob.scale = 0.25;
        GreenGob.lifetime = 150;
    }



}
function shootWebs(){
    
    if(keyDown("space")){
        if(frameCount % 5 === 0){

        
        webs = createSprite(spiderman.x,spiderman.y);
        webs.addImage(websImg);
        webs.velocityX = 6;
        webs.scale = 0.15;
        webGroup.add(webs);
        }
    }
    /*
    var newAngle = spiderman.angle - 20;
    newAngle = newAngle *(3.14/180);
    var velocity = p5.Vector.fromAngle(newAngle);
    velocity.mult(0.5);
    Matter.Body.setStatic(this.body, false);
    Matter.Body.setVelocity(this.body, { x: velocity.x * (180/3.14), y:velocity.y * (180/3.14)});*/


}
function reset(){
    gameState = PLAY;
    Reset.visible = false;
    GameOver.visible = false;
    score = 0;


}