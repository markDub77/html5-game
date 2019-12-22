/* eslint-disable no-undef */
/* activity uses path finding to lead the character to mouse click position
using https://github.com/prettymuchbryce/easystarjs for pathfinding
*/
const easystarjs = require('easystarjs')
var easystar = new easystarjs.js()

var game = new Phaser.Game(600, 400, Phaser.AUTO, 'TutContainer', {
  preload: preload,
  create: create,
  update: update
})

// level array
var levelData = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0, 1],
  [1, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
  [1, 0, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]

// x & y values of the direction vector for character movement
var dX = 0
var dY = 0
var tileWidth = 32 // the width of a tile
var normText // text to display hero coordinates
var minimap // minimap holder group
var heroMapSprite // hero marker sprite in the minimap
var gameScene // this is the render texture onto which we draw depth sorted scene
var heroMapTile = new Phaser.Point(1, 1) // hero tile values in array
var heroMapPos // 2D coordinates of hero map marker sprite in minimap, assume this is mid point of graphic
var heroSpeed = 1.2 // well, speed of our hero
var tapPos = new Phaser.Point(0.5, 0.5)
var isFindingPath = false
var path = []
var destination = heroMapTile
var isWalking

function preload () {
  game.load.crossOrigin = 'Anonymous'
  game.load.bitmapFont(
    'font',
    'https://dl.dropboxusercontent.com/s/z4riz6hymsiimam/font.png?dl=0',
    'https://dl.dropboxusercontent.com/s/7caqsovjw5xelp0/font.xml?dl=0'
  )
  game.load.image(
    'greenTile',
    'https://dl.dropboxusercontent.com/s/nxs4ptbuhrgzptx/green_tile.png?dl=0'
  )
  game.load.image(
    'redTile',
    'https://dl.dropboxusercontent.com/s/zhk68fq5z0c70db/red_tile.png?dl=0'
  )

  game.load.atlasJSONArray(
    'hero',
    'https://dl.dropboxusercontent.com/s/hradzhl7mok1q25/hero_8_4_41_62.png?dl=0',
    'https://dl.dropboxusercontent.com/s/95vb0e8zscc4k54/hero_8_4_41_62.json?dl=0'
  )
}

function create () {
  normText = game.add.text(10, 360, 'hi')
  game.stage.backgroundColor = '#cccccc'
  // we draw the depth sorted scene into this render texture
  gameScene = game.add.renderTexture(game.width, game.height)
  game.add.sprite(0, 0, gameScene)

  isWalking = false
  createLevel()

  easystar.setGrid(levelData)
  easystar.setAcceptableTiles([0])
  easystar.enableDiagonals() // we want path to have diagonals
  easystar.disableCornerCutting() // no diagonal path when walking at wall corners

  game.input.activePointer.leftButton.onUp.add(findPath)
}

function update () {
  // follow the path
  aiWalk()

  heroMapPos.x += heroSpeed * dX
  heroMapPos.y += heroSpeed * dY
  heroMapSprite.x = heroMapPos.x - heroMapSprite.width / 2
  heroMapSprite.y = heroMapPos.y - heroMapSprite.height / 2
  // get the new hero map tile
  heroMapTile = getTileCoordinates(heroMapPos, tileWidth)
  // depthsort & draw new scene
  renderScene()
}

function createLevel () {
  // create minimap
  minimap = game.add.group()
  var tileType = 0
  for (var i = 0; i < levelData.length; i++) {
    for (var j = 0; j < levelData[0].length; j++) {
      tileType = levelData[i][j]
      placeTile(tileType, i, j)
      if (tileType === 2) {
        // save hero map tile
        heroMapTile = new Phaser.Point(i, j)
      }
    }
  }

  heroMapSprite = minimap.create(
    heroMapTile.y * tileWidth,
    heroMapTile.x * tileWidth,
    'heroTile'
  )

  heroMapPos = new Phaser.Point(
    heroMapSprite.x + heroMapSprite.width / 2,
    heroMapSprite.y + heroMapSprite.height / 2
  )
  heroMapTile = getTileCoordinates(heroMapPos, tileWidth)
  // minimap.scale = new Phaser.Point(1, 1)
  minimap.x = 0
  minimap.y = 0
  renderScene() // draw once the initial state
}

function placeTile (tileType, i, j) {
  // as far as I can tell, this is just for the mini map
  // place minimap
  var tile = 'greenTile'
  if (tileType === 1) {
    tile = 'redTile'
  }
  var tmpSpr = minimap.create(j * tileWidth, i * tileWidth, tile)
  tmpSpr.name = 'tile' + i + '_' + j // ????
}

function renderScene () {
  gameScene.clear() // clear the previous frame then draw again
  normText.text = 'Tap on x,y: ' + tapPos.x + ',' + tapPos.y
}

function findPath () {
  if (isFindingPath || isWalking) return
  var pos = game.input.activePointer.position
  var isoPt = new Phaser.Point(pos.x, pos.y)
  tapPos = isometricToCartesian(isoPt)
  tapPos = getTileCoordinates(tapPos, tileWidth)
  if (tapPos.x > -1 && tapPos.y > -1) {
    // tapped within grid
    if (levelData[tapPos.y][tapPos.x] !== 1) {
      // not wall tile
      isFindingPath = true
      // let the algorithm do the magic
      easystar.findPath(
        heroMapTile.x,
        heroMapTile.y,
        tapPos.x,
        tapPos.y,
        plotAndMove
      )
      easystar.calculate()
    }
  }
}
function plotAndMove (newPath) {
  destination = heroMapTile
  path = newPath
  isFindingPath = false
  repaintMinimap()
  if (path === null) {
    console.log('No Path was found.')
  } else {
    path.push(tapPos)
    path.reverse()
    path.pop()
    for (var i = 0; i < path.length; i++) {
      var tmpSpr = minimap.getByName('tile' + path[i].y + '_' + path[i].x)
      tmpSpr.tint = 0x0000ff
    }
  }
}
function repaintMinimap () {
  for (var i = 0; i < levelData.length; i++) {
    for (var j = 0; j < levelData[0].length; j++) {
      var tmpSpr = minimap.getByName('tile' + i + '_' + j)
      tmpSpr.tint = 0xffffff
    }
  }
}
function aiWalk () {
  if (path.length === 0) {
    // path has ended
    if (heroMapTile.x === destination.x && heroMapTile.y === destination.y) {
      dX = 0
      dY = 0
      // console.log("ret "+destination.x+" ; "+destination.y+"-"+heroMapTile.x+" ; "+heroMapTile.y);
      isWalking = false
      return
    }
  }

  isWalking = true
  if (heroMapTile.x === destination.x && heroMapTile.y === destination.y) {
    // centralise the hero on the tile
    heroMapSprite.x =
      heroMapTile.x * tileWidth + tileWidth / 2 - heroMapSprite.width / 2
    heroMapSprite.y =
      heroMapTile.y * tileWidth + tileWidth / 2 - heroMapSprite.height / 2
    heroMapPos.x = heroMapSprite.x + heroMapSprite.width / 2
    heroMapPos.y = heroMapSprite.y + heroMapSprite.height / 2
    destination = path.pop() // whats next tile in path
    if (heroMapTile.x < destination.x) {
      dX = 1
    } else if (heroMapTile.x > destination.x) {
      dX = -1
    } else {
      dX = 0
    }
    if (heroMapTile.y < destination.y) {
      dY = 1
    } else if (heroMapTile.y > destination.y) {
      dY = -1
    } else {
      dY = 0
    }
    if (heroMapTile.x === destination.x) {
      // top or bottom
      dX = 0
    } else if (heroMapTile.y === destination.y) {
      // left or right
      dY = 0
    }
  }
}

function isometricToCartesian (isoPt) {
  var tempPt = new Phaser.Point()
  tempPt.x = isoPt.x
  tempPt.y = isoPt.y
  return tempPt
}
function getTileCoordinates (cartPt, tileHeight) {
  var tempPt = new Phaser.Point()
  tempPt.x = Math.floor(cartPt.x / tileHeight)
  tempPt.y = Math.floor(cartPt.y / tileHeight)
  return tempPt
}
