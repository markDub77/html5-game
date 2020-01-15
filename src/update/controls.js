/* eslint-disable no-undef */

var controls = function (game) {
  game.player1Sprite.body.velocity.x = 0
  game.player1Sprite.body.velocity.y = 0

  game.world.wrap(game.player1Sprite, 0, true, true, true)

  // TODO find a better place for this
  // Doorway Assist - It's very dificult to go through small openings,
  // so we need help lining up hero
  game.doorWayAssist = hero => {
    const tweenSpeed = 50
    const heroTileX = Math.round(hero.x / game.blockSize)
    const heroTileY = Math.round(hero.y / game.blockSize)
    const snap = game.add.tween(hero)

    const heroStandingTileY =
      heroTileY * game.blockSize + game.blockSize / 2 - hero.height / 2
    const heroStandingTileX =
      heroTileX * game.blockSize + game.blockSize / 2 - hero.width / 2

    if (
      hero.body.touching.left && // you're touching a wall
      hero.facing === 'left' && // enemy is not pushing you into said wall, you're doing this on your own.
      game.levelData[heroTileY][heroTileX - 1] === 0 // there is a path in front of you
    ) {
      snap
        .to({ y: heroStandingTileY }, tweenSpeed, Phaser.Easing.Linear.None)
        .start()
    }

    if (
      hero.body.touching.right &&
      hero.facing === 'right' &&
      game.levelData[heroTileY][heroTileX + 1] === 0
    ) {
      snap
        .to({ y: heroStandingTileY }, tweenSpeed, Phaser.Easing.Linear.None)
        .start()
    }

    if (
      hero.body.touching.up &&
      hero.facing === 'up' &&
      game.levelData[heroTileY - 1][heroTileX] === 0
    ) {
      snap
        .to({ x: heroStandingTileX }, tweenSpeed, Phaser.Easing.Linear.None)
        .start()
    }

    if (
      hero.body.touching.down &&
      hero.facing === 'down' &&
      game.levelData[heroTileY + 1][heroTileX] === 0
    ) {
      snap
        .to({ x: heroStandingTileX }, tweenSpeed, Phaser.Easing.Linear.None)
        .start()
    }
  }

  // pad1
  // dpad left
  if (
    game.run.left.isDown ||
    game.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) ||
    game.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1
  ) {
    game.player1Sprite.body.velocity.x = -game.player1Sprite.walkspeed
    game.player1Sprite.facing = 'left'

    // dpad right
  } else if (
    game.run.right.isDown ||
    (game.pad1 && game.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) ||
    (game.pad1 && game.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)) > 0.1
  ) {
    game.player1Sprite.body.velocity.x = game.player1Sprite.walkspeed
    game.player1Sprite.facing = 'right'
  } else if (
    game.run.up.isDown ||
    (game.pad1 && game.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP)) ||
    (game.pad1 && game.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)) > 0.1
  ) {
    game.player1Sprite.body.velocity.y = -game.player1Sprite.walkspeed
    game.player1Sprite.facing = 'up'
  } else if (
    game.run.down.isDown ||
    (game.pad1 && game.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN)) ||
    (game.pad1 && game.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)) > 0.1
  ) {
    game.player1Sprite.body.velocity.y = game.player1Sprite.walkspeed
    game.player1Sprite.facing = 'down'
  } else {
    game.player1Sprite.walking = false
  }

  // jump button
  if (
    (game.jump.isDown || game.pad1.justPressed(Phaser.Gamepad.XBOX360_A)) &&
    (game.player1Sprite.body.onFloor() || game.player1Sprite.body.touching.down)
  ) {
    game.player1Sprite.body.velocity.y = -game.player1Sprite.jumpStrength
  }

  // shoot button
  if (
    game.shoot.justDown ||
    (game.pad1.justPressed(Phaser.Gamepad.XBOX360_B) &&
      !game.player1Sprite.holdFire &&
      game.player1Sprite.weapon)
  ) {
    require('./laserFire').laserFire(game, game.player1Sprite, game.heroWeapon)
  }
  return {
    game
  }
}

module.exports.controls = controls
