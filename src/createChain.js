var createChain = function(game, platformSprite, heroSprite, chainLength) {
 

 var chainLength = 300

    var chainBitmapData = game.add.bitmapData(game.world.width, game.world.height);
        chainBitmapData.ctx.beginPath();
        chainBitmapData.ctx.lineWidth = "2";
        chainBitmapData.ctx.strokeStyle = "#dddddd";
        chainBitmapData.ctx.setLineDash([2,2]);
        chainBitmapData.ctx.stroke();
        chainBitmapData.ctx.closePath();

    // Create a new sprite using the bitmap data
    game.add.sprite(0, 0, chainBitmapData);

    // Keep track of where the Chain is anchored
    var chainAnchorX = (heroSprite.x + 100);
    var chainAnchorY = (heroSprite.y + -100);

    // Create a spring between the player and block to act as the Chain
    var chain = game.physics.p2.createSpring(
        platformSprite,  // sprite 1
        heroSprite, // sprite 2
        chainLength,       // length of the Chain
        100,        // stiffness (lower numbers sag)
        9,         // damping (lower numbers bounce)
        [-chainAnchorX, -chainAnchorY] // Where to hook the spring to body A in world coordinates. 
    );

    game.world.bringToTop(heroSprite);
    
    return {
        chainBitmapData,
        chainAnchorX, 
        chainAnchorY,
        chainLength,
        chain
    }
}

module.exports.createChain = createChain;