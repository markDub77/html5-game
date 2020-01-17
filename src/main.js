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
    require('./create/createHero').createHero(game)
    require('./create/createEnemy').createEnemy(game)
    require('./create/createControls').createControls(game)
    require('./create/createLevel').createLevel(game)
    require('./create/createWeapons').createWeapons(game)
    require('./create/createHud').createHud(game)
  },

  update: function () {
    require('./update/controls').controls(game)
    require('./update/enemy').enemy(game)
    require('./update/collisions').collisions(game)
  },

  render: function () {
    // game.debug.geom(game.line1)
    // game.debug.lineInfo(game.line1, 32, 32)
    //  FPS debug info
    // game.debug.text(game.time.fps, 480, 16, '#cccccc', {
    //   font: '10pt Arial',
    //   fill: '#000'
    // })
  }
}

// Initialize the game and start our state
const game = new Phaser.Game(368, 240, Phaser.AUTO, 'phaser-example')

game.state.add('main', mainState)
game.state.start('main')
