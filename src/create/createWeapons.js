/* eslint-disable no-undef */

var createWeapons = function (game) {
  let bulletSpeed = 200
  let fireAngle = 0

  const bulletBmd = game.add.bitmapData(4, 4)
  bulletBmd.ctx.beginPath()
  bulletBmd.ctx.rect(0, 0, 4, 4)
  bulletBmd.ctx.fillStyle = '#ff0000'
  bulletBmd.ctx.fill()

  let weapon = game.add.weapon(20, bulletBmd)
  weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS
  weapon.bulletSpeed = bulletSpeed
  weapon.fireAngle = fireAngle
  weapon.fireRate = 1

  game.weapon = weapon

  return {
    game
  }
}

module.exports.createWeapons = createWeapons
