/* eslint-disable no-undef */
const enemy = game => {
  const laserFire = require('./laserFire').laserFire
  const enemy = game.player2Sprite
  const hero = game.player1Sprite
  const calculationRate = 3000
  const tweenSpeed = 70
  const runspeed = 30 // 35
  const heroTileX = Math.round(hero.x / game.blockSize)
  const heroTileY = Math.round(hero.y / game.blockSize)
  const enemyTileX = Math.round(enemy.x / game.blockSize)
  const enemyTileY = Math.round(enemy.y / game.blockSize)
  const snap = game.add.tween(enemy)

  let tilesAwayY = enemyTileY - heroTileY
  let tilesAwayX = enemyTileX - heroTileX
  let focusTileY = enemyTileY
  let focusTileX = enemyTileX
  let axis
  let direction

  game.wallBlocksShot = false
  game.laserSight.width = Phaser.Math.distance(enemy.x, enemy.y, hero.x, hero.y)

  // EasyStar is a plugin that handles A* pathfinding
  game.easystar.findPath(heroTileX, heroTileY, enemyTileX, enemyTileY, path => {
    if (path !== null) {
      path.reverse()
      game.path = path
    }
  })

  game.walk = () => {
    if (game.path) {
      console.log('path', game.path)
      if (game.path[0].y > game.path[1].y) {
        enemy.body.velocity.y = -runspeed
        // enemy.facing = 'up'
        // game.gun.x = 15
        // game.gun.y = 8
        // game.gun.angle = -90
      } else if (game.path[0].y < game.path[1].y) {
        enemy.body.velocity.y = runspeed
        // enemy.facing = 'down'
        // game.gun.angle = 90
        // game.gun.x = 1
        // game.gun.y = 9
      } else {
        enemy.body.velocity.y = 0
      }
      if (game.path[0].x > game.path[1].x) {
        enemy.body.velocity.x = -runspeed
        // enemy.facing = 'left'
        // game.gun.angle = 180
        // game.gun.x = 6
        // game.gun.y = 9
      } else if (game.path[0].x < game.path[1].x) {
        enemy.body.velocity.x = runspeed
        // enemy.facing = 'right'
        // game.gun.angle = 0
        // game.gun.x = 8
        // game.gun.y = 6
      } else {
        enemy.body.velocity.x = 0
      }
    }
  }

  game.walk()

  const wallCheck = (tilesAway, focusTile, axis, direction) => {
    for (let i = 0; i < Math.abs(tilesAway); i++) {
      // check the next tile
      if (tilesAway > 0) {
        focusTile--
      } else {
        focusTile++
      }
      if (
        // if any walls don't shoot
        (axis === 'y' && game.levelData[focusTile][enemyTileX] !== 0) ||
        (axis === 'x' && game.levelData[enemyTileY][focusTile] !== 0)
      ) {
        // game.walk()
        return
      }
    }

    // set the length of the laser sight
    enemy.facing = direction
    game.linedUp = true
    // laserFire(game, game.player2Sprite, game.enemyWeapon)
  }

  // when the tiles line up run wallCheck function
  if (enemyTileX === heroTileX) {
    axis = 'y'
    if (enemyTileY >= heroTileY) {
      direction = 'up'
    } else {
      direction = 'down'
    }
    wallCheck(tilesAwayY, focusTileY, axis, direction)
  } else if (enemyTileY === heroTileY) {
    axis = 'x'
    if (enemyTileX >= heroTileX) {
      direction = 'left'
    } else {
      direction = 'right'
    }
    wallCheck(tilesAwayX, focusTileX, axis, direction)
  } else {
    game.linedUp = false
    // game.walk(path)
  }

  game.easystar.setIterationsPerCalculation(calculationRate)
  game.easystar.calculate()
}

module.exports.enemy = enemy
