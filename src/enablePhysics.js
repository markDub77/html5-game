function enablePhysics(game) {
    //	Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    
    game.physics.p2.gravity.y = 900;
    
    //  Turn on impact events for the world, without this we get no collision callbacks
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = .3; // higher number makes things bouncy

    //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
    //  (which we do) - what this does is adjust the bounds to use its own collision group.
    game.physics.p2.updateBoundsCollisionGroup();

    return game;
}

module.exports.enablePhysics = enablePhysics;