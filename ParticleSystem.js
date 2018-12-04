// Set the scene size.
const WIDTH = 600;
const HEIGHT = 600;
var positions, colors, direction, lifetimeArray;
var bufferGeometry;
var particleMesh;
var lifeChange = 0.01;

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
let minSpeed;
let maxSpeed;
let startColor;
let endColor;

var spawnDensity = document.getElementById("spawnDensity").value;
var lifetime = document.getElementById("lifetime").value;
var lifetimeVariation = parseFloat(document.getElementById("lifetimeVariation").value);
minLifetime = lifetime - lifetimeVariation / 2.0;
maxLifetime = parseFloat(lifetime) + parseFloat(lifetimeVariation / 2.0);
var size = document.getElementById("size").value;
if (size < 0.001) {
    size = 0.001;
}
var sizeVariation = parseFloat(document.getElementById("sizeVariation").value);
if (size - sizeVariation / 2 < 0.001) {
    minSize = 0.001;
} else {
    minSize = size - sizeVariation / 2.0;
}
maxSize = parseFloat(size) + parseFloat(sizeVariation / 2.0);
var speed = document.getElementById("speed").value;
var speedVariation = document.getElementById("speedVariation").value;
minSpeed = speed - speedVariation / 2.0;
maxSpeed = parseFloat(speed) + parseFloat(speedVariation / 2.0);
var acceleration = document.getElementById("acceleration").value;
var startColorR = document.getElementById("startColorR").value;
var startColorG = document.getElementById("startColorG").value;
var startColorB = document.getElementById("startColorB").value;
var endColorR = document.getElementById("endColorR").value;
var endColorG = document.getElementById("endColorG").value;
var endColorB = document.getElementById("endColorB").value;

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

user.position.z = -800;
scene.add(user);


function updateGeomData() {
    var vertices = new Float32Array([
        -1.0, -1.0, 1.0,
         1.0, -1.0, 1.0,
         1.0,  1.0, 1.0,

         1.0,  1.0, 1.0,
        -1.0,  1.0, 1.0,
        -1.0, -1.0, 1.0
    ]);
    let random = Math.random();
    for (let k = 0; k < vertices.length; k++) {
        vertices[k] = vertices[k] * (size - (sizeVariation * random));
    }
    let userX = user.position.x;
    let userY = user.position.y;
    let userZ = user.position.z;

    let particleCenterX = particleMesh.position.x;
    let particleCenterY = particleMesh.position.y;
    let particleCenterZ = particleMesh.position.z;

    let xAdjustment = (particleCenterX - userX);
    let yAdjustment = (particleCenterY - userY);
    let zAdjustment = (particleCenterZ - userZ);

    // Start colors
    let startr = parseFloat(this.startColor.r);
    let startg = parseFloat(this.startColor.g);
    let startb = parseFloat(this.startColor.b);

    // Interpolated change in color between each "frame"
    let deltaR = parseFloat((this.endColor.r - startr) / lifetime * lifeChange);
    let deltaG = parseFloat((this.endColor.g - startg) / lifetime * lifeChange);
    let deltaB = parseFloat((this.endColor.b - startb) / lifetime * lifeChange);

    let parsedLifetime = parseFloat(lifetime);
    let parsedSpeed = parseFloat(speed);

    // For each particle
    for (let i = 0; i < numParticles; i++) {

        // Pass time
        lifetimeArray[i] -= lifeChange;

        // If the particle's lifetime has ended
        // Reset the particle (essentially deleting it and making a new particle)
        if (lifetimeArray[i] < 0) {

            // Determine the variation in spawn location for the particle
            let variation = new THREE.Vector3(
                parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0),
                parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0),
                parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0)
            );
            // Set the new location based off of the users position and the spawn location variation
            // Set the color to the current start color
            for (let j = 0; j < 18; j = j + 3) {
                positions[i * 18 + j    ] = vertices[j    ] - xAdjustment + variation.x;
                positions[i * 18 + j + 1] = vertices[j + 1] - yAdjustment + variation.y;
                positions[i * 18 + j + 2] = vertices[j + 2] - zAdjustment + variation.z;
                colors[i * 18 + j    ] = startr;
                colors[i * 18 + j + 1] = startg;
                colors[i * 18 + j + 2] = startb;
            }
            // Reset the lifetime (with minor variance to avoid waves)
            lifetimeArray[i] = lifetime - (lifetimeVariation * Math.random());
        }
        // If the particle's lifetime has not ended
        else {
            // Update the position based off of speed and direction
            for (let j = 0; j < 18; j++){
                positions[i * 18 + j] += parsedSpeed * direction[3 * i + (j % 3)];
            }
            // Update the color based off of the current start and end color interpolations
            for (let j = 0; j < 18; j = j + 3) {
                colors[i * 18 + j    ] += deltaR;
                colors[i * 18 + j + 1] += deltaG;
                colors[i * 18 + j + 2] += deltaB;
            }
        }


    }
}

function main() {
    let particleMaterial =
        new THREE.PointsMaterial(
            {
                vertexColors : true
             });

    var vertices = new Float32Array([
        -1.0, -1.0, 1.0,
         1.0, -1.0, 1.0,
         1.0,  1.0, 1.0,

         1.0,  1.0, 1.0,
        -1.0,  1.0, 1.0,
        -1.0, -1.0, 1.0
    ]);
    for (let k = 0; k < vertices.length; k++) {
        vertices[k] = vertices[k] * (size - (sizeVariation * Math.random()));
    }
    bufferGeometry = new THREE.BufferGeometry();
    bufferGeometry.dynamic = true;

    bufferGeometry.addAttribute('position', new THREE.BufferAttribute(new Float32Array(vertices.length * numParticles), 3));
    bufferGeometry.addAttribute('color', new THREE.BufferAttribute(new Float32Array(vertices.length * numParticles), 3));
    bufferGeometry.addAttribute('direction', new THREE.BufferAttribute(new Float32Array(3 * numParticles), 3));
    bufferGeometry.addAttribute('lifetime' , new THREE.BufferAttribute(new Float32Array(numParticles), 1));

    positions = bufferGeometry.attributes.position.array;
    colors = bufferGeometry.attributes.color.array;
    direction = bufferGeometry.attributes.direction.array;
    lifetimeArray = bufferGeometry.attributes.lifetime.array;

    for (let i = 0; i < positions.length; i++) {
        for (let j = 0; j < 18; j++) {
            positions[i * 18 + j] = vertices[j];
        }
    }
    for (let i = 0; i < colors.length; i++) {
        for (let j = 0; j < 18; j = j + 3) {
            colors[i * 18 + j    ] = startColorR;
            colors[i * 18 + j + 1] = startColorG;
            colors[i * 18 + j + 2] = startColorB;
        }
    }
    for (let i = 0; i < direction.length / 3; i++) {
        let tempVec = new THREE.Vector3(1 - (2 * Math.random()), 1 - (2 * Math.random()), 1 - (2 * Math.random()));
        tempVec.normalize();
        direction[i * 3    ] = tempVec.x;
        direction[i * 3 + 1] = tempVec.y;
        direction[i * 3 + 2] = tempVec.z;
    }
    for (let i = 0; i < lifetimeArray.length; i++) {
        lifetimeArray[i] = lifetime - (lifetimeVariation * Math.random());
    }

    // Instantiate start and end color
    this.startColor = new THREE.Color(this.startColorR, this.startColorG, this.startColorB);
    this.endColor = new THREE.Color(this.endColorR, this.endColorG, this.endColorB);

    // Create particle mesh
    particleMesh = new THREE.Mesh(bufferGeometry, particleMaterial);

    updateGeomData();

    // Set position
    particleMesh.position.set(
        user.position.x,
        user.position.y,
        user.position.z
    );

    // Add particles to scene
    scene.add(particleMesh);
}

function update() {
    updateTextBoxes();
    renderer.render(scene, camera);

    updateGeomData();
    bufferGeometry.attributes.position.needsUpdate = true;
    bufferGeometry.attributes.color.needsUpdate = true;
    bufferGeometry.attributes.lifetime.needsUpdate = true;
    bufferGeometry.computeBoundingSphere();
    requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);