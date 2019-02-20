var laserGet = function(player, laserIcon, game) {

    laserIcon.kill();
    game.laserHudIcon = game.add.sprite(70, 5, 'laserHudIcon');
    game.laserHudIcon.tint = 0xff0000;
    player.weapon = 'laser'

    return {
        game
    }
}

module.exports.laserGet = laserGet;