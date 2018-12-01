// Set the scene size.
const WIDTH = 600;
const HEIGHT = 600;
var positions, colors, direction;
var bufferGeometry;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;
const numParticles = 100000;
let minLifetime;
let maxLifetime;
let minSize;
let maxSize;
let startColor;
let endColor;
const objects = [];

var spawnDensity = document.getElementById("spawnDensity").value;
var lifetime = document.getElementById("lifetime").value;
var lifetimeVariation = document.getElementById("lifetimeVariation").value;
minLifetime = lifetime - lifetimeVariation / 2.0;
maxLifetime = parseFloat(lifetime) + parseFloat(lifetimeVariation / 2.0);
var size = document.getElementById("size").value;
if (size < 0.001) {
    size = 0.001;
}
var sizeVariation = document.getElementById("sizeVariation").value;
if (size - sizeVariation / 2 < 0.001) {
    minSize = 0.001;
} else {
    minSize = size - sizeVariation / 2.0;
}
maxSize = parseFloat(size) + parseFloat(sizeVariation / 2.0);
var speed = document.getElementById("speed").value;
var acceleration = document.getElementById("acceleration").value;
var startColorR = document.getElementById("startColorR").value;
var startColorG = document.getElementById("startColorG").value;
var startColorB = document.getElementById("startColorB").value;
var endColorR = document.getElementById("endColorR").value;
var endColorG = document.getElementById("endColorG").value;
var endColorB = document.getElementById("endColorB").value;

function updateTextBoxes() {
    spawnDensity = document.getElementById("spawnDensity").value;
    lifetime = document.getElementById("lifetime").value;
    lifetimeVariation = document.getElementById("lifetimeVariation").value;
    minLifetime = lifetime - lifetimeVariation / 2.0;
    maxLifetime = parseFloat(lifetime) + parseFloat(lifetimeVariation / 2.0);

    size = document.getElementById("size").value;
    if (size < 0.001) {
        size = 0.001;
    }
    sizeVariation = document.getElementById("sizeVariation").value;
    if (size - sizeVariation / 2.0 < 0.001) {
        minSize = 0.001;
    } else {
        minSize = size - sizeVariation / 2.0;
    }
    maxSize = parseFloat(size) + parseFloat(sizeVariation / 2.0);
    speed = document.getElementById("speed").value;
    acceleration = document.getElementById("acceleration").value;
    this.startColor.setRGB(
        document.getElementById("startColorR").value,
        document.getElementById("startColorG").value,
        document.getElementById("startColorB").value
    );
    this.endColor.setRGB(
        document.getElementById("endColorR").value,
        document.getElementById("endColorG").value,
        document.getElementById("endColorB").value
    );
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
pointLight.position.set(10, 50, 100);

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


function updateGeomData() {
    var vertices = new Float32Array([
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,

        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, -1.0, 1.0
    ]);
    vertices = vertices * 0.01;
    let x = user.position.x + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0);
    let y = user.position.y + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0);
    let z = user.position.z + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0);
    for (var i = 0; i < numParticles; i++) {
        x = user.position.x + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0);
        y = user.position.y + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0);
        z = user.position.z + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0);
        positions[i * 18 + 0] = positions[i * 18 + 0] + speed * direction[3 * i + 0];
        positions[i * 18 + 1] = positions[i * 18 + 1] + speed * direction[3 * i + 1];
        positions[i * 18 + 2] = positions[i * 18 + 2] + speed * direction[3 * i + 2];
        positions[i * 18 + 3] = positions[i * 18 + 3] + speed * direction[3 * i + 0];
        positions[i * 18 + 4] = positions[i * 18 + 4] + speed * direction[3 * i + 1];
        positions[i * 18 + 5] = positions[i * 18 + 5] + speed * direction[3 * i + 2];
        positions[i * 18 + 6] = positions[i * 18 + 6] + speed * direction[3 * i + 0];
        positions[i * 18 + 7] = positions[i * 18 + 7] + speed * direction[3 * i + 1];
        positions[i * 18 + 8] = positions[i * 18 + 8] + speed * direction[3 * i + 2];
        positions[i * 18 + 9] = positions[i * 18 + 9] + speed * direction[3 * i + 0];
        positions[i * 18 + 10] = positions[i * 18 + 10] + speed * direction[3 * i + 1];
        positions[i * 18 + 11] = positions[i * 18 + 11] + speed * direction[3 * i + 2];
        positions[i * 18 + 12] = positions[i * 18 + 12] + speed * direction[3 * i + 0];
        positions[i * 18 + 13] = positions[i * 18 + 13] + speed * direction[3 * i + 1];
        positions[i * 18 + 14] = positions[i * 18 + 14] + speed * direction[3 * i + 2];
        positions[i * 18 + 15] = positions[i * 18 + 15] + speed * direction[3 * i + 0];
        positions[i * 18 + 16] = positions[i * 18 + 16] + speed * direction[3 * i + 1];
        positions[i * 18 + 17] = positions[i * 18 + 17] + speed * direction[3 * i + 2];

        colors[i * 3 + 0] = 1;
        colors[i * 3 + 1] = 1;
        colors[i * 3 + 2] = 1;
    }
}

