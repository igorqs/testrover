# About the project

This project was created to solve the "Test Rover" problem, functioning as a CLI app.

For a detailed overview of the problem, please refer to its description.

## Notes

In the problem description, there is no mention of what to do if a rover goes out of the plateau or collides with another rover. For this initial version, I have assumed that displaying an error message is appropriate in such cases. However, this behavior can be easily modified.


## Examples

### Input (#1)
```
5 5
1 2 N
LMLMLMLMM
3 3 E
MMRMMRMRRM
```
### Output (#1)
```
1 3 N
5 1 E
```

### Input (#2)
```
5 5
1 2 N
LMLMLMLMM
5 3 W
MMMMMMMMMM
```
### Output (#2)
```
There was an error while simulating the rovers movement: The rover hits another rover
```
### Input (#3)
```
5 5
1 2 N
MMMMMMMMMMMMMMMMMMMM
```
### Output (#3)
```
There was an error while simulating the rovers movement: The rover goes out of the plateau
```
### Input (#4)
```
t 5
1 2 N
LMLMLMLMM
5 3 E
MMMMMMMMMM
```
### Output (#4)
```
There was an error while parsing the input: Invalid input format
```


# Built With

- Javascript
- Node.js
- Jest
- npm

# Getting started

## Prerequisites
This project requires Node.js (version 20.10.0 or later) and npm. To confirm their availability on your machine, execute the following command:
```
$ npm -v && node -v
10.2.4
v20.10.0
```

## Installation
Clone the repository: 
```
$ git clone git@github.com:igorqs/testrover.git
$ cd testrover
```
Install npm packages 
```
$ npm install
```

# Usage

## Running the app
```
node ./src/index.js <file_name>
```

## Running the unit tests
```
npm run tests:unit
```

## Running the integration tests
```
npm run tests:integration
```

# Code Structure

```
.
├── integration
│   ├── cli.test.js
│   └── fixtures
│       ├── test10.txt
│       ├── test1.txt
│       ├── test2.txt
│       ├── test3.txt
│       ├── test4.txt
│       ├── test5.txt
│       ├── test6.txt
│       ├── test7.txt
│       └── test9.txt
├── package.json
├── package-lock.json
├── README.md
├── src
│   ├── CollisionError.js
│   ├── index.js
│   ├── main.js
│   ├── OutOfBoundsError.js
│   ├── plateau.js
│   ├── rover.js
│   └── utils.js
└── tests
    ├── main.test.js
    ├── plateau.test.js
    ├── rover.test.js
    └── utils.test.js
```

## src

- **CollisionError.js**: Represents a collision error, used when two rovers collide.
- **index.js**: The unit called when executing the project; it retrieves parameters and passes them to the main unit.
- **main.js**: The main unit of the project; responsible for reading input, simulating rovers' movements, and printing the output.
- **OutOfBoundsError.js**: Represents an out-of-bounds error, used when a rover goes out of the plateau.
- **plateau.js**: Represents the plateau.
- **rover.js**: Represents the rover.
- **utils.js**: A unit containing useful methods to be used throughout the project.

## tests

In this directory, you'll find unit tests for all JS units except index.js, CollisionError.js, and OutOfBoundsError.js.

## integration

In this folder, there are integration tests and the necessary fixtures.
