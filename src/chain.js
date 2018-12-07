var game = new Phaser.Game(800, 600, Phaser.AUTO, 'phaser-example', { preload: preload, create: create });

function preload() {


}

function create() {

    game.physics.startSystem(Phaser.Physics.P2JS);
    
            
    game.physics.p2.gravity.y = 1200;

    //  Length, xAnchor, yAnchor
    createRope(16, 400, 0);

    

}

function createRope(length, xAnchor, yAnchor) {

    var lastRect;
    
    var maxForce = 20000;   //  The force that holds the rectangles together.
    var newRect;

    var height = 20;        //  Height for the physics body - your image height is 8px
    var width = 21;         //  This is the width for the physics body. If too small the rectangles will get scrambled together.
    var newRectThing = -(height);
    var lastRectThing = height;
    var chainLinkBmpHeight = height * 2;
    var chainLinkBmpWidth = height * 2;
    
    var chainLinkBmd = game.add.bitmapData(chainLinkBmpWidth,chainLinkBmpHeight);
    chainLinkBmd.ctx.beginPath();
    chainLinkBmd.ctx.rect(0,0,chainLinkBmpWidth,chainLinkBmpHeight);
    chainLinkBmd.ctx.fillStyle = '#cccccc';
    chainLinkBmd.ctx.fill();

    var chainLinkBmd2 = game.add.bitmapData(chainLinkBmpWidth,chainLinkBmpHeight);
    chainLinkBmd2.ctx.beginPath();
    chainLinkBmd2.ctx.rect(0,0,chainLinkBmpWidth,chainLinkBmpHeight);
    chainLinkBmd2.ctx.fillStyle = '#333333';
    chainLinkBmd2.ctx.fill();

    var chain = game.add.group();
    chain.scale.setTo(.1,.1);
    chain.x = xAnchor
    chain.y = yAnchor



    for (var i = 0; i <= length; i++)
    {
        var x = xAnchor;                    //  All rects are on the same x position
        // var y = yAnchor + (i * height);     //  Every new rect is positioned below the last
        var y = yAnchor;


        if (i % 2 === 0)
        {
            //  Add sprite (and switch frame every 2nd time)
            newRect = game.add.sprite(x, y, chainLinkBmd);
            chain.add(newRect);
         
        }   
        else
        {
                  
            newRect = game.add.sprite(x, y, chainLinkBmd2);
            chain.add(newRect);
            lastRect.bringToTop();
            chain.add(lastRect);
        }

        //  Enable physicsbody
        game.physics.p2.enable(newRect, false);

        //  Set custom rectangle
        newRect.body.setRectangle(width, height);

        if (i === 0)
        {
            newRect.body.static = true;
        }
        else
        {  
            //  Anchor the first one created
            newRect.body.velocity.x = 400;      //  Give it a push :) just for fun
            // newRect.body.velocity.y = -300;
            // newRect.body.velocity.setTo(300, -300);
            newRect.body.mass = (length) / i;     //  Reduce mass for evey rope element
            console.log(newRect.body.mass)
        }

        //  After the first rectangle is created we can add the constraint
        if (lastRect)
        {
            game.physics.p2.createRevoluteConstraint(newRect, [0, newRectThing], lastRect, [0, lastRectThing], maxForce);
        }

        lastRect = newRect;

    }

}