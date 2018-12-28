var controls = function(run, jump, heroSprite) {
    if (run.left.isDown) {
        heroSprite.body.velocity.x = -150;
    } else if (run.right.isDown) {
        heroSprite.body.velocity.x = 150;
    }
    if (jump.isDown && heroSprite.body.onFloor()) {
        heroSprite.body.velocity.y = -350;
    }

    return heroSprite;
}

module.exports.controls = controls;