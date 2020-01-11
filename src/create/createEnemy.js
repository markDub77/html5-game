var createEnemy = function (game) {
  // TODO we need global constants
  const players = {
    player2Sprite: {
      color: '0x0055dd',
      startingLocationX: 100,
      startingLocationY: 106,
      walkspeed: 0,
      facing: 'left',
      weapon: 'laser'
    }
  }

  for (const player in players) {
    const playerBmd = game.add.bitmapData(game.playerSize, game.playerSize)
    playerBmd.ctx.beginPath()
    playerBmd.ctx.rect(1, 1, game.playerSize, game.blockSize)
    playerBmd.ctx.fillStyle = '#ffffff' // needs to be white to lay to tint over, a blank canvas
    playerBmd.ctx.fill()

    const playerSprite = game.add.sprite(
      players[player].startingLocationX,
      players[player].startingLocationY,
      playerBmd
    )
    // playerSprite.immovable = true
    playerSprite.tint = players[player].color // now we add the color over the white canvas
    playerSprite.originalTint = players[player].color // now we add the color over the white canvas
    playerSprite.anchor.setTo(0, 0)
    playerSprite.facing = players[player].facing
    playerSprite.weapon = players[player].weapon
    playerSprite.walkspeed = players[player].walkspeed
    playerSprite.jumpStrength = players[player].jumpStrength

    // save it as a global variable
    game[player] = playerSprite
  }

  // enemy laser pointer.
  // so enemy will not shoot into wall
  // game.enemyGroup = game.add.group()
  const enemyLaserSightBmd = game.add.bitmapData(10, 3) // (width, height)
  enemyLaserSightBmd.ctx.beginPath()
  enemyLaserSightBmd.ctx.rect(0, 0, 10, 3) // (x, y, width, height)
  // enemyLaserSightBmd.ctx.fillStyle = '#ff0000'
  // enemyLaserSightBmd.ctx.fill()

  const enemyGunBmd = game.add.bitmapData(10, 3) // (width, height)
  enemyGunBmd.ctx.beginPath()
  enemyGunBmd.ctx.rect(0, 0, 10, 3) // (x, y, width, height)
  enemyGunBmd.ctx.fillStyle = '#b3b3b3'
  enemyGunBmd.ctx.fill()

  game.gun = game.player2Sprite.addChild(
    game.make.sprite(9, 6, enemyGunBmd) // (x, y, bmd)
  )

  game.laserSight = game.gun.addChild(
    game.make.sprite(0, 0, enemyLaserSightBmd) // (x, y, bmd)
  )

  game.physics.arcade.enable(game.laserSight)
}

module.exports.createEnemy = createEnemy
