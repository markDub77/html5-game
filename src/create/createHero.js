var createHero = function (game) {
  // const gravity = 500
  game.blockSize = 16 // TODO we need global constants
  game.playerSize = 15 // TODO we need global constants

  game.linedUp = false

  // TODO we need global constants
  const players = {
    player1Sprite: {
      color: '0xdd9b33',
      startingLocationX: 100,
      startingLocationY: 50,
      walkspeed: 50,
      // jumpStrength: 220,
      facing: 'right',
      weapon: 'laser'
    }
    // player2Sprite: {
    //   color: '0x0055dd',
    //   startingLocationX: 100,
    //   startingLocationY: 106,
    //   walkspeed: 0,
    //   // jumpStrength: 220,
    //   facing: 'left',
    //   weapon: 'laser'
    // }
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
    // playerSprite.body.gravity.y = gravity

    //  This makes the game world bounce-able
    // playerSprite.body.collideWorldBounds = true
    //  This sets the image bounce energy for the horizontal
    //  and vertical vectors. "1" is 100% energy return
    // playerSprite.body.bounce.set(1, 1)

    // save it as a global variable
    game[player] = playerSprite

    // console.log("game.player1Sprite.walkspeed", game.player1Sprite)
    // whaaaat???
    // const player = 'what'
    // window[player] = 'Why does this work?'
    // console.log(what)
  }
}

module.exports.createHero = createHero
