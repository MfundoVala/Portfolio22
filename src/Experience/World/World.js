import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import { Hal } from './CharacterControllers/Hal.js'
import Model from './Model.js'
import * as THREE from 'three'
import CinemaScreen from './UIcomponents/CinemaScreen.js'

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
            // this.floor = new Floor()
            this.player = new Hal()
            this.letters = new Model('letters',160, true)
            // this.letters = new Model('lettersmfundo',250, true)
            this.skyDome = new Model('skydome',0, false)
            this.trees = new Model('trees',0, false)
            this.cinema = new Model('cinema',0,false)
            this.cinemaScreen = new CinemaScreen()
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
        if(this.cinemaScreen)
            this.cinemaScreen.update()
        
        if(this.cameraPos)
            this.cameraTempPos.setFromMatrixPosition(this.cameraPos.matrixWorld)

    }
}