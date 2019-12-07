var collisions = function (game, laserHitWall, laserGet, restart, laserHitPlayer) {
  // player and the walls collide
  game.physics.arcade.collide([game.player1Sprite, game.player2Sprite], game.walls)

  // player and player collide
  game.physics.arcade.collide(game.player1Sprite, game.player2Sprite)

  // player and laser collide
  // if (game.shotGuy.invincible == false) {
  game.physics.arcade.overlap(game.lasers, [game.player1Sprite, game.player2Sprite], laserHitPlayer, null, this)
  // }

  // lasers and walls collide
  game.physics.arcade.collide(game.lasers, game.walls, laserHitWall, null, this)

  // Call the 'laserGet' function when the player takes a laser icon
  game.physics.arcade.overlap(game.player1Sprite, game.laserIconGroup, laserGet, null, this)

  // Call the 'restart' function when the player touches the enemy
  game.physics.arcade.overlap(game.player1Sprite, game.enemies, restart, null, this)

  return {
    game
  }
}

module.exports.collisions = collisions
