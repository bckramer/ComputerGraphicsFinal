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