function p2Physics(game,heroSprite,hookSprite) {
// P2 physics
    var distance = 150;
    var localAnchorA = [0,0];
    var localAnchorB = [0,0];
    var maxForce = 400000;
    console.log(hookSprite);
    var constraint = game.physics.p2.createDistanceConstraint(heroSprite,hookSprite, distance);
    
}

module.exports = p2Physics;