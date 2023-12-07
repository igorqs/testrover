const Plateau = require('./../src/plateau');
const Rover = require('./../src/rover');

describe('rover.js', () => {

  describe('constructor', () => {
    it('should create the rover instance', async () => {
      const plateau = new Plateau(5, 5);
      const rover = plateau.addRover({x: 3, y: 3}, 'N', 'LRLRLRLRM'.split(''));

      expect(rover.plateau).toEqual(plateau);
      expect(rover.coordinates).toEqual({x: 3, y: 3});
      expect(rover.dir).toEqual('N');
      expect(rover.movements).toEqual('LRLRLRLRM'.split(''));
    });
  });

  describe('consumeMovements', () => {
    it('should consume the movements', async () => {
      const plateau = new Plateau(5, 5);
      const rover = plateau.addRover({x: 3, y: 3}, 'N', 'LRMLRLRLMR'.split(''));

      rover.consumeMovements();

      expect(rover.plateau).toEqual(plateau);
      expect(rover.coordinates).toEqual({x: 2, y: 4});
      expect(rover.dir).toEqual('N');
      expect(rover.movements).toEqual([]);
    });
  });

  describe('validateCoordinates', () => {
    it("shouldn't anything if the coordinates are valid", async () => {
      const plateau = new Plateau(5, 5);
      const rover = plateau.addRover({x: 2, y: 4}, 'N', []);

      expect(() => {
        rover.validateCoordinates({x:3, y:4});
      }).not.toThrowError();
    });

    it("should throw an error if there are a collision", async () => {
      const plateau = new Plateau(5, 5);
      const rover = plateau.addRover({x: 2, y: 4}, 'N', []);

      expect(() => {
        rover.validateCoordinates({x:2, y:4});
      }).toThrow('The rover hits another rover');
    });

    it("should throw an error if the rover is out of bounds", async () => {
      const plateau = new Plateau(5, 5);
      const rover = plateau.addRover({x: 2, y: 4}, 'N', []);

      expect(() => {
        rover.validateCoordinates({x:2, y:5});
      }).toThrow('The rover goes out of the plateau');
    });
  });

  describe('move', () => {
    it('should turn the rover to the left', async () => {
      const plateau = new Plateau(5, 5);
      const rover = plateau.addRover({x: 3, y: 3}, 'N', []);

      rover.move('R');

      expect(rover.coordinates).toEqual({x: 3, y: 3});
      expect(rover.dir).toEqual('E');

      rover.move('R');

      expect(rover.coordinates).toEqual({x: 3, y: 3});
      expect(rover.dir).toEqual('S');

      rover.move('R');

      expect(rover.coordinates).toEqual({x: 3, y: 3});
      expect(rover.dir).toEqual('W');

      rover.move('R');

      expect(rover.coordinates).toEqual({x: 3, y: 3});
      expect(rover.dir).toEqual('N');
    });

    it('should turn the rover to the right', async () => {
      const plateau = new Plateau(5, 5);
      const rover = plateau.addRover({x: 3, y: 3}, 'N', []);

      rover.move('L');

      expect(rover.coordinates).toEqual({x: 3, y: 3});
      expect(rover.dir).toEqual('W');

      rover.move('L');

      expect(rover.coordinates).toEqual({x: 3, y: 3});
      expect(rover.dir).toEqual('S');

      rover.move('L');

      expect(rover.coordinates).toEqual({x: 3, y: 3});
      expect(rover.dir).toEqual('E');

      rover.move('L');

      expect(rover.coordinates).toEqual({x: 3, y: 3});
      expect(rover.dir).toEqual('N');
    });

    it('should move the robot', async () => {
      const plateau = new Plateau(5, 5);
      const rover = plateau.addRover({x: 3, y: 3}, 'N', []);

      rover.move('M');

      expect(rover.coordinates).toEqual({x: 3, y: 4});
      expect(rover.dir).toEqual('N');

      rover.dir = 'S';
      rover.move('M');

      expect(rover.coordinates).toEqual({x: 3, y: 3});
      expect(rover.dir).toEqual('S');

      rover.dir = 'W';
      rover.move('M');

      expect(rover.coordinates).toEqual({x: 2, y: 3});
      expect(rover.dir).toEqual('W');

      rover.dir = 'E';
      rover.move('M');

      expect(rover.coordinates).toEqual({x: 3, y: 3});
      expect(rover.dir).toEqual('E');
    });

    it('should throw an exception if the rover goes out of the plateau', async () => {
      const plateau = new Plateau(5, 5);
      const rover = plateau.addRover({x: 4, y: 4}, 'N', []);

      expect(() => {
        rover.move('M');
      }).toThrow('The rover goes out of the plateau');
    });

    it('should throw an exception if the rover hits another rover', async () => {
      const plateau = new Plateau(5, 5);
      const rover1 = plateau.addRover({x: 4, y: 4}, 'N', []);
      const rover2 = plateau.addRover({x: 4, y: 3}, 'N', []);

      expect(() => {
        rover2.move('M');
      }).toThrow('The rover hits another rover');
    });
  });

  describe('toString', () => {
    it('should generate the string representation of the rover', async () => {
      const plateau = new Plateau(5, 5);
      const rover = plateau.addRover({x: 2, y: 4}, 'N', []);

      const expectedString = '2 4 N\n';

      expect(rover.toString()).toEqual(expectedString);
    });
  });
});

