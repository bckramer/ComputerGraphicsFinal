var ParticleObject = function(mesh, lifetime, speed, direction)
{
    // Sphere mesh
    this.mesh = mesh;

    // Lifetime of this object
    this.lifetime = lifetime;

    // Speed of object
    this.speed = speed;

    // Direction of object
    this.direction = direction;
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