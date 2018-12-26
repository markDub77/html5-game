var createGround = function(game) {
    var groundBmd = game.add.bitmapData(16,16);
        groundBmd.ctx.beginPath();
        groundBmd.ctx.rect(0,0,16,16);
        groundBmd.ctx.fillStyle = '#DD9B33';
        groundBmd.ctx.fill();
    var groundSprite = game.add.sprite(300, 400, groundBmd);
        game.physics.enable(groundSprite, Phaser.Physics.ARCADE); // needed for collision detection
        groundSprite.body.collideWorldBounds = true;
        groundSprite.body.checkCollision.up = true;
        groundSprite.body.checkCollision.down = false;
        groundSprite.body.immovable = true;
        return groundSprite;
}

module.exports.createGround = createGround;