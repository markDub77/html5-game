var updateChain = function(game, platformSprite, heroSprite, chainLength, chain, chainBitmapData, hookLaunch, hookSprite, hookSprite2, chainSprite) {
 
    
    // make the hook follow the null hook, there will be a delay
    // hookSprite2.x = hookSprite.body.x;
    // hookSprite2.y = hookSprite.body.y

    // always be clearing bitmap data
    chainBitmapData.clear();
    // draw bitmap data for the chain, there will be a delay
    chainBitmapData.ctx.beginPath();
    chainBitmapData.ctx.moveTo(heroSprite.x,heroSprite.y);
    chainBitmapData.ctx.lineTo(hookSprite.x,hookSprite.y);
    chainBitmapData.ctx.stroke();
    chainBitmapData.ctx.closePath();
    chainBitmapData.render();


    // give the chin a limit
    if (hookSprite.body.x >= (heroSprite.body.x + chainLength)) { // this doesn't work so great if you want to angle the hook more up
        hookSprite.body.velocity.x = 0; // this is a problem if Hero steps backwards or forwards even
        var constraint = game.physics.p2.createDistanceConstraint(hookSprite, heroSprite, chainLength, [0,0], [0,0],99);
        // var constraint = game.physics.p2.createLockConstraint(hookSprite, heroSprite, [0, chainLength], 0);



        // Create a spring between the player and block to act as the Chain
    // var chain 
    // = game.physics.p2.createSpring(
    //     platformSprite,  // sprite 1
    //     heroSprite, // sprite 2
    //     chainLength,       // length of the Chain
    //     100,        // stiffness (lower numbers sag)
    //     9,         // damping (lower numbers bounce)
    //     [-chainAnchorX, -chainAnchorY] // Where to hook the spring to body A in world coordinates. 


    }

    // console.log('hookLaunch', hookLaunch);

    if (hookLaunch != true) { // if normal mode

        
        // hookSprite.body.mass = 1000
        hookSprite.body.velocity.y = 0;
        hookSprite.body.velocity.x = 0;
        hookSprite.body.x = heroSprite.body.x;
        hookSprite.body.y = heroSprite.body.y;
        hookSprite.alpha = 0 

        hookSprite2.x = heroSprite.body.x;
        hookSprite2.y = heroSprite.body.y;

        // snap back to the hero
        hookSprite.body.static = true
        
        // hookBmd.ctx.fillStyle = '#ff0000';
    
        // hookSprite2.

        // console.log('hookSprite',hookSprite);

    } else {
        hookSprite.body.static = false
        // hookSprite.body.mass = 1100
    }
   

   if (hookLaunch == true) { // if normal mode
        hookSprite2.x = hookSprite.body.x;
        hookSprite2.y = hookSprite.body.y;
    }
   






























    return {
        chainBitmapData,
        chainLength,
        chain,
        hookSprite,
        hookSprite2
    }
}

module.exports.updateChain = updateChain;