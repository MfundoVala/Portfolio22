import * as THREE from 'three'

export default class CharacterControls {
    constructor(player, animation, firstAction){
        this.run = false,
        this.currentAction,
        this.player = player,
        this.currentAction = firstAction
        this.time = player.time
        // this.mixer = animation.mixer,
        this.animation = animation,

        // this.animation.actions.forEach((value, key) => {
        //     if (key == restAction) {
        //         value.play()
        //     }
        // })

        // Play the action
        this.animation.play = (name) =>
        {
            // const current = this.animation.actions.get(this.currentAction)

            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current
            if (typeof oldAction == typeof newAction)
                // console.log(typeof oldAction)
                oldAction.fadeOut(0.5)
            if (newAction !== oldAction){
                newAction.reset()
                newAction.play()
            // if (typeof oldAction == typeof newAction)
            //     newAction.crossFadeFrom(oldAction, 1)
            }

            this.animation.actions.current = newAction
        }
        this.keysPressed = {}


    }


    //update data
    walkDirection = new THREE.Vector3()
    rotateAngle = new THREE.Vector3(0, 1, 0)
    rotateQuarternion = new THREE.Quaternion()

    // constants
    fadeDuration = 0.2
    runVelocity = 1
    walkVelocity = 0.4
    // delta = player.time.delta


    update() {
        const KEYLIST = [37,38,39,40]
        const directionPressed = KEYLIST.some(key => this.keysPressed[key] == true)

        var play = '';
        if (directionPressed && this.run) {
            play = 'Running'
        } else if (directionPressed) {
            play = 'Walking'
        } else {
            play = 'Idle'
        }
        let delta = this.player.time.delta

        let directionOffset = this.directionOffset(this.keysPressed)
        // rotate model
        if(directionPressed){
            this.rotateQuarternion.setFromAxisAngle(
                this.rotateAngle,
                directionOffset
            );
            this.player.model.quaternion.rotateTowards(this.rotateQuarternion, 0.2);
        }


        // calculate direction
        this.walkDirection.y = 0;
        this.walkDirection.normalize();
        this.walkDirection.applyAxisAngle(this.rotateAngle, directionOffset);

        // run/walk velocity
        const velocity = this.keysPressed[16] ? this.runVelocity : this.walkVelocity;
        
        const moveX = this.walkDirection.x * velocity * delta
        // const moveZ = this.walkDirection.z * velocity * delta
        // this.player.position.x += moveX
        // this.player.position.z += moveZ
        
        if(this.keysPressed[16])
        {
            play =  'Running'
        }

        if(this.keysPressed[38]){
            this.player.position.z+=velocity
        }

        if(this.keysPressed[40]){
            this.player.position.z-=velocity
        }
        if(this.keysPressed[37])
            this.player.position.x+=velocity


        if(this.keysPressed[39])
            this.player.position.x-=velocity

        this.animation.play(play)
        this.animation.current = this.animation.actions[play]
    }

    directionOffset(keysPressed) {
        var directionOffset = 0; // w
    
        if (keysPressed[38]) 
        {
          if (keysPressed[37]) 
          {
            directionOffset = Math.PI / 4; // w+a
          } else if (keysPressed[39]) {
            directionOffset = -Math.PI / 4; // w+d
          }
        } 
        // else if (keysPressed[40]) 
        // {
        //   if (keysPressed[37]) {
        //     directionOffset = Math.PI / 4 + Math.PI / 2; // s+a
        //   } else if (keysPressed[39]) {
        //     directionOffset = -Math.PI / 4 - Math.PI / 2; // s+d
        //   } else {
        //     directionOffset = Math.PI; // s
        //   }
        // } 
        else if (keysPressed[37]) 
        {
          directionOffset = Math.PI / 2; // a
        } 
        else if 
        (keysPressed[39]) {
          directionOffset = -Math.PI / 2; // d
        }
        return directionOffset;
      }
    
}