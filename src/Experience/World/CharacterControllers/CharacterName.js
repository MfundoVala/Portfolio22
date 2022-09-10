import * as THREE from 'three'
import { Vector3 } from 'three'
import * as ThreeMeshUI from 'three-mesh-ui'
import Experience from '../../Experience.js'
import FontJSON from '../../../../static/assets/Roboto-msdf.json'
import FontImg from '../../../../static/assets/Roboto-msdf.png'
import { VRButton } from 'three/examples/jsm/webxr/VRButton.js';

export default class CharacterName {

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.position = new Vector3(0,0,5)
        document.body.appendChild( VRButton.createButton( this.experience.renderer ) );

        this.makeTextPanel()
    }

    makeTextPanel() 
    {
        this.container = new ThreeMeshUI.Block( {
            width: 4,
            height: 2,
            padding: 0.05,
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: FontJSON,
            fontTexture: FontImg
        } );
    
        this.container.position.copy(this.position);
        // this.container.rotation.x = +0.55;
        this.container.rotation.y = Math.PI;
        this.scene.add( this.container );
    
        //
    
        this.container.add(
            new ThreeMeshUI.Text( {
                content: 'HAL',
                fontSize: 1
            } ),
    
        );
    }

    update(){
        if(this.experience.world.player)
            this.container.position.copy(this.experience.world.player.position)
            this.container.position.y = 6
        this.container.set( {
                // borderRadius: [ 0, 0.2 + 0.2 * Math.sin( Date.now() / 500 ), 0, 0 ],
                borderWidth: 0.05 - 0.06 * Math.sin( Date.now() / 500 ),
                borderColor: new THREE.Color( 0.5 + 0.5 * Math.sin( Date.now() / 500 ), 0.5, 1 ),
                borderOpacity: 1
            } );
        ThreeMeshUI.update();
        
    }

}