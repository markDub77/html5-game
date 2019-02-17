var laserFire = function(game) {
    
    var laser = game.lasers.getFirstExists(false);
        if (laser) {
            // If we have a laser, set it to the starting position
            laser.reset(game.player1Sprite.body.x, game.player1Sprite.body.y);
            // Give it a velocity of -500 so it starts shooting

            if (game.player1Sprite.facing == 'right') {
                laser.body.velocity.x = 500;
            } else {
                laser.body.velocity.x = -500;
            }
        }

    return {
        game
    }
}

module.exports.laserFire = laserFire;