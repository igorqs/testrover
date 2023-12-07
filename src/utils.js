const Plateau = require('./plateau');
const fs = require('fs');

readFileFromDisk = async (path) =>
  Promise.resolve(fs.readFileSync(path, 'utf8'));

isPositiveIntegerOrZero = (str) => {
  const num = parseInt(str);
  return !isNaN(num) && num >= 0;
}

isValidDirection = (dir) => {
  return ['N', 'S', 'W', 'E'].includes(dir);
}

isValidMovement = (movement) => {
  return ['L', 'R', 'M'].includes(movement);
}

exports.parseArguments = (args) => {
  if (!Array.isArray(args)) {
    throw new TypeError('The first argument should be an array');
  }

  if (args.length === 0) {
    throw new Error('You must provide a file path');
  }

  const inputFilePath = args[0];

  return inputFilePath;
};

exports.parseInput = async (inputFilePath) => {
  const input = await readFileFromDisk(inputFilePath);

  const lines = input.split(/\r?\n/);

  let [width, height] = lines[0].split(" ");

  if (!isPositiveIntegerOrZero(width) || !isPositiveIntegerOrZero(height)) {
    throw new Error('Invalid input format');
  }

  width = parseInt(width) + 1; 
  height = parseInt(height) + 1; 

  const plateau = new Plateau(width, height);

  for (let i = 1; i < lines.length; i += 2) {
    if (lines[i].length === 0) {
      break;
    }

    if (i+1 >= lines.length) {
      throw new Error('Invalid input format');
    }

    const [x, y, dir] = lines[i].split(" ")

    if (!isPositiveIntegerOrZero(x) || !isPositiveIntegerOrZero(y) || !isValidDirection(dir)) {
      throw new Error('Invalid input format');
    }

    const movements = lines[i+1].split('');  

    for (const movement of movements) {
      if (!isValidMovement(movement)) {
        throw new Error('Invalid input format');
      }
    }

    plateau.addRover({x: parseInt(x), y: parseInt(y)}, dir, movements);
  }

  return plateau;
}

