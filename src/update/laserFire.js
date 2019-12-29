/* eslint-disable no-undef */
const laserFire = function (game) {
  // let playerWeaponSize = game.blockSize
  var horizontalOffset = game.playerSize
  var verticleOffset = game.playerSize

  if (game.player1Sprite.facing === 'left') {
    horizontalOffset = -game.playerSize
    verticleOffset = game.playerSize / 2

    if (game.weapon.bulletSpeed > 0) {
      game.weapon.bulletSpeed = -game.weapon.bulletSpeed
    }
    if (game.weapon.fireAngle < 0) {
      game.weapon.fireAngle = 0
    }
  }

  if (game.player1Sprite.facing === 'right') {
    horizontalOffset = game.playerSize + 10
    verticleOffset = game.playerSize / 2

    if (game.weapon.bulletSpeed < 0) {
      game.weapon.bulletSpeed = Math.abs(game.weapon.bulletSpeed)
    }
    if (game.weapon.fireAngle <= 0) {
      game.weapon.fireAngle = 0
    }
  }

  if (game.player1Sprite.facing === 'up') {
    horizontalOffset = game.playerSize / 2
    verticleOffset = -game.playerSize

    if (game.weapon.bulletSpeed <= 0) {
      game.weapon.bulletSpeed = Math.abs(game.weapon.bulletSpeed)
    }
    if (game.weapon.fireAngle >= 0) {
      game.weapon.fireAngle = -90
    }
  }

  if (game.player1Sprite.facing === 'down') {
    horizontalOffset = game.playerSize / 2
    verticleOffset = game.playerSize + 10

    if (game.weapon.bulletSpeed > 0) {
      game.weapon.bulletSpeed = -game.weapon.bulletSpeed
    }
    if (game.weapon.fireAngle >= 0) {
      game.weapon.fireAngle = -90
    }
  }

  // console.log(
  //   'game.weapon.bulletSpeed',
  //   game.weapon.bulletSpeed,
  //   'game.weapon.fireAngle',
  //   game.weapon.fireAngle
  // )

  game.weapon.trackSprite(
    game.player1Sprite,
    horizontalOffset,
    verticleOffset,
    false
  )
  game.weapon.fire()
}

module.exports.laserFire = laserFire