let particleMaterial =
    new THREE.PointsMaterial(
        {
            color: new THREE.Color(0xFFFFFF)
        });

// let particleMesh = new THREE.Mesh(
//     // new THREE.SphereGeometry(
//     //     0.5,
//     //     RADIUS,
//     //     RINGS),
//     new THREE.PlaneGeometry(
//         1.0,
//         1.0,
//         1.0),
var vertices = new Float32Array([
    -1.0, -1.0, 1.0,
    1.0, -1.0, 1.0,
    1.0, 1.0, 1.0,

    1.0, 1.0, 1.0,
    -1.0, 1.0, 1.0,
    -1.0, -1.0, 1.0
]);
    bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.dynamic = true;
    bufferGeometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices.length * numParticles), 3));
    bufferGeometry.addAttribute('color', new THREE.BufferAttribute(new Float32Array(3 * numParticles), 3));
    bufferGeometry.addAttribute('direction', new THREE.BufferAttribute(new Float32Array(3 * numParticles), 3));

    positions = bufferGeometry.attributes.position.array;
    colors = bufferGeometry.attributes.color.array;
    direction = bufferGeometry.attributes.direction.array;

    for (let i = 0; i < positions.length; i++) {
        positions[i * 18 + 0] = vertices[0];
        positions[i * 18 + 1] = vertices[1];
        positions[i * 18 + 2] = vertices[2];
        positions[i * 18 + 3] = vertices[3];
        positions[i * 18 + 4] = vertices[4];
        positions[i * 18 + 5] = vertices[5];
        positions[i * 18 + 6] = vertices[6];
        positions[i * 18 + 7] = vertices[7];
        positions[i * 18 + 8] = vertices[8];
        positions[i * 18 + 9] = vertices[9];
        positions[i * 18 + 10] = vertices[10];
        positions[i * 18 + 11] = vertices[11];
        positions[i * 18 + 12] = vertices[12];
        positions[i * 18 + 13] = vertices[13];
        positions[i * 18 + 14] = vertices[14];
        positions[i * 18 + 15] = vertices[15];
        positions[i * 18 + 16] = vertices[16];
        positions[i * 18 + 17] = vertices[17];
    }
    for (let i = 0; i < direction.length / 3; i++) {
        let tempVec = new THREE.Vector3(1 - (2 * Math.random()), 1 - (2 * Math.random()), 1 - (2 * Math.random()));
        tempVec.normalize();
        direction[i * 3 + 0] = tempVec.x;
        direction[i * 3 + 1] = tempVec.y;
        direction[i * 3 + 2] = tempVec.z;

    }

    updateGeomData();
    let particleMesh = new THREE.Mesh(bufferGeometry, particleMaterial);

    particleMesh.position.set(
        user.position.x + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0),
        user.position.y + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0),
        user.position.z + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0)
    );

    particleMesh.scale.setScalar(parseFloat(Math.random() * (maxSize - minSize)) + parseFloat(minSize));

    this.startColor = new THREE.Color(this.startColorR, this.startColorG, this.startColorB);
    this.endColor = new THREE.Color(this.endColorR, this.endColorG, this.endColorB);

    let particle =
        new ParticleObject(
            particleMesh, //Mesh
            this.lifetime * Math.random(), //Lifetime. If there is no random, all the particle will spawn and die at the same time
            this.speed, //Speed
            this.acceleration, //Acceleration
            new Vector3([1 - (2 * Math.random()), 1 - (2 * Math.random()), 1 - (2 * Math.random())]), //Direction
            new THREE.Color(this.startColor), //StartColor
            new THREE.Color(this.endColor) //EndColor
        );


    objects.push(particle);
    scene.add(particle.mesh);

function update() {

    updateTextBoxes();
    renderer.render(scene, camera);

    let particle;
    updateGeomData();
    bufferGeometry.attributes.position.needsUpdate = true;
    bufferGeometry.attributes.color.needsUpdate = true;
    bufferGeometry.computeBoundingSphere();
    requestAnimationFrame(update);
    renderer.render(scene, camera);
}

// Schedule the first frame.
requestAnimationFrame(update);