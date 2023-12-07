const { exec } = require('child_process');

describe('cli', () => {
  it('should parse the input and print the output', (done) => {
    exec(
      'node ./src/index.js ./integration/fixtures/test1.txt',
      (error, stdout, stderr) => {
        expect(stdout).toEqual('1 3 N\n5 1 E\n\n');
        done();
      }
    );
  });

  it('should print an error message if the rover hits another rover', (done) => {
    exec(
      'node ./src/index.js ./integration/fixtures/test2.txt',
      (error, stdout, stderr) => {
        expect(stderr).toEqual('There was an error while simulating the rovers movement: The rover hits another rover\n\n');
        done();
      }
    );
  });

  it('should print an error message if the input is invalid', (done) => {
    exec(
      'node ./src/index.js ./integration/fixtures/test3.txt',
      (error, stdout, stderr) => {
        expect(stderr).toEqual('There was an error while parsing the input: Invalid input format\n\n');
        done();
      }
    );
  });

  it('should parse the input and print the output if there is a rover without movements', (done) => {
    exec(
      'node ./src/index.js ./integration/fixtures/test4.txt',
      (error, stdout, stderr) => {
        expect(stdout).toEqual('1 2 N\n3 4 N\n\n');
        done();
      }
    );
  });

  it('should parse the input and print the output if there is no rovers', (done) => {
    exec(
      'node ./src/index.js ./integration/fixtures/test5.txt',
      (error, stdout, stderr) => {
        expect(stdout).toEqual('\n');
        done();
      }
    );
  });

  it('should parse the input and print the output the rovers do not move', (done) => {
    exec(
      'node ./src/index.js ./integration/fixtures/test6.txt',
      (error, stdout, stderr) => {
        expect(stdout).toEqual('1 2 S\n3 3 E\n5 5 W\n\n');
        done();
      }
    );
  });

  it('should print an error message if the rover hits another rover', (done) => {
    exec(
      'node ./src/index.js ./integration/fixtures/test7.txt',
      (error, stdout, stderr) => {
        expect(stderr).toEqual('There was an error while simulating the rovers movement: The rover goes out of the plateau\n\n');
        done();
      }
    );
  });

  it('should print an error message if the file does not exist', (done) => {
    exec(
      'node ./src/index.js ./integration/fixtures/test8.txt',
      (error, stdout, stderr) => {
        expect(stderr).toEqual("There was an error while parsing the input: ENOENT: no such file or directory, open './integration/fixtures/test8.txt'\n\n");
        done();
      }
    );
  });

  it('should print an error message if the input has multiple rovers on the same place', (done) => {
    exec(
      'node ./src/index.js ./integration/fixtures/test9.txt',
      (error, stdout, stderr) => {
        expect(stderr).toEqual('There was an error while parsing the input: The rover hits another rover\n\n');
        done();
      }
    );
  });

  it('should print an error message if the input has rovers out of bounds', (done) => {
    exec(
      'node ./src/index.js ./integration/fixtures/test10.txt',
      (error, stdout, stderr) => {
        expect(stderr).toEqual('There was an error while parsing the input: The rover goes out of the plateau\n\n');
        done();
      }
    );
  });
});

