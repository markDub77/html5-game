/* eslint-disable no-undef */
const easystarjs = require('easystarjs')
// eslint-disable-next-line new-cap
var easystar = new easystarjs.js()

var game = new Phaser.Game(600, 400, Phaser.AUTO, 'TutContainer', {
  create: create,
  update: update
})

// x & y values of the direction vector for character movement
var dX = 0
var dY = 0
var tileSize = 32 // the width of a tile
var enemySprite // hero marker sprite in the map
var enemyCurrentTile = new Phaser.Point(1, 1) // hero tile values in array
var destinationMapTile = enemyCurrentTile
var enemyPoint // 2D coordinates of hero map marker sprite in map, assume this is mid point of graphic
var enemySpeed = 0.9 // well, speed of our hero
var path = []
var wallColor = '#045000'
var floorColor = '#ffe18a'

function create () {
  game.physics.startSystem(Phaser.Physics.ARCADE)

  // Add the physics engine to all game objects
  game.world.enableBody = true

  // level array
  game.levelData = [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1, 1, 0, 1],
    [1, 0, 1, 0, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
    [1, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
  ]
  game.walls = game.add.group()
  let tileType = 0

  function placeTile (tileType, i, j) {
    var wallBmd = game.add.bitmapData(tileSize, tileSize)
    wallBmd.ctx.beginPath()
    wallBmd.ctx.rect(0, 0, tileSize, tileSize)
    wallBmd.ctx.fillStyle = wallColor
    wallBmd.ctx.fill()

    var floorBmd = game.add.bitmapData(tileSize, tileSize)
    floorBmd.ctx.beginPath()
    floorBmd.ctx.rect(0, 0, tileSize, tileSize)
    floorBmd.ctx.fillStyle = floorColor
    floorBmd.ctx.fill()

    // place tiles of different types down map
    // var tile = floorBmd
    if (tileType === 1) {
      // map.create(j * tileSize, i * tileSize, tile)
      var wall = game.add.sprite(tileSize * j, tileSize * i, wallBmd)
      game.walls.add(wall)
      wall.body.immovable = true
    }
  }

  // create map
  for (var i = 0; i < game.levelData.length; i++) {
    for (var j = 0; j < game.levelData[0].length; j++) {
      tileType = game.levelData[i][j]
      placeTile(tileType, i, j)
    }
  }

  enemySprite = game.add.sprite(
    enemyCurrentTile.y * tileSize,
    enemyCurrentTile.x * tileSize,
    'enemyTile'
  )

  enemyPoint = new Phaser.Point(
    enemySprite.x + enemySprite.width / 2,
    enemySprite.y + enemySprite.height / 2
  )

  enemyCurrentTile = getTileCoordinates(enemyPoint, tileSize)

  easystar.setGrid(game.levelData)
  easystar.setAcceptableTiles([0])
  easystar.enableDiagonals() // we want path to have diagonals
  easystar.disableCornerCutting() // no diagonal path when walking at wall corners

  game.input.activePointer.leftButton.onUp.add(findPathOnTap)
}

function update () {
  game.physics.arcade.collide(enemySprite, game.walls)

  if (path.length === 0) {
    return
  }

  const snapPointMode = true
  const freeStyleMode = false

  if (snapPointMode) {
    if (
      enemyCurrentTile.x === destinationMapTile.x &&
      enemyCurrentTile.y === destinationMapTile.y
    ) {
      // snap to center of tile
      // enemy has reached a point on a destinationMapTile in his path
      // we really only want this type of thing when he gets stuck on a corner
      // definately not wanted when running
      enemySprite.x =
        enemyCurrentTile.x * tileSize + tileSize / 2 - enemySprite.width / 2
      enemySprite.y =
        enemyCurrentTile.y * tileSize + tileSize / 2 - enemySprite.height / 2
      enemyPoint.x = enemySprite.x + enemySprite.width / 2
      enemyPoint.y = enemySprite.y + enemySprite.height / 2

      destinationMapTile = path.pop() // whats next tile in path

      if (enemyCurrentTile.x < destinationMapTile.x) {
        // go right
        console.log('going right')
        dX = 1
        // enemySprite.body.velocity.x = 90
      } else if (enemyCurrentTile.x > destinationMapTile.x) {
        // go left
        console.log('going left')
        dX = -1
        // enemySprite.body.velocity.x = -90
      } else {
        // stop
        // console.log('stopping x')
        dX = 0
        // enemySprite.body.velocity.x = 0
      }
      if (enemyCurrentTile.y < destinationMapTile.y) {
        // go down
        console.log('going down')
        dY = 1
        // enemySprite.body.velocity.y = 90
      } else if (enemyCurrentTile.y > destinationMapTile.y) {
        // go up
        console.log('going up')
        dY = -1
        // enemySprite.body.velocity.y = -90
      } else {
        // console.log('stopping y')
        dY = 0
      }
    }
    enemyPoint.x += 0.9 * dX
    enemyPoint.y += 0.9 * dY

    enemySprite.x = enemyPoint.x - enemySprite.width / 2
    enemySprite.y = enemyPoint.y - enemySprite.height / 2

    // get the new map tile
    enemyCurrentTile = getTileCoordinates(enemyPoint, tileSize)
  }
}

// this will go away
// just needed for clicking
function findPathOnTap () {
  var pointerPosition = game.input.activePointer.position
  var pointerPositionPoint = new Phaser.Point(
    pointerPosition.x,
    pointerPosition.y
  )
  const endTile = getTileCoordinates(pointerPositionPoint, tileSize)

  if (endTile.x > -1 && endTile.y > -1) {
    // tapped within grid
    if (game.levelData[endTile.y][endTile.x] !== 1) {
      // not wall tile
      // let the algorithm do the magic

      easystar.findPath(
        enemyCurrentTile.x,
        enemyCurrentTile.y,
        endTile.x,
        endTile.y,
        newPath => {
          // this is all very confusing, I'll have to come back to this later
          path = newPath
          path.push(endTile)
          path.reverse()
          path.pop()
        }
      )
      easystar.calculate()
    }
  }
}

// interesting helper function
function getTileCoordinates (pos, tileSize) {
  var tempPt = new Phaser.Point()
  tempPt.x = Math.floor(pos.x / tileSize)
  tempPt.y = Math.floor(pos.y / tileSize)
  return tempPt
}
