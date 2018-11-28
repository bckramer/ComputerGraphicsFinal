// Set the scene size.
const WIDTH = 600;
const HEIGHT = 600;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;
var objects = [];

var compactability = document.getElementById("compactability").value;
var lifetime = document.getElementById("lifetime").value;
var size = document.getElementById("size").value;
var speed = document.getElementById("speed").value;
var startColor = document.getElementById("startColor").value;
var endColor = document.getElementById("endColor").value;

// Get the DOM element to attach to
const container =
    document.querySelector('#container');

// Create a WebGL renderer, camera
// and a scene
const renderer = new THREE.WebGLRenderer();
const camera =
    new THREE.PerspectiveCamera(
        VIEW_ANGLE,
        ASPECT,
        NEAR,
        FAR
    );

const scene = new THREE.Scene();

// Add the camera to the scene.
scene.add(camera);

// Start the renderer.
renderer.setSize(WIDTH, HEIGHT);

// Attach the renderer-supplied
// DOM element.
container.appendChild(renderer.domElement);

// create a point light
const pointLight =
    new THREE.PointLight(0xFFFFFF);

// set its position
pointLight.position.x = 10;
pointLight.position.y = 50;
pointLight.position.z = 130;

// add to the scene
scene.add(pointLight);

// create the sphere's material
const sphereMaterial =
    new THREE.MeshLambertMaterial(
        {
            color: 0xCC0000
        });

// Set up the sphere vars
const RADIUS = 10;
const SEGMENTS = 16;
const RINGS = 16;

const user = new THREE.Mesh(
    new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS),

    sphereMaterial);

user.position.z = -300;
scene.add(user);


var xSpeed = 3.0;
var ySpeed = 3.0;
var zSpeed = 3.0;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {
        //w
        user.position.z -= zSpeed;
    } else if (keyCode == 83) {
        //s
        user.position.z += zSpeed;
    } else if (keyCode == 65) {
        //a
        user.position.x -= xSpeed;
    } else if (keyCode == 68) {
        //d
        user.position.x += xSpeed;
    } else if (keyCode == 82) {
        //r
        user.position.y += ySpeed;
    } else if (keyCode == 70) {
        //f
        user.position.y -= ySpeed;
    } else if (keyCode == 32) {
        //space
        user.position.set(0, 0, 0);
    }
};

//    var particleCount = 1800,
//        particles = new THREE.Geometry(),
//        pMaterial = new THREE.PointsMaterial({
//            color: 0xFF0000,
//            size: 10000
//        });

//    for (var p = 0; p < particleCount; p++) {
//
//        // create a particle with random
//        // position values, -250 -> 250
//        var pX = Math.random() * 500 - 250,
//            pY = Math.random() * 500 - 250,
//            pZ = Math.random() * 500 - 250,
//            particle = new THREE.Vector3(
//                new THREE.Vector3(pX, pY, pZ)
//            );
//
//        // add it to the geometry
//        particles.vertices.push(particle);
//    }
//
//    var particleSystem = new THREE.Points(
//        particles,
//        pMaterial);
//
//    scene.add(particleSystem);

for (var i = 0; i < 500; i++) {

    let particleMesh = new THREE.Mesh(
        new THREE.SphereGeometry(
            2,
            SEGMENTS,
            RINGS),

        sphereMaterial);

    particleMesh.position.x = user.position.x + Math.random() * 20 - 10;
    particleMesh.position.y = user.position.y + Math.random() * 200;
    particleMesh.position.z = user.position.z + Math.random() * 20 - 10;

    objects.push(particleMesh);
    scene.add(particleMesh);

    let newParticle = new ParticleObject(
        particleMesh,
        1.0,
        0.0,
        new Vector3([0, 0, 0])
    );
}

function update() {
    renderer.render(scene, camera);
    for (var i = 0; i < objects.length; i++) {
        //    objects[i].position.x = Math.random() * 250 - 175;
        if (objects[i].position.y > 200) {
            objects[i].position.x = user.position.x + Math.random() * 20 - 10;
            objects[i].position.y = user.position.y;
            objects[i].position.z = user.position.z + Math.random() * 20 - 10;
        } else {
            objects[i].position.y = objects[i].position.y + 0.3;
        }
    }
    requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);