const easystarjs = require('easystarjs')

var createLevel = function (game) {
  const groundColor = '#045000'
  let tileType
  const levelData = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]

  var lavaBmd = game.add.bitmapData(game.blockSize, game.blockSize)
  lavaBmd.ctx.beginPath()
  lavaBmd.ctx.rect(0, 0, game.blockSize, game.blockSize)
  lavaBmd.ctx.fillStyle = '#D95F49'
  lavaBmd.ctx.fill()

  // var groundBmd = game.add.bitmapData(game.blockSize, game.blockSize)
  // groundBmd.ctx.beginPath()
  // groundBmd.ctx.rect(0, 0, game.blockSize, game.blockSize)
  // groundBmd.ctx.fillStyle = groundColor
  // groundBmd.ctx.fill()

  // Create 3 groups that will contain our objects
  game.walls = game.add.group()
  game.laserIconGroup = game.add.group()
  game.enemies = game.add.group()

  // eslint-disable-next-line space-before-function-paren
  function placeTile(tileType, i, j) { // https://jsfiddle.net/juwalbose/pu0gt7nc/
    // var tile
    if (tileType === 1) {
      var tile = 'ground2'
      var wall = game.add.sprite(
        game.blockSize * j,
        game.blockSize * i
        // groundBmd
      )
      game.walls.add(wall)
      wall.body.immovable = true
    }
    if (tileType === '!') {
      // tile = 'ground'
      var lava = game.add.sprite(
        game.blockSize * j,
        game.blockSize * i,
        lavaBmd
      )
      game.walls.add(lava)
      lava.body.immovable = true
    }
    game.walls.create(j * game.blockSize, i * game.blockSize, tile)
  }

  // loop through the level data arrays
  for (var i = 0; i < levelData.length; i++) {
    for (var j = 0; j < levelData[0].length; j++) {
      tileType = levelData[i][j]
      placeTile(tileType, i, j)
    }
  }

  // eslint-disable-next-line new-cap
  var easystar = new easystarjs.js()
  easystar.setGrid(levelData)
  easystar.setAcceptableTiles([0])
  easystar.enableDiagonals() // we want path to have diagonals
  easystar.disableCornerCutting() // no diagonal path when walking at wall corners
  game.easystar = easystar
}

module.exports.createLevel = createLevel
