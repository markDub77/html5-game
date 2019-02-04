var createLevel = function(game) {
    
    
        // Create 3 groups that will contain our objects
        game.walls = game.add.group();
        game.laserIconGroup = game.add.group();
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
            'x       l                      x                               x',                    
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

                // Create a laserIconSprite and add it to the 'laserIconGroup' group
                else if (level[i][j] == 'l') {
                    game.laserIconSprite = game.add.sprite(16*j, 16*i, 'laserHudIcon');
                    game.laserIconSprite.tint = 0xff0000;
                    game.laserIconGroup.add(game.laserIconSprite); 
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