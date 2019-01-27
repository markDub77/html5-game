function enablePhysics(game) {
    
        //  Advanced profiling, including the fps rate, fps min/max, suggestedFps and msMin/msMax are updated
        game.time.advancedTiming = true;
        game.time.desiredFps = 60; //???

        
        game.physics.startSystem(Phaser.Physics.ARCADE);

        // Add the physics engine to all game objects
        game.world.enableBody = true;


    return {
        game
    }
}

module.exports.enablePhysics = enablePhysics;