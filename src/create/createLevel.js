var createLevel = function (game) {
  // Create 3 groups that will contain our objects
  game.walls = game.add.group()
  game.laserIconGroup = game.add.group()
  game.enemies = game.add.group()



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


//level array
const levelData =
[
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

var easystarjs = require('easystarjs');
var easystar = new easystarjs.js();
easystar.setGrid(levelData);
easystar.setAcceptableTiles([0]);
easystar.enableDiagonals(); // we want path to have diagonals
easystar.disableCornerCutting(); // no diagonal path when walking at wall corners

function placeTile(tileType, i, j){ //place minimap
  var tile = '';
  if(tileType == 1){
      tile = 'ground';
  }
  minimap.create(j * game.blockSize, i * game.blockSize, tile);
}

var minimap = game.add.group();
var tileType = 0;

for (var i = 0; i < levelData.length; i++) {
  for (var j = 0; j < levelData[0].length; j++) {
      tileType = levelData[i][j];
      placeTile(tileType,i,j);
  }
}


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
