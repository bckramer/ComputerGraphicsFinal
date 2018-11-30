// Set the scene size.
const WIDTH = 600;
const HEIGHT = 600;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;
const numParticles = 1000;
let startColor;
let endColor;
const objects = [];

var spawnDensity = document.getElementById("spawnDensity").value;
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
    this.spawnDensity = document.getElementById("spawnDensity").value;
    this.lifetime = document.getElementById("lifetime").value;
    this.size = document.getElementById("size").value;
    this.speed = document.getElementById("speed").value;
    this.acceleration = document.getElementById("acceleration").value;
    this.startColor.r = this.startColorR = document.getElementById("startColorR").value;
    this.startColor.g = this.startColorG = document.getElementById("startColorG").value;
    this.startColor.b = this.startColorB = document.getElementById("startColorB").value;
    this.endColor.r = this.endColorR = document.getElementById("endColorR").value;
    this.endColor.g = this.endColorG = document.getElementById("endColorG").value;
    this.endColor.b = this.endColorB = document.getElementById("endColorB").value;
}

var xSpeed = 3.0;
var ySpeed = 3.0;
var zSpeed = 3.0;

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode === 87) {
        //w
        user.position.z -= zSpeed;
    } else if (keyCode === 83) {
        //s
        user.position.z += zSpeed;
    } else if (keyCode === 65) {
        //a
        user.position.x -= xSpeed;
    } else if (keyCode === 68) {
        //d
        user.position.x += xSpeed;
    } else if (keyCode === 82) {
        //r
        user.position.y += ySpeed;
    } else if (keyCode === 70) {
        //f
        user.position.y -= ySpeed;
    } else if (keyCode === 32) {
        //space
        user.position.set(0, 0, 0);
    }
}

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

for (let i = 0; i < numParticles; i++) {

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

    particleMesh.position.x = user.position.x + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0);
    particleMesh.position.y = user.position.y + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0);
    particleMesh.position.z = user.position.z + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0);

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

    let particle;

    for (let i = 0; i < objects.length; i++) {

        particle = objects[i];

        //    objects[i].position.x = Math.random() * 250 - 175;
        if (particle.getLifeLeft() < 0) {
            let spawnX = user.position.x + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0);
            let spawnY = user.position.y + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0);
            let spawnZ = user.position.z + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0);
            particle.setPosition(spawnX, spawnY, spawnZ);
            particle.setLifetime(this.lifetime);
            particle.resetColor();
            particle.setSpeed(this.speed);
            particle.setAcceleration(this.acceleration);
            particle.swapColor(this.startColor, this.endColor);
        } else {
            particle.update();
        }
    }
    requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);