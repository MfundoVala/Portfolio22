import * as THREE from 'three'
import { Vector3 } from 'three'
import Experience from '../Experience.js'

export default class Letters
{
    constructor(model,position,cast)
    {
        this.cast = cast
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.position = new Vector3(0,0,position)
        // Resource
        this.resource = this.resources.items[model]

        this.setModel()
        this.update()
    }

    setModel()
    {
        this.model = this.resource.scene
        this.model.scale.set(5, 5, 5)
        // this.model.rotateY(Math.PI)
        this.model.position.copy(this.position)

        this.scene.add(this.model)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = this.cast
            }
        })
    }


    update()
    {
        // this.position.z+=0.5
    }
}