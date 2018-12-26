var createHook = function(game) {
    var hookBmd = game.add.bitmapData(4,4);
        hookBmd.ctx.beginPath();
        hookBmd.ctx.rect(0,0,4,4);
        hookBmd.ctx.fillStyle = '#ff0000';
        hookBmd.ctx.fill();
        var hookSprite = game.add.sprite(400, 300, hookBmd);
        game.physics.p2.enable(hookSprite);

        console.log('hookSprite1', hookSprite);

        return hookSprite;
}

module.exports.createHook = createHook;
