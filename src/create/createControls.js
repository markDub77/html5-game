var createControls = function (game, gofull) {
  game.run = game.input.keyboard.createCursorKeys()
  game.jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
  game.shoot = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)

  game.pad1 = game.input.gamepad.pad1
  game.pad2 = game.input.gamepad.pad2

  // game.pad1.addCallbacks(this, {
  //     onConnect: function() {
  //         // you could use a different button here if you want...
  //         // jumpButton = pad1.getButton(Phaser.Gamepad.BUTTON_1);
  //         // runLeft = pad1.getButton(Phaser.Gamepad.XBOX360_DPAD_LEFT);
  //         console.log('pad1 connected');
  //     }
  // });

  game.input.gamepad.start()
  // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4

  // Stretch to fill
  game.scale.fullScreenScaleMode = Phaser.ScaleManager.EXACT_FIT

  // Keep original size
  // game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;

  // Maintain aspect ratio
  // game.scale.fullScreenScaleMode = Phaser.ScaleManager.SHOW_ALL;

  // game.input.onDown.add(gofull, this);
  game.input.onTap.add(gofull, this)

  // // Listen to space & enter keys
  // var keys = [Phaser.KeyCode.SPACEBAR, Phaser.KeyCode.ENTER];
  // // Create Phaser.Key objects for listening to the state
  // game.phaserKeys = game.input.keyboard.addKeys(keys);
  // // Capture these keys to stop the browser from receiving this event
  // game.input.keyboard.addKeyCapture(keys);

  return {
    game
  }
}

module.exports.createControls = createControls
