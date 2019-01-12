var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { create: create, update: update });



var heroSprite;
var hookSprite;
var starfield;
var cursors;

function create() {

    //  Enable P2
    game.physics.startSystem(Phaser.Physics.P2JS);

    //  Turn on impact events for the world, without this we get no collision callbacks
    game.physics.p2.setImpactEvents(true);

    game.physics.p2.restitution = 0.8;

    //  Create our collision groups. One for the heroSprite, one for the hookSprites
    var heroSpriteCollisionGroup = game.physics.p2.createCollisionGroup();
    var hookSpriteCollisionGroup = game.physics.p2.createCollisionGroup();

    //  This part is vital if you want the objects with their own collision groups to still collide with the world bounds
    //  (which we do) - what this does is adjust the bounds to use its own collision group.
    game.physics.p2.updateBoundsCollisionGroup();


        
    
    





    





    //  Create our heroSprite sprite
    var heroBmd = game.add.bitmapData(16,16);
        heroBmd.ctx.beginPath();
        heroBmd.ctx.rect(0,0,16,16);
        heroBmd.ctx.fillStyle = '#DD9B33';
        heroBmd.ctx.fill();
    heroSprite = game.add.sprite(200, 200, heroBmd);
        
        game.physics.p2.enable(heroSprite, false);
        heroSprite.body.setCircle(28);
        heroSprite.body.fixedRotation = true;

    //  Set the heroSprites collision group
    heroSprite.body.setCollisionGroup(heroSpriteCollisionGroup);

    //  The heroSprite will collide with the hookSprites, and when it strikes one the hithookSprite callback will fire, causing it to alpha out a bit
    //  When hookSprites collide with each other, nothing happens to them.
    heroSprite.body.collides(hookSpriteCollisionGroup);

















    var hookBmd = game.add.bitmapData(4,4);
        hookBmd.ctx.beginPath();
        hookBmd.ctx.rect(0,0,4,4);
        hookBmd.ctx.fillStyle = '#cccccc';
        hookBmd.ctx.fill();
    hookSprite = game.add.sprite(heroSprite.body.x, heroSprite.body.y, hookBmd);
    // hookSprite.physicsBodyType = Phaser.Physics.P2JS;
    game.physics.p2.enable(hookSprite, false);
    hookSprite.body.setRectangle(4, 4);
    
    
    // hookSprite.body.velocity.x = 400;
    // hookSprite.body.velocity.y = 400;
    hookSprite.body.setCollisionGroup(hookSpriteCollisionGroup);
    hookSprite.body.collides([hookSpriteCollisionGroup]);




















    cursors = game.input.keyboard.createCursorKeys();

}


function update() {



    heroSprite.body.setZeroVelocity();
    hookSprite.body.setZeroVelocity();

    if (cursors.left.isDown)
    {
        heroSprite.body.moveLeft(200);
        hookSprite.body.moveLeft(200);
    }
    else if (cursors.right.isDown)
    {
        heroSprite.body.moveRight(200);
        hookSprite.body.moveRight(200);
    }

    if (cursors.up.isDown)
    {
        heroSprite.body.moveUp(200);
        hookSprite.body.moveUp(200);
    }
    else if (cursors.down.isDown)
    {
        heroSprite.body.moveDown(200);
        hookSprite.body.moveDown(200);
    }
}

