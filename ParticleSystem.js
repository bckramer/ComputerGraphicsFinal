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
        1.0 , -1.0,  1.0,
        1.0 , 1.0 ,   1.0,

        1.0 , 1.0 ,   1.0,
        -1.0, 1.0 ,  1.0,
        -1.0, -1.0, 1.0
    ]);
    for (let k = 0; k < vertices.length; k++) {
        vertices[k] = vertices[k] * size;
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

    let startr = parseFloat(this.startColor.r);
    let startg = parseFloat(this.startColor.g);
    let startb = parseFloat(this.startColor.b);

    let endr = parseFloat(this.endColor.r);
    let endg = parseFloat(this.endColor.g);
    let endb = parseFloat(this.endColor.b);

    for (let i = 0; i < numParticles; i++) {
        lifetimeArray[i] = lifetimeArray[i] - lifeChange;
        if (lifetimeArray[i] < 0) {
            for (let j = 0; j < 18; j = j + 3) {
                positions[i * 18 + j + 0] = vertices[j + 0] - xAdjustment;
                positions[i * 18 + j + 1] = vertices[j + 1] - yAdjustment;
                positions[i * 18 + j + 2] = vertices[j + 2] - zAdjustment;
            }
            lifetimeArray[i] = lifetime - Math.random();
        } else {
            //let random = (1 - (2 * Math.random()));
            for (let j = 0; j < 18; j++){
                positions[i * 18 + j] = positions[i * 18 + j] + speed * direction[3 * i + (j % 3)];
            }
        }
        for (let j = 0; j < 18; j = j + 3) {
            colors[i * 18 + j + 0] = endr + (((startr - endr) / (lifetime)) * (lifetimeArray[i]));
            colors[i * 18 + j + 1] = endg + (((startg - endg) / (lifetime)) * (lifetimeArray[i]));
            colors[i * 18 + j + 2] = endb + (((startb - endb) / (lifetime)) * (lifetimeArray[i]));
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
        1.0 , -1.0,  1.0,
        1.0 , 1.0 ,   1.0,

        1.0 , 1.0 ,   1.0,
        -1.0, 1.0 ,  1.0,
        -1.0, -1.0, 1.0
    ]);
    for (let k = 0; k < vertices.length; k++) {
        vertices[k] = vertices[k] * size;
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
            colors[i * 18 + j + 0] = startColorR;
            colors[i * 18 + j + 1] = startColorG;
            colors[i * 18 + j + 2] = startColorB;
        }
    }
    for (let i = 0; i < direction.length / 3; i++) {
        let tempVec = new THREE.Vector3(1 - (2 * Math.random()), 1 - (2 * Math.random()), 1 - (2 * Math.random()));
        tempVec.normalize();
        direction[i * 3 + 0] = tempVec.x;
        direction[i * 3 + 1] = tempVec.y;
        direction[i * 3 + 2] = tempVec.z;
    }
    for (let i = 0; i < lifetimeArray.length; i++) {
        lifetimeArray[i] = lifetime - Math.random();
    }
    particleMesh = new THREE.Mesh(bufferGeometry, particleMaterial);
    this.startColor = new THREE.Color(this.startColorR, this.startColorG, this.startColorB);
    this.endColor = new THREE.Color(this.endColorR, this.endColorG, this.endColorB);
    updateGeomData();
    particleMesh.position.set(
        user.position.x + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0),
        user.position.y + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0),
        user.position.z + parseFloat(Math.random() * spawnDensity - spawnDensity / 2.0)
    );
    //particleMesh.scale.setScalar(parseFloat(Math.random() * (maxSize - minSize)) + parseFloat(minSize));
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
}

function update() {
    updateTextBoxes();
    renderer.render(scene, camera);

    let particle;
    updateGeomData();
    bufferGeometry.attributes.position.needsUpdate = true;
    bufferGeometry.attributes.color.needsUpdate = true;
    bufferGeometry.attributes.lifetime.needsUpdate = true;
    bufferGeometry.computeBoundingSphere();
    requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);