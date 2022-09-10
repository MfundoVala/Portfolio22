import * as THREE from 'three'
import { Vector3 } from 'three'
import Experience from '../../Experience.js'
import CharacterControls from './CharacterControls.js'
import ThreeMeshUI from 'three-mesh-ui'
import CharacterName from './CharacterName.js'


export class Hal
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.position = new Vector3(0,0,14)
        // this.position = new Vector3(110,0,145)
        // Resource
        this.resource = this.resources.items.halModel

        // Debug
        if(this.debug.active)
        {
            this.statesFolder = this.debug.ui.addFolder('states')
            this.emotesFolder = this.debug.ui.addFolder('emotes')
        }


        this.setModel()
        this.setAnimation()
        // this.makeTextPanel()
    }

    setModel()
    {
        this.model = this.resource.scene
        // this.model.scale.set(0.02, 0.02, 0.02)
        this.scene.add(this.model)
        this.namePanel = new CharacterName()

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
        const states = [ 'Idle', 'Walking', 'Running', 'Dance', 'Death', 'Sitting', 'Standing' ];
        const emotes = [ 'Jump', 'Yes', 'No', 'Wave', 'Punch', 'ThumbsUp' ];

        this.animation = {}
        
        // Mixer
        this.animation.mixer = new THREE.AnimationMixer(this.model)
        
        // Actions
        this.animation.actions = {}
        for ( let i = 0; i < this.resource.animations.length; i ++ ) {

            const clip = this.resource.animations[ i ];
            const action = this.animation.mixer.clipAction( clip );
            this.animation.actions[ clip.name ] = action;

            if ( emotes.indexOf( clip.name ) >= 0 || states.indexOf( clip.name ) >= 4 ) {

                action.clampWhenFinished = true;
                action.loop = THREE.LoopOnce;

            }

        }
        console.log(this.animation.actions);


        this.characterControls = new CharacterControls(this,this.animation, "Idle")

        // Debug
        if(this.debug.active)
        {
            const debugObject = {
                playIdle: () => { this.animation.play('Idle') },
                playWalking: () => { this.animation.play('Walking') },
                playThumbsUp: () => { this.animation.play('thumbsup') },
                playSitting: () => { this.animation.play('sitting') },
                playPunching: () => { this.animation.play('punching') },
                playRunning: () => { this.animation.play('running') },
                playDead: () => { this.animation.play('dead') },
                playDancing: () => { this.animation.play('dancing') },
                playJumping: () => { this.animation.play('jumping') },
                playNo: () => { this.animation.play('no') },
            }
            this.statesFolder.add(debugObject, 'playIdle')
            this.statesFolder.add(debugObject, 'playWalking')
            this.statesFolder.add(debugObject, 'playSitting')
            this.statesFolder.add(debugObject, 'playPunching')
            this.statesFolder.add(debugObject, 'playRunning')
            this.statesFolder.add(debugObject, 'playDead')
            this.statesFolder.add(debugObject, 'playDancing')
            this.statesFolder.add(debugObject, 'playJumping')
            this.statesFolder.add(debugObject, 'playNo')
            this.statesFolder.add(debugObject, 'playThumbsUp')
        }

    }
    

    update()
    {

        this.animation.mixer.update(this.time.delta * 0.001)
        this.model.position.copy(this.position)

        if (this.characterControls)
            this.characterControls.update()
        if(this.namePanel)
            this.namePanel.update()
 
    }
}