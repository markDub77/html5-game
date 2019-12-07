var laserFire = function (game, player) {
  var laser = game.lasers.getFirstExists(false)
  if (laser) {
    // If we have a laser, set it to the starting position
    laser.reset(player.body.x, player.body.y)

    // if (player.facing == 'right') {
    //     game.lasers.callAll('anchor.setTo', 'anchor', -5, -1.5);
    // } else {
    //     game.lasers.callAll('anchor.setTo', 'anchor', 2, -1.5);
    // }

    if (player.facing === 'right') {
      laser.body.velocity.x = 150
      laser.anchor.x = 100
    } else {
      laser.body.velocity.x = -150
    }
  }

  return {
    game
  }
}

module.exports.laserFire = laserFire
