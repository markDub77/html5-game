var collisions = function(game, hitWall, getLaser, restart, hitPlayer) {
    
    
    // player and the walls collide
    game.physics.arcade.collide([game.playerSprite, game.player2Sprite], game.walls);

    // player and player collide
    game.physics.arcade.collide(game.playerSprite, game.player2Sprite);


    // 

    // game.physics.arcade.overlap(game.lasers,[game.playerSprite, game.player2Sprite], hitPlayer, null, this);



    game.physics.arcade.collide(game.lasers, game.walls, hitWall, null, this);
    



    // Call the 'getLaser' function when the player takes a coin
    game.physics.arcade.overlap(game.playerSprite, game.laserIconSprites, getLaser, null, this);
    // Call the 'restart' function when the player touches the enemy
    game.physics.arcade.overlap(game.playerSprite, game.enemies, restart, null, this);

    return {
        game
    }
}

module.exports.collisions = collisions;