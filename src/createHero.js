var createHero = function(game) {
    var heroBmd = game.add.bitmapData(16,16);
        heroBmd.ctx.beginPath();
        heroBmd.ctx.rect(0,0,16,16);
        heroBmd.ctx.fillStyle = '#DD9B33';
        heroBmd.ctx.fill();
    var heroSprite = game.add.sprite(800, 100, heroBmd);
        heroSprite.anchor.setTo(8, 8);
        
        
        game.physics.p2.enable(heroSprite, false);
        heroSprite.body.setRectangle(16, 16);
        heroSprite.body.fixedRotation = true
        heroSprite.body.mass = 1000
        

        return heroSprite;
}

module.exports.createHero = createHero;