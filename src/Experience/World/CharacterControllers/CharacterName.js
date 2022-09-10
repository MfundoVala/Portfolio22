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
        this.position = new Vector3(0,0,0)
        document.body.appendChild( VRButton.createButton( this.experience.renderer ) );

        this.makeTextPanel()
    }

    makeTextPanel() 
    {
        this.container = new ThreeMeshUI.Block( {
            width: 5,
            height: 3,
            padding: 0.05,
            justifyContent: 'center',
            textAlign: 'left',
            fontFamily: FontJSON,
            fontTexture: FontImg
        } );
    
        this.container.position.copy(this.position);
        this.container.rotation.x = -0.55;
        this.scene.add( this.container );
    
        //
    
        this.container.add(
            new ThreeMeshUI.Text( {
                content: 'HAL',
                fontSize: 0.055
            } ),
    
        );
    }

    update(){
        if(this.experience.world.player)
        // console.log(this.experience.world.player)
            this.container.position.copy(this.experience.world.player.position)
            this.container.position.y = 2
        ThreeMeshUI.update();
        
    }

}