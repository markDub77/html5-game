var updateChain = function(game, platformSprite, heroSprite, chainLength, chain, chainBitmapData, hookLaunch, hookSprite, hookSprite2, chainSprite, onChainLimmit) {
 
    
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



    







    var distance = Phaser.Math.distance(heroSprite.body.x, heroSprite.body.y, hookSprite.body.x, hookSprite.body.y);

    // console.log('hookSprite.body.y', hookSprite.body.y);
    // console.log('heroSprite.body.y', heroSprite.body.y);

    if (distance >= chainLength){
        hookSprite.body.velocity.x = 0;
        hookSprite.body.velocity.y = 0;
        // hookSprite.body.x = heroSprite.body.x + chainLength;
        // hookSprite.body.velocity.y = hookSprite.body.velocity.y++;
        // console.log('distance', Phaser.Math.distance(heroSprite.body.x, heroSprite.body.y, hookSprite.body.x, hookSprite.body.y))
        // onChainLimmit.dispatch();
        
    }

    if (hookSprite.body.y > heroSprite.body.y + 7 ) {
        // hookSprite.body.velocity.y = 0;
        // hookSprite.body.velocity.x = 0;
        // hookSprite.body.x = heroSprite.body.x;
        // hookSprite.body.y = heroSprite.body.y;
        // hookSprite.alpha = 0 

        // hookSprite2.x = heroSprite.body.x;
        // hookSprite2.y = heroSprite.body.y;

        // onChainLimmit.dispatch();

        // snap back to the hero
        // hookSprite.body.static = true
    
    } else {
        // game.physics.p2.removeConstraint(hookSprite.constraint);
        // hookSprite.constraint = null;
        // console.log('constraint removed1')
    }

    


    if(hookSprite.body.y <= (heroSprite.body.y - chainLength) || hookSprite.body.x >= (heroSprite.body.x + chainLength)) {
        // game.physics.p2.createDistanceConstraint(hookSprite, heroSprite, chainLength, [0,0], [0,0],9);
        // hookSprite.body.velocity.x = 0;
        // hookSprite.body.velocity.y = 0;
    }    
     
        // hookSprite.body.velocity.x = 0;
        // hookSprite.body.velocity.y = 0;
        
        // this is a problem if Hero steps backwards or forwards even
        // var constraint = game.physics.p2.createDistanceConstraint(hookSprite, heroSprite, chainLength, [0,0], [0,0],9);
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


    

    // console.log('hookLaunch', hookLaunch);

    if (hookLaunch != true) { // if normal mode

        game.physics.p2.removeConstraint(hookSprite.constraint);
        hookSprite.constraint = null;
        // console.log('hookSprite.constraint', hookSprite.constraint);

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