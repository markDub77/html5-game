var createHud = game => {
  const healthBarWidth = 8
  const healthBarHeight = 32
  const healthBarGapWidth = 12
  const numberOfBars = 12

  const players = {
    player1: {
      color: '#dd9b33',
      locationX: 0
    },
    player2: {
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
    const healthContainerSprite = game.add.sprite(players[player].locationX, 5) // parent is invisible

    // assign to player number

    // make the individual bars
    for (let i = 0; i < numberOfBars; i++) {
      healthContainerSprite.addChild(
        game.make.sprite(healthBarGapWidth * i, 0, spriteHealthBmd)
      )
    }
  }

  return {
    game
  }
}

module.exports.createHud = createHud
