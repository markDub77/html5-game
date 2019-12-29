/* eslint-disable no-undef */
const enemy = game => {
  const enemy = game.player2Sprite
  const hero = game.player1Sprite
  const calculationRate = 3000
  const tweenSpeed = 70
  const runspeed = 20

  const heroTileX = Math.round(hero.x / game.blockSize)
  const heroTileY = Math.round(hero.y / game.blockSize)
  const enemyTileX = Math.round(enemy.x / game.blockSize)
  const enemyTileY = Math.round(enemy.y / game.blockSize)

  var snap = game.add.tween(enemy)

  game.easystar.findPath(heroTileX, heroTileY, enemyTileX, enemyTileY, path => {
    if (path !== null) {
      path.reverse()

      const startingPointY =
        path[0].y * game.blockSize + game.blockSize / 2 - enemy.height / 2
      const startingPointX =
        path[0].x * game.blockSize + game.blockSize / 2 - enemy.width / 2

      game.cornerAssist = () => {
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

      if (path[0].y > path[1].y) {
        // going up
        enemy.body.velocity.y = -runspeed
      } else if (path[0].y < path[1].y) {
        // going down
        enemy.body.velocity.y = runspeed
      } else {
        enemy.body.velocity.y = 0
      }

      if (path[0].x > path[1].x) {
        // go left
        enemy.body.velocity.x = -runspeed
      } else if (path[0].x < path[1].x) {
        // go right
        enemy.body.velocity.x = runspeed
      } else {
        enemy.body.velocity.x = 0
      }
    }
  })

  game.easystar.setIterationsPerCalculation(calculationRate)
  game.easystar.calculate()
  // }
}

module.exports.enemy = enemy
