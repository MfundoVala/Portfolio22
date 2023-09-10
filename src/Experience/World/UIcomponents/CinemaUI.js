import * as THREE from "three";
import * as ThreeMeshUI from "three-mesh-ui";
import Experience from "../../Experience.js";
import FontJSON from "../../../../static/assets/Roboto-msdf.json";
import FontImage from "../../../../static/assets/Roboto-msdf.png";
import { VRButton } from "three/examples/jsm/webxr/VRButton.js";
import CinemaScreen from "./CinemaScreen.js";

export default class CinemaUI {
  constructor() {
    this.experience = new Experience();
    this.scene = this.experience.scene;
    this.resources = this.experience.resources;
    this.time = this.experience.time;
    this.debug = this.experience.debug;
    this.meshes = [];
    this.currentMesh = 0;
    // document.body.appendChild( VRButton.createButton( this.experience.renderer ) );
    this.makeCinemaScreen("malume");
    this.makeCinemaScreen("spova");
    this.makeCinemaScreen("keen");
    this.makeButtons();
    this.showMesh(0);
    // console.log(this.meshes);
  }

  makeCinemaScreen(text) {
    let screen = new CinemaScreen().create(text);
    this.meshes.push(screen);
    this.scene.add(screen);
  }

  // Shows the primitive mesh with the passed ID and hide the others

  showMesh(id) {
    this.meshes.forEach((mesh, i) => {
      mesh.visible = i === id ? true : false;
    });
  }

  makeButtons() {
    const scale = 20;

    // Container block, in which we put the two buttons.
    // We don't define width and height, it will be set automatically from the children's dimensions
    // Note that we set contentDirection: "row-reverse", in order to orient the buttons horizontally

    this.panel = new ThreeMeshUI.Block({
      justifyContent: "center",
      contentDirection: "row-reverse",
      fontFamily: FontJSON,
      fontTexture: FontImage,
      fontSize: 0.07 * scale,
      padding: 0.02 * scale,
      borderRadius: 0.11 * scale,
    });

    this.panel.position.set(125, 2, 150);
    this.panel.rotation.y = -Math.PI / 2;

    this.scene.add(this.panel);

    // BUTTONS

    // We start by creating objects containing options that we will use with the two buttons,
    // in order to write less code.

    const buttonOptions = {
      width: 0.4 * scale,
      height: 0.15 * scale,
      justifyContent: "center",
      offset: 0.05 * scale,
      margin: 0.02 * scale,
      borderRadius: 0.075 * scale,
    };

    // Options for component.setupState().
    // It must contain a 'state' parameter, which you will refer to with component.setState( 'name-of-the-state' ).

    this.hoveredStateAttributes = {
      state: "hovered",
      attributes: {
        offset: 0.035,
        backgroundColor: new THREE.Color(0x999999),
        backgroundOpacity: 1,
        fontColor: new THREE.Color(0xffffff),
      },
    };

    this.idleStateAttributes = {
      state: "idle",
      attributes: {
        offset: 0.035,
        backgroundColor: new THREE.Color(0x666666),
        backgroundOpacity: 0.3,
        fontColor: new THREE.Color(0xffffff),
      },
    };

    // Buttons creation, with the options objects passed in parameters.

    const buttonNext = new ThreeMeshUI.Block(buttonOptions);
    const buttonPrevious = new ThreeMeshUI.Block(buttonOptions);

    // Add text to buttons

    buttonNext.add(new ThreeMeshUI.Text({ content: "next" }));

    buttonPrevious.add(new ThreeMeshUI.Text({ content: "previous" }));

    // Create states for the buttons.
    // In update, we call component.setState( 'state-name' ) when mouse hover or click

    this.selectedAttributes = {
      offset: 0.02,
      backgroundColor: new THREE.Color(0x777777),
      fontColor: new THREE.Color(0x222222),
    };

    buttonNext.setupState({
      state: "selected",
      attributes: this.selectedAttributes,
      onSet: () => {
        this.currentMesh = (this.currentMesh + 1) % 3;
        this.showMesh(this.currentMesh);
      },
    });
    buttonNext.setupState(this.hoveredStateAttributes);
    buttonNext.setupState(this.idleStateAttributes);

    //

    buttonPrevious.setupState({
      state: "selected",
      attributes: this.selectedAttributes,
      onSet: () => {
        this.currentMesh -= 1;
        if (this.currentMesh < 0) this.currentMesh = 2;
        this.showMesh(this.currentMesh);
      },
    });
    buttonPrevious.setupState(this.hoveredStateAttributes);
    buttonPrevious.setupState(this.idleStateAttributes);

    //

    this.panel.add(buttonNext, buttonPrevious);
    this.experience.objsToTest.push(buttonNext, buttonPrevious);
  }

  updateButtons() {
    // Find closest intersecting object

    let intersect;

    if (this.experience.mouse.x !== null && this.experience.mouse.y !== null) {
      this.experience.raycaster.setFromCamera(
        this.experience.mouse,
        this.experience.camera.instance
      );

      intersect = this.experience.raycast();
    }

    // Update targeted button state (if any)
    // console.log("1");

    if (intersect && intersect.object.isUI) {
      // console.log("2");

      if (this.experience.selectState) {
        // Component.setState internally call component.set with the options you defined in component.setupState
        intersect.object.setState("selected");
      } else {
        // Component.setState internally call component.set with the options you defined in component.setupState
        intersect.object.setState("hovered");
      }
    }

    // Update non-targeted buttons state

    this.experience.objsToTest.forEach((obj) => {
      if ((!intersect || obj !== intersect.object) && obj.isUI) {
        // Component.setState internally call component.set with the options you defined in component.setupState
        obj.setState("idle");
      }
    });
  }

  update() {
    this.updateButtons();
    ThreeMeshUI.update();
  }
}
