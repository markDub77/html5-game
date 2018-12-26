var createHero = function(game) {
    var heroBmd = game.add.bitmapData(16,16);
        heroBmd.ctx.beginPath();
        heroBmd.ctx.rect(0,0,16,16);
        heroBmd.ctx.fillStyle = '#DD9B33';
        heroBmd.ctx.fill();
    var heroSprite = game.add.sprite(400, 300, heroBmd);
        game.physics.enable(heroSprite, Phaser.Physics.ARCADE); // needed for collision detection
        heroSprite.body.bounce.y = 0.2;
        heroSprite.body.collideWorldBounds = true;
        heroSprite.body.collideWorldBounds = true; 
        game.physics.p2.enable(heroSprite);

        console.log('heroSprite1', heroSprite);

        return heroSprite;
}

module.exports.createHero = createHero;