class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car2 = createSprite(300,400);
    car3 = createSprite(500,600);
    car4 = createSprite(700,800);
    cars = [car1,car2,car3,car4]
  }

  play(){
    form.hide();
    textSize(30);
    text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      var index = 0;
      var y = 0;
      var x;
      for(var plr in allPlayers){
       index = index+1;
       y = y+200
       x = displayHeight-allPlayers[plr].distance
       cars[index-1].x = x
       cars[index-1].y = y
       if(index==player.index){
         cars[index-1].shapeColor = "red"
         camera.position.y = displayHeight/2
         camera.position.x = cars[index-1].x
       }
      }
    }

    if(keyIsDown(RIGHT_ARROW) && player.index !== null){
      player.distance-=50
      player.update();
    }
    drawSprites()
  }
}
