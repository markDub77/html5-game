var createPlayer = function(game) {
    
    var playerBmd = game.add.bitmapData(16,16);
        playerBmd.ctx.beginPath();
        playerBmd.ctx.rect(0,0,16,16);
        playerBmd.ctx.fillStyle = '#ffffff';
        playerBmd.ctx.fill();
    
    game.playerSprite = game.add.sprite(40, 200, playerBmd);
    game.playerSprite.tint = 0xDD9B33;
    game.playerSprite.anchor.setTo(0.5, 0.5);
    game.playerSprite.facing = 'right'
    game.playerSprite.body.gravity.y = 400;


    var player2Bmd = game.add.bitmapData(16,16);
        player2Bmd.ctx.beginPath();
        player2Bmd.ctx.rect(0,0,16,16);
        player2Bmd.ctx.fillStyle = '#ffffff';
        player2Bmd.ctx.fill();
        
    
    // game.cache.addSpriteSheet('blink', '', player2Bmd.canvas, 16, 16, 2, 0, 0);
    // game.blinkSprite = game.add.sprite(16, 16, 'blink', 2);
    // game.anim = game.blinkSprite.animations.add('blink2');
    // game.anim.play(2, true);
    
    game.player2Sprite = game.add.sprite(70, 200, player2Bmd);
    game.player2Sprite.tint = 0x0055dd;
    
    console.log('game.player2Sprite.tint', game.player2Sprite.tint)
    game.player2Sprite.facing = 'left'
    game.player2Sprite.body.gravity.y = 400;
    game.player2Sprite.anchor.setTo(0.5, 0.5);

    return game;
}

module.exports.createPlayer = createPlayer;