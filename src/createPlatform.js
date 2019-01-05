var createPlatform = function(game) {
    var platformBmd = game.add.bitmapData(game.world.width,16);
        platformBmd.ctx.beginPath();
        platformBmd.ctx.rect(0,0,game.world.width,16);
        platformBmd.ctx.fillStyle = '#366dc5';
        platformBmd.ctx.fill();
    var platformSprite = game.add.sprite(0, 200, platformBmd);
        
        // Enable P2 Physics and set the block not to move
        game.physics.p2.enable(platformSprite);
        platformSprite.body.static = true;
        // platformSprite.anchor.setTo(0, 0);

    
        

        return platformSprite;
}

module.exports.createPlatform = createPlatform;