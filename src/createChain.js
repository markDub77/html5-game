var createChain = function(game, platformSprite, heroSprite, chainLength) {
 

    var chainLength = 300
    var chainAnchorX = (heroSprite.x + 100);
    var chainAnchorY = (heroSprite.y + -100);

    var chainBitmapData = game.add.bitmapData(game.world.width, game.world.height);
        chainBitmapData.ctx.beginPath();
        chainBitmapData.ctx.lineWidth = "2";
        chainBitmapData.ctx.strokeStyle = "#dddddd";
        chainBitmapData.ctx.setLineDash([2,2]);
        chainBitmapData.ctx.moveTo(heroSprite.x,heroSprite.y);
        chainBitmapData.ctx.lineTo(chainAnchorX,chainAnchorY);
        chainBitmapData.ctx.stroke();
        chainBitmapData.ctx.closePath();

    // Create a new sprite using the bitmap data
    var chainSprite = game.add.sprite(0, 0, chainBitmapData);


    var hookBmd = game.add.bitmapData(4,4);
        hookBmd.ctx.beginPath();
        hookBmd.ctx.rect(0,0,4,4);
        hookBmd.ctx.fillStyle = '#ff0000';
        hookBmd.ctx.fill();
    var hookSprite = game.add.sprite(heroSprite.x,heroSprite.y, hookBmd);

    var line1 = new Phaser.Line(heroSprite.x, heroSprite.y, hookSprite.x, hookSprite.y);


    // game.add.tween(hookSprite).to( { x: 900, y: 200}, 2000, Phaser.Easing.Bounce.Out, true);






    console.log('line1', line1)


    

 
    game.world.bringToTop(heroSprite);
    
    return {
        chainBitmapData,
        chainAnchorX, 
        chainAnchorY,
        chainLength,
        line1,
        hookSprite
    }
}

module.exports.createChain = createChain;