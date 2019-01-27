var collisions = function(game, hitWall, getLaser, restart) {
    
  // Make the player and the walls collide
  game.physics.arcade.collide(game.playerSprite, game.walls);
  // game.physics.arcade.collide(game.lasers, game.walls);
  game.physics.arcade.collide(game.lasers, game.walls, hitWall, null, this);
  // Call the 'getLaser' function when the player takes a coin
  game.physics.arcade.overlap(game.playerSprite, game.laserIconSprites, getLaser, null, this);
  // Call the 'restart' function when the player touches the enemy
  game.physics.arcade.overlap(game.playerSprite, game.enemies, restart, null, this);


  if (game.playerSprite.facing == 'right') {
    game.lasers.callAll('anchor.setTo', 'anchor', -5, -1.5);
} else {
    game.lasers.callAll('anchor.setTo', 'anchor', 2, -1.5);
}  


    return {
        game
    }
}

module.exports.collisions = collisions;