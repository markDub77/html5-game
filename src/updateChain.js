var updateChain = function(game, platformSprite, heroSprite, chainLength, chain, chainBitmapData, chainAnchorX, chainAnchorY, grappleRelease, hookSprite, hookSprite2, chainSprite) {
 

        hookSprite2.x = hookSprite.x;
        hookSprite2.y = hookSprite.y

        console.log('hookSprite2.x', hookSprite2.x);

    // chainSprite.destroy();



    // if (grappleRelease === false) {
        chainBitmapData.clear();
        chainBitmapData.ctx.beginPath();
        chainBitmapData.ctx.moveTo(heroSprite.x,heroSprite.y);
        chainBitmapData.ctx.lineTo(hookSprite.x,hookSprite.y);
        chainBitmapData.ctx.stroke();
        chainBitmapData.ctx.closePath();
        chainBitmapData.render();
    // }
    
    
    //Remove last spring
    game.physics.p2.removeSpring(chain);


    if (hookSprite.body.x >= (heroSprite.body.x + 300)) {
        hookSprite.body.velocity.x = 0;
    }


    // if (grappleRelease === false) {
    
    //     // var chainAnchorX = (heroSprite.x + 100);
    //     // var chainAnchorY = (heroSprite.y + -100);
    
    // chain = game.physics.p2.createSpring(
    //     hookSprite,                          // sprite 1
    //     heroSprite,                          // sprite 2
    //     chainLength,                         // length of the Chain
    //     50,                                  // stiffness (lower numbers sag)
    //     50,                                  // damping (lower numbers bounce)
    //     [-hookSprite.x, -hookSprite.y]); // Where to hook the spring to body A in world coordinates. 
    // }
   
    return {
        chainBitmapData,
        chainAnchorX, 
        chainAnchorY,
        chainLength,
        chain,
        hookSprite,
        hookSprite2
    }
}

module.exports.updateChain = updateChain;