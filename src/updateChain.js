var updateChain = function(
    game, 
    platformSprite, heroSprite, chainLength, chain, chainBitmapData, chainAnchorX, chainAnchorY, grappleRelease, line1, hookSprite, grappleGraphics, chainSprite) 
    
    {
 

    // chainBitmapData.clear();

    if (grappleRelease === false) {
        // chainBitmapData.ctx.beginPath();
        // chainBitmapData.ctx.moveTo(heroSprite.x,heroSprite.y);
        // chainBitmapData.ctx.lineTo(chainAnchorX,chainAnchorY);
        // chainBitmapData.ctx.stroke();
        // chainBitmapData.ctx.closePath();
        // chainBitmapData.render();
    }
    
    
    //Remove last spring
    game.physics.p2.removeSpring(chain);

    // line1.fromSprite(heroSprite, hookSprite, false);

    if (grappleRelease === false) {
    
        // var chainAnchorX = (heroSprite.x + 100);
        // var chainAnchorY = (heroSprite.y + -100);
    
    var chain = game.physics.p2.createSpring(
        platformSprite,                       // sprite 1
        heroSprite,                           // sprite 2
        chainLength,                          // length of the Chain
            50,                                       // stiffness (lower numbers sag)
            50,                                         // damping (lower numbers bounce)
            [-chainAnchorX, -chainAnchorY]); // Where to hook the spring to body A in world coordinates. 
    }


   

    grappleGraphics.clear();
    grappleGraphics = game.add.graphics(0,0);
    
    grappleGraphics.beginFill(0);
    // grappleGraphics.lineStyle(10, 0xc0c0c0, 1);
    grappleGraphics.drawCircle(100, 100, 100);
    grappleGraphics.moveTo(heroSprite.x,heroSprite.y);
    grappleGraphics.lineTo(hookSprite.x,hookSprite.y);
    grappleGraphics.endFill();

//    chainSprite.mask = grappleGraphics;

    return {
        chainBitmapData,
        chainAnchorX, 
        chainAnchorY,
        chainLength,
        chain,
        hookSprite
    }
}

module.exports.updateChain = updateChain;