/* eslint-disable no-undef */

var createWeapons = function (game) {
  const bulletBmd = game.add.bitmapData(4, 4)
  bulletBmd.ctx.beginPath()
  bulletBmd.ctx.rect(0, 0, 4, 4)
  bulletBmd.ctx.fillStyle = '#ff0000'
  bulletBmd.ctx.fill()

  let heroWeapon = game.add.weapon(1, bulletBmd)
  heroWeapon.bulletKillType = Phaser.Weapon.KILL_NEVER
  heroWeapon.bulletSpeed = 190
  heroWeapon.fireAngle = 0
  heroWeapon.fireRate = 0
  heroWeapon.bulletWorldWrap = true
  // heroWeapon.bulletGravity = new Phaser.Point(0, 120.2)

  let enemyWeapon = game.add.weapon(100, bulletBmd)
  enemyWeapon.bulletKillType = Phaser.Weapon.KILL_NEVER
  enemyWeapon.bulletSpeed = 90
  enemyWeapon.fireAngle = 0
  enemyWeapon.fireRate = 800
  enemyWeapon.bulletWorldWrap = true

  game.heroWeapon = heroWeapon
  game.enemyWeapon = enemyWeapon

  return {
    game
  }
}

module.exports.createWeapons = createWeapons
