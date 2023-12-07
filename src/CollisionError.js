module.exports = class CollisionError extends Error {
  constructor() {
    super('The rover hits another rover');
    this.name = "CollisionError";
  }
}

