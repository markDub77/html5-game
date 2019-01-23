var createControls = function(game) {



    var run = null;
    var jump = null;
    var shoot = null;


    var run = game.input.keyboard.createCursorKeys();
    var jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    var shoot = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);
    

    var pad1 = game.input.gamepad.pad1; 
    // var pad2 = game.input.gamepad.pad2; 
    pad1.addCallbacks(this, {
        onConnect: function() {
            // you could use a different button here if you want...
            // jumpButton = pad1.getButton(Phaser.Gamepad.BUTTON_1);
            // runLeft = pad1.getButton(Phaser.Gamepad.XBOX360_DPAD_LEFT);
            console.log('pad1 connected');
        }
    });

    game.input.gamepad.start();
    // To listen to buttons from a specific pad listen directly on that pad game.input.gamepad.padX, where X = pad 1-4
    
    
        
   
    
    return {
        run,
        jump,
        shoot,
        pad1, 
        // pad2
    }
}

module.exports.createControls = createControls;