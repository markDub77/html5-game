var controls = function(game) {
    var cursors = game.input.keyboard.createCursorKeys();
    var jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    return {
        cursors: cursors,
        jumpButton: jumpButton
    }
}

module.exports.controls = controls;