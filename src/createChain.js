var createChain = function(game, platformSprite, heroSprite, chainLength) {
 

    var chainLength = 300
    var chainAnchorX = (heroSprite.x + 100);
    var chainAnchorY = (heroSprite.y + -100);

    var chainBitmapData = game.add.bitmapData(game.world.width, game.world.height);
        chainBitmapData.ctx.beginPath();
        chainBitmapData.ctx.lineWidth = "2";
        chainBitmapData.ctx.strokeStyle = "#dddddd";
        chainBitmapData.ctx.setLineDash([2,2]);
        chainBitmapData.ctx.stroke();
        chainBitmapData.ctx.closePath();
    var chainSprite = game.add.sprite(0, 0, chainBitmapData);

   

    var hookBmd = game.add.bitmapData(4,4);
        hookBmd.ctx.beginPath();
        hookBmd.ctx.rect(0,0,4,4);
        hookBmd.ctx.fillStyle = '#ff0000';
        hookBmd.ctx.fill();
    var hookSprite = game.add.sprite(heroSprite.x,heroSprite.y, hookBmd);
    game.physics.p2.enable(hookSprite);
    
     var hookBmd2 = game.add.bitmapData(4,4);
        hookBmd2.ctx.beginPath();
        hookBmd2.ctx.rect(0,0,4,4);
        hookBmd2.ctx.fillStyle = '#00ff00';
        hookBmd2.ctx.fill();
    var hookSprite2 = game.add.sprite(hookSprite.x,hookSprite.y, hookBmd2);

console.log('hookSprite2.x', hookSprite2.x);

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
        chain,
        // chainSprite,
        hookSprite,
        hookSprite2
    }
}

module.exports.createChain = createChain;