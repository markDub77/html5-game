/* eslint-disable no-undef */

var createWeapons = function (game) {
  const bulletBmd = game.add.bitmapData(4, 4)
  bulletBmd.ctx.beginPath()
  bulletBmd.ctx.rect(0, 0, 4, 4)
  bulletBmd.ctx.fillStyle = '#ff0000'
  bulletBmd.ctx.fill()

  let weapon = game.add.weapon(1000, bulletBmd)
  weapon.bulletKillType = Phaser.Weapon.KILL_NEVER
  weapon.bulletSpeed = 300
  weapon.fireAngle = -30
  weapon.fireRate = 1100
  weapon.bulletWorldWrap = true
  weapon.bulletGravity = new Phaser.Point(0, 120.2)

  game.weapon = weapon

  return {
    game
  }
}

module.exports.createWeapons = createWeapons
