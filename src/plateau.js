const Rover = require('./rover');

module.exports = class Plateau {

  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.rovers = [];
    this.grid = new Map();
  }

  addRoverToGrid(coordinates) {
    if (!this.grid.has(coordinates.x)) {
      this.grid.set(coordinates.x, new Map());
    }

    const row = this.grid.get(coordinates.x);

    let previousValue = 0;

    if (row.has(coordinates.y)) {
      previousValue = row.get(coordinates.y);
    }

    row.set(coordinates.y, previousValue + 1);
  }

  removeRoverFromGrid(coordinates) {
    if (!this.grid.has(coordinates.x)) {
      throw new Error("Can't remove the rover from the given coordinates");
    }

    const row = this.grid.get(coordinates.x);

    if (!row.has(coordinates.y)) {
      throw new Error("Can't remove the rover from the given coordinates");
    }

    let previousValue = row.get(coordinates.y);

    if (previousValue > 1) {
      row.set(coordinates.y, previousValue - 1);
    } else {
      row.delete(coordinates.y);

      if (row.size === 0) {
        this.grid.delete(coordinates.x);
      }
    }
  }

  checkCollision(coordinates) {
    if (this.grid.has(coordinates.x)) {
      const row = this.grid.get(coordinates.x);

      return row.has(coordinates.y);
    } else {
      return false;
    }
  }

  addRover(coordinates, dir, movements) {
    const rover = new Rover(this, coordinates, dir, movements);

    this.rovers.push(rover);
    this.addRoverToGrid(coordinates);

    return rover;
  }

  moveRovers() {
    for (let rover of this.rovers) {
      rover.consumeMovements();
    }
  }

  toString() {
    let str = '';

    for (const rover of this.rovers) {
      str += rover.toString();
    }

    return str;
  }
}

