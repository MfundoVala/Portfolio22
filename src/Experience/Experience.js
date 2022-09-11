import * as THREE from 'three'

import Debug from './Utils/Debug.js'
import Sizes from './Utils/Sizes.js'
import Time from './Utils/Time.js'
import Camera from './Camera.js'
import Renderer from './Renderer.js'
import World from './World/World.js'
import Resources from './Utils/Resources.js'

import sources from './sources.js'

let instance = null

export default class Experience
{
    constructor(_canvas)
    {
        // Singleton
        if(instance)
        {
            return instance
        }
        instance = this
        
        // Global access
        window.experience = this

        // Options
        this.canvas = _canvas

        // Setup
        this.debug = new Debug()
        this.sizes = new Sizes()
        this.time = new Time()
        this.scene = new THREE.Scene()
        this.resources = new Resources(sources)
        this.camera = new Camera()
        this.renderer = new Renderer()
        this.world = new World()
        this.config = {}

        this.scene.background = new THREE.Color( 0xffff );

        //keys
        document.addEventListener('keydown',(event)=>{
            console.log(event.keyCode)
            if(this.world.player)
            this.world.player.characterControls.keysPressed[event.keyCode] = true
        })

        document.addEventListener('keyup',(event)=>{
            console.log(event.keyCode)
            if(this.world.player)
            this.world.player.characterControls.keysPressed[event.keyCode] = false
        })

        window.addEventListener('touchstart', () =>
        {
            this.config.touch = true
            this.world.controls.setTouch()

            // this.passes.horizontalBlurPass.strength = 1
            // this.passes.horizontalBlurPass.material.uniforms.uStrength.value = new THREE.Vector2(this.passes.horizontalBlurPass.strength, 0)
            // this.passes.verticalBlurPass.strength = 1
            // this.passes.verticalBlurPass.material.uniforms.uStrength.value = new THREE.Vector2(0, this.passes.verticalBlurPass.strength)
        }, { once: true })

        // compute mouse position in normalized device coordinates
        // (-1 to +1) for both directions.
        // Used to raycasting against the interactive elements
        this.objsToTest = [];

        this.raycaster = new THREE.Raycaster();

        this.mouse = new THREE.Vector2();
        this.mouse.x = this.mouse.y = null;

        this.selectState = false;

        window.addEventListener( 'pointermove', ( event ) => {
            this.mouse.x = ( event.clientX / this.sizes.width ) * 2 - 1;
            this.mouse.y = -( event.clientY / this.sizes.height ) * 2 + 1;
        } );

        window.addEventListener( 'pointerdown', () => {
            this.selectState = true;
        } );

        window.addEventListener( 'pointerup', () => {
            this.selectState = false;
        } );

        window.addEventListener( 'touchstart', ( event ) => {
            this.selectState = true;
            this.mouse.x = ( event.touches[ 0 ].clientX / this.sizes.width ) * 2 - 1;
            this.mouse.y = -( event.touches[ 0 ].clientY / this.sizes.height ) * 2 + 1;
        } );

        window.addEventListener( 'touchend', () => {
            this.selectState = false;
            this.mouse.x = null;
            this.mouse.y = null;
        } );

        // Resize event
        this.sizes.on('resize', () =>
        {
            this.resize()
        })

        // Time tick event
        this.time.on('tick', () =>
        {
            this.update()
        })
    }

    resize()
    {
        this.camera.resize()
        this.renderer.resize()
    }

    raycast() {

        return this.objsToTest.reduce( ( closestIntersection, obj ) => {
    
            const intersection = this.raycaster.intersectObject( obj, true );
    
            if ( !intersection[ 0 ] ) return closestIntersection;
    
            if ( !closestIntersection || intersection[ 0 ].distance < closestIntersection.distance ) {
    
                intersection[ 0 ].object = obj;
    
                return intersection[ 0 ];
    
            }
    
            return closestIntersection;
    
        }, null );
    
    }

    update()
    {
        this.camera.update()
        this.world.update()
        this.renderer.update()
    }

    destroy()
    {
        this.sizes.off('resize')
        this.time.off('tick')

        // Traverse the whole scene
        this.scene.traverse((child) =>
        {
            // Test if it's a mesh
            if(child instanceof THREE.Mesh)
            {
                child.geometry.dispose()

                // Loop through the material properties
                for(const key in child.material)
                {
                    const value = child.material[key]

                    // Test if there is a dispose function
                    if(value && typeof value.dispose === 'function')
                    {
                        value.dispose()
                    }
                }
            }
        })

        this.camera.controls.dispose()
        this.renderer.instance.dispose()


        if(this.debug.active)
            this.debug.ui.destroy()
    }
}