const collisions = game => {
  const laserGet = (player, laserIcon) => {
    require('../update/laserGet').laserGet(player, laserIcon, game)
  }

  // Function to restart the game
  const restart = () => {
    game.state.start('main')
  }

  const laserHitPlayer = (shotGuy, laser) => {
    laser.kill()

    shotGuy.healthContainerSprite.children.pop()

    // Blink code
    game.counter = 0 // we need a way to switch back and forth really fast, so we will use even and odd numbers

    const updateCounter = function () {
      game.counter++

      // blink for 10 frames
      if (game.counter <= 10) {
        // alternate colors every frame
        if (game.counter % 2) {
          shotGuy.tint = 0xff0000
        } else {
          shotGuy.tint = 0xffffff
        }
      } else {
        // give the guy back his normal tint and stop the counter
        game.time.events.remove(blinkEvent)
        shotGuy.tint = shotGuy.originalTint
        game.ran = false
        shotGuy.invincible = false
      }
    }
    const blinkEvent = game.time.events.loop(100, updateCounter, this)
  }

  const laserHitWall = laser => {
    laser.kill()
  }

  // player and the walls collide
  game.physics.arcade.collide(
    [game.player1Sprite, game.player2Sprite],
    game.walls
  )

  // player and player collide
  game.physics.arcade.collide(game.player1Sprite, game.player2Sprite)

  // player and laser collide
  // if (game.shotGuy.invincible == false) {
  game.physics.arcade.overlap(
    game.lasers,
    [game.player1Sprite, game.player2Sprite],
    laserHitPlayer,
    null,
    this
  )
  // }

  // lasers and walls collide
  game.physics.arcade.collide(game.lasers, game.walls, laserHitWall, null, this)

  // Call the 'laserGet' function when the player takes a laser icon
  game.physics.arcade.overlap(
    game.player1Sprite,
    game.laserIconGroup,
    laserGet,
    null,
    this
  )

  // Call the 'restart' function when the player touches the enemy
  game.physics.arcade.overlap(
    game.player1Sprite,
    game.enemies,
    restart,
    null,
    this
  )
}

module.exports.collisions = collisions
