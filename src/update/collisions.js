const collisions = game => {
  const shotKickback = 200
  let shotDirection

  // Function to restart the game
  const restart = () => {
    game.state.start('main')
  }

  const laserHitPlayer = (shotGuy, laser) => {
    laser.kill()

    // enemy still has health
    if (shotGuy.healthContainerSprite.children.length > 1) {
      shotGuy.healthContainerSprite.children.pop()

      if (shotGuy.body.touching.right) {
        shotDirection = 'right'
      } else if (shotGuy.body.touching.left) {
        shotDirection = 'left'
      } else if (shotGuy.body.touching.up) {
        shotDirection = 'up'
      } else {
        shotDirection = 'down'
      }

      // Blink code
      game.counter = 0 // we need a way to switch back and forth really fast, so we will use even and odd numbers
      const shotBlink = function () {
        game.counter++

        if (shotDirection === 'left') {
          shotGuy.body.velocity.x = shotKickback
        } else if (shotDirection === 'up') {
          shotGuy.body.velocity.y = shotKickback
        } else if (shotDirection === 'right') {
          shotGuy.body.velocity.x = -shotKickback
        } else {
          shotGuy.body.velocity.y = -shotKickback
        }

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
          shotGuy.tint = shotGuy.originalTint // this is dumb, but if a second shot hits while a player is blinking, they may return as white or red
        }
      }
      const blinkEvent = game.time.events.loop(1, shotBlink, this)
    } else {
      restart()
    }
  }

  // Enemy has a really hard time getting around corners,
  // so Corner Assist will be triggered when Enemy touches a wall
  game.physics.arcade.collide(
    [game.player2Sprite],
    game.walls,
    game.cornerAssist
  )

  // player and the walls collide
  game.physics.arcade.collide(
    [game.player1Sprite],
    game.walls,
    game.doorWayAssist
  )

  // player and player collide
  game.physics.arcade.collide(game.player1Sprite, game.player2Sprite)

  // player and laser collide
  // if (game.shotGuy.invincible == false) {
  game.physics.arcade.overlap(
    [game.enemyWeapon.bullets, game.heroWeapon.bullets],
    [game.player1Sprite, game.player2Sprite],
    laserHitPlayer,
    null,
    this
  )
  // }

  // lasers and walls collide
  game.physics.arcade.collide(
    [game.heroWeapon.bullets, game.enemyWeapon.bullets],
    game.walls,
    laser => {
      laser.kill()
    },
    null,
    this
  )

  // Call the 'laserGet' function when the player takes a laser icon
  game.physics.arcade.overlap(
    game.player1Sprite,
    game.laserIconGroup,
    (player, laserIcon) => {
      require('../update/laserGet').laserGet(player, laserIcon, game)
    },
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
