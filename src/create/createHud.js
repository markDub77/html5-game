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
        healthBmd.ctx.fillStyle = '#c4c3c1';
        healthBmd.ctx.fill();
        
        game.healthContainerSprite = game.add.sprite(40, 10, healthBmd);
        game.healthContainerSprite.addChild(game.make.sprite(7, 0, healthBmd));
        game.healthContainerSprite.addChild(game.make.sprite(14, 0, healthBmd));
        game.healthContainerSprite.addChild(game.make.sprite(21, 0, healthBmd));
        game.healthContainerSprite.addChild(game.make.sprite(28, 0, healthBmd));
        game.healthContainerSprite.addChild(game.make.sprite(35, 0, healthBmd));
        // game.addChild = game.add.sprite(46, 10, healthBmd);
        // game.addChild = game.add.sprite(52, 10, healthBmd);
        // game.addChild = game.add.sprite(58, 10, healthBmd);
        // game.addChild = game.add.sprite(64, 10, healthBmd);


        game.healthContainerSprite2 = game.add.sprite(540, 10, healthBmd);
        game.healthContainerSprite2.addChild(game.make.sprite(7, 0, healthBmd));
        game.healthContainerSprite2.addChild(game.make.sprite(14, 0, healthBmd));
        game.healthContainerSprite2.addChild(game.make.sprite(21, 0, healthBmd));
        game.healthContainerSprite2.addChild(game.make.sprite(28, 0, healthBmd));
        game.healthContainerSprite2.addChild(game.make.sprite(35, 0, healthBmd));

        



        // game.laserHudGroup = game.add.group();
        // var laserHudGraphic = game.add.graphics(0, 0);
        // laserHudGraphic.lineStyle(1, 0xff0000, 1);
        // laserHudGraphic.drawRect(80, 10, 16, 16);
        // game.laserHudSprite = game.add.sprite(64, 10, 'laserHudGraphic');
        // game.laserHudGroup.add(laserHudGraphic);
        // game.indicator1 = game.add.sprite(10,10, 'controller-indicator');
        // game.indicator1.scale.x = game.indicator1.scale.y = 1;
        // game.indicator1.animations.frame = 1;
        // game.indicator2 = game.add.sprite(512,10, 'controller-indicator');
        // game.indicator2.scale.x = game.indicator2.scale.y = 1;
        // game.indicator2.animations.frame = 1;

        return {
            game
        }
    }
    
    module.exports.createHud = createHud;