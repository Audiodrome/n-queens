/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  let solution = [];
  let matrix = new Board({n: n});
  console.log(matrix);
  var rootMatrix = new RookTree(matrix);
  console.log(rootMatrix.children, 'test');
  rootMatrix.makeDecision(matrix);
  console.log(matrix);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  
  return solution;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

var RookTree = function (matrix) {
  this.matrix = matrix;
  this.children = [];
  // var newMatrix = new Board(matrix);
  // newMatrix.children = [];
};

RookTree.prototype = Object.create(Board.prototype);
RookTree.prototype.constructor = RookTree;


RookTree.prototype.addChild = function(matrix) {
  var node = new RookTree(matrix);
  this.children.push(node);
  // if ()
  
  // addDecision()
};


RookTree.prototype.makeDecision = function(matrix) {
  var n = matrix.attributes.n;
  for (var rowCount = 0; rowCount < n; rowCount++) {
    for (var colCount = 0; colCount < n; colCount++) {
      var currentPos = matrix.attributes[rowCount][colCount];
      if (currentPos === 0) {
        matrix.attributes[rowCount][colCount] = 1;
        if (!matrix.hasAnyRooksConflicts()) {
          this.addChild(matrix);
        }
        matrix.attributes[rowCount][colCount] = 0;        
      }
    }
  }
};



