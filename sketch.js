var man , manImg,manImg2;
var bgImg;
var bg;
var  corona , coronaImg;
var mask,maskImg,maskG;
var hospital , hospitalImg , hospitalG;
var sanitizer , sanitizerImg,sanitizerG;
var vaccine,vaccineImg;
var roomImg;
var gameState="inHospital";
var form,system,code,security;
var score=0;
var vaccination,vImg;
var i=0;
var invisibleG;

function preload(){

  manImg=loadAnimation("images/Transparent img/man1.png","images/Transparent img/man2.png"
                      ,"images/Transparent img/man3.png","images/Transparent img/man4.png",
                      "images/Transparent img/man5.png","images/Transparent img/man6.png"
                      ,"images/Transparent img/man7.png","images/Transparent img/man8.png");
  manImg2=loadImage("images/Transparent img/backFace.png");
  bgImg=loadImage("images/bg.jpg");
  coronaImg=loadImage("images/corona.png");
  maskImg=loadImage("images/mask.png");
  hospitalImg=loadImage("images/hospital.png");
  sanitizerImg=loadImage("images/sanitizer.png");
  roomImg=loadImage("images/room.jpg");
  vaccineImg=loadImage("images/vaccine.png");
  vaccination=loadImage("images/vaccination.png");
}

function setup(){

  createCanvas(1200,600);

  
  bg=createSprite(900,250);
  bg.addImage(bgImg);
  bg.scale=2.2;
  bg.velocityX=-5;

  invisibleG=createSprite(400,550,200,50);
  invisibleG.visible=false;

  man=createSprite(400,385,40,30);
  man.addAnimation("running",manImg);
  

  corona=createSprite(150,390,50,50);
  corona.addImage(coronaImg);
  corona.scale=0.5;
  
  maskG=new Group();
  hospitalG=new Group();
  sanitizerG=new Group();

  vaccine=createSprite(600,400,40,40);
  vaccine.x=Math.round(random(350,550));
  vaccine.y=Math.round(random(200,500));
  vaccine.depth=man.depth-1;
  vaccine.addImage(vaccineImg);
  vaccine.scale=0.1;
  vaccine.visible=false;

  security = new Security();
  system = new System();

  

}

function draw(){

  console.log(gameState);
  console.log(score);

  if(gameState==="running"){
    background(255);

    if(bg.x<350){
      bg.x=900;
    }

    man.collide(invisibleG);

    spawnItems();
    security.button1.hide();
    security.button2.hide();
    security.button3.hide();
    security.access1.hide();
    security.access2.hide();
    security.access3.hide();

    if(man.y>100){

      if(keyDown(UP_ARROW)){
        man.velocityY=-4;
      }

      
    }

    man.velocityY=man.velocityY+0.5; 

    if(man.isTouching(hospitalG)){
     
      gameState="inHospital";
      
    }

  }else if(gameState==="inHospital"){

    bg.visible=false;
    corona.visible=false;
    man.visible=false;
    hospitalG.destroyEach();
    background(roomImg);
    security.access1.position(700,205);
    security.button1.position(700,235);
    security.access2.position(190,300);
    security.button2.position(190,340);
    security.access3.position(700,460);
    security.button3.position(700,490);
    if(i===0){
      security.button1.show();
      security.button2.show();
      security.button3.show();
      security.access1.show();
      security.access2.show();
      security.access3.show();
      i++;
    }
    clues();
    security.display();

    
    if(score === 3) {
      man.x=200;
      man.y=385;
     
      security.element1.hide();
      security.element2.hide();
      security.element3.hide();
      
      gameState="vaccine";
      
    }

  }else if(gameState==="vaccine"){
    background(roomImg);
    man.visible=true;
    vaccine.visible=true;
    //man.velocityY=0;
   
    
    if(keyDown(UP_ARROW)){
      man.y-=5;
    }
    if(keyDown(DOWN_ARROW)){
      man.y+=5;
    }
    if(keyDown(RIGHT_ARROW)){
      man.x+=5;
    }
    if(keyDown(LEFT_ARROW)){
      man.x-=5;
    }
   
    console.log(man.x);
    

    if(man.isTouching(vaccine)){

     gameState="doctor";
    }

   
    man.addImage(manImg2);
  }else if(gameState="doctor"){
    vaccine.visible=false;
    man.visible=false;
    vImg=createSprite(600,300,50,50);
    vImg.addImage(vaccination);
    vImg.visible=false;
    fill("green");
    stroke(255);
    strokeWeight(3);
    textSize(40);
    text("YOU ARE VACCINATED NOW !!" ,100,50);
    fill(0);
    text("Press C to Continue",300,550);
  }
  

  drawSprites();

}

function spawnItems(){

  if(frameCount%200==0){
    var rand = Math.round(random(1,3));
    switch(rand){
      case 1 : mask1(); 
        break;
      case 2 : hospital1();
        break;
      case 3 : sanitizer1();
        break;
      default:break;
      
    }
  }
}

function mask1(){

  mask=createSprite(1300,370,30,40);
  mask.addImage(maskImg);
  mask.y=Math.round(random(50,300));
  mask.scale=0.2;
  mask.lifetime=250;
  mask.velocityX=-3;
  maskG.add(mask);
  man.depth=mask.depth+1;
}

function hospital1(){

  hospital=createSprite(1400,210,30,30);
  hospital.addImage(hospitalImg);
  hospital.scale=0.3;
  hospital.lifetime=250;
  hospital.velocityX=-5;
  hospitalG.add(hospital);
  man.depth=hospital.depth+1;
}

function sanitizer1(){
 
  sanitizer=createSprite(1300,370,30,40);
  sanitizer.addImage(sanitizerImg);
  sanitizer.y=Math.round(random(20,300));
  sanitizer.scale=2;
  sanitizer.lifetime=250;
  sanitizer.velocityX=-3;
  sanitizerG.add(sanitizer);
  man.depth=sanitizer.depth+1;
}

