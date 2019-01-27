var createPlayer = function(game) {
    
    var playerBmd = game.add.bitmapData(16,16);
        playerBmd.ctx.beginPath();
        playerBmd.ctx.rect(0,0,16,16);
        playerBmd.ctx.fillStyle = '#DD9B33';
        playerBmd.ctx.fill();
    
    game.playerSprite = game.add.sprite(40, 200, playerBmd);
    game.playerSprite.anchor.setTo(0.5, 0.5);
    game.playerSprite.facing = 'right'
    game.playerSprite.body.gravity.y = 300;

    return game;
}

module.exports.createPlayer = createPlayer;