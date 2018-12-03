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
var hookSprite;
var bmd;
var hookBmd;
var chainLink;
var square;
var chainLink = new Array(); //array of sprites that make the snake body sections
var chainPath = new Array(); //arrary of positions(points) that have to be stored for the path the sections follow
var numChainLinks = 40; //number of snake body sections
var cursors;
var grappleLaunch = false;
var mainState = {

    preload: function() {
        game.load.spritesheet('controller-indicator', 'assets/images/controller-indicator.png', 16,16);
        game.scaleMode = Phaser.ScaleManager.RESIZE;
        game.input.gamepad.start();  
        pad1 = game.input.gamepad.pad1;   
    },
    create: function() {

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.startSystem(Phaser.Physics.P2JS);
        game.physics.p2.gravity.y = 1200;
        game.stage.backgroundColor = '#000';
        game.world.enableBody = true;


        // =========================================================================================================
        
        var hookBmd = game.add.bitmapData(4,4);
        hookBmd.ctx.beginPath();
        hookBmd.ctx.rect(0,0,4,4);
        hookBmd.ctx.fillStyle = '#ff0000';
        hookBmd.ctx.fill();

        hookSprite = game.add.sprite(0, 0, hookBmd);
        hookSprite.anchor.setTo(0, 0);
        game.physics.enable(hookSprite, Phaser.Physics.ARCADE);
        hookSprite.body.collideWorldBounds = true;
        hookSprite.body.checkCollision.up = false;
        hookSprite.body.checkCollision.down = false;
        hookSprite.body.immovable = true;
        hookSprite.body.gravity.y = 600;

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
        game.physics.enable(square, Phaser.Physics.ARCADE);
        square.body.collideWorldBounds = true;
        square.body.checkCollision.up = false;
        square.body.checkCollision.down = false;
        square.body.immovable = true;
        // square.body.gravity.y = 600;



        heroGroup = game.add.group();
        heroGroup.add(hookSprite);
        heroGroup.add(square);
        heroGroup.x = 400;
        heroGroup.y = 300;
        

        //  Init chainLink array
        for (var i = 1; i <= numChainLinks; i++) {
            chainLink[i] = game.add.sprite(4, 4, chainLinkBmd);
            chainLink[i].anchor.setTo(0, 0);
            chainLink[i].alpha = 0;
            
            game.physics.enable(chainLink[i], Phaser.Physics.ARCADE);
            chainLink[i].body.gravity.y = 600;
            heroGroup.add(chainLink[i]);
        }
        
        //  Init chainPath array
        for (var i = 0; i <= numChainLinks; i++) {
            chainPath[i] = new Phaser.Point(0, 0);
        }
    

        (function () { // gamepad indicator
            indicator = game.add.sprite(10,10, 'controller-indicator');
            indicator.scale.x = indicator.scale.y = 2;
            indicator.animations.frame = 1;
        }());       
    },
    update: function() {

        var launchGrappleButton = pad1.getButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);
        launchGrappleButton.onDown.add(launchGrapple, this);
        launchGrappleButton.onUp.add(makeGrappleDisapear, this);

        function launchGrapple() { // Will only be called once per key press. // Will be passed the full Key object. See Phaser.Key for properties.}
            grappleLaunch = true;
        }


        if (grappleLaunch == true  && hookSprite.x <= numChainLinks * 5) {
            launch();
        } else {
            makeGrappleDisapear();
        }
        

        function makeGrappleDisapear() {
            hookSprite.body.velocity.setTo(0, 0);
            hookSprite.x = 12;
            hookSprite.y = 0;
            grappleLaunch = false;

            for (var i = 1; i <= numChainLinks; i++) {
                chainLink[i].x = hookSprite.x;
                chainLink[i].y = hookSprite.y;
                chainLink[i].alpha = 0;
            }
            for (var i = 0; i <= numChainLinks; i++) {
                chainPath[i].x = hookSprite.x;
                chainPath[i].y = hookSprite.y;
            }
        }

        function launch() { // launch 
            hookSprite.body.velocity.setTo(300, -300);

            // insert the new location at the start of the array, 
            // and knock the last position off the end
            var part = chainPath.pop();
            part.setTo(hookSprite.x, hookSprite.y);
            chainPath.unshift(part);

            for (var i = 1; i <= numChainLinks; i++){
                chainLink[i].x = (chainPath[i]).x;
                chainLink[i].y = (chainPath[i]).y;
                chainLink[i].body.velocity.setTo(300, -300);
                chainLink[i].alpha = 1;
            }
        } // end launch
        

        



        




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
    },
    render: function() {

        // game.debug.text(pad1)
        // game.debug.geom(line);
        // game.debug.geom(line, '#ffd900');
        // game.debug.lineInfo(line, 32, 32);

    },
    gofull: function() {

        if (game.scale.isFullScreen)
        {
            game.scale.stopFullScreen();
        }
        else
        {
            game.scale.startFullScreen(false);
        }

    },
    dump: function() {

        console.log(pad1._axes[0]);
        console.log(pad1._rawPad.axes[0]);

    }
}

var game = new Phaser.Game(gameWidth, gameHeight, Phaser.AUTO, 'phaser-example', {}, transparent, antialias);
game.state.add('main', mainState);  
game.state.start('main');


