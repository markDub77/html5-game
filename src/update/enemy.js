const enemy = game => {
  const spaceBetween = 120
  const enemy = game.player2Sprite
  const hero = game.player1Sprite
  const blockSize = 30
  const enemyX = Math.round(enemy.x) + blockSize
  const heroX = Math.round(hero.x)
  const difference = heroX - enemyX

  // // stopping
  // if (Math.round(hero.x) - Math.round(enemy.x) > spaceBetween) {
  //   enemy.body.velocity.x = 0
  // }

  // console.log(`enemyX, ${enemyX}, heroX, ${heroX}, difference: ${difference}`)

  // backing up
  if (difference === 30) {
    // we increase the speed from the default 80 to 200
    enemy.body.velocity.x = -90
  }

  // chasing
  if (enemyX <= heroX) {
    enemy.body.velocity.x = 90
  }

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
