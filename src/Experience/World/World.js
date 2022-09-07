import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
import Hal from './Hal.js'

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
            this.fox = new Hal()
            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.fox)
            this.fox.update()
    }
}