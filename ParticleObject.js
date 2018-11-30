const lifeDecay = 0.01;

const ParticleObject = function (mesh, lifetime, speed, acceleration, direction, startColor, endColor) {
    // Sphere mesh
    this.mesh = mesh;

    // Total Lifetime of this object
    this.lifetime = lifetime;

    // Lifetime left of this object
    this.lifeLeft = lifetime

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

ParticleObject.prototype.update = function(){
    this.updatePosition();
    this.updateLifeLeft();
    this.adjustSpeedByAcceleration();
    this.updateColor();
};

ParticleObject.prototype.updatePosition = function() {
    this.mesh.position.x = this.mesh.position.x + (this.direction.elements[0] * this.speed);
    this.mesh.position.y = this.mesh.position.y + (this.direction.elements[1] * this.speed);
    this.mesh.position.z = this.mesh.position.z + (this.direction.elements[2] * this.speed);
};

ParticleObject.prototype.updateColor = function() {
    this.mesh.material.color.r = parseFloat(this.startColor.r) + parseFloat((1.0 - this.lifeLeft) * (this.endColor.r - this.startColor.r));
    this.mesh.material.color.g = parseFloat(this.startColor.g) + parseFloat((1.0 - this.lifeLeft) * (this.endColor.g - this.startColor.g));
    this.mesh.material.color.b = parseFloat(this.startColor.b) + parseFloat((1.0 - this.lifeLeft) * (this.endColor.b - this.startColor.b));
};

ParticleObject.prototype.updateLifeLeft = function() {
    this.lifeLeft = this.lifeLeft - lifeDecay;
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

ParticleObject.prototype.getLifeLeft = function()
{
    return this.lifeLeft;
};

ParticleObject.prototype.setLifetime = function(lifetime)
{
    this.lifetime = lifetime;
    this.lifeLeft = lifetime;
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