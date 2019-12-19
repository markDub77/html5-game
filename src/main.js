/* eslint-disable no-undef */
// Create the state that will contain the whole game
const mainState = {
  preload: function () {
    // Here we preload the assets
    game.load.spritesheet(
      'controller-indicator',
      'assets/images/controller-indicator.png',
      16,
      16
    )
    game.load.spritesheet(
      'laserHudIcon',
      'assets/images/laserHudIcon.png',
      16,
      16
    )
    // game.load.spritesheet('hudFrame', 'assets/images/hudFrame.png', 201, 48)
    game.load.spritesheet('laserIcon', 'assets/images/laserIcon.png', 16, 16)
    game.load.spritesheet('ground', 'assets/images/ground.png', 16, 16)
    //  tiles are 16x16 each
    game.load.image('tiles', 'assets/images/sci-fi-tiles.png')
    game.load.image('ground', 'assets/images/ground.png')
  },

  create: function () {
    require('./create/enablePhysics').enablePhysics(game)
    require('./create/createControls').createControls(game)
    require('./create/createPlayer').createPlayer(game)
    require('./create/createLevel').createLevel(game)
    require('./create/createWeapons').createWeapons(game)
    require('./create/createHud').createHud(game)
  },

  update: function () {
    require('./update/collisions').collisions(game)
    require('./update/controls').controls(game)
    require('./update/enemy').enemy(game)
  },

  render: function () {
    //  FPS debug info
    game.debug.text(game.time.fps, 1009, 10, '#366dc5')
  }
}

// Initialize the game and start our state
const game = new Phaser.Game(500, 400, Phaser.AUTO, 'phaser-example')

game.state.add('main', mainState)
game.state.start('main')
