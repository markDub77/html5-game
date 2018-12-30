function createDistanceConstraint(game,nullSprite,hookSprite) {
    // P2 physics
    var distance = 250;
    var localAnchorA = [0,0];
    var localAnchorB = [0,0];
    var maxForce = 400000;
    game.physics.p2.createDistanceConstraint(nullSprite,hookSprite, distance);
}

module.exports = createDistanceConstraint;
