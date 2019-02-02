var weapons = function(game) {
    
    if (game.playerSprite.facing == 'right') {
        game.lasers.callAll('anchor.setTo', 'anchor', -5, -1.5);
    } else {
        game.lasers.callAll('anchor.setTo', 'anchor', 2, -1.5);
    }  

    return {
        game
    }
}

module.exports.weapons = weapons;