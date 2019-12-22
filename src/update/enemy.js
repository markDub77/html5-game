const enemy = game => {
  const spaceBetween = 120
  const enemy = game.player2Sprite
  const hero = game.player1Sprite
  const calculationRate = 1000

  // // stopping
  // if (Math.round(hero.x) - Math.round(enemy.x) > spaceBetween) {
  //   enemy.body.velocity.x = 0
  // }

  // console.log(`enemyX, ${enemyX}, heroX, ${heroX}, difference: ${difference}`)

  const heroX = Math.round(hero.x / game.blockSize)
  const heroY = Math.round(hero.y / game.blockSize)
  const enemyX = Math.round(enemy.x / game.blockSize)
  const enemyY = Math.round(enemy.y / game.blockSize) // we want easystar to track the enemy's feet

  // game.easystar.setDirectionalCondition([17, 18], 16, [game.easystar.TOP, game.easystar.LEFT]) // only accessible from the top and left
  game.easystar.findPath(
    heroX,
    heroY,
    enemyX,
    enemyY,
    path => {
      if (path === null) {
        console.log('Path was not found.')
      } else {
        console.log('new path')

        path.reverse() // easystar gives us an array that starts with the hero, we want to know the first step for the enemy
        // path.splice(2) // remove all paths after index 2

        for (let i = 0; i < path.length; i++) {
          console.log(`${i + 1} point of ${path.length} is X:${path[i].x}, Y:${path[i].y}, enemyX: ${enemyX}, enemyY: ${enemyY}`)

          // going up
          if (path[i].y > path[i + 1].y) {
            enemy.body.velocity.y = -enemy.walkspeed
            // path.shift()
            // console.log('jumping', 'path[i].y' + path[i].y + 'path[i + 1].y' + path[i + 1].y)
          } else if (path[i].y < path[i + 1].y) { // going down
            enemy.body.velocity.y = enemy.walkspeed
            // path.shift()
            // console.log('jumping', 'path[i].y' + path[i].y + 'path[i + 1].y' + path[i + 1].y)
          } else if (path[i].x > path[i + 1].x) { // go left
            enemy.body.velocity.x = -enemy.walkspeed
            // path.shift()
            console.log('moving left')
          } else if (path[i].x < path[i + 1].x) { // go right
            enemy.body.velocity.x = enemy.walkspeed
            // path.shift()
            console.log('moving ringt')
          } else if (path[i].x === enemyX && path[i].y === enemyY) { // stop if you are on the same block
            // enemy.body.velocity.x = 0
            // path.shift()
            // console.log('stopping')
          }
        }
      }
    }
  )

  game.easystar.setIterationsPerCalculation(calculationRate)
  game.easystar.calculate()

  // // backing up
  // if (difference === 30) {
  //   // we increase the speed from the default 80 to 200
  //   enemy.body.velocity.x = -90
  // }

  // // chasing
  // if (enemyX <= heroX) {
  //   enemy.body.velocity.x = 90
  // }

  // if (Math.round(hero.x + spaceBetween) < Math.round(enemy.x)) {
  //   // we increase the speed from the default 80 to 200
  //   enemy.body.velocity.x = -90
  // }

  // switch (new Date().getDay()) {
  //   case 0:
  //     day = "Sunday";
  //     break;
  //   case 1:
  //     day = "Monday";
  //     break;
  //   case 2:
  //      day = "Tuesday";
  //     break;
  //   case 3:
  //     day = "Wednesday";
  //     break;
  //   case 4:
  //     day = "Thursday";
  //     break;
  //   case 5:
  //     day = "Friday";
  //     break;
  //   case 6:
  //     day = "Saturday";
  // }
}

module.exports.enemy = enemy
