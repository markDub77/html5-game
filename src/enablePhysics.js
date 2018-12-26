function enablePhysics(game) {
    //	Enable p2 physics
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.gravity.y = 800;
}

module.exports = enablePhysics;