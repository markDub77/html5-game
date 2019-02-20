var createHud = function(game) {


    // health bars
    var player1SpriteHealthBmd = game.add.bitmapData(4,16);
        player1SpriteHealthBmd.ctx.beginPath();
        player1SpriteHealthBmd.ctx.rect(0,0,4,16);
        player1SpriteHealthBmd.ctx.fillStyle = '#DD9B33';
        player1SpriteHealthBmd.ctx.fill();
        
        game.player1Sprite.healthContainerSprite = game.add.sprite(-2, 5   ); // parent is invisible
        game.player1Sprite.healthContainerSprite.addChild(game.make.sprite(7, 0, player1SpriteHealthBmd));
        game.player1Sprite.healthContainerSprite.addChild(game.make.sprite(14, 0, player1SpriteHealthBmd));
        game.player1Sprite.healthContainerSprite.addChild(game.make.sprite(21, 0, player1SpriteHealthBmd));
        game.player1Sprite.healthContainerSprite.addChild(game.make.sprite(28, 0, player1SpriteHealthBmd));
        game.player1Sprite.healthContainerSprite.addChild(game.make.sprite(35, 0, player1SpriteHealthBmd));
        game.player1Sprite.healthContainerSprite.addChild(game.make.sprite(35, 0, player1SpriteHealthBmd));
        game.player1Sprite.healthContainerSprite.addChild(game.make.sprite(42, 0, player1SpriteHealthBmd));
     

    // the frame
    game.hudFrame1 = game.add.sprite(0, 0, 'hudFrame');
    game.hudFrame1.tint = 0xDD9B33;
        




        











        var player2SpriteHealthBmd = game.add.bitmapData(4,16);
        player2SpriteHealthBmd.ctx.beginPath();
        player2SpriteHealthBmd.ctx.rect(0,0,4,16);
        player2SpriteHealthBmd.ctx.fillStyle = '#0055dd';
        player2SpriteHealthBmd.ctx.fill();
        


        
        game.player2Sprite.healthContainerSprite = game.add.sprite(528, 5); // parent is invisible
        game.player2Sprite.healthContainerSprite.addChild(game.make.sprite(7, 0, player2SpriteHealthBmd));
        game.player2Sprite.healthContainerSprite.addChild(game.make.sprite(14, 0, player2SpriteHealthBmd));
        game.player2Sprite.healthContainerSprite.addChild(game.make.sprite(21, 0, player2SpriteHealthBmd));
        game.player2Sprite.healthContainerSprite.addChild(game.make.sprite(28, 0, player2SpriteHealthBmd));
        game.player2Sprite.healthContainerSprite.addChild(game.make.sprite(35, 0, player2SpriteHealthBmd));
        game.player2Sprite.healthContainerSprite.addChild(game.make.sprite(42, 0, player2SpriteHealthBmd));


        game.hudFrame2 = game.add.sprite(530, 0, 'hudFrame');
        game.hudFrame2.tint = 0x0055dd;











        return {
            game
        }
    }
    
    module.exports.createHud = createHud;