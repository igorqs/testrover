module.exports = class OutOfBoundsError extends Error {
  constructor() {
    super('The rover goes out of the plateau');
    this.name = "OutOfBoundsError";
  }
}

