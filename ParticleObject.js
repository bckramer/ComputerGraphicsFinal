const lifeDecay = 0.01;

var ParticleObject = function(mesh, lifetime, speed, acceleration, direction, startColor, endColor)
{
    // Sphere mesh
    this.mesh = mesh;

    // Lifetime of this object
    this.lifetime = lifetime;

    // Speed of object
    this.speed = speed;

    // Acceleration of object
    this.acceleration = acceleration;

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
    this.mesh.material.color.r = parseFloat(this.startColor.r) + parseFloat((1.0 - this.lifetime) * (this.endColor.r - this.startColor.r));
    this.mesh.material.color.g = parseFloat(this.startColor.g) + parseFloat((1.0 - this.lifetime) * (this.endColor.g - this.startColor.g));
    this.mesh.material.color.b = parseFloat(this.startColor.b) + parseFloat((1.0 - this.lifetime) * (this.endColor.b - this.startColor.b));
};

ParticleObject.prototype.updateLifeTime = function() {
    this.lifetime = this.lifetime - lifeDecay;
};

ParticleObject.prototype.adjustSpeedByAcceleration = function() {
    this.speed = this.speed * this.acceleration;
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

ParticleObject.prototype.setLifetime = function(lifetime)
{
    this.lifetime = lifetime;
};

ParticleObject.prototype.getSpeed = function()
{
    return this.speed;
};

ParticleObject.prototype.setSpeed = function(speed)
{
    this.speed = speed;
};

ParticleObject.prototype.getAcceleration = function()
{
    return this.acceleration;
};

ParticleObject.prototype.setAcceleration = function(acceleration)
{
    this.acceleration = acceleration;
};

ParticleObject.prototype.getDirection = function()
{
    return this.direction;
};