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
  // game.laserSight.width = enemy.y - hero.y

  game.physics.arcade.overlap(
    game.laserSight,
    game.walls,
    () => {
      game.wallBlocksShot = true
    },
    null,
    this
  )

  console.log('game.wallBlocksShot', game.wallBlocksShot)

  const wallCheck = (tilesAway, focusTile, axis, direction) => {
    for (let i = 0; i < Math.abs(tilesAway); i++) {
      // check the next tile
      if (tilesAway > 0) {
        focusTile--
        // console.log('facing up or left')
      } else {
        focusTile++
        // console.log('facing down or right')
      }
      if (
        // if any walls don't shoot
        (axis === 'y' && game.levelData[focusTile][enemyTileX] !== 0) ||
        (axis === 'x' && game.levelData[enemyTileY][focusTile] !== 0)
      ) {
        // console.log('wallCheck says wall in the way')
        return
      }
    }

    if (direction === 'up') {
      // enemy.x = hero.x
      enemy.body.velocity.x = -runspeed
    }
    if (direction === 'down') {
      enemy.body.velocity.x = runspeed
    }
    if (direction === 'left') {
      enemy.body.velocity.y = -runspeed
    }
    if (direction === 'right') {
      enemy.body.velocity.y = runspeed
    }

    // set the length of the laser sight
    enemy.facing = direction

    laserFire(game, game.player2Sprite, game.enemyWeapon)
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
  }

  if (enemyTileY === heroTileY) {
    axis = 'x'
    if (enemyTileX >= heroTileX) {
      direction = 'left'
    } else {
      direction = 'right'
    }
    wallCheck(tilesAwayX, focusTileX, axis, direction)
  }

  // EasyStar is a plugin that handles A* pathfinding
  game.easystar.findPath(heroTileX, heroTileY, enemyTileX, enemyTileY, path => {
    if (path !== null) {
      path.reverse()

      const startingPointY =
        path[0].y * game.blockSize + game.blockSize / 2 - enemy.height / 2
      const startingPointX =
        path[0].x * game.blockSize + game.blockSize / 2 - enemy.width / 2

      // Corner Assist is called from a collision of enemy to a wall
      game.cornerAssist = enemy => {
        if (enemy.body.touching !== null) {
          if (enemy.body.touching.right || enemy.body.touching.left) {
            snap
              .to({ y: startingPointY }, tweenSpeed, Phaser.Easing.Linear.None)
              .start()
          }
          if (enemy.body.touching.up || enemy.body.touching.down) {
            snap
              .to({ x: startingPointX }, tweenSpeed, Phaser.Easing.Linear.None)
              .start()
          }
        }
      }

      if (path[0].y > path[1].y) {
        // going up
        enemy.body.velocity.y = -runspeed
        enemy.facing = 'up'
        // enemy.angle = -90
        // console.log('facing up')
        game.gun.x = 15
        game.gun.y = 8
        game.gun.angle = -90
      } else if (path[0].y < path[1].y) {
        // going down
        enemy.body.velocity.y = runspeed
        enemy.facing = 'down'
        game.gun.angle = 90
        game.gun.x = 1
        game.gun.y = 9
        // console.log('facing down')
      } else {
        enemy.body.velocity.y = 0
      }

      if (path[0].x > path[1].x) {
        // go left
        enemy.body.velocity.x = -runspeed
        enemy.facing = 'left'
        game.gun.angle = 180
        game.gun.x = 6
        game.gun.y = 9
        // console.log('facing left')
      } else if (path[0].x < path[1].x) {
        // go right
        enemy.body.velocity.x = runspeed
        enemy.facing = 'right'
        game.gun.angle = 0
        game.gun.x = 8
        game.gun.y = 6
        // console.log('facing right')
      } else {
        enemy.body.velocity.x = 0
      }
    }
  })
  game.easystar.setIterationsPerCalculation(calculationRate)
  game.easystar.calculate()
}

module.exports.enemy = enemy
