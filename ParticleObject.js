const lifeDecay = 0.01;

var ParticleObject = function(mesh, lifetime, speed, direction, startColor, endColor)
{
    // Sphere mesh
    this.mesh = mesh;

    // Lifetime of this object
    this.lifetime = lifetime;

    // Speed of object
    this.speed = speed;

    // Direction of object
    this.direction = direction;

    // The color the particle spawns as (THREE.Color)
    this.startColor = startColor;

    // The color the particle interpolates to throughout its lifetime
    this.endColor = endColor;
};

ParticleObject.prototype.updatePosition = function() {
    this.mesh.position.x = this.mesh.position.x + (this.direction.elements[0] * this.speed);
    this.mesh.position.y = this.mesh.position.y + (this.direction.elements[1] * this.speed);
    this.mesh.position.z = this.mesh.position.z + (this.direction.elements[2] * this.speed);
};

ParticleObject.prototype.updateColor = function() {
    this.mesh.material.color.r = this.startColor.r + ((1 - this.lifetime) * ((this.endColor.r - this.startColor.r)));
    this.mesh.material.color.g = this.startColor.g + ((1 - this.lifetime) * (this.endColor.g - this.startColor.g));
    this.mesh.material.color.b = this.startColor.b + ((1 - this.lifetime) * (this.endColor.b - this.startColor.b));
};

ParticleObject.prototype.updateLifeTime = function() {
    this.lifetime = this.lifetime - lifeDecay;
};

ParticleObject.prototype.resetColor = function() {
    this.mesh.material.color.r = this.startColor.r;
    this.mesh.material.color.g = this.startColor.g;
    this.mesh.material.color.b = this.startColor.b;
};

ParticleObject.prototype.swapColor = function(newStartColor, newEndColor) {
    this.startColor = newStartColor;
    this.endColor = newEndColor;
};

ParticleObject.prototype.setPosition = function(x, y, z) {
    this.mesh.position.x = x;
    this.mesh.position.y = y;
    this.mesh.position.z = z;
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