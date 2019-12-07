/* eslint-disable no-undef */
// Create the state that will contain the whole game
var mainState = {
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
    game.load.spritesheet('hudFrame', 'assets/images/hudFrame.png', 201, 48)
    game.load.spritesheet('laserIcon', 'assets/images/laserIcon.png', 16, 16)
    game.load.spritesheet('ground', 'assets/images/ground.png', 16, 16)

    console.log(game)
  },

  create: function () {
    require('./create/enablePhysics').enablePhysics(game)
    require('./create/createControls').createControls(game, this.gofull)
    require('./create/createPlayer').createPlayer(game)
    require('./create/createLevel').createLevel(game)
    require('./create/createWeapons').createWeapons(game)
    require('./create/createHud').createHud(game)
  },

  update: function () {
    require('./update/collisions').collisions(
      game,
      this.laserHitWall,
      this.laserGet,
      this.restart,
      this.laserHitPlayer
    )
    require('./update/controls').controls(game, this.laserFire)
    require('./update/hud').hud(game)
    // require('./update/weapons').weapons(game)
  },

  laserFire: function (player) {
    require('./update/laserFire').laserFire(game, player)
  },

  laserGet: function (player, laserIcon) {
    require('./update/laserGet').laserGet(player, laserIcon, game)
  },

  laserHitWall: function (laser) {
    laser.kill()
  },

  laserHitPlayer: function (shotGuy, laser) {
    laser.kill()

    shotGuy.healthContainerSprite.children.pop()

    // Blink code
    game.counter = 0 // we need a way to switch back and forth really fast, so we will use even and odd numbers

    var updateCounter = function () {
      game.counter++

      // blink for 10 frames
      if (game.counter <= 10) {
        // alternate colors every frame
        if (game.counter % 2) {
          shotGuy.tint = 0xff0000
        } else {
          shotGuy.tint = 0xffffff
        }
      } else {
        // give the guy back his normal tint and stop the counter
        game.time.events.remove(event)
        shotGuy.tint = shotGuy.originalTint
        game.ran = false
        shotGuy.invincible = false
      }
    }

    var event = game.time.events.loop(100, updateCounter, this)
  },

  // Function to restart the game
  restart: function () {
    game.state.start('main')
  },

  gofull: function () {
    if (game.scale.isFullScreen) {
      game.scale.stopFullScreen()
    } else {
      game.scale.startFullScreen(false)
    }
  },

  render: function () {
    //  FPS debug info
    game.debug.text(game.time.fps, 1009, 10, '#366dc5')
  }
}

// Initialize the game and start our state
var game = new Phaser.Game(1024, 768, Phaser.AUTO, 'phaser-example')
// var game = new Phaser.Game(1920, 1080, Phaser.AUTO, 'phaser-example')
// var game = new Phaser.Game(window.innerWidth * window.devicePixelRatio - 40, window.innerHeight * window.devicePixelRatio - 40, Phaser.AUTO, 'phaser-example')

game.state.add('main', mainState)
game.state.start('main')
