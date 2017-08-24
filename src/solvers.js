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
  let solution;
  let matrix = new Board({n: n});
  // matrix.children = [];
  // console.log(matrix);
  // var rootMatrix = new RookTree(matrix);
  // console.log(rootMatrix.children, 'test');
  // rootMatrix.makeDecision(matrix);
  
  var addDecision = function(rowCount) {
    if (n === rowCount) {
      solution = _.map(matrix.rows(), row => row.slice());
    }
    if (!solution) {
      for (var colCount = 0; colCount < n; colCount++) {
        matrix.togglePiece(rowCount, colCount);
        if (!matrix.hasAnyRooksConflicts()) {
          addDecision(rowCount + 1);
        }
        matrix.togglePiece(rowCount, colCount);
      }
    }
  };
  addDecision(0);
  // console.log(solution);
  // console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  
  return solution;
};


// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0;
  var matrix = new Board({n: n});
  var checkSolutions = function(rowCount) {
    if (n === rowCount) {
      solutionCount++;
      return;
    }
    for (var colCount = 0; colCount < n; colCount++) {
      matrix.togglePiece(rowCount, colCount);
      if (!matrix.hasAnyRooksConflicts()) {
        checkSolutions(rowCount + 1);
      }
      matrix.togglePiece(rowCount, colCount);
    }
  };
  checkSolutions(0);
  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution;
  var matrix = new Board({n: n});
  var addDecision = function(rowCount) {
    if (n === rowCount) {
      return _.map(matrix.rows(), row => row.slice());
    }
    if (!solution) {
      for (var colCount = 0; colCount < n; colCount++) {
        matrix.togglePiece(rowCount, colCount);
        if (!matrix.hasAnyQueensConflicts()) {
          var result = addDecision(rowCount + 1);
          if (result) {
            return result;
          }
        }
        matrix.togglePiece(rowCount, colCount);
      }
    }
  };
  var solution = addDecision(0) || matrix.rows();
  // console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var matrix = new Board({n: n});
  var checkSolutions = function(rowCount) {
    if (n === rowCount) {
      solutionCount++;
      return;
    }
    for (var colCount = 0; colCount < n; colCount++) {
      matrix.togglePiece(rowCount, colCount);
      if (!matrix.hasAnyQueensConflicts()) {
        checkSolutions(rowCount + 1);
        
      }
      matrix.togglePiece(rowCount, colCount);
    }
  };
  checkSolutions(0);
  // console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};

// var RookTree = function (matrix) {
//   this.matrix = new Board(matrix)
//   this.children = [];
//   // console.log(this, 'this is a new rooktree');
//   // var newMatrix = new Board(matrix);
//   // newMatrix.children = [];
// };

// RookTree.prototype = Object.create(Board.prototype);
// RookTree.prototype.constructor = RookTree;


// RookTree.prototype.addChild = function(matrix) {
//   // console.log(matrix);
//   var copy = _.map(matrix.rows(), (row) => {
//     return row.slice();
//   });
//   var node = new RookTree(copy);
//   this.children.push(node);
//   // if ()
  
  // addDecision()
// };


// RookTree.prototype.makeDecision = function(matrix, timesRun) {
//   var n = matrix.attributes.n;
//   timesRun++
//   if (matrix.children) {
//     for (var matrixCount = 0; matrixCount < matrix.children.length; matrixCount++) {
//       for (var rowCount = 0; rowCount < n; rowCount++) {
//         for (var colCount = 0; colCount < n; colCount++) {
//           var currentPos = matrix.attributes[rowCount][colCount];
//           if (currentPos === 0) {
//             matrix[matrixCount].togglePiece(rowCount, colCount);
//             if (!matrix[matrixCount].hasAnyRooksConflicts()) {
//               this.addChild(matrix[matrixCount]);
//             }
//             matrix[matrixCount].togglePiece(rowCount, colCount);        
//           }
//         }
//       }
//     }
//   }
// };



