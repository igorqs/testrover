const { parseInput } = require('./utils');

exports.main = async (inputFilePath) => {
  try {
    const plateau = await parseInput(inputFilePath);

    try {
      plateau.moveRovers();

      console.log(plateau.toString());
    } catch ({ name, message }) {
      console.error(`There was an error while simulating the rovers movement: ${message}\n`)
    }

  } catch ({ name, message }) {
    console.error(`There was an error while parsing the input: ${message}\n`)
  }
};

