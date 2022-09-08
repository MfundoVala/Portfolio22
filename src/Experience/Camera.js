import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.player = this.experience.player

        this.setInstance()
        this.setControls()
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(70, this.sizes.width / this.sizes.height, 0.01, 100)
        this.instance.position.set( 0, 0, -16 );

        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        this.controls.update()
        if(this.experience.world.player)
            // console.log(this.experience.world.player)
            this.instance.lookAt(this.experience.world.player.position)
            if(this.experience.world.cameraTempPos)
                this.instance.position.lerp(this.experience.world.cameraTempPos, 0.2);


    }
}