import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Hal
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('hal')
        }

        // Resource
        this.resource = this.resources.items.halModel

        this.setModel()
        this.setAnimation()
    }

    setModel()
    {
        this.model = this.resource.scene
        // this.model.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }

    setAnimation()
    {
        this.animation = {}
        
        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        // Actions
        this.animation.actions = {}
        
        this.animation.actions.idle = this.animation.mixer.clipAction(this.resource.animations[2])
        this.animation.actions.dancing = this.animation.mixer.clipAction(this.resource.animations[0])
        this.animation.actions.dead = this.animation.mixer.clipAction(this.resource.animations[1])
        this.animation.actions.jumping = this.animation.mixer.clipAction(this.resource.animations[3])
        this.animation.actions.punching = this.animation.mixer.clipAction(this.resource.animations[5])
        this.animation.actions.walking = this.animation.mixer.clipAction(this.resource.animations[10])
        this.animation.actions.thumbsup = this.animation.mixer.clipAction(this.resource.animations[9])
        this.animation.actions.sitting = this.animation.mixer.clipAction(this.resource.animations[8])
        this.animation.actions.no = this.animation.mixer.clipAction(this.resource.animations[4])
        this.animation.actions.running = this.animation.mixer.clipAction(this.resource.animations[6])
        
        this.animation.actions.current = this.animation.actions.idle
        this.animation.actions.current.play()

        // Play the action
        this.animation.play = (name) =>
        {
            const newAction = this.animation.actions[name]
            const oldAction = this.animation.actions.current

            newAction.reset()
            newAction.play()
            newAction.crossFadeFrom(oldAction, 1)

            this.animation.actions.current = newAction
        }

        // Debug
        if(this.debug.active)
        {
            const debugObject = {
                playIdle: () => { this.animation.play('idle') },
                playWalking: () => { this.animation.play('walking') },
                playThumbsUp: () => { this.animation.play('thumbsup') },
                playSitting: () => { this.animation.play('sitting') },
                playPunching: () => { this.animation.play('punching') },
                playRunning: () => { this.animation.play('running') },
                playDead: () => { this.animation.play('dead') },
                playDancing: () => { this.animation.play('dancing') },
                playJumping: () => { this.animation.play('jumping') },
                playNo: () => { this.animation.play('no') },
            }
            this.debugFolder.add(debugObject, 'playIdle')
            this.debugFolder.add(debugObject, 'playWalking')
            this.debugFolder.add(debugObject, 'playSitting')
            this.debugFolder.add(debugObject, 'playPunching')
            this.debugFolder.add(debugObject, 'playRunning')
            this.debugFolder.add(debugObject, 'playDead')
            this.debugFolder.add(debugObject, 'playDancing')
            this.debugFolder.add(debugObject, 'playJumping')
            this.debugFolder.add(debugObject, 'playNo')
            this.debugFolder.add(debugObject, 'playThumbsUp')
        }
    }

    update()
    {
        this.animation.mixer.update(this.time.delta * 0.001)
    }
}