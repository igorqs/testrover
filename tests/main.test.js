const Plateau = require('./../src/plateau');
const { main } = require('./../src/main');
const { parseInput } = require('./../src/utils');

jest.mock('./../src/utils');

describe('main.js', () => {
  describe('main', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('should parse the input file, move the rovers and print the output to the console', async () => {
      const plateau = new Plateau(6, 6);
      plateau.addRover({x: 1, y: 2}, 'N', 'LMLMLMLMM'.split(''));
      plateau.addRover({x: 3, y: 3}, 'E', 'MMRMMRMRRM'.split(''));

      parseInput.mockReturnValue(plateau);

      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await main('test.txt');

      expect(consoleLogSpy).toHaveBeenCalledWith('1 3 N\n5 1 E\n');
      expect(consoleErrorSpy).not.toHaveBeenCalled();
    });

    it('should print an error message if the input is invalid', async () => {
      parseInput.mockRejectedValue(new Error('Something wrong ocurred'));

      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await main('test.txt');

      expect(consoleLogSpy).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('There was an error while parsing the input: Something wrong ocurred\n');
    });

    it('should print an error message if the rover goes out of the plateau', async () => {
      const plateau = new Plateau(6, 6);
      plateau.addRover({x: 1, y: 2}, 'N', 'MMMMMMMMM'.split(''));
      plateau.addRover({x: 3, y: 3}, 'E', 'MMRMMRMRRM'.split(''));

      parseInput.mockReturnValue(plateau);

      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await main('test.txt');

      expect(consoleLogSpy).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('There was an error while simulating the rovers movement: The rover goes out of the plateau\n');
    });

    it('should print an error message if the rover hits another rover', async () => {
      const plateau = new Plateau(6, 6);
      plateau.addRover({x: 1, y: 2}, 'N', 'LMLMLMLMM'.split(''));
      plateau.addRover({x: 5, y: 3}, 'W', 'MMMMMMMMMM'.split(''));

      parseInput.mockReturnValue(plateau);

      const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation();
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      await main('test.txt');

      expect(consoleLogSpy).not.toHaveBeenCalled();
      expect(consoleErrorSpy).toHaveBeenCalledWith('There was an error while simulating the rovers movement: The rover hits another rover\n');
    });
  });
});

