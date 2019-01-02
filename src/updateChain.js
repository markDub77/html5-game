var updateChain = function(game, platformSprite, heroSprite, chainLength, spring, chainBitmapData, chainAnchorX, chainAnchorY, grappleRelease, chainSprite, hookSprite) {
 

    // hookSprite.x = (heroSprite.x + 200);
    // hookSprite.y = (heroSprite.y + -200);


    // chainBitmapData.clear();
    // chainSprite.destroy();

    // // if (grappleRelease === false) {
        // chainBitmapData.ctx.beginPath();
        // chainBitmapData.ctx.moveTo(heroSprite.x,heroSprite.y);
        // chainBitmapData.ctx.lineTo(hookSprite.x,hookSprite.y);
        // chainBitmapData.ctx.stroke();
        // chainBitmapData.ctx.closePath();
        // chainBitmapData.render();

    // var chainSprite = game.add.sprite(0, 0, chainBitmapData);

        // game.add.tween(chainSprite).to({width: 100, rotation: 0.5}, 1000).start();
        // game.add.tween(chainSprite).to( { y: 900 }, 1000, Phaser.Easing.Bounce.Out, true);
        
    // }
    
// game.add.tween(chainSprite).to({ x: 700 }, 1000, Phaser.Easing.Linear.None, true).to({ chainAnchorY: 30000 }, 1000, Phaser.Easing.Linear.None).to({ x: 0 }, 1000, Phaser.Easing.Linear.None).to({ y: 0 }, 1000, Phaser.Easing.Linear.None).loop();


    
    
    //Remove last spring
    // game.physics.p2.removeSpring(spring);


    if (grappleRelease === false) {
    
        // var chainAnchorX = (heroSprite.x + 100);
        // var chainAnchorY = (heroSprite.y + -100);
    
    //    spring = game.physics.p2.createSpring(
    //        platformSprite,                      // sprite 1
    //        heroSprite,                          // sprite 2
    //        chainLength,                         // length of the Chain
    //         50,                                 // stiffness (lower numbers sag)
    //         50,                                 // damping (lower numbers bounce)
    //         [-chainAnchorX, -chainAnchorY]      // Where to hook the spring to body A in world coordinates.
    //     );  
    }
   


    return {
        chainBitmapData,
        chainAnchorX, 
        chainAnchorY,
        chainLength,
        spring,
        chainSprite,
        hookSprite
    }
}

module.exports.updateChain = updateChain;