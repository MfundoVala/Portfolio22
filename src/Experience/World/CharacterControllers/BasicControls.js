var camera, scene, renderer, mesh, goal, keys, follow;

var time = 0;
var newPosition = new THREE.Vector3();
var matrix = new THREE.Matrix4();

var stop = 1;
var DEGTORAD = 0.01745327;
var temp = new THREE.Vector3();
var walkDirection = new THREE.Vector3();
var ghostCamPosA = new THREE.Vector3();
var ghostCamPosB = new THREE.Vector3();
var SafetyDistance = 0.3;
var velocity = 0.0;
var speed = 0.0;

init();
animate();

function init() {
  camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.01,
    10
  );
  camera.position.set(0, 0.3, 0);

  scene = new THREE.Scene();
  camera.lookAt(scene.position);

  var geometry = new THREE.BoxBufferGeometry(0.2, 0.2, 0.2);
  var material = new THREE.MeshNormalMaterial();

  mesh = new THREE.Mesh(geometry, material);

  goal = new THREE.Object3D();
  follow = new THREE.Object3D();
  follow.position.z = -SafetyDistance;
  mesh.add(follow);

  goal.add(camera);
  scene.add(mesh);

  var gridHelper = new THREE.GridHelper(40, 40);
  scene.add(gridHelper);

  scene.add(new THREE.AxesHelper());

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  keys = {
    a: false,
    s: false,
    d: false,
    w: false,
  };

  document.body.addEventListener("keydown", function (e) {
    const key = e.code.replace("Key", "").toLowerCase();
    if (keys[key] !== undefined) keys[key] = true;
  });
  document.body.addEventListener("keyup", function (e) {
    const key = e.code.replace("Key", "").toLowerCase();
    if (keys[key] !== undefined) keys[key] = false;
  });
}

function animate() {
  requestAnimationFrame(animate);

  speed = 0.0;

  if (keys.w) speed = 0.01;
  else if (keys.s) speed = -0.01;

  velocity += (speed - velocity) * 0.3;
  mesh.translateZ(velocity);

  if (keys.a) mesh.rotateY(0.05);
  else if (keys.d) mesh.rotateY(-0.05);

  ghostCamPosA.lerp(mesh.position, 0.4);
  ghostCamPosB.copy(goal.position);

  walkDirection.copy(ghostCamPosA).sub(ghostCamPosB).normalize();
  const dis = ghostCamPosA.distanceTo(ghostCamPosB) - SafetyDistance;
  goal.position.addScaledVector(walkDirection, dis);
  goal.position.lerp(temp, 0.02);
  temp.setFromMatrixPosition(follow.matrixWorld);

  camera.lookAt(mesh.position);

  renderer.render(scene, camera);
}
