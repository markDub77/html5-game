var createControls = function(game) {
    var run = game.input.keyboard.createCursorKeys();
    var jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    return {
        run,
        jump
    }
}

module.exports.createControls = createControls;