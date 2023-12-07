const OutOfBoundsError = require('./OutOfBoundsError');
const CollisionError = require('./CollisionError');

module.exports = class Rover {

  constructor(plateau, coordinates, dir, movements) {
    this.plateau = plateau;
    this.coordinates = coordinates;
    this.dir = dir;
    this.movements = movements;

    this.validateCoordinates(coordinates);
  }

  consumeMovements() {
    while (this.movements.length > 0) {
      const movement = this.movements.shift();

      this.move(movement);
    }
  }

  validateCoordinates(coordinates) {
    const isXWithinBounds = coordinates.x >= 0 && coordinates.x < this.plateau.width;
    const isYWithinBounds = coordinates.y >= 0 && coordinates.y < this.plateau.height;

    if (!isXWithinBounds || !isYWithinBounds) {
      throw new OutOfBoundsError;
    }

    if (this.plateau.checkCollision(coordinates)) {
      throw new CollisionError;
    }
  }

  move(movement) {
    const directions = ['N', 'E', 'S', 'W'];
    const deltas = [{x: 0, y: 1}, {x: 1, y: 0}, {x: 0, y: -1}, {x: -1, y: 0}];

    const dirIndex = directions.indexOf(this.dir);

    switch (movement) {
      case 'R':
        this.dir = directions[(dirIndex + 1) % 4];
        break;
      case 'L':
        this.dir = directions[(dirIndex + 3) % 4];
        break;
      case 'M':
        const newX = this.coordinates.x + deltas[dirIndex].x;
        const newY = this.coordinates.y + deltas[dirIndex].y;
        const newCoordinates = { x: newX, y: newY };

        this.validateCoordinates(newCoordinates);

        this.plateau.removeRoverFromGrid(this.coordinates);

        this.coordinates = newCoordinates;

        this.plateau.addRoverToGrid(this.coordinates);

        break;
    }
  }

  toString() {
    return `${this.coordinates.x} ${this.coordinates.y} ${this.dir}\n`;
  }
}

