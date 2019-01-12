var updateChain = function(game, platformSprite, heroSprite, chainLength, chain, chainBitmapData, hookLaunch, hookSprite, hookSprite2, chainSprite) {
 
    // make the hook follow the null hook
    hookSprite2.x = hookSprite.x;
    hookSprite2.y = hookSprite.y

    // always be clearing bitmap data
    chainBitmapData.clear();
    // draw bitmap data for the chain
    chainBitmapData.ctx.beginPath();
    chainBitmapData.ctx.moveTo(heroSprite.x,heroSprite.y);
    chainBitmapData.ctx.lineTo(hookSprite.x,hookSprite.y);
    chainBitmapData.ctx.stroke();
    chainBitmapData.ctx.closePath();
    chainBitmapData.render();


    // give the chin a limit
    if (hookSprite.body.x >= (heroSprite.body.x + chainLength)) { // this doesn't work so great if you want to angle the hook more up
        hookSprite.body.velocity.x = 0; // this is a problem if Hero steps backwards or forwards even
    }


    if (hookLaunch != true) {

        // snap back to the hero
        hookSprite.body.static = true
        // hookSprite.body.mass = 1000
        hookSprite.body.x = heroSprite.x;
        hookSprite.body.y = heroSprite.y;
        
        // hookBmd.ctx.fillStyle = '#ff0000';
    
        // hookSprite2.

        // console.log('hookSprite',hookSprite);

    } else {
        hookSprite.body.static = false
        // hookSprite.body.mass = 1100
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