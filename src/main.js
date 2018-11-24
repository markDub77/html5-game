import 'pixi'
import 'p2'
import Phaser from 'phaser'
import config from './config'

var transparent = false;
var antialias = false;
var gameWidth = 800;
var gameHeight = 600;
var heroGroup;
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
var hookBmd;
var chainLink;

var hook; //head of snake sprite
var square;
var chainLink = new Array(); //array of sprites that make the snake body sections
var chainPath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
var numChainLinks = 40; //number of snake body sections
var cursors;
var grappleLaunch = false;


var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'phaser-example', { preload: preload, create: create, update: update, render: render }, transparent, antialias);

function preload() {
    game.load.spritesheet('controller-indicator', 'assets/images/controller-indicator.png', 16,16);
    game.scaleMode = Phaser.ScaleManager.RESIZE;
    game.input.gamepad.start();  
    pad1 = game.input.gamepad.pad1;   
}
function create() {

    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.stage.backgroundColor = '#000';

    // =========================================================================================================
    
    var hookBmd = game.add.bitmapData(4,4);
    hookBmd.ctx.beginPath();
    hookBmd.ctx.rect(0,0,4,4);
    hookBmd.ctx.fillStyle = '#ff0000';
    hookBmd.ctx.fill();
    hook = game.add.sprite(8, 0, hookBmd);
    hook.anchor.setTo(0, 0);
    game.physics.enable(hook, Phaser.Physics.ARCADE);

    var chainLinkBmd = game.add.bitmapData(4,4);
    chainLinkBmd.ctx.beginPath();
    chainLinkBmd.ctx.rect(0,0,4,4);
    chainLinkBmd.ctx.fillStyle = '#cccccc';
    chainLinkBmd.ctx.fill();

    var squareBmd = game.add.bitmapData(16,16);
    squareBmd.ctx.beginPath();
    squareBmd.ctx.rect(0,0,16,16);
    squareBmd.ctx.fillStyle = '#DD9B33';
    squareBmd.ctx.fill();
    square = game.add.sprite(0, 0, squareBmd);
    square.anchor.setTo(0, 0);

    heroGroup = game.add.group();
    heroGroup.add(hook);
    heroGroup.add(square);
    heroGroup.x = 400;
    heroGroup.y = 300;
    

    //  Init chainLink array
    for (var i = 1; i <= numChainLinks; i++) {
        chainLink[i] = game.add.sprite(8, 0, chainLinkBmd);
        chainLink[i].anchor.setTo(0, 0);
        heroGroup.add(chainLink[i]);
    }
    
    //  Init chainPath array
    for (var i = 0; i <= numChainLinks; i++) {
        chainPath[i] = new Phaser.Point(8, 0);
    }
   
    console.log('hook.x1', hook.x);
    console.log('hook.y1', hook.y);





    // (function () { // gamepad indicator
    //     indicator = game.add.sprite(10,10, 'controller-indicator');
    //     indicator.scale.x = indicator.scale.y = 2;
    //     indicator.animations.frame = 1;
    // }());       
}








function launchGrapple() { // Will only be called once per key press. // Will be passed the full Key object. See Phaser.Key for properties.}
    grappleLaunch = true;
    
}

function makeGrappleDisapear() { // Will only be called once per key press. // Will be passed the full Key object. See Phaser.Key for properties.}
    
    console.log('makeGrappleDisapear');
    
    console.log('hook.x2', hook.x);
    console.log('hook.y2', hook.y);
    
    grappleLaunch = false;

    
    for (var i = 1; i <= numChainLinks; i++) {
        chainLink[i].x = 8;
        chainLink[i].y = 0;
    }
    for (var i = 0; i <= numChainLinks; i++) {
        chainPath[i].x = 8;
        chainPath[i].y = 0;
    }
    
}


   

function update() {

    // var launchGrappleButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    var launchGrappleButton = game.input.gamepad.pad1.getButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);
    launchGrappleButton.onDown.add(launchGrapple, this);
    launchGrappleButton.onUp.add(makeGrappleDisapear, this);


    launch();

    function launch() { // launch 

        

        if (grappleLaunch == true) {

            console.log('launch');
            
            if(hook.x <= numChainLinks * 5){


            console.log('hook.x3', hook.x);
            console.log('hook.y3', hook.y);


            hook.body.velocity.setTo(300, -300);

            // insert the new location at the start of the array, 
            // and knock the last position off the end
            var part = chainPath.pop();
            part.setTo(hook.x, hook.y);
            chainPath.unshift(part);


                for (var i = 1; i <= numChainLinks; i++){
                    chainLink[i].x = (chainPath[i]).x;
                    chainLink[i].y = (chainPath[i]).y;
                }
            } else {
                makeGrappleDisapear();
               
            }
        } else {
             hook.body.velocity.setTo(0, 0);
                hook.x = 8;
                hook.y = -8;
        }
    } // end launch
    

    



    




        // Pad "connected or not" indicator
    if (game.input.gamepad.supported && game.input.gamepad.active && pad1.connected)
    {
        // indicator.animations.frame = 0;
    }
    else
    {
        // indicator.animations.frame = 1;
    }






    // Controls
    if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1)
    {
        heroGroup.x--;
    }
    else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1)
    {
        heroGroup.x++;
    }

    if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1)
    {
        heroGroup.y--;
    }
    else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1)
    {
        heroGroup.y++;
    }

    if (pad1.justPressed(Phaser.Gamepad.XBOX360_A))
    {
        
    }

    if (pad1.justReleased(Phaser.Gamepad.XBOX360_B))
    {
       
    }

    if (pad1.connected)
    {
        var rightStickX = pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_X);
        var rightStickY = pad1.axis(Phaser.Gamepad.XBOX360_STICK_RIGHT_Y);

        if (rightStickX)
        {
            heroGroup.x += rightStickX * 10;
        }

        if (rightStickY)
        {
            heroGroup.y += rightStickY * 10;
        }
    }
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
