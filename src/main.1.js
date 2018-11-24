import 'pixi'
import 'p2'
import Phaser from 'phaser'
import config from './config'

var transparent = false;
var antialias = false;
var gameWidth = 800;
var gameHeight = 600;
var sprite;
var sprite2;
var sprites;
var pad1;
var indicator;
var grappleBMD;
var grapple1;
var line;
var handle1;
var handle2;
var graphics;
var hook;
var bmd;
var bg;
var snakeHeadBdm;

var snakeHead; //head of snake sprite
var snakeSection = new Array(); //array of sprites that make the snake body sections
var snakePath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
var numSnakeSections = 50; //number of snake body sections
//var snakeSpacer = 1; //parameter that sets the spacing between sections
var cursors;


var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render }, transparent, antialias);

function preload() {
    game.load.spritesheet('controller-indicator', 'assets/images/controller-indicator.png', 16,16);
    game.load.image('arrow', 'assets/images/phaser-dude.png');

    game.scaleMode = Phaser.ScaleManager.RESIZE;
}
function create() {

    game.stage.backgroundColor = '#000';


    game.physics.startSystem(Phaser.Physics.ARCADE);
    

    // 1 
    // snakeHeadBdm = game.add.bitmapData(800, 600);
    // snakeHeadBdm.context.fillStyle = '#cccccc';

    // 2
    // let snakeHeadBdm = game.add.graphics();
    // snakeHeadBdm.beginFill(0xDD9BB33); // (color, alpha) alpha is optional
    // snakeHeadBdm.drawRect(300, 300, 16, 16); // (x, y, width, height)
    
    // 3
    // snakeHeadBdm = game.add.bitmapData(gameWidth,gameHeight);            
    // snakeHeadBdm.context.fillStyle = '#cccccc';

    // 4 
    // create a new bitmap data object
    var snakeHeadBdm = game.add.bitmapData(1,1);

    // draw to the canvas context like normal
    snakeHeadBdm.ctx.beginPath();
    snakeHeadBdm.ctx.rect(0,0,1,1);
    snakeHeadBdm.ctx.fillStyle = '#cccccc';
    snakeHeadBdm.ctx.fill();

    // use the bitmap data as the texture for the sprite
 
    
    snakeHead = game.add.sprite(400, 300, snakeHeadBdm);
    snakeHead.anchor.setTo(0.5, 0.5);

    // we are makingj bitmap data out of ...
    bmd = game.add.bitmapData(gameWidth, gameHeight);

    // it's filled with gray
    bmd.context.fillStyle = '#cccccc';

    // now it's a sprite
    bg = game.add.sprite(0, 0, bmd);

    // we're giving the game gravity
    game.physics.arcade.gravity.y = 100;

    // another sprite joines
    hook = game.add.sprite(32, 450, 'arrow');
    
    // position the anchor
    hook.anchor.set(0.5);


    game.physics.enable(hook, Phaser.Physics.ARCADE);
    

    hook.body.collideWorldBounds = true;
    hook.body.bounce.set(0.8);






    (function () { // gamepad indicator
        indicator = game.add.sprite(10,10, 'controller-indicator');
        indicator.scale.x = indicator.scale.y = 2;
        indicator.animations.frame = 1;
        game.input.gamepad.start();
         // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
        pad1 = game.input.gamepad.pad1;
        // Stretch to fill
        // game.input.onDown.add(dump, this);
        // game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL; // Maintain aspect ratio
        // game.input.onDown.add(gofull, this);
    }());   
    

    (function () { // yellow square and line

        let spriteX = 50;
        let spriteY = 200;

        // Grapple1 ------------------------------------------------------------------------------------------------------------------------------------------------------
        grappleBMD = game.add.bitmapData(0,0);                
        grappleBMD.ctx.beginPath();        
        grappleBMD.ctx.lineWidth = "1";        
        grappleBMD.ctx.strokeStyle = 'silver';        
        grappleBMD.ctx.setLineDash([1]);        
        grappleBMD.ctx.moveTo(spriteX, spriteY);        
        grappleBMD.ctx.lineTo(400 , 400);        
        grappleBMD.ctx.stroke();
        grappleBMD.ctx.closePath();
        grapple1 = game.add.sprite(0, 0, grappleBMD);

        let square = game.add.graphics();
        square.beginFill(0xDD9BB33); // (color, alpha) alpha is optional
        square.drawRect(spriteX, spriteY, 16, 16); // (x, y, width, height)

        sprites = game.add.group();
        sprites.add(grapple1);
        sprites.add(square);
        sprite = sprites;
    }());


    
    (function () { // trailing line
        
        game.input.onDown.add(launch, this); // ????
        
        function launch() {
            if (game.input.x < hook.x) {
                hook.body.velocity.setTo(-200, -200);
            } else {
                hook.body.velocity.setTo(200, -200);
            }
        }
    }());


   



game.physics.enable(snakeHead, Phaser.Physics.ARCADE);
cursors = game.input.keyboard.createCursorKeys();




    //  Init snakeSection array
    for (var i = 1; i <= numSnakeSections; i++)
    {
        snakeSection[i] = game.add.sprite(1, 1, snakeHeadBdm);
        snakeSection[i].anchor.setTo(1, 1);
    }
    
    //  Init snakePath array
    for (var i = 0; i <= numSnakeSections; i++)
    {
        snakePath[i] = new Phaser.Point(1, 1);
    }
    


    
}
function update() {

    snakeHead.body.velocity.setTo(0, 0);
    snakeHead.body.angularVelocity = 0;

    hook.rotation = hook.body.angle;
    bmd.context.fillRect(hook.x, hook.y, 1, 1);

    // If dirty this BitmapData will be re-rendered.
    bmd.dirty = true;
    // snakeHeadBdm.dirty = true;




if (cursors.up.isDown) {
        snakeHead.body.velocity.copyFrom(game.physics.arcade.velocityFromAngle(snakeHead.angle, 300));

        // Everytime the snake head moves, insert the new location at the start of the array, 
        // and knock the last position off the end

        var part = snakePath.pop();

        part.setTo(snakeHead.x, snakeHead.y);

        snakePath.unshift(part);

        for (var i = 1; i <= numSnakeSections - 1; i++)
        {
            snakeSection[i].x = (snakePath[i]).x;
            snakeSection[i].y = (snakePath[i]).y;
        }
}

if (cursors.left.isDown)
{
    snakeHead.body.angularVelocity = -300;
}
else if (cursors.right.isDown)
{
    snakeHead.body.angularVelocity = 300;
}


 (function () { // gamepad 
        // Pad "connected or not" indicator
    if (game.input.gamepad.supported && game.input.gamepad.active && pad1.connected)
    {
        indicator.animations.frame = 0;
    }
    else
    {
        indicator.animations.frame = 1;
    }

    // Controls
    if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
    {
        sprite.x--;
    }
    else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
    {
        sprite.x++;
    }

    if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1)
    {
        sprite.y--;
    }
    else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1)
    {
        sprite.y++;
    }

    if (pad1.justPressed(Phaser.Gamepad.XBOX360_A))
    {
        sprite.angle += 5;
    }

    if (pad1.justReleased(Phaser.Gamepad.XBOX360_B))
    {
        sprite.scale.x += 0.01;
        sprite.scale.y = sprite.scale.x;
    }

    if (pad1.connected)
    {
        var rightStickX = pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
        var rightStickY = pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);

        if (rightStickX)
        {
            sprite.x += rightStickX * 10;
        }

        if (rightStickY)
        {
            sprite.y += rightStickY * 10;
        }
    }
    }());   


    







}
function render() {

    // game.debug.text(pad1)
    // game.debug.geom(line);
    // game.debug.geom(line, '#ffd900');
    // game.debug.lineInfo(line, 32, 32);

}
function gofull() {

    if (game.scale.isFullScreen)
    {
        game.scale.stopFullScreen();
    }
    else
    {
        game.scale.startFullScreen(false);
    }

}
function dump() {

    console.log(pad1._axes[0]);
    console.log(pad1._rawPad.axes[0]);

}
