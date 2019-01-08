var updateChain = function(game, platformSprite, heroSprite, chainLength, chain, chainBitmapData, hookLaunch, hookSprite, hookSprite2, chainSprite) {
 
    // always be clearing bitmap data
    chainBitmapData.clear();

    // make the hook follow the null hook
    hookSprite2.x = hookSprite.x;
    hookSprite2.y = hookSprite.y

    // draw bitmap data for the chain
    chainBitmapData.ctx.beginPath();
    chainBitmapData.ctx.moveTo(heroSprite.x,heroSprite.y);
    chainBitmapData.ctx.lineTo(hookSprite.x,hookSprite.y);
    chainBitmapData.ctx.stroke();
    chainBitmapData.ctx.closePath();
    chainBitmapData.render();

    if (hookLaunch === true) {

        // give the chin a limit
        if (hookSprite.body.x >= (heroSprite.body.x + chainLength)) {
            hookSprite.body.velocity.x = 0;
        }


        // hookLaunch = false;




    } else {
        // hookSprite.body.velocity.y = 0;
        // hookSprite.body.velocity.x = 0;
        hookSprite.body.x = heroSprite.body.x;
        hookSprite.body.y = heroSprite.body.y-16
    }

    console.log('hookLaunch', hookLaunch)

    // //Remove last spring
    // game.physics.p2.removeSpring(chain);
    // chain = game.physics.p2.createSpring(
    //     hookSprite,                          // sprite 1
    //     heroSprite,                          // sprite 2
    //     chainLength,                         // length of the Chain
    //     0,                                  // stiffness (lower numbers sag)
    //     7,                                  // damping (lower numbers bounce)
    //     [-hookSprite.x, -hookSprite.y]); // Where to hook the spring to body A in world coordinates. 
    
   
    return {
        chainBitmapData,
        chainLength,
        chain,
        hookSprite,
        hookSprite2
    }
}

module.exports.updateChain = updateChain;