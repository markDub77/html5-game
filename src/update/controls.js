var controls = function(game, fireLaser) {
    

    game.playerSprite.body.velocity.x = 0;
    game.player2Sprite.body.velocity.x = 0;

    // dpad left
    if (game.run.left.isDown || game.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || game.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {

        game.playerSprite.body.velocity.x = -150;
        // hookSprite.body.velocity.x = -150;
        //  hookSprite.body.x = game.playerSprite.body.x;
        game.playerSprite.facing = 'left'


    // dpad right
    } else if (game.run.right.isDown || (game.pad1 && game.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) || (game.pad1 && game.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)) > 0.1) {
       
        game.playerSprite.body.velocity.x = 150;
        // hookSprite.body.velocity.x = 150;
        // hookSprite.body.x = game.playerSprite.body.x;
        game.playerSprite.facing = 'right'
       
    
    // dpad up
    } else if (game.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || game.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
        
        // chainLength -= 1;
       
    // dpad down
    } else if (game.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || game.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
        // chainLength += 1
    }

    // jump button
    if (game.jump.isDown || game.pad1.justPressed(Phaser.Gamepad.XBOX360_A)) {
        game.playerSprite.body.velocity.y = -150;

        console.log('jumping');
    }

    // shoot button
    if (game.shoot.isDown || game.pad1.justPressed(Phaser.Gamepad.XBOX360_B)) {
        fireLaser();
        console.log('fire laser')
    }
    if (game.pad1.justPressed(Phaser.Gamepad.XBOX360_RIGHT_BUMPER)) {
               
        // Launch the hook!
        // hookSprite.body.mass = 100
        // hookSprite.body.velocity.y = -550; 
        // hookSprite.body.velocity.x = 250;
    } else {
        
    }

    // grapple release button
    if (game.pad1.isDown(Phaser.Gamepad.XBOX360_RIGHT_BUMPER)) {
        // var hookLaunch = true
    } else {
        // var hookLaunch = false
    }



    // return playerSprite; 
    return {
        game
    }
}

module.exports.controls = controls;