var createHud = function(game) {


    var player1Bmd = game.add.bitmapData(16,16);
        player1Bmd.ctx.beginPath();
        player1Bmd.ctx.rect(0,0,16,16);
        player1Bmd.ctx.fillStyle = '#DD9B33';
        player1Bmd.ctx.fill();

    var player2Bmd = game.add.bitmapData(16,16);
        player2Bmd.ctx.beginPath();
        player2Bmd.ctx.rect(0,0,16,16);
        player2Bmd.ctx.fillStyle = '#0055dd';
        player2Bmd.ctx.fill();
    
        game.indicator1 = game.add.sprite(10, 10, player1Bmd);
        game.indicator2 = game.add.sprite(512, 10, player2Bmd);

    var healthBmd = game.add.bitmapData(4,16);
        healthBmd.ctx.beginPath();
        healthBmd.ctx.rect(0,0,4,16);
        healthBmd.ctx.fillStyle = '#ffffff';
        healthBmd.ctx.fill();
        
        game.player1Sprite.healthContainerSprite = game.add.sprite(30, 10   ); // parent is invisible
        game.player1Sprite.healthContainerSprite.addChild(game.make.sprite(7, 0, healthBmd));
        game.player1Sprite.healthContainerSprite.addChild(game.make.sprite(14, 0, healthBmd));
        game.player1Sprite.healthContainerSprite.addChild(game.make.sprite(21, 0, healthBmd));
        game.player1Sprite.healthContainerSprite.addChild(game.make.sprite(28, 0, healthBmd));
        game.player1Sprite.healthContainerSprite.addChild(game.make.sprite(35, 0, healthBmd));
        game.player1Sprite.healthContainerSprite.addChild(game.make.sprite(35, 0, healthBmd));
        game.player1Sprite.healthContainerSprite.addChild(game.make.sprite(42, 0, healthBmd));
        // game.healthContainerSprite.tint = 0xff0000; // that wont work with an invisible parent
        // healthBmd.ctx.fillStyle = '#c4c3c1';


        // game.laserHudIcon = game.add.sprite(90, 10, 'laserHudIcon');
        // game.laserHudIcon.tint = 0xff0000;
        // game.player1Sprite.weapon = 'laser'



















        
        game.player2Sprite.healthContainerSprite = game.add.sprite(530, 10, ); // parent is invisible
        game.player2Sprite.healthContainerSprite.addChild(game.make.sprite(7, 0, healthBmd));
        game.player2Sprite.healthContainerSprite.addChild(game.make.sprite(14, 0, healthBmd));
        game.player2Sprite.healthContainerSprite.addChild(game.make.sprite(21, 0, healthBmd));
        game.player2Sprite.healthContainerSprite.addChild(game.make.sprite(28, 0, healthBmd));
        game.player2Sprite.healthContainerSprite.addChild(game.make.sprite(35, 0, healthBmd));
        game.player2Sprite.healthContainerSprite.addChild(game.make.sprite(42, 0, healthBmd));














        return {
            game
        }
    }
    
    module.exports.createHud = createHud;