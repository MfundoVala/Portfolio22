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
        
        
          //
        
          const rightSubBlock = new ThreeMeshUI.Block({
            margin: 0.025 * scale,
            backgroundColor: white,
          });


        
          const subSubBlock1 = new ThreeMeshUI.Block({
            height: 0.28 * scale,
            width: 0.5 * scale,
            margin: 0.025 * scale,
            padding: 0.02 * scale,
            fontSize: 0.04 * scale,
            justifyContent: "start",
            backgroundOpacity: 0,
            textAlign: 'left',

          }).add(
            new ThreeMeshUI.Text({
                content: "Skills:",
                fontColor: new THREE.Color(0x92e66c),
                fontSize: 0.08 * scale,
                backgroundColor: new THREE.Color(0x92e66c)
            }),
            new ThreeMeshUI.Text({
              content: contentName === 'spova' ? "\nFigma, Wordpress, Threejs" : "\nFigma, React Native, React, Firebase",
            }),
            // new ThreeMeshUI.Text({
            //   content: " appearance.",
            // })
          );

          const block2Content = {}
          block2Content['malume'] = 'A cross platform react native liftclub app built in react native. This is a ride sharing app built with the South African minibus taxi industry in mind. React was used for the web landing page and admin dashboard and firebase was used for the backend. This was done in collaboration with Franck Tamla whom I met during our MTN App of the year entry and win.'
          block2Content['keen'] = 'A cross platform react native liftclub app built in react native. This is a travel app built to service tourism providers. Built in partnership with CURIOCITY a South African hotel and travel company. I did the wireframe and interactive prototype in figma, and built the Android and iOS app using react native, with firebase as a backend.'
          block2Content['spova'] = 'An online fashion e-commerce solution built in partnership with South African music artist OKMALUMKOOLKAT. This platform was built using wordpress as a cms with graphics delivered using Three js.'
        
          const subSubBlock2 = new ThreeMeshUI.Block({
            height: 0.53 * scale,
            width: 0.5 * scale,
            margin: 0.01 * scale,
            padding: 0.02 * scale,
            fontSize: 0.034 * scale,
            alignItems: "start",
            textAlign: 'left',
            backgroundOpacity: 0,
          }).add(
            new ThreeMeshUI.Text({
              content: block2Content[contentName]
            })
          );
        
          rightSubBlock.add(subSubBlock2,subSubBlock1);
        
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

        // Create states for the buttons.
        // In update, we call component.setState( 'state-name' ) when mouse hover or click
    
        this.selectedAttributes = {
            offset: 0.02,
            backgroundColor: new THREE.Color( 0x777777 ),
            fontColor: new THREE.Color( 0x222222 )
        };

          this.hoveredStateAttributes = {
            state: 'hovered',
            attributes: {
                offset: 0.035,
                backgroundColor: new THREE.Color( 0x999999 ),
                backgroundOpacity: 0.4,
                fontColor: new THREE.Color( 0xffffff )
            },
        };
    
        this.idleStateAttributes = {
            state: 'idle',
            attributes: {
                offset: 0.035,
                backgroundColor: new THREE.Color( 0x000000 ),
                backgroundOpacity: 1,
                fontColor: new THREE.Color( 0xffffff )
            },
        };

        //setup clickable attributes
          caption.setupState( {
            state: 'selected',
            attributes: this.experience.world.cinema.selectedAttributes,
            onSet: () => {
    
                window.open('https://play.google.com/store/apps/details?id=com.dothething.malumeapp');
    
            }
        } );
          caption.setupState( this.idleStateAttributes );
          caption.setupState( this.hoveredStateAttributes );

          this.experience.objsToTest.push(caption)

        
          rightSubBlock.add(caption);
        

        leftSubBlock.set({
            backgroundTexture: this.resources.items[contentName]
        });

        return container
    }

}