var ParticleObject = function(lifetime, speed, direction)
{
    // Sphere mesh
    let mesh = new THREE.Mesh(
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

ParticleObject.prototype.getMesh = function()
{
    return this.mesh;
};

ParticleObject.prototype.getLifetime = function()
{
    return this.lifetime;
};

ParticleObject.prototype.getSpeed = function()
{
    return this.speed;
};

ParticleObject.prototype.getDirection = function()
{
    return this.direction;
};