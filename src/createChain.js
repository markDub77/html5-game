var createChain = function(game, platformSprite, heroSprite, chainLength) {
 
    var chainLength = 300
    var chainAnchorX = (heroSprite.x + 100);
    var chainAnchorY = (heroSprite.y + -100);


    var hookBmd = game.add.bitmapData(4,4);
        hookBmd.ctx.beginPath();
        hookBmd.ctx.rect(0,0,4,4);
        hookBmd.ctx.fillStyle = '#ff0000';
        hookBmd.ctx.fill();
    var hookSprite = game.add.sprite(heroSprite.x,heroSprite.y, hookBmd);

    var chainBitmapData = game.add.bitmapData(game.world.width, game.world.height);
        chainBitmapData.ctx.beginPath();
        chainBitmapData.ctx.lineWidth = "2";
        chainBitmapData.ctx.strokeStyle = "#dddddd";
        chainBitmapData.ctx.setLineDash([2,2]);
        chainBitmapData.ctx.stroke();
        chainBitmapData.ctx.closePath();
    var chainSprite = game.add.sprite(0, 0, chainBitmapData);

    var grappleGraphics = game.add.graphics(0,0);
        // grappleGraphics.lineStyle(2, 0xc0c0c0, 1);
        grappleGraphics.beginFill(0xffffff);
        grappleGraphics.moveTo(heroSprite.x,heroSprite.y);
        grappleGraphics.lineTo(hookSprite.x,hookSprite.y);
        grappleGraphics.endFill();
    var grappleSprite = game.add.sprite(heroSprite.x,heroSprite.y, grappleGraphics);
    
    // chainSprite.mask = grappleGraphics;

       chainSprite.mask = grappleGraphics;




    
    
    









    game.add.tween(hookSprite).to( { x: 900, y: 200}, 1000, Phaser.Easing.Bounce.Out, true);


    


    // Create a spring between the player and block to act as the Chain
    var chain = game.physics.p2.createSpring(
        platformSprite,  // sprite 1
        heroSprite, // sprite 2
        chainLength,       // length of the Chain
        100,        // stiffness (lower numbers sag)
        9,         // damping (lower numbers bounce)
        [-chainAnchorX, -chainAnchorY] // Where to hook the spring to body A in world coordinates. 
    );


    var line1 = new Phaser.Line(heroSprite.x, heroSprite.y, hookSprite.x, hookSprite.y);


    // game.add.tween(hookSprite).to( { x: 900, y: 200}, 2000, Phaser.Easing.Bounce.Out, true);
    game.world.bringToTop(heroSprite);
    
    return {
        chainBitmapData,
        chainAnchorX, 
        chainAnchorY,
        chainLength,
        line1,
        hookSprite,
        grappleGraphics
    }
}

module.exports.createChain = createChain;