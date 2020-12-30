var gameState = 0;
var dog, dogImage;
var foodImage, foodObj;
var database, position;
var foodStock, globalLastFed;
var foodStockButton, addFoodButton;

function preload(){     
  dogImage = loadImage("images/dogimg1.png");
  //foodImag = loadImage("images/Milk.png");
}

function setup() {
  createCanvas(500,500);
  dog = createSprite(250,250,5,5);
  dog.scale = 0.3;
  dog.addImage("dogImage",dogImage);

  database = firebase.database();

  foodObj = new Food();
  
  foodStockRef = database.ref("food/qty");
  foodStockRef.on("value",function(data){ 
  foodStock = data.val();})
  foodObj.foodStock

  feedButton = createButton("Feed the dog");
  feedButton.position(450,95);

  

  addFoodButton = createButton("Add Food")
  addFoodButton.position(550,95);

}

function draw() {  
  background(46,139,87);
  foodObj.foodStock = foodStock;

  feedButton.mousePressed(feedDog);

  addFoodButton.mousePressed(addFoods);

   foodObj.display();
   //milk.display();

  drawSprites();
}

function feedDog(){
  var tmp=foodObj.getFoodStock()-1;
  foodObj.updateFoodStock(tmp);
  console.log(tmp);
  foodObj.lastFed = hour();
  globalLastFed = foodObj.lastFed;
  console.log("globalLastFed"+globalLastFed);
  database.ref("/").update({
    lastFedTime: foodObj.lastFed
  })
}

function addFoods(){
  foodStock++;
  foodObj.updateFoodStock(foodStock);
  /*database.ref("/").update({
    Food:foods
  })*/
}