// Set the scene size.
const WIDTH = 600;
const HEIGHT = 600;

// Set some camera attributes.
const VIEW_ANGLE = 45;
const ASPECT = WIDTH / HEIGHT;
const NEAR = 0.1;
const FAR = 10000;
var objects = [];

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

// Create a new mesh with
// sphere geometry - we will cover
// the sphereMaterial next!
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(
        RADIUS,
        SEGMENTS,
        RINGS),

    sphereMaterial);

// Move the Sphere back in Z so we
// can see it.
sphere.position.z = -300;
scene.add(sphere);

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
    let newSphere = new THREE.Mesh(
        new THREE.SphereGeometry(
            2,
            SEGMENTS,
            RINGS),

        sphereMaterial);
    newSphere.position.x = sphere.position.x + Math.random() * 20 - 10;
    newSphere.position.y = sphere.position.y + Math.random() * 200;
    newSphere.position.z = -300;
    objects.push(newSphere);
    scene.add(newSphere);
}


// Finally, add the sphere to the scene.
//scene.add(sphere);

function update() {
    // Draw!
    renderer.render(scene, camera);
    //sphere.position.x = sphere.position.x + 0.01;
    for (var i = 0; i < objects.length; i++) {
        //    objects[i].position.x = Math.random() * 250 - 175;
        if (objects[i].position.y > 200) {
            objects[i].position.y = 0;
        } else {
            objects[i].position.y = objects[i].position.y + 1.0;
        }
        //    objects[i].position.z = Math.random() * 250 - 175;
    }
    // Schedule the next frame.
    requestAnimationFrame(update);
}

// Schedule the first frame.
requestAnimationFrame(update);