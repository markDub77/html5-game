// var game = new Phaser.Game(600 , 200 , Phaser.AUTO, 'phaser-example', { create: create, update: update, render: render });
var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio - 40, window.innerHeight * window.devicePixelRatio - 40, Phaser.AUTO, 'phaser-example', { create: create, update: update, render: render });


function create() {

    //  Advanced profiling, including the fps rate, fps min/max, suggestedFps and msMin/msMax are updated
    game.time.advancedTiming = true;

    // Stretch to fill
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT;
    
    // Keep original size
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

    // Maintain aspect ratio
    // game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

    game.input.onDown.add(gofull, this);

    require('./enablePhysics').enablePhysics(game);

   
    this.heroSprite = require('./createHero').createHero(game);
    this.platformSprite = require('./createPlatform').createPlatform(game);
    
    this.createChainSprite = require('./createChain').createChain(game, this.platformSprite, this.heroSprite);
        this.chainBitmapData = this.createChainSprite.chainBitmapData;
        this.chainLength = this.createChainSprite.chainLength;
        this.chain = this.createChainSprite.chain;
        this.hookSprite = this.createChainSprite.hookSprite;
        this.hookSprite2 = this.createChainSprite.hookSprite2;
    
    // game.world.bringToTop(this.heroSprite);
    // this.heroSprite.addChild(this.hookSprite2);
    // this.heroSprite.addChild(this.hookSprite2);
    // this.hookSprite.anchor.setTo(.5, .5); 
    // this.hookSprite.addChild(this.heroSprite);
    

    




    this.createControls = require('./createControls').createControls(game);
        this.run = this.createControls.run;
        this.jump = this.createControls.jump;
        this.pad1 = this.createControls.pad1;





    //  Create our collision groups. One for the heroSprite, one for the hookSprites
    var heroSpriteCollisionGroup = game.physics.p2.createCollisionGroup();
    var hookSpriteCollisionGroup = game.physics.p2.createCollisionGroup();
    var platformSpriteCollisionGroup = game.physics.p2.createCollisionGroup();
    
    //  Set the heroSprites collision group
    this.heroSprite.body.setCollisionGroup(heroSpriteCollisionGroup);
    this.hookSprite.body.setCollisionGroup(hookSpriteCollisionGroup);
    this.platformSprite.body.setCollisionGroup(platformSpriteCollisionGroup);
    
    //  The heroSprite will collide with the hookSprites, and when it strikes one the hithookSprite callback will fire, causing it to alpha out a bit
    //  When hookSprites collide with each other, nothing happens to them.
    this.heroSprite.body.collides([platformSpriteCollisionGroup]);
    this.hookSprite.body.collides([platformSpriteCollisionGroup]);
    this.platformSprite.body.collides([hookSpriteCollisionGroup, heroSpriteCollisionGroup]);
}



function update() {
    
    this.controls =  require('./controls').controls(
        this.run, 
        this.jump, 
        this.heroSprite, 
        this.pad1, 
        this.chainBitmapData, 
        this.chainLength,
        this.hookSprite,
        this.hookSprite2
    );
        this.chainLength = this.controls.chainLength;
        this.hookLaunch = this.controls.hookLaunch;
        this.hookSprite = this.controls.hookSprite;
        // this.chainAnchorX = this.controls.chainAnchorX;
        // this.chainAnchorY = this.controls.chainAnchorY;

    this.updateChain =  require('./updateChain').updateChain(
        game, 
        this.platformSprite, 
        this.heroSprite, 
        this.chainLength, 
        this.chain, 
        this.chainBitmapData, 
        this.hookLaunch,
        this.hookSprite,
        this.hookSprite2,
        this.chainSprite
    ); 
        this.chainBitmapData = this.updateChain.chainBitmapData;
        this.chainLength = this.updateChain.chainLength;
        this.chain = this.updateChain.chain;
        this.chainAnchorX = this.updateChain.chainAnchorX;
        this.chainAnchorY = this.updateChain.chainAnchorY;
        this.hookSprite = this.updateChain.hookSprite;
        this.hookSprite2 = this.updateChain.hookSprite2;
}

function render() {

    //  FPS debug info
    game.debug.text('FPS: ' + game.time.fps || 'FPS: --', 0, 10, "#00ff00");

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