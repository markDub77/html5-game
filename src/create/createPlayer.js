var createPlayer = function (game) {
  // const gravity = 500
  game.blockSize = 32 // TODO we need global constants
  const playerSize = 32 // TODO we need global constants

  // TODO we need global constants
  const players = {
    player1Sprite: {
      color: '0xdd9b33',
      startingLocationX: 100,
      startingLocationY: 200,
      walkspeed: 100,
      jumpStrength: 220,
      facing: 'right',
      weapon: 'laser'
    },
    player2Sprite: {
      color: '0x0055dd',
      startingLocationX: 300,
      startingLocationY: 200,
      walkspeed: 20,
      jumpStrength: 220,
      facing: 'left',
      weapon: 'laser'
    }
  }

  for (const player in players) {
    const playerBmd = game.add.bitmapData(playerSize, playerSize)
    playerBmd.ctx.beginPath()
    playerBmd.ctx.rect(1, 1, playerSize, game.blockSize)
    playerBmd.ctx.fillStyle = '#ffffff' // needs to be white to lay to tint over, a blank canvas
    playerBmd.ctx.fill()

    const playerSprite = game.add.sprite(
      players[player].startingLocationX,
      players[player].startingLocationY,
      playerBmd
    )
    playerSprite.tint = players[player].color // now we add the color over the white canvas
    playerSprite.originalTint = players[player].color // now we add the color over the white canvas
    // playerSprite.anchor.setTo(0.5, 0.5)
    playerSprite.facing = players[player].facing
    playerSprite.weapon = players[player].weapon
    playerSprite.walkspeed = players[player].walkspeed
    playerSprite.jumpStrength = players[player].jumpStrength
    // playerSprite.body.gravity.y = gravity

    // save it as a global variable
    game[player] = playerSprite

    // console.log("game.player1Sprite.walkspeed", game.player1Sprite)
    // whaaaat???
    // const player = 'what'
    // window[player] = 'Why does this work?'
    // console.log(what)
  }
}

module.exports.createPlayer = createPlayer
