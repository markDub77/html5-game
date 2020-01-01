/* eslint-disable no-undef */
const laserFire = function (game, player, weapon) {
  var horizontalOffset = game.playerSize
  var verticleOffset = game.playerSize

  if (player.facing === 'left') {
    horizontalOffset = -3
    verticleOffset = game.playerSize / 2

    if (weapon.bulletSpeed > 0) {
      weapon.bulletSpeed = -weapon.bulletSpeed
    }
    if (weapon.fireAngle < 0) {
      weapon.fireAngle = 0
    }
  }

  if (player.facing === 'right') {
    horizontalOffset = game.playerSize + 3
    verticleOffset = game.playerSize / 2

    if (weapon.bulletSpeed < 0) {
      weapon.bulletSpeed = Math.abs(weapon.bulletSpeed)
    }
    if (weapon.fireAngle <= 0) {
      weapon.fireAngle = 0
    }
  }

  if (player.facing === 'up') {
    horizontalOffset = game.playerSize / 2
    verticleOffset = -game.playerSize + 12

    if (weapon.bulletSpeed <= 0) {
      weapon.bulletSpeed = Math.abs(weapon.bulletSpeed)
    }
    if (weapon.fireAngle >= 0) {
      weapon.fireAngle = -90
    }
  }

  if (player.facing === 'down') {
    horizontalOffset = game.playerSize / 2
    verticleOffset = game.playerSize + 3

    if (weapon.bulletSpeed > 0) {
      weapon.bulletSpeed = -weapon.bulletSpeed
    }
    if (weapon.fireAngle >= 0) {
      weapon.fireAngle = -90
    }
  }

  weapon.trackSprite(player, horizontalOffset, verticleOffset, false)
  weapon.fire()
}

module.exports.laserFire = laserFire
