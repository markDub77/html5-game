/* eslint-disable no-undef */

// laserFire: function (player) {
//   require('./update/laserFire').laserFire(game, player)
// },

var controls = function (game) {
  const walkspeed = 90
  const jumpStrength = 300

  const laserFire = function (player) {
    require('../update/laserFire').laserFire(game, player)
  }

  game.player1Sprite.body.velocity.x = 0
  game.player2Sprite.body.velocity.x = 0

  // pad1
  // dpad left
  if (
    game.run.left.isDown ||
    game.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) ||
    game.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1
  ) {
    game.player1Sprite.body.velocity.x = -walkspeed
    game.player1Sprite.facing = 'left'

    // dpad right
  } else if (
    game.run.right.isDown ||
    (game.pad1 && game.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) ||
    (game.pad1 && game.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)) > 0.1
  ) {
    game.player1Sprite.body.velocity.x = walkspeed
    game.player1Sprite.facing = 'right'
  }

  // jump button
  if (
    (game.jump.isDown || game.pad1.justPressed(Phaser.Gamepad.XBOX360_A)) &&
    (game.player1Sprite.body.onFloor() || game.player1Sprite.body.touching.down)
  ) {
    game.player1Sprite.body.velocity.y = -jumpStrength
  }

  // shoot button
  if (
    game.shoot.justDown ||
    (game.pad1.justPressed(Phaser.Gamepad.XBOX360_B) &&
      !game.player1Sprite.holdFire &&
      game.player1Sprite.weapon)
  ) {
    game.player1Sprite.holdFire = true
    laserFire(game.player1Sprite)

    if (game.player1Sprite.facing === 'right') {
      game.lasers.callAll('anchor.setTo', 'anchor', -5, -1.5)
    } else {
      game.lasers.callAll('anchor.setTo', 'anchor', 2, -1.5)
    }
  }

  if (game.pad1.justReleased(Phaser.Gamepad.XBOX360_B)) {
    game.player1Sprite.holdFire = false
  }

  /// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // pad2
  // dpad left
  if (
    game.pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) ||
    game.pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1
  ) {
    game.player2Sprite.body.velocity.x = -walkspeed
    game.player2Sprite.facing = 'left'

    // dpad right
  } else if (
    (game.pad2 && game.pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) ||
    (game.pad2 && game.pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)) > 0.1
  ) {
    game.player2Sprite.body.velocity.x = walkspeed
    game.player2Sprite.facing = 'right'
  }

  // jump button
  if (
    game.pad2.justPressed(Phaser.Gamepad.XBOX360_A) &&
    (game.player2Sprite.body.onFloor() || game.player2Sprite.body.touching.down)
  ) {
    game.player2Sprite.body.velocity.y = -jumpStrength
  }

  // shoot button
  if (
    game.pad2.justPressed(Phaser.Gamepad.XBOX360_B) &&
    !game.player2Sprite.holdFire
  ) {
    game.player2Sprite.holdFire = true
    laserFire(game.player2Sprite)

    // not sure if this should really go here
    if (game.player2Sprite.facing === 'right') {
      game.lasers.callAll('anchor.setTo', 'anchor', -5, -1.5)
    } else {
      game.lasers.callAll('anchor.setTo', 'anchor', 2, -1.5)
    }
  }

  if (game.pad2.justReleased(Phaser.Gamepad.XBOX360_B)) {
    game.player2Sprite.holdFire = false
  }

  return {
    game
  }
}

module.exports.controls = controls
