var controls = function(run, jump, heroSprite, pad1, chainBitmapData, chainLength, chainAnchorX, chainAnchorY) {
    
    // dpad left
    if (run.left.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_LEFT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) < -0.1) {

        heroSprite.body.velocity.x = -150;


    // dpad right
    } else if (run.right.isDown || pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_RIGHT) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_X) > 0.1) {
       
        heroSprite.body.velocity.x = 150;
    
    // dpad up
    } else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_UP) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) < -0.1) {
        
        chainLength -= 1;
       
    // dpad down
    } else if (pad1.isDown(Phaser.Gamepad.XBOX360_DPAD_DOWN) || pad1.axis(Phaser.Gamepad.XBOX360_STICK_LEFT_Y) > 0.1) {
        
        chainLength += 1
    
    }

    // jump button
    if (jump.isDown || pad1.justPressed(Phaser.Gamepad.XBOX360_A)) {
        heroSprite.body.velocity.y = -250;

    }


    // if (pad1.justPressed(Phaser.Gamepad.XBOX360_RIGHT_BUMPER)) {
    //     chainAnchorX = (heroSprite.x + 100);
    //     chainAnchorY = (heroSprite.y + -100);
    //     console.log("chainAnchorX,chainAnchorY", chainAnchorY, chainAnchorX)
    // }

    // grapple release button
    if (pad1.isDown(Phaser.Gamepad.XBOX360_RIGHT_BUMPER)) {
        var grappleRelease = false
    } else {
        var grappleRelease = true
    }



    // I should look into signals
    //define the signal:
    // game.events.onPlayerDamage = new Phaser.Signal();
    
    // //The listener:
    // game.events.onPlayerDamage.add(SomeFunctionToCallWhenEventDispatches, this);
    
    // //Dispatch:
    // game.events.onPlayerDamage.dispatch();

    













    // return heroSprite; 
    return {
        heroSprite,
        chainLength,
        grappleRelease,
        // chainAnchorX,
        // chainAnchorY
    }
}

module.exports.controls = controls;