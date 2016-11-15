Enemy = function (index, game, player) {

    var x = 100//game.world.randomX;
    var y = 100//game.world.randomY;
   
    this.game = game;
    
    this.player = player;
    this.speed = 200; 
    this.alive = true;
    
    this.tank = game.add.sprite(x, y, 'af');
    this.tank.health = 6;  
    this.tank.name = index.toString();
    game.physics.arcade.enable(this.tank);
	this.tank.enableBody= true;
    this.tank.body.immovable = false;
	this.tank.body.bounce.y = 0.2;
	this.tank.body.bounce.x = 0.2;
    this.tank.body.collideWorldBounds = true;
	
	
    

};
Enemy.prototype.update = function(i) {
   
	    numa = i;// update次序
	    if(dict[numa]==0)
		{
		   game.time.events.add(Phaser.Timer.SECOND * 1, randomdic , this);
		   dict[numa]=1;	
		} 
	    
		
  //function movestaregy(a){
	
	//if(tank.x>=this.tank.x)    this.tank.body.velocity.x=10*a;
	//else if(tank.x<this.tank.x)this.tank.body.velocity.x=(-10*a);
	
	//if(tank.y<=this.tank.y)    this.tank.body.velocity.y=(-10*a);
	//else if(tank.y>this.tank.y)this.tank.body.velocity.y=10*a;
	
   // }
    
       
	//	if(this.game.physics.arcade.distanceBetween(this.tank, this.player) >= 75)
	//	{
	//		movestaregy(10);
	//	}
	//	else if(this.game.physics.arcade.distanceBetween(this.tank, this.player) < 75){// 在距离达到75，可以造成伤害时停下
	//		movestaregy(-10);
	//	}
		
		
		
    
	if (this.game.physics.arcade.distanceBetween(this.tank, this.player) < 80)
    {
        //攻击状态切换，每秒钟生成一个伤害计时器，扣玩家10点HP，并销毁该计时器。
		//实现游戏主循环，每秒钟动作（原本以30fps运行，计时器会迭代，超速扣血）
		if(damage_num[numa]==0)
		{
		game.time.events.add(Phaser.Timer.SECOND * 0.8, atk, this);
		damage_num[numa]=1;	
		} 
		
	
    }
   
	
};


 function atk(){
		playerHP-=10;
		damage_num=0;
		}
 function randomdic(){
	dic[numa] = Math.random(0,1);
	if(dic[numa]>=0 && dic[numa]<0.25){this.tank.body.velocity.x=200;this.tank.body.velocity.y=0;}
    if(dic[numa]>=0.25 && dic[numa]<0.5){this.tank.body.velocity.y=200;this.tank.body.velocity.x=0;  }
   if(dic[numa]>=0.5 && dic[numa]<0.75){this.tank.body.velocity.x=-200;this.tank.body.velocity.y=0;  }
	if(dic[numa]>=0.75 && dic[numa]<=1){this.tank.body.velocity.y=-200; this.tank.body.velocity.x=0; }
	dict[numa]=0;
	}

var tank;
var currentSpeed=0;
var i=20;
var playerHP=100;
var playerpos=[];
var direction=1;
var direcontrol = [0,0,0,0];//abandon 8 direction move

var bullet;
var bulleta=0;

var enemies;
var damage_num=0;
var dict=[0,0,0,0,0];
var dic=[0,0,0,0,0];
var health=6;
var desbullet=1;//judge the old bullet is destoryed or not
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'phaser-example', { preload: preload, create: create, update: update, render: render });
function preload () {
   game.load.spritesheet('af', 'pick.png',32,48,16);
   game.load.image('bu', 'img1/2.png');
 }

function create () {
	//game.world.setBounds(-1000, -1000, 2000, 2000);
	game.physics.startSystem(Phaser.Physics.ARCADE);

	cursors = game.input.keyboard.createCursorKeys();
    
	tank = game.add.sprite(20, 0, 'af');
     
	game.physics.enable(tank, Phaser.Physics.ARCADE);
	tank.body.immovable = false;
	tank.body.bounce.setTo(1, 1);
	tank.body.collideWorldBounds = true;
		 
	 enemies = [];
	 for(var i=0;i<5;i++)
     enemies.push(new Enemy(i, game, tank));//make enemy
    
	game.physics.arcade.collide(tank, enemies[0].tank);
		
	game.camera.follow(tank);
    var left = tank.animations.add('left', [4,5,6,7], 10, true);
    var right = tank.animations.add('right', [8,9,10,11], 10, true);
    var up=tank.animations.add('up', [0,1,2,3], 10, true);
    var down=tank.animations.add('down', [12,13,14,15], 10, true);
	
	game.camera.follow(tank);

    game.camera.focusOnXY(0, 0);
	 }

   
