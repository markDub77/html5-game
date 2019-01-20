var createControls = function(game) {
    var run = game.input.keyboard.createCursorKeys();
    var jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    var shoot = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    
    game.input.gamepad.start();
    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
    var pad1 = game.input.gamepad.pad1;
    
    return {
        run,
        jump,
        shoot,
        pad1
    }
}

module.exports.createControls = createControls;