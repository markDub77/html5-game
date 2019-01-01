var controls = function(run, jump, heroSprite, pad1, chainBitmapData, chainLength) {
    
    // dpad left
    if (run.left.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {

        heroSprite.body.velocity.x = -150;


    // dpad right
    } else if (run.right.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
       
        heroSprite.body.velocity.x = 150;
    
    // dpad up
    } else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
        
        chainLength -= 4;
       
    // dpad down
    } else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
        
        chainLength += 4
    
    }

    // jump button
    if (jump.isDown || pad1.justPressed(Phaser.Gamepad.XBOX360_A)) {
        heroSprite.body.velocity.y = -250;
    }

    // grapple release button
    if (pad1.justPressed(Phaser.Gamepad.XBOX360_RIGHT_BUMPER)) {
        var grappleRelease = true
    } else {
        var grappleRelease = false
    }

    

    // var launchGrappleButton = pad1.getButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);













    // return heroSprite; 
    return {
        heroSprite,
        chainLength,
        grappleRelease
    }
}

module.exports.controls = controls;