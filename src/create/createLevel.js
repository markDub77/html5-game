var createLevel = function(game) {
    
    
        // Create 3 groups that will contain our objects
        game.walls = game.add.group();
        game.laserIconSprites = game.add.group();
        game.enemies = game.add.group();

        // Design the level. x = wall, o = laserIconSprite, ! = lava.
        var level = [
            '                                                                ',
            '                                                                ',
            '                                                                ',
            'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
            'xxx                                                         xxxx',                                                                                           
            'xx                             l                               x',                                                                         
            'x                              x                               x',                                                                                           
            'x                             xxx                              x',
            'x                       xxxxxxxxxxxxxxx                        x', 
            'x                        xxxxxxxxxxxxx                         x', 
            'x                         xxxxxxxxxxx                          x',                                                                                           
            'x                           xxxxxxx                          xxx',                    
            'x                              x                               x',                    
            'xxxxxxxxx                      x                               x',          
            'x                              x                               x',                    
            'x       xxxxxxx                x                               x',   
            'x                              x  xxxxxxxxxxxx                 x',
            'x                              x    x        x                 x',                    
            'x              xxxxxxx         xxxx xxxxxxxx xxxxx             x',                    
            'x           xxxx                x   x        x                 x',   
            'x                               x xxxxxxxxxxxx xxxxxxxxxxxxxxx x',
            'x                               x            x                 x',
            'x                               x xxxxxxx    x                 x',                    
            'x       xxxxxxxx                x            x                 x',   
            'x                               xxxxxx       xxxxxxxxxxx       x',
            'x                              xxxxx                           x',                    
            'x                              x                               x',                    
            'x           xxxxxxxx           x                               x',
            'x                              x                               x',                    
            'x                              x                               x',
            'x                              x                               x',                    
            'xxxx     xxxx                  xx                              x',
            'x                              xx                              x', 
            'x                              xx                              x',                    
            'x       xxxxxxxx               xx                              x',
            'x                              xx                              x',
            'x              xxxxx           xx                              x',
            'x                             xx                               x',
            'x                             xx                              xx',
            'x        xx                   xx                             xxx',
            'x                             xx                            xxxx',
            'x            xxxxx            xx                           xxxxx',
            'x                             xx                          xxxxxx',
            'x                             xx                         xxxxxxx',
            'x                             xx                        xxxxxxxx',
            'x                             xx                       xxxxxxxxx',
            'xx                                                    xxxxxxxxxx',
            'xxx!!!!!!!!!!!!!!!!!!!!!!!!!xxxxxx!!!!!!!!!!!!!!!!!!!xxxxxxxxxxx',
            

        ];

        // var wallBmd = game.add.bitmapData(16,16);
        //     wallBmd.ctx.beginPath();
        //     wallBmd.ctx.rect(0,0,16,16);
        //     wallBmd.ctx.fillStyle = '#366dc5';
        //     wallBmd.ctx.fill();
        
        var laserIconBmd = game.add.bitmapData(16,16);
            laserIconBmd.ctx.beginPath();
            laserIconBmd.ctx.rect(0,0,16,16);
            laserIconBmd.ctx.fillStyle = '#ff0000';
            laserIconBmd.ctx.fill();

        var lavaBmd = game.add.bitmapData(16,16);
            lavaBmd.ctx.beginPath();
            lavaBmd.ctx.rect(0,0,16,16);
            lavaBmd.ctx.fillStyle = '#D95F49';
            lavaBmd.ctx.fill();

        // Create the level by going through the array
        for (var i = 0; i < level.length; i++) {
            for (var j = 0; j < level[i].length; j++) {

                // Create a wall and add it to the 'walls' group
                if (level[i][j] == 'x') {
                    var wall = game.add.sprite(16*j, 16*i, 'ground');
                    game.walls.add(wall);
                    wall.body.immovable = true; 
                }

                // Create a laserIconSprite and add it to the 'laserIconSprites' group
                else if (level[i][j] == 'l') {
                    var laserIconSprite = game.add.sprite(16*j, 16*i, 'laserHudIcon');
                    // game.add.tween(laserIconSprite.position)
                    //     .to( {y: laserIconSprite.position.y-10}, 2000, 
                    //         Phaser.Easing.Linear.None, true, 0, 0, true)
                    //     .loop(true);


                    // game.add.tween(laserIconSprite.scale)
                    //     .to( { x: 1, y: 1 }, 2000, 
                    //         Phaser.Easing.Linear.None, true, 0, 0, true)
                    //     .loop(true);

                    // laserIconSprite = game.add.filter('Glow');
                    // laserIconSprite.blendMode = PIXI.blendModes.ADD;
                    // laserIconSprite.filters = [
                    //     new GlowFilter(15, 2, 1, 0xFF0000, 0.5)
                    //   ];

                    game.laserIconSprites.add(laserIconSprite);
                }

                // Create a enemy and add it to the 'enemies' group
                else if (level[i][j] == '!') {
                    var enemy = game.add.sprite(16*j, 16*i, lavaBmd);
                    game.enemies.add(enemy);
                }
            }
        }

        return game;
}

module.exports.createLevel = createLevel;