const { main } = require('./main');
const { parseArguments } = require('./utils');

const inputFilePath = parseArguments(process.argv.slice(2));

main(inputFilePath);

