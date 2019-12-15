var createPlayer = function (game) {
  const gravity = 500
  game.blockSize = 30

  const players = {
    player1Sprite: {
      color: '0xdd9b33',
      locationX: 300
    },
    player2Sprite: {
      color: '0x0055dd',
      locationX: 700
    }
  }

  for (const player in players) {
    const playerBmd = game.add.bitmapData(game.blockSize, game.blockSize * 2)
    playerBmd.ctx.beginPath()
    playerBmd.ctx.rect(0, 0, game.blockSize, game.blockSize * 2)
    playerBmd.ctx.fillStyle = '#ffffff' // needs to be white to lay to tint over, a blank canvas
    playerBmd.ctx.fill()

    const playerSprite = game.add.sprite(
      players[player].locationX,
      350,
      playerBmd
    )
    playerSprite.tint = players[player].color // now we add the color over the white canvas
    playerSprite.originalTint = players[player].color // now we add the color over the white canvas
    playerSprite.anchor.setTo(0.5, 0)
    playerSprite.facing = 'right'
    playerSprite.weapon = 'laser'
    playerSprite.body.gravity.y = gravity

    // save it as a global variable
    game[player] = playerSprite

    // whaaaat???
    // const player = 'what'
    // window[player] = 'Why does this work?'
    // console.log(what)
  }
  return game
}

module.exports.createPlayer = createPlayer
