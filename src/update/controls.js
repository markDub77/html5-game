var controls = function(game, laserFire) {
    
    var walkspeed = 90
    var jumpStrength = 100

    game.playerSprite.body.velocity.x = 0;
    game.player2Sprite.body.velocity.x = 0;

    // dpad left
    if (game.run.left.isDown || game.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || game.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {

        game.playerSprite.body.velocity.x = -walkspeed;
        game.playerSprite.facing = 'left'
        
    // dpad right
    } else if (game.run.right.isDown || (game.pad1 && game.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) || (game.pad1 && game.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)) > 0.1) {
    
        game.playerSprite.body.velocity.x = walkspeed;
        game.playerSprite.facing = 'right'
    } 

    // jump button
    if (game.jump.isDown || game.pad1.justPressed(Phaser.Gamepad.XBOX360_A)) {
        game.playerSprite.body.velocity.y = -jumpStrength;
    }

    // shoot button
    if (game.shoot.isDown || game.pad1.justPressed(Phaser.Gamepad.XBOX360_B)) {
        

        if (game.laserGot == 'true') {
            laserFire();
        }
        
    }

    return {
        game
    }
}

module.exports.controls = controls;