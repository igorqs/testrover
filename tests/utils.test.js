const Plateau = require('./../src/plateau');
const { parseArguments, parseInput } = require('./../src/utils');
const fs = require('fs');

jest.mock('fs');

describe('utils.js', () => {
  describe('parseArguments', () => {
    it('should return the expected argument', () => {
      const output = parseArguments(['test.txt']);
      expect(output).toEqual('test.txt');
    });

    it('should return the expected argument and ignore the others', () => {
      const output = parseArguments(['test.txt', 'test.in', '-i', '-v']);
      expect(output).toEqual('test.txt');
    });

    it('should throw an error if called without an arg', () => {
      expect(() => {
        parseArguments([]);
      }).toThrow('You must provide a file path');
    })

    it('should throw an error if called without a valid array', () => {
      expect(() => {
        parseArguments(123);
      }).toThrow('The first argument should be an array');
    })
  });

  describe('parseInput', () => {
    it('should parse input file and create plateau', async () => {
      fs.readFileSync.mockReturnValue('5 5\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM');

      const plateau = await parseInput('test.txt');

      const expectedOutput = new Plateau(6, 6);
      expectedOutput.addRover({x: 1, y: 2}, 'N', 'LMLMLMLMM'.split(''));
      expectedOutput.addRover({x: 3, y: 3}, 'E', 'MMRMMRMRRM'.split(''));

      expect(plateau).toEqual(expectedOutput);
    });

    it('should parse input file containing a rover without movements', async () => {
      fs.readFileSync.mockReturnValue('5 5\n1 2 N\n\n3 3 E\nMMRMMRMRRM');

      const plateau = await parseInput('test.txt');

      const expectedOutput = new Plateau(6, 6);
      expectedOutput.addRover({x: 1, y: 2}, 'N', []);
      expectedOutput.addRover({x: 3, y: 3}, 'E', 'MMRMMRMRRM'.split(''));

      expect(plateau).toEqual(expectedOutput);
    });

    it('should throw an error if the upper-right coordinates are invalid', async () => {
      fs.readFileSync.mockReturnValue('5 t\n1 2 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM');

      await expect(parseInput('test.txt')).rejects.toThrow('Invalid input format');
    });

    it('should throw an error if the rover coordinates are invalid', async () => {
      fs.readFileSync.mockReturnValue('5 5\n1 t N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM');

      await expect(parseInput('test.txt')).rejects.toThrow('Invalid input format');
    });

    it('should throw an error if the rover coordinates are out of bounds', async () => {
      fs.readFileSync.mockReturnValue('5 5\n6 5 N\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM');

      await expect(parseInput('test.txt')).rejects.toThrow('The rover goes out of the plateau');
    });

    it('should throw an error if the rover direction is invalid', async () => {
      fs.readFileSync.mockReturnValue('5 5\n1 2 P\nLMLMLMLMM\n3 3 E\nMMRMMRMRRM');

      await expect(parseInput('test.txt')).rejects.toThrow('Invalid input format');
    });

    it('should throw an error if the rover movements are invalid', async () => {
      fs.readFileSync.mockReturnValue('5 5\n1 2 P\nLTLMLMLMM\n3 3 E\nMMRMMRMRRM');

      await expect(parseInput('test.txt')).rejects.toThrow('Invalid input format');
    });

    it('should throw an error if there is a missing line in the input', async () => {
      fs.readFileSync.mockReturnValue('5 5\n1 2 P\nLTLMLMLMM\n3 3 E\nM');

      await expect(parseInput('test.txt')).rejects.toThrow('Invalid input format');
    });

    it('should throw an error if the input is empty', async () => {
      fs.readFileSync.mockReturnValue('');

      await expect(parseInput('test.txt')).rejects.toThrow('Invalid input format');
    });

    it('should throw an error if it is not possible to read the file', async () => {
      fs.readFileSync.mockImplementation(() => {
        throw new Error('Some error ocurred');
      });

      await expect(parseInput('test.txt')).rejects.toThrow('Some error ocurred');
    });
  });
});

