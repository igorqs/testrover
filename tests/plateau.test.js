const Plateau = require('./../src/plateau');

describe('plateau.js', () => {

  describe('constructor', () => {
    it('should create the plateau instance', async () => {
      const plateau = new Plateau(3, 7);

      expect(plateau.width).toEqual(3);
      expect(plateau.height).toEqual(7);
      expect(plateau.rovers).toHaveLength(0);
      expect(plateau.grid.size).toEqual(0);
    });
  });

  describe('addRoverToGrid', () => {
    it('should add the rovers to the grid', async () => {
      const plateau = new Plateau(5, 5);

      plateau.addRoverToGrid({ x: 2, y: 3 });

      expect(plateau.grid.has(2)).toEqual(true);
      expect(plateau.grid.get(2).get(3)).toEqual(1);

      plateau.addRoverToGrid({ x: 2, y: 3 });

      expect(plateau.grid.get(2).get(3)).toEqual(2);
    });
  });

  describe('removeRoverFromGrid', () => {
    it('should add the rovers to the grid', async () => {
      const plateau = new Plateau(5, 5);

      plateau.addRoverToGrid({ x: 2, y: 3 });
      plateau.addRoverToGrid({ x: 2, y: 3 });

      plateau.removeRoverFromGrid({ x: 2, y: 3 });

      expect(plateau.grid.has(2)).toEqual(true);
      expect(plateau.grid.get(2).get(3)).toEqual(1);

      plateau.removeRoverFromGrid({ x: 2, y: 3 });

      expect(plateau.grid.has(2)).toEqual(false);
    });
  });

  describe('checkCollision', () => {
    it('should check for collisions', async () => {
      const plateau = new Plateau(5, 5);

      plateau.addRoverToGrid({ x: 2, y: 3 });

      expect(plateau.checkCollision({ x: 2, y: 3 })).toEqual(true);
      expect(plateau.checkCollision({ x: 1, y: 1 })).toEqual(false);
    });
  });

  describe('addRover', () => {
    it('should add rover', async () => {
      const plateau = new Plateau(5, 5);

      plateau.addRover({ x: 1, y: 2 }, 'N', 'LMLMLMLMM'.split(''));

      expect(plateau.grid.has(1)).toEqual(true);
      expect(plateau.grid.get(1).get(2)).toEqual(1);

      expect(plateau.rovers).toHaveLength(1);
      expect(plateau.rovers[0].coordinates).toEqual({x: 1, y: 2});
      expect(plateau.rovers[0].dir).toEqual('N');
      expect(plateau.rovers[0].movements).toEqual('LMLMLMLMM'.split(''));
    });
  });

  describe('moveRovers', () => {
    it('should move the rovers', async () => {
      const plateau = new Plateau(6, 6);

      plateau.addRover({ x: 1, y: 2 }, 'N', 'LMLMLMLMM'.split(''));
      plateau.addRover({ x: 3, y: 3 }, 'E', 'MMRMMRMRRM'.split(''));

      plateau.moveRovers();

      expect(plateau.grid.has(1)).toEqual(true);
      expect(plateau.grid.get(1).get(3)).toEqual(1);
      expect(plateau.grid.has(5)).toEqual(true);
      expect(plateau.grid.get(5).get(1)).toEqual(1);

      expect(plateau.rovers).toHaveLength(2);
      expect(plateau.rovers[0].coordinates).toEqual({x: 1, y: 3});
      expect(plateau.rovers[0].dir).toEqual('N');
      expect(plateau.rovers[0].movements).toEqual([]);
      expect(plateau.rovers[1].coordinates).toEqual({x: 5, y: 1});
      expect(plateau.rovers[1].dir).toEqual('E');
      expect(plateau.rovers[1].movements).toEqual([]);
    });

    it('should throw expection if the rover moves out of the plateau', async () => {
      const plateau = new Plateau(6, 6);

      plateau.addRover({ x: 1, y: 2 }, 'N', 'MMMMMMMMM'.split(''));
      plateau.addRover({ x: 3, y: 3 }, 'E', 'MMRMMRMRRM'.split(''));

      expect(() => {
        plateau.moveRovers();
      }).toThrow('The rover goes out of the plateau');
    });

    it('should throw expection if the rover hits another rover', async () => {
      const plateau = new Plateau(6, 6);

      plateau.addRover({ x: 1, y: 2 }, 'N', []);
      plateau.addRover({ x: 4, y: 2 }, 'W', 'MMMMMMMMMM'.split(''));

      expect(() => {
        plateau.moveRovers();
      }).toThrow('The rover hits another rover');
    });
  });

  describe('toString', () => {
    it('should generate the string representation of the plateau', async () => {
      const plateau = new Plateau(5, 5);

      plateau.addRover({ x: 1, y: 2 }, 'N', 'LMLMLMLMM'.split(''));
      plateau.addRover({ x: 3, y: 4 }, 'E', []);

      const expectedString = '1 2 N\n3 4 E\n';

      expect(plateau.toString()).toEqual(expectedString);
    });
  });
});

