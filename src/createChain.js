var createChain = function(game, platformSprite, heroSprite, chainLength) {
 

    var chainLength = 200
    

    var chainBitmapData = game.add.bitmapData(game.world.width, game.world.height);
        chainBitmapData.ctx.beginPath();
        chainBitmapData.ctx.lineWidth = "2";
        chainBitmapData.ctx.strokeStyle = "#999999";
        chainBitmapData.ctx.setLineDash([2,2]);
        chainBitmapData.ctx.stroke();
        chainBitmapData.ctx.closePath();
    var chainSprite = game.add.sprite(0, 0, chainBitmapData);

   

    var hookBmd = game.add.bitmapData(4,4);
        hookBmd.ctx.beginPath();
        hookBmd.ctx.rect(0,0,4,4);
        hookBmd.ctx.fillStyle = '#ff0000';
        hookBmd.ctx.fill();
    var hookSprite = game.add.sprite(heroSprite.body.x,heroSprite.body.y, hookBmd);
    game.physics.p2.enable(hookSprite);
    hookSprite.body.mass = 10
    
     var hookBmd2 = game.add.bitmapData(4,4);
        hookBmd2.ctx.beginPath();
        hookBmd2.ctx.rect(0,0,4,4);
        hookBmd2.ctx.fillStyle = '#cccccc';
        hookBmd2.ctx.fill();

    var hookSprite2 = game.add.sprite(heroSprite.body.x,heroSprite.body.y, hookBmd2);
    hookSprite2.anchor.setTo(0.5, 0.5);

    // Create a spring between the player and block to act as the Chain
    var chain 
    // = game.physics.p2.createSpring(
    //     platformSprite,  // sprite 1
    //     heroSprite, // sprite 2
    //     chainLength,       // length of the Chain
    //     100,        // stiffness (lower numbers sag)
    //     9,         // damping (lower numbers bounce)
    //     [-chainAnchorX, -chainAnchorY] // Where to hook the spring to body A in world coordinates. 
    // );

    // game.world.bringToTop(heroSprite);
    

    var onChainLimmit = new Phaser.Signal();

    //define the signal:
    // game.events.onChainLimmit = new Phaser.Signal();

    //The listener:
    onChainLimmit.add(constrainChain, this);
    
    //Dispatch:
    // onChainLimmit.dispatch();


    function constrainChain() {
        // Will only be called once per key press. // Will be passed the full Key object. See Phaser.Key for properties.
        hookSprite.constraint = game.physics.p2.createDistanceConstraint(hookSprite, heroSprite, chainLength, [0,0], [0,0],9);
        // console.log('hookSprite.constraint', hookSprite.constraint);
        console.log('hookSprite.angle', hookSprite.angle);
        // console.log('hookSprite.rotation', hookSprite.rotation);
    } 


    return {
        chainBitmapData,
        chainLength,
        chain,
        // chainSprite,
        hookSprite,
        hookSprite2,
        onChainLimmit
    }
}

module.exports.createChain = createChain;