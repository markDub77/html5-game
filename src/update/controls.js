/* eslint-disable no-undef */

let heroXProgressArray = []
let heroYProgressArray = []

var controls = function (game) {
  game.player1Sprite.body.velocity.x = 0
  game.player1Sprite.body.velocity.y = 0

  // TODO find a better place for this
  // Doorway Assist - It's very dificult to go through small openings,
  // so we need help lining up hero
  game.doorWayAssist = hero => {
    const tweenSpeed = 50
    const heroTileX = Math.round(hero.x / game.blockSize)
    const heroTileY = Math.round(hero.y / game.blockSize)
    const snap = game.add.tween(hero)

    const startingPointY =
      heroTileY * game.blockSize + game.blockSize / 2 - hero.height / 2
    const startingPointX =
      heroTileX * game.blockSize + game.blockSize / 2 - hero.width / 2

    // if (
    //   (hero.body.touching.left && hero.facing === 'left') ||
    //   (hero.body.touching.right && hero.facing === 'right')
    // ) {
    //   // recored the progress
    //   heroXProgressArray.push(hero.x)
    //   if (heroXProgressArray.length > 2) {
    //     heroXProgressArray.shift()
    //   }
    // }
    // if (
    //   (hero.body.touching.up && hero.facing === 'up') ||
    //   (hero.body.touching.down && hero.facing === 'down')
    // ) {
    //   // recored the progress
    //   heroYProgressArray.push(hero.y)
    //   if (heroYProgressArray.length > 2) {
    //     heroYProgressArray.shift()
    //   }
    // }

    // read the progress
    // console.log(
    //   'hero.body.touching.left',
    //   hero.body.touching.left,
    //   'hero.facing',
    //   hero.facing,
    //   'heroXProgressArray[1]',
    //   heroXProgressArray[1],
    //   'heroXProgressArray[0]',
    //   heroXProgressArray[0]
    // )
    if (
      hero.body.touching.left && // you're touching a wall
      hero.facing === 'left' && // enemy is not pushing you into said wall, you're doing this on your own.
      // heroXProgressArray[1] === heroXProgressArray[0] && // if no progress is being made
      game.levelData[heroTileY][heroTileX - 1] === 0 // there is a path in front of you
    ) {
      snap
        .to({ y: startingPointY }, tweenSpeed, Phaser.Easing.Linear.None)
        .start()
    }

    if (
      hero.body.touching.right &&
      hero.facing === 'right' &&
      // heroXProgressArray[1] === heroXProgressArray[0] &&
      game.levelData[heroTileY][heroTileX + 1] === 0
    ) {
      // if no wall is blocking your path
      snap
        .to({ y: startingPointY }, tweenSpeed, Phaser.Easing.Linear.None)
        .start()
    }

    if (
      hero.body.touching.up &&
      hero.facing === 'up' &&
      game.levelData[heroTileY - 1][heroTileX] === 0
    ) {
      snap
        .to({ x: startingPointX }, tweenSpeed, Phaser.Easing.Linear.None)
        .start()
    }

    if (
      hero.body.touching.down &&
      hero.facing === 'down' &&
      game.levelData[heroTileY + 1][heroTileX] === 0
    ) {
      snap
        .to({ x: startingPointX }, tweenSpeed, Phaser.Easing.Linear.None)
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
    require('./laserFire').laserFire(game)
  }

  /// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // pad2
  // dpad left
  if (
    game.pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) ||
    game.pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1
  ) {
    game.player2Sprite.body.velocity.x = -game.player2Sprite.walkspeed
    game.player2Sprite.facing = 'left'

    // dpad right
  } else if (
    (game.pad2 && game.pad2.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) ||
    (game.pad2 && game.pad2.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)) > 0.1
  ) {
    game.player2Sprite.body.velocity.x = game.player2Sprite.walkspeed
    game.player2Sprite.facing = 'right'
  }

  // jump button
  if (
    game.pad2.justPressed(Phaser.Gamepad.XBOX360_A) &&
    (game.player2Sprite.body.onFloor() || game.player2Sprite.body.touching.down)
  ) {
    game.player2Sprite.body.velocity.y = -game.player2Sprite.jumpStrength
  }

  // shoot button
  if (
    game.pad2.justPressed(Phaser.Gamepad.XBOX360_B) &&
    !game.player2Sprite.holdFire
  ) {
    // game.player2Sprite.holdFire = true

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
