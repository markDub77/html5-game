/* eslint-disable no-undef */

var createWeapons = function (game) {
  var laserBmd = game.add.bitmapData(4, 4)
  laserBmd.ctx.beginPath()
  laserBmd.ctx.rect(0, 0, 4, 4)
  laserBmd.ctx.fillStyle = '#ff0000'
  laserBmd.ctx.fill()

  // Create the group using the group factory
  game.lasers = game.add.group()

  // To move the sprites later on, we have to enable the body
  game.lasers.enableBody = true

  // We're going to set the body type to the ARCADE physics, since we don't need any advanced physics
  game.lasers.physicsBodyType = Phaser.Physics.ARCADE
  /*
        This will create 20 sprites and add it to the stage. They're inactive and invisible, but they're there for later use.
        We only have 20 laser bullets available, and will 'clean' and reset they're off the screen.
        This way we save on precious resources by not constantly adding & removing new sprites to the stage
    */
  game.lasers.createMultiple(10, laserBmd)

  /*
     Behind the scenes, this will call the following function on all lasers:
         - events.onOutOfBounds.add(resetLaser)
     Every sprite has an 'events' property, where you can add callbacks to specific events.
     Instead of looping over every sprite in the group manually, this function will do it for us.
     */
  game.lasers.callAll(
    'events.onOutOfBounds.add',
    'events.onOutOfBounds',
    outOfBounds
  )

  // This will set 'checkWorldBounds' to true on all sprites in the group
  game.lasers.setAll('checkWorldBounds', true)

  function outOfBounds (laser) {
    laser.kill()
  }

  return {
    game
  }
}

module.exports.createWeapons = createWeapons
