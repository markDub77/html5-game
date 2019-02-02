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
    // game.playerSprite.body.immovable = true;
    // game.playerSprite.enableBody = true;
    // game.physics.enable(playerSprite, Phaser.Physics.ARCADE);


    var player2Bmd = game.add.bitmapData(16,16);
        player2Bmd.ctx.beginPath();
        player2Bmd.ctx.rect(0,0,16,16);
        player2Bmd.ctx.fillStyle = '#0055dd';
        player2Bmd.ctx.fill();
    
    game.player2Sprite = game.add.sprite(70, 200, player2Bmd);
    game.player2Sprite.anchor.setTo(0.5, 0.5);
    game.player2Sprite.facing = 'left'
    game.player2Sprite.body.gravity.y = 300;
    // game.player2Sprite.body.immovable = true;
    // game.player2Sprite.enableBody = true;
    // game.physics.enable(playerSprite2, Phaser.Physics.ARCADE);

    return game;
}

module.exports.createPlayer = createPlayer;