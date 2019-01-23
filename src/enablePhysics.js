function enablePhysics(game) {
    //	Enable p2 physics
    // game.physics.startSystem(Phaser.Physics.P2JS);
    
    // game.physics.p2.gravity.y = 900;
    
    // //  Turn on impact events for the world, without this we get no collision callbacks
    // game.physics.p2.setImpactEvents(true);
    // game.physics.p2.restitution = .3; // higher number makes things bouncy

    // //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
    // //  (which we do) - what this does is adjust the bounds to use its own collision group.
    // game.physics.p2.updateBoundsCollisionGroup();



    
        // // ... setup stuff ...
 
        // this.jumpButton = null;
    
        // this.controller = game.input.gamepad.pad1;
    
        // this.controller.addCallbacks(this, {
        //     onConnect: function() {
        //         // you could use a different button here if you want...
        //         this.jumpButton = this.controller.getButton(Phaser.Gamepad.XBOX360_DPAD_LEFT);
        //     }
        // });
    
        // game.input.gamepad.start();

        
        


    return game;
}

module.exports.enablePhysics = enablePhysics;