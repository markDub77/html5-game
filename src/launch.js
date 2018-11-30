function launch() { // launch 

        // insert the new location at the start of the array, 
        // and knock the last position off the end
        var part = chainPath.pop();
        part.setTo(hook.x+10, hook.y-6);
        chainPath.unshift(part);


        if (pad1.isDown(Phaser.Gamepad.XBOX360_RIGHT_BUMPER)) {
            if(hook.x <= numChainLinks * 3){
                for (var i = 1; i <= numChainLinks; i++){
                    chainLink[i].x = (chainPath[i]).x;
                    chainLink[i].y = (chainPath[i]).y;
                }
                hook.body.velocity.setTo(300, -300);

            } else {
                hook.x = 0;
                hook.y = 0;
                for (var i = 1; i <= numChainLinks; i++) {
                    chainLink[i].x = (chainPath[i]).x = 0;
                    chainLink[i].y = (chainPath[i]).y = 0;
                }
            }
            

        } 
    } // end launch

export default {
  launch
}