var controls = function(run, jump, heroSprite, pad1, chainBitmapData, chainLength) {
    
    // console.log('chainLength', chainLength)

    if (run.left.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {
        heroSprite.body.velocity.x = -150;
    } else if (run.right.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
        heroSprite.body.velocity.x = 150;
    } else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
        chainLength -= 4;
        // chainLength = 200;
        console.log('Up')
        console.log('chainLength Up', chainLength)
    } else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
        chainLength += 4
        // chainLength = 600;
        console.log('Down');
        console.log('chainLength Down', chainLength)
}

    if (jump.isDown) {
        heroSprite.body.velocity.y = -350;
    }

    // var launchGrappleButton = pad1.getButton(Phaser.Gamepad.XBOX360_RIGHT_BUMPER);


    // return heroSprite; 
    return {
        heroSprite,
        chainLength
    }
}

module.exports.controls = controls;