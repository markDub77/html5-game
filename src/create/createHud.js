var createHud = game => {
  const healthBarWidth = 4
  const healthBarHeight = 7
  const healthBarGapWidth = 5
  const numberOfBars = 7

  // TODO we need global constants
  const players = {
    player1Sprite: {
      color: '#dd9b33',
      locationX: 4
    },
    player2Sprite: {
      color: '#0055dd',
      locationX: game.world.centerX
    }
  }

  for (const player in players) {
    // make the bitmap data
    const spriteHealthBmd = game.add.bitmapData(healthBarWidth, healthBarHeight)
    spriteHealthBmd.ctx.beginPath()
    spriteHealthBmd.ctx.rect(0, 0, healthBarWidth, healthBarHeight)
    spriteHealthBmd.ctx.fillStyle = players[player].color
    spriteHealthBmd.ctx.fill()

    // make a sprite out of the bitmap data
    const healthContainerSprite = game.add.sprite(players[player].locationX, 4) // parent is invisible

    // assign to player number

    // make the individual bars
    for (let i = 0; i < numberOfBars; i++) {
      healthContainerSprite.addChild(
        game.make.sprite(healthBarGapWidth * i, 0, spriteHealthBmd)
      )
    }
    // save it as a global variable
    game[player].healthContainerSprite = healthContainerSprite
  }

  return {
    game
  }
}

module.exports.createHud = createHud
