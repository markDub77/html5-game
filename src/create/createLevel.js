var createLevel = function (game) {
  // Create 3 groups that will contain our objects
  game.walls = game.add.group()
  game.laserIconGroup = game.add.group()
  game.enemies = game.add.group()

  // Design the level. x = wall, o = laserIconSprite, ! = lava.
  // var level = [
  //   '                                                                ',
  //   '                                                                ',
  //   'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  //   'xxxx                             x',
  //   'xxx                           xxxx',
  //   'xx                               x',
  //   'x                                x',
  //   'x                                x',
  //   'x                       xxxxxxxx x',
  //   'x                        xxxxxxxxxxxxx                         x',
  //   'x                         xxxxxxxxxxx                          x',
  //   'x                           xxxxxxx                          xxx',
  //   'x       l                      x                               x',
  //   'xxxxxxxxx                      x                               x',
  //   'x        x                     x                               x',
  //   'x         xxxxx                x                               x',
  //   'x                              x  xxxxxxxxxxxx                 x',
  //   'x                              x    x        x                 x',
  //   'x              xxxxxxx         xxxx xxxxxxxx xxxxx             x',
  //   'x           xxxx                x   x        x                 x',
  //   'x                               x xxxxxxxxxxxx xxxxxxxxxxxxxxx x',
  //   'x                               x            x                 x',
  //   'x                               x xxxxxxx    x                 x',
  //   'x       xxxxxxxx                x            x                 x',
  //   'x       xxxxxxxx                x            x                 x',
  //   'xxx!!!!!!!!!!!!!!!!!!!!!!!!!xxxxxx!!!!!!!!!!!!!!!!!!!xxxxxxxxxxx'
  // ]

  var level = [
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',
    '                                                                ',

    'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'
  ]

  // const blockSize = 30

  var lavaBmd = game.add.bitmapData(game.blockSize, game.blockSize)
  lavaBmd.ctx.beginPath()
  lavaBmd.ctx.rect(0, 0, game.blockSize, game.blockSize)
  lavaBmd.ctx.fillStyle = '#D95F49'
  lavaBmd.ctx.fill()

  var groundBmd = game.add.bitmapData(game.blockSize, game.blockSize)
  groundBmd.ctx.beginPath()
  groundBmd.ctx.rect(0, 0, game.blockSize, game.blockSize)
  groundBmd.ctx.fillStyle = '#0000ff'
  groundBmd.ctx.fill()

  // Create the level by going through the array
  for (var i = 0; i < level.length; i++) {
    for (var j = 0; j < level[i].length; j++) {
      // Create a wall and add it to the 'walls' group
      if (level[i][j] === 'x') {
        var wall = game.add.sprite(
          game.blockSize * j,
          game.blockSize * i,
          groundBmd
        )
        game.walls.add(wall)
        wall.body.immovable = true
      } else if (level[i][j] === 'l') {
        // Create a laserIconSprite and add it to the 'laserIconGroup' group
        game.laserIconSprite = game.add.sprite(
          game.blockSize * j,
          game.blockSize * i,
          'laserHudIcon'
        )
        game.laserIconSprite.tint = 0xff0000
        game.laserIconGroup.add(game.laserIconSprite)
      } else if (level[i][j] === '!') {
        // Create a enemy and add it to the 'enemies' group
        var enemy = game.add.sprite(
          game.blockSize * j,
          game.blockSize * i,
          lavaBmd
        )
        game.enemies.add(enemy)
      }
    }
  }
  return game
}

module.exports.createLevel = createLevel
