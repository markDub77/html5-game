var game = new Phaser.Game(1800, 900, Phaser.CANVAS, 'phaser-example', { create: create, update: update });

function create() {

    require('./enablePhysics').enablePhysics(game);

    this.heroSprite = require('./createHero').createHero(game);
    this.platformSprite = require('./createPlatform').createPlatform(game);
    
    this.createChainSprite = require('./createChain').createChain(game, this.platformSprite, this.heroSprite);
        this.chainBitmapData = this.createChainSprite.chainBitmapData;
        this.chainAnchorX = this.createChainSprite.chainAnchorX;
        this.chainAnchorY = this.createChainSprite.chainAnchorY;
        this.chainLength = this.createChainSprite.chainLength;
        this.chain = this.createChainSprite.chain;
        this.hookSprite = this.createChainSprite.hookSprite;
        this.hookSprite2 = this.createChainSprite.hookSprite2;
    

    this.createControls = require('./createControls').createControls(game);
        this.run = this.createControls.run;
        this.jump = this.createControls.jump;
        this.pad1 = this.createControls.pad1;

}



function update() {
    
    this.controls =  require('./controls').controls(
        this.run, 
        this.jump, 
        this.heroSprite, 
        this.pad1, 
        this.chainBitmapData, 
        this.chainLength,
        this.chainAnchorX,
        this.chainAnchorY,
        this.hookSprite,
        this.hookSprite2
    );
        this.chainLength = this.controls.chainLength;
        this.grappleRelease = this.controls.grappleRelease;
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
        this.chainAnchorX, 
        this.chainAnchorY, 
        this.grappleRelease,
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
