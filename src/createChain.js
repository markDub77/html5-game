var createChain = function(game, platformSprite, heroSprite, chainLength) {
 

    var chainLength = 500

    var hookBmd = game.add.bitmapData(4,4);
        hookBmd.ctx.beginPath();
        hookBmd.ctx.rect(0,0,4,4);
        hookBmd.ctx.fillStyle = '#ff0000';
        hookBmd.ctx.fill();
    var hookSprite = game.add.sprite(heroSprite.x,heroSprite.y, hookBmd);

    console.log('hookSprite', hookSprite)

    game.add.tween(hookSprite).to( { y: (heroSprite.y + -200), x: (heroSprite.x + 200)}, 2000, Phaser.Easing.Bounce.Out, true);
    
    

    var chainBitmapData = game.add.bitmapData(game.world.width, game.world.height);
        chainBitmapData.ctx.beginPath();
        chainBitmapData.ctx.lineWidth = "2";
        chainBitmapData.ctx.strokeStyle = "#dddddd";
        chainBitmapData.ctx.moveTo(heroSprite.x,heroSprite.y);
        chainBitmapData.ctx.lineTo(hookSprite.x,hookSprite.y);
        chainBitmapData.ctx.setLineDash([2,2]);
        chainBitmapData.ctx.stroke();
        chainBitmapData.ctx.closePath();
        chainBitmapData.render();
    var chainSprite = game.add.sprite(0,0, chainBitmapData);

    // game.add.tween(chainSprite).to( { width: 300 }, 2000, Phaser.Easing.Bounce.Out, true);
    
    
    // game.world.bringToTop(heroSprite);
    

   

    return {
        chainBitmapData,
        chainLength,
        chainSprite, 
        hookSprite
    }
}

module.exports.createChain = createChain;