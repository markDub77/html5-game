var updateChain = function(
    game, 
    platformSprite, heroSprite, chainLength, chain, chainBitmapData, chainAnchorX, chainAnchorY, grappleRelease, line1, hookSprite) 
    
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


var hookBmd = game.add.bitmapData(4,4);
        hookBmd.ctx.beginPath();
        hookBmd.ctx.rect(0,0,4,4);
        hookBmd.ctx.fillStyle = '#ff0000';
        hookBmd.ctx.fill();

// var hookSprite = game.add.sprite(heroSprite.x,heroSprite.y, hookBmd);


   
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