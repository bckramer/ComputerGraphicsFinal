var Particle = function(lifetime, speed, direction)
{
    // Sphere mesh
    let newSphere = new THREE.Mesh(
        new THREE.SphereGeometry(
            2,
            SEGMENTS,
            RINGS),

        sphereMaterial);

    // Lifetime of this object
    this.lifetime = 0;

    // Speed of object
    this.speed = 0;

    // Direction of object
    this.direction = new Vector3([0, 0, 0]);
};
