import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Hal from './Hal.js'
import Model from './Model.js'
import * as THREE from 'three'

export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.player = new Hal()
            this.letters = new Model('letters',160, true)
            this.skyDome = new Model('skydome',0, false)
            this.trees = new Model('trees',0, false)
            this.environment = new Environment()
            this.cameraPos = new THREE.Object3D
            this.cameraTempPos = new THREE.Vector3
            this.player.model.add(this.cameraPos)
            this.cameraPos.position.set(0, 3, -16);
        })
    }

    update()
    {
        if(this.player)
            this.player.update()
        
        if(this.letters)
            this.letters.update()
        
        if(this.trees)
            this.letters.update()

        if(this.skyDome)
            this.skyDome.update()
        
        if(this.cameraPos)
            this.cameraTempPos.setFromMatrixPosition(this.cameraPos.matrixWorld)

    }
}