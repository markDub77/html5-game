var createGround = function(game) {
    var groundBmd = game.add.bitmapData(game.world.width,16);
        groundBmd.ctx.beginPath();
        groundBmd.ctx.rect(0,0,game.world.width,16);
        groundBmd.ctx.fillStyle = '#366dc5';
        groundBmd.ctx.fill();
    var groundSprite = game.add.sprite(0, 200, groundBmd);
        
        // Enable P2 Physics and set the block not to move
        game.physics.p2.enable(groundSprite);
        groundSprite.body.static = true;
        // groundSprite.anchor.setTo(0, 0);
        
        return groundSprite;
}

module.exports.createGround = createGround;