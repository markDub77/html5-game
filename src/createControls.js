var createControls = function(game) {
    var run = game.input.keyboard.createCursorKeys();
    var jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
    var fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    
    game.input.gamepad.start();
    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
    var pad1 = game.input.gamepad.pad1;
    


    // fireButton.onDown.add(shootBullet, this);    

    // function shootBullet() { 
    //     // Will only be called once per key press. // Will be passed the full Key object. See Phaser.Key for properties.
    //     console.log('shooting bullet');
    // } 



    return {
        run,
        jump,
        pad1 
    }
}

module.exports.createControls = createControls;