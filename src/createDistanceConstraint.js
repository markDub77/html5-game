function createDistanceConstraint(game,nullSprite,hookSprite) {
// P2 physics
    var distance = 150;
    var localAnchorA = [0,0];
    var localAnchorB = [0,0];
    var maxForce = 400000;
    var constraint = game.physics.p2.createDistanceConstraint(nullSprite,hookSprite, distance);
    
}

module.exports = createDistanceConstraint;