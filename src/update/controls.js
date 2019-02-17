var controls = function(game, laserFire) {
    
    var walkspeed = 90
    var jumpStrength = 200

    game.player1Sprite.body.velocity.x = 0;
    game.player2Sprite.body.velocity.x = 0;

    // dpad left
    if (game.run.left.isDown || game.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || game.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {

        game.player1Sprite.body.velocity.x = -walkspeed;
        game.player1Sprite.facing = 'left'
        
    // dpad right
    } else if (game.run.right.isDown || (game.pad1 && game.pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT)) || (game.pad1 && game.pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X)) > 0.1) {
    
        game.player1Sprite.body.velocity.x = walkspeed;
        game.player1Sprite.facing = 'right'
    } 

    // jump button
    if ( (game.jump.isDown || game.pad1.justPressed(Phaser.Gamepad.XBOX360_A)) && (game.player1Sprite.body.onFloor() || game.player1Sprite.body.touching.down) ) {
        game.player1Sprite.body.velocity.y = -jumpStrength;
    }

    // shoot button 
    if ((game.shoot.justDown || game.pad1.justPressed(Phaser.Gamepad.XBOX360_B)  && !game.holdFire && game.player1Sprite.weapon)    ) {
        game.holdFire = true;
        laserFire();
    }
    
    if (game.pad1.justReleased(Phaser.Gamepad.XBOX360_B)) {            
        game.holdFire = false;
    }

    return {
        game
    }
}

module.exports.controls = controls;