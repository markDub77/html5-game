/* eslint-disable no-undef */
function enablePhysics (game) {
  //  Advanced profiling, including the fps rate, fps min/max, suggestedFps and msMin/msMax are updated
  game.time.advancedTiming = true
  game.time.desiredFps = 60 // ???
  game.physics.startSystem(Phaser.Physics.ARCADE)

  // Add the physics engine to all game objects
  game.world.enableBody = true
  // game.physics.setBoundsToWorld()
  // game.world.setBounds(16, 0, 368, 240)

  return {
    game
  }
}

module.exports.enablePhysics = enablePhysics
