import * as THREE from "three";
import { Quaternion } from "three";
import Experience from "../../Experience";
import nipplejs from "nipplejs";

export default class CharacterControls {
  constructor(player, animation, firstAction) {
    this.experience = new Experience();
    this.player = player;
    this.speed = 0.0;
    this.velocity = 0.0;
    this.walkDirection = new THREE.Vector3();
    this.ghostCamPosA = new THREE.Vector3();
    this.ghostCamPosB = new THREE.Vector3();
    this.goal = new THREE.Object3D();
    this.follow = new THREE.Object3D();
    this.SafetyDistance = 0.3;
    this.follow.position.z = -this.SafetyDistance;
    this.player.model.add(this.follow);
    this.goal.add(this.experience.camera);
    this.temp = new THREE.Vector3();
    this.walkDirection = new THREE.Vector3();
    this.run = false;
    this.currentAction;
    this.currentAction = firstAction;
    this.time = player.time;
    this.animation = animation;
    this.sizes = this.experience.sizes;

    // Play the action
    this.animation.play = (name) => {
      const newAction = this.animation.actions[name];
      const oldAction = this.animation.actions.current;
      if (typeof oldAction == typeof newAction) oldAction.fadeOut(0.5);
      if (newAction !== oldAction) {
        newAction.reset();
        newAction.play();
        // if (typeof oldAction == typeof newAction)
        //     newAction.crossFadeFrom(oldAction, 1)
      }

      this.animation.actions.current = newAction;
    };

    //keys
    this.keysPressed = {};

    document.addEventListener("keydown", (event) => {
      // console.log(event.keyCode);
      this.keysPressed[event.keyCode] = true;
    });

    document.addEventListener("keyup", (event) => {
      // console.log(event.keyCode);
      this.keysPressed[event.keyCode] = false;
    });

    // create joystick
    this.joystick = nipplejs.create({
      zone: document.getElementById("nipple"),
      mode: "static",
      position: { left: "85%", top: "88%" },
      color: "teal",
      multitouch: false,
      plain: true,
    });
  }

  // constants
  fadeDuration = 0.2;
  runVelocity = 0.2;
  walkVelocity = 0.4;
  // delta = player.time.delta

  update() {
    const KEYLIST = [37, 38, 39, 40];

    const directionPressed = KEYLIST.some(
      (key) => this.keysPressed[key] == true
    );

    var play = "";
    if ((directionPressed && this.run) || (this.joystick.dir && this.run)) {
      play = "Running";
    } else if (directionPressed || this.joystick.dir) {
      play = "Walking";
    } else {
      play = "Idle";
    }
    if (this.keysPressed[16]) {
      play = "Running";
      this.velocity += this.runVelocity;
    }
    // if (this.experience.selectState) {
    //   play = "Punch";
    // }
    let delta = this.player.time.delta;

    this.speed = 0.0;

    // print joystick direction
    this.joystick.on("move", (event, data) => {
      this.joystick.dir = data.direction.angle;
      console.log(data.direction.angle);
    });

    this.joystick.on("end", () => {
      this.joystick.dir = false;
    });

    // move model with joystick or keys
    if (this.keysPressed[38] || this.joystick.dir == "up") {
      this.speed = 0.3;
    } else if (this.keysPressed[40] || this.joystick.dir == "down") {
      this.speed = -0.3;
    }
    this.velocity += (this.speed - this.velocity) * 0.3;
    this.player.model.translateZ(this.velocity);

    // rotate model
    if (this.keysPressed[37] || this.joystick.dir == "left") {
      if (this.joystick.dir) {
        this.player.model.rotateY(0.02);
      } else {
        this.player.model.rotateY(0.05);
      }
    }
    if (this.keysPressed[39] || this.joystick.dir == "right") {
      if (this.joystick.dir) {
        this.player.model.rotateY(-0.02);
      } else {
        this.player.model.rotateY(-0.05);
      }
    }

    this.ghostCamPosA.lerp(this.player.model.position, 0.4);
    this.ghostCamPosB.copy(this.goal.position);
    this.walkDirection
      .copy(this.ghostCamPosA)
      .sub(this.ghostCamPosB)
      .normalize();

    const dis =
      this.ghostCamPosA.distanceTo(this.ghostCamPosB) - this.SafetyDistance;
    this.goal.position.addScaledVector(this.walkDirection, dis);
    this.goal.position.lerp(this.temp, 0.02);
    this.temp.setFromMatrixPosition(this.follow.matrixWorld);

    this.animation.play(play);
    this.animation.current = this.animation.actions[play];
  }
}
