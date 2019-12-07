var createPlayer = function(game) {
    
    const blockSize = 30;

    // player 1
    var player1Bmd = game.add.bitmapData(blockSize, blockSize * 2)
        player1Bmd.ctx.beginPath()
        player1Bmd.ctx.rect(0, 0, blockSize, blockSize * 2)
        player1Bmd.ctx.fillStyle = '#ffffff'
        player1Bmd.ctx.fill();
    
    game.player1Sprite = game.add.sprite(40, 200, player1Bmd);
    game.player1Sprite.tint = 0xDD9B33;
    game.player1Sprite.originalTint = 0xDD9B33
    game.player1Sprite.anchor.setTo(0.5, 0.5);
    game.player1Sprite.facing = 'right';
    game.player1Sprite.weapon = 'laser';
    game.player1Sprite.body.gravity.y = 400;


    // player 2
    var player2Bmd = game.add.bitmapData(blockSize, blockSize * 2)
        player2Bmd.ctx.beginPath();
        player2Bmd.ctx.rect(0,0, blockSize, blockSize * 2)
        player2Bmd.ctx.fillStyle = '#ffffff';
        player2Bmd.ctx.fill();
        
    game.player2Sprite = game.add.sprite(70, 200, player2Bmd);
    game.player2Sprite.tint = 0x0055dd;
    game.player2Sprite.originalTint = 0x0055dd;
    game.player2Sprite.facing = 'left';
    game.player2Sprite.body.gravity.y = 400;
    game.player2Sprite.anchor.setTo(0.5, 0.5);

    return game;
}

module.exports.createPlayer = createPlayer;