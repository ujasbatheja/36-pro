class Food{
    constructor(){
        this.foodStock=0;
        this.lastFeed;
        this.image=loadImage("images/Milk.png");
    }
    
    getFoodStock(){
        return this.foodStock;
    }
    
    updateFoodStock(foodStock){
      //  this.foodStock=foodStock;
      console.log(foodStock);  

        database.ref("/food").update({
            qty: foodStock
        })
    }

    deductFood(){
        if(this.foodStock>0){
            this.foodStock=this.foodStock-1;
        }
    }

    getFedTime(lastFed){
        this.lastFed=lastFed;
    }

    display(){
        background(46,139,87);
        console.log("lastFed",globalLastFed);
        fill(255,255,254);
        textSize(15);
        if(globalLastFed>=12){
            text("Last Feed : "+ globalLastFed%12 + "PM",50,30);
        }

        else if(globalLastFed==0){
            text("Last Feed : 12 AM",50,30);
        }
        
        else{
            text("Last Feed : "+ globalLastFed + "AM",50,30);
        }
        var x=70,y=100;
        imageMode(CENTER);
        if(this.foodStock!=0){
            for(var i=0;i<this.foodStock;i++){
                if(i%10==0){
                    x=70;
                    y=y+50;
                }
                image(this.image,x,y,50,50);
                x=x+30;
            }
        }
    }
}

function addFoods(){
    foodS++;
    database.ref("/").update({
        Food:foodS
    })
}