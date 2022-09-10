import * as THREE from 'three'
import { Vector3 } from 'three'
import FontJSON from '../../../../static/assets/Roboto-msdf.json'
import FontImage from '../../../../static/assets/Roboto-msdf.png'
import Experience from '../../Experience'

export default class CinemaScreen
{
    constructor()
    {
        this.experience = new Experience()
        this.resources = this.experience.resources
        this.position = new Vector3(144,22,150)
    }

    create(contentName)
    {
        let scale = 21
        let white = new THREE.Color( 0xfffffff )
        let container = new ThreeMeshUI.Block( {
            width: 50,
            height: 30,
            padding: 0.05,
            fontColor: new THREE.Color( 0x222222 ),
            backgroundColor: white,
            justifyContent: 'center',
            textAlign: 'center',
            fontFamily: FontJSON,
            fontTexture: FontImage,
            backgroundOpacity: 1
        } );
        // container.add
        // (
        //     new ThreeMeshUI.Text( {
        //         content: contentName,
        //         fontSize: 14,
        //     } ),
        // );
          //

        const title = new ThreeMeshUI.Block({
            height: 0.2 * scale,
            width: 1.5 * scale,
            margin: 0.025 * scale,
            justifyContent: "center",
            fontSize: 0.09 * scale,
            fontColor: white
        });

        title.add(
            new ThreeMeshUI.Text({
            content: contentName.toUpperCase(),
            })
        );

        container.add(title);
    
        container.position.copy(this.position);
        container.rotation.y = -Math.PI/2;

        const leftSubBlock = new ThreeMeshUI.Block({
            height: 0.95 * scale,
            width: 1.0 * scale,
            backgroundColor: white,
            margin: 0.025 * scale,
            padding: 0.025 * scale,
            textAlign: "left",
            justifyContent: "end",
          });
        
          const caption = new ThreeMeshUI.Block({
            height: 0.07 * scale,
            width: 0.37 * scale,
            textAlign: "center",
            justifyContent: "center",
          });
        
          caption.add(
            new ThreeMeshUI.Text({
              content: "Click to open",
              fontColor: white,
              fontSize: 0.04 * scale,
            })
          );
        
          leftSubBlock.add(caption);
        
          //
        
          const rightSubBlock = new ThreeMeshUI.Block({
            margin: 0.025 * scale,
            backgroundColor: white,
          });
        
          const subSubBlock1 = new ThreeMeshUI.Block({
            height: 0.35 * scale,
            width: 0.5 * scale,
            margin: 0.025 * scale,
            padding: 0.02 * scale,
            fontSize: 0.04 * scale,
            justifyContent: "center",
            backgroundOpacity: 0,
          }).add(
            new ThreeMeshUI.Text({
              content: "Known for its extremely keeled dorsal scales that give it a ",
            }),
        
            new ThreeMeshUI.Text({
              content: "bristly",
              fontColor: new THREE.Color(0x92e66c),
            }),
        
            new ThreeMeshUI.Text({
              content: " appearance.",
            })
          );
        
          const subSubBlock2 = new ThreeMeshUI.Block({
            height: 0.53 * scale,
            width: 0.5 * scale,
            margin: 0.01 * scale,
            padding: 0.02 * scale,
            fontSize: 0.025 * scale,
            alignItems: "start",
            textAlign: 'justify',
            backgroundOpacity: 0,
          }).add(
            new ThreeMeshUI.Text({
              content:
                "The males of this species grow to maximum total length of 73 cm (29 in): body 58 cm (23 in), tail 15 cm (5.9 in). Females grow to a maximum total length of 58 cm (23 in). The males are surprisingly long and slender compared to the females.\nThe head has a short snout, more so in males than in females.\nThe eyes are large and surrounded by 9–16 circumorbital scales. The orbits (eyes) are separated by 7–9 scales.",
            })
          );
        
          rightSubBlock.add(subSubBlock1, subSubBlock2);
        
          //
        
          const contentContainer = new ThreeMeshUI.Block({
            contentDirection: "row",
            padding: 0.02 * scale,
            margin: 0.025 * scale,
            backgroundOpacity: 0,
          });
        
          contentContainer.add(leftSubBlock, rightSubBlock);
          container.add(contentContainer);
        
          //
        

        leftSubBlock.set({
            backgroundTexture: this.resources.items[contentName]
        });

        return container
    }

}