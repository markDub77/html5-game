function enablePhysics(game) {
    //	Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 800;
    // game.physics.p2.setImpactEvents(true);
    // game.physics.p2.restitution = 0.8;
    // game.physics.p2.updateBoundsCollisionGroup();

    
    return game;
}

module.exports.enablePhysics = enablePhysics;