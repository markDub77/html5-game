var createRope = function(game, groundSprite, heroSprite) {
 
    var ropeBitmapData = game.add.bitmapData(game.world.width, game.world.height);
        ropeBitmapData.ctx.beginPath();
        ropeBitmapData.ctx.lineWidth = "2";
        ropeBitmapData.ctx.strokeStyle = "#dddddd";
        ropeBitmapData.ctx.setLineDash([2,3]);
        ropeBitmapData.ctx.stroke();

    // Create a new sprite using the bitmap data
    game.add.sprite(0, 0, ropeBitmapData);

    // Keep track of where the rope is anchored
    var ropeAnchorX = (groundSprite.world.x + 500);
    var ropeAnchorY = (groundSprite.world.y + groundSprite.height - 8);

    // Create a spring between the player and block to act as the rope
    game.physics.p2.createSpring(
        groundSprite,  // sprite 1
        heroSprite, // sprite 2
        500,       // length of the rope
        100,        // stiffness (lower numbers sag)
        100,         // damping (lower numbers bounce)
        [-ropeAnchorX, -ropeAnchorY] // Where to hook the spring to body A in world coordinates. 
    );

    return {
        ropeBitmapData,
        ropeAnchorX, 
        ropeAnchorY
    }
}

module.exports.createRope = createRope;