import * as THREE from 'three'
import { Vector3 } from 'three'
import Experience from '../../Experience.js'
import FontJSON from '../../../../static/assets/Roboto-msdf.json'
import FontImg from '../../../../static/assets/Roboto-msdf.png'

export default class CharacterName {

    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.position = new Vector3(0,0,0)
    }

    makeTextPanel() 
    {
        const container = new ThreeMeshUI.Block( {
            width: 1.2,
            height: 0.5,
            padding: 0.05,
            justifyContent: 'center',
            textAlign: 'left',
            fontFamily: FontJSON,
            fontTexture: FontImg
        } );
    
        container.position.set( 0, 1, -1.8 );
        container.rotation.x = -0.55;
        this.scene.add( container );
    
        //
    
        container.add(
            new ThreeMeshUI.Text( {
                content: 'HAL',
                fontSize: 0.055
            } ),
    
        );
    }

}