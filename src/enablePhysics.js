function enablePhysics(game) {
    //	Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.gravity.y = 900;
    
}

module.exports = enablePhysics;