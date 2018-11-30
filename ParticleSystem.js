// Set the scene size.
const WIDTH = 600;
const HEIGHT = 600;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;
const numParticles = 1000;
var startColor;
var endColor;
var objects = [];

var compactability = document.getElementById("compactability").value;
var lifetime = document.getElementById("lifetime").value;
var size = document.getElementById("size").value;
var speed = document.getElementById("speed").value;
var acceleration = document.getElementById("acceleration").value;
var startColorR = document.getElementById("startColorR").value;
var startColorG = document.getElementById("startColorG").value;
var startColorB = document.getElementById("startColorB").value;
var endColorR = document.getElementById("endColorR").value;
var endColorG = document.getElementById("endColorG").value;
var endColorB = document.getElementById("endColorB").value;

function updateTextBoxes() {
    this.compactability = document.getElementById("compactability").value;
    this.lifetime = document.getElementById("lifetime").value;
    this.size = document.getElementById("size").value;
    this.speed = document.getElementById("speed").value;
    this.acceleration = document.getElementById("acceleration").value;
    startColor.r = this.startColorR = document.getElementById("startColorR").value;
    startColor.g = this.startColorG = document.getElementById("startColorG").value;
    startColor.b = this.startColorB = document.getElementById("startColorB").value;
    endColor.r = this.endColorR = document.getElementById("endColorR").value;
    endColor.g = this.endColorG = document.getElementById("endColorG").value;
    endColor.b = this.endColorB = document.getElementById("endColorB").value;
}

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
    new THREE.MeshPhongMaterial(
        {
            color: new THREE.Color(0xFF0000)
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

for (var i = 0; i < numParticles; i++) {

    let particleMaterial =
        new THREE.MeshPhongMaterial(
            {
                color: new THREE.Color(0xFFFFFF)
            });

    let particleMesh = new THREE.Mesh(
        // new THREE.SphereGeometry(
        //     0.5,
        //     RADIUS,
        //     RINGS),
        new THREE.PlaneGeometry(
            1.0,
            1.0,
            1.0),

        particleMaterial);

    particleMesh.position.x = user.position.x + Math.random() * 20 - 10;
    particleMesh.position.y = user.position.y + Math.random() * 20 - 10;
    particleMesh.position.z = user.position.z + Math.random() * 20 - 10;

    this.startColor = new THREE.Color(this.startColorR, this.startColorG, this.startColorB);
    this.endColor = new THREE.Color(this.endColorR, this.endColorG, this.endColorB);

    let particle =
        new ParticleObject(
                particleMesh, //Mesh
                this.lifetime * Math.random(), //Lifetime. If there is no random, all the particle will spawn and die at the same time
                this.speed, //Speed
                this.acceleration, //Acceleration
                new Vector3([1 - (2 * Math.random()), 1 - (2 *Math.random()), 1 - (2 * Math.random())]), //Direction
                new THREE.Color(this.startColor), //StartColor
                new THREE.Color(this.endColor) //EndColor
            );


    objects.push(particle);
    scene.add(particle.mesh);
}

function update() {
    updateTextBoxes();
    renderer.render(scene, camera);
    for (var i = 0; i < objects.length; i++) {
        //    objects[i].position.x = Math.random() * 250 - 175;
        if (objects[i].lifetime < 0) {
            let spawnX = user.position.x + Math.random() * 20 - 10;
            let spawnY = user.position.y;
            let spawnZ = user.position.z + Math.random() * 20 - 10;
            objects[i].setPosition(spawnX, spawnY, spawnZ);
            objects[i].lifetime = this.lifetime;
            objects[i].resetColor();
            objects[i].speed = this.speed;
            objects[i].acceleration = this.acceleration;
        } else {
            objects[i].updatePosition();
            objects[i].updateLifeTime();
            objects[i].adjustSpeedByAcceleration();
            objects[i].updateColor();
            objects[i].swapColor(this.startColor, this.endColor);
        }
    }
    requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);