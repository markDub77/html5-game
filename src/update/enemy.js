/* eslint-disable no-undef */
const enemy = game => {
  const enemy = game.player2Sprite
  const hero = game.player1Sprite
  const calculationRate = 5000

  const heroTileX = Math.round(hero.x / game.blockSize)
  const heroTileY = Math.round(hero.y / game.blockSize)
  const enemyTileX = Math.round(enemy.x / game.blockSize)
  const enemyTileY = Math.round(enemy.y / game.blockSize)

  console.log('heroTileX', heroTileX, 'heroTileY', heroTileY, 'enemyTileX', enemyTileX, 'enemyTileY', enemyTileY)
  var bounce = game.add.tween(enemy)

  // console.log('enemyTileY', enemyTileY)

  game.stuckOnCorner = () => {
    // const weeeY = enemyTileY * game.blockSize + game.blockSize / 2 - enemy.height / 2
    // const weeeX = enemyTileX * game.blockSize + game.blockSize / 2 - enemy.width / 2
    // // enemy.y = enemyTileY * game.blockSize + game.blockSize / 2 - enemy.height / 2

    // // var lala = () => {
    // //   console.log('lala')
    // //   enemy.y = enemyTileY * game.blockSize + game.blockSize / 2 - enemy.height / 2
    // // }

    // bounce.to({ y: weeeY }, 90, Phaser.Easing.Linear.None)
    // // bounce.onComplete.add(lala)
    // bounce.start()
  }
  // console.log('cornerMode', game.cornerMode)
  game.easystar.findPath(heroTileX, heroTileY, enemyTileX, enemyTileY, path => {
    path.reverse() // easystar gives us an array that starts with the hero, we want to know the first step for the enemy

    const weeeY = path[1].y * game.blockSize + game.blockSize / 2 - enemy.height / 2
    const weeeX = path[1].x * game.blockSize + game.blockSize / 2 - enemy.width / 2

    // if (game.cornerMode === false) {
    if (path[0].y > path[1].y) { // going up
      // console.log('walking right')
      // enemy.body.velocity.y = -enemy.walkspeed
      bounce.to({ y: weeeY }, 500, Phaser.Easing.Linear.None).start()
    }

    if (path[0].y < path[1].y) { // going down
      // console.log('walking down')
      // enemy.body.velocity.y = enemy.walkspeed



      bounce.to({ y: weeeY }, 500, Phaser.Easing.Linear.None).start()
    } else {
      // enemy.body.velocity.y = 0
    }

    if (path[0].x > path[1].x) { // go left
      // console.log('walking left')
      // enemy.body.velocity.x = -enemy.walkspeed
      // enemy.body.velocity.y = 0
      
      bounce.to({ x: weeeX }, 500, Phaser.Easing.Linear.None).start()



    } else if (path[0].x < path[1].x) { // go right
      // console.log('walking right')
      // enemy.body.velocity.x = enemy.walkspeed
      // enemy.body.velocity.y = 0
      bounce.to({ x: weeeX }, 500, Phaser.Easing.Linear.None).start()

    }
    // }
  })

  game.easystar.setIterationsPerCalculation(calculationRate)
  game.easystar.calculate()
}

module.exports.enemy = enemy