var i=0;
function update () {
	
    
   for (var i = 0; i < enemies.length; i++)
    {
        
           
           game.physics.arcade.collide(tank, enemies[i].tank);
           enemies[i].update(i);
		   
		   
            
        
    }
    
	 
    if (cursors.left.isDown &&(direcontrol[0]+direcontrol[2]+direcontrol[3]==0))
    {
       tank.body.velocity.x = -150;
	   tank.body.velocity.y = 0;
	   tank.animations.play('left');
	   direcontrol[1]=1;
	   direction=2;
    }
	else if(direction==2){
	tank.animations.play('left');
	tank.animations.stop('left');
	tank.body.velocity.x = 0;
	direcontrol[1]=0;
	}
   
    if (cursors.right.isDown &&(direcontrol[1]+direcontrol[0]+direcontrol[3]==0))
    {
        tank.body.velocity.x = 150;
		tank.body.velocity.y = 0;
		tank.animations.play('right');
		direcontrol[2]=1;
		direction=3;	
    }
	else if(direction==3){
	tank.animations.play('right');
	tank.animations.stop('right');
	tank.body.velocity.x = 0;
	 direcontrol[2]=0;
	}
	if (cursors.down.isDown&&(direcontrol[1]+direcontrol[2]+direcontrol[3]==0))
    {
        tank.body.velocity.y = 150;
		tank.body.velocity.x = 0;
		tank.animations.play('up');
		direcontrol[0]=1;
		direction=1;
    }
	else if(direction==1){
	tank.animations.play('up');
	tank.animations.stop('up');
	tank.body.velocity.y = 0;
	 direcontrol[0]=0;
	}
	
	if (cursors.up.isDown && (direcontrol[0]+direcontrol[2]+direcontrol[1]==0))
    {
        tank.body.velocity.y = -150;
		tank.body.velocity.x = 0;
		tank.animations.play('down');
		direcontrol[3]=1;
		direction=4;
			
    }
	else if(direction==4){
	tank.animations.play('down');
	tank.animations.stop('down');
	tank.body.velocity.y = 0;
	direcontrol[3]=0;
	}
    kaka();
}
     

function bulletHitPlayer(){
	bullet.kill();
	
} 	 
	
function bulletHitene(){
	
	bullet.kill();
	enemies[0].tank.health--;
	if(enemies[0].tank.health<1)enemies[0].tank.kill();
}


function fire(a,b){

    game.time.events.add(Phaser.Timer.SECOND * 0.5, destory, this);//子弹存活时间
    desbullet=0;//子弹处于存活状态
	bullet = game.add.sprite(a-150,b-20,'bu');//子弹
	game.physics.enable(bullet, Phaser.Physics.ARCADE);
	bullet.enablebody=true;
	bullet.body.bounce.setTo(0.1, 0.2);
	bullet.body.velocity.x = 800;
     for (var i = 0; i < enemies.length; i++)
    {
       game.physics.arcade.overlap(bullet, enemies[i].tank, bulletHitene, null, this);
    }
	bulleta=0;//
	function destory(){
	
       bullet.kill();
	   desbullet=1;//子弹已销毁
	}
                        
    }


function kaka(){
if(cursors.A.isDown  && desbullet==1){//前一个子弹不销毁，后一个子弹不打出
bulleta=1;
}
else if(cursors.A.isUp && bulleta==1 && desbullet==1){
        fire(tank.position.x, tank.position.y);

}
else if(desbullet==0){
	
	game.physics.arcade.overlap(bullet, enemies[0].tank, bulletHitene, null, this);//实现玩家子弹与敌人击打，敌人扣血
}

}
function render () {

     game.debug.text('HP: ' + playerHP , 32, 32);
	 game.debug.text('tank1-HP: ' + enemies[0].tank.health , 260, 32);
	
   //  game.debug.text('x: ' + tank.postion.x , 360, 32);
}
