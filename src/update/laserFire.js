/* eslint-disable no-undef */
const laserFire = function (game) {
  let playerWeaponSize = game.blockSize

  if (game.player1Sprite.facing === 'left') {
    playerWeaponSize = -game.blockSize

    if (game.weapon.bulletSpeed > 0) {
      game.weapon.bulletSpeed = -game.weapon.bulletSpeed
      game.weapon.fireAngle = -game.weapon.fireAngle
    }
  } else {
    // you are facing right
    if (game.weapon.bulletSpeed < 0) {
      game.weapon.bulletSpeed = Math.abs(game.weapon.bulletSpeed)
      game.weapon.fireAngle = -game.weapon.fireAngle
    }
  }

  game.weapon.trackSprite(game.player1Sprite, playerWeaponSize, 20, false)
  game.weapon.fire()
}

module.exports.laserFire = laserFire
