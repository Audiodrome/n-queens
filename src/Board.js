// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      // console.log(this.attributes[rowIndex]);
      // var counter = 0;
      // this.attributes[rowIndex].forEach((piece) => {
      //   if (piece === 1) {
      //     counter += 1;
      //   }
      //   // console.log(counter);
      // });
      // if (counter > 1) {
      //   return true;
      // }

      // console.log(this.attributes);
      // console.log(this.attributes);
      var board = this.attributes;
      var counter = 0;
      var row = this.get(rowIndex);
      for (var i = 0; i < row.length; i++) {        
        counter += row[i];
        // if (counter > 1) { return true; }            
      }
      
      // return false; // fixme
      return counter > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var n = this.attributes.n;
      for (var count = 0; count < n; count++) {
        if (this.hasRowConflictAt(count)) {
          return true;
        } 
      }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      
      var boardObj = this;
      var counter = 0;
      // Object.keys(this.attributes).forEach((row) => {
      //   if (boardObj.attributes[row][colIndex] === 1) { counter += 1; }
      // });
      
      // if (counter > 1) { return true; }
      
      var board = this.attributes;
      var counter = 0;
      for (var i = 0; i < this.attributes.n; i++) {
        if (board[i][colIndex] === 1) { counter += 1; }
      }
      return counter > 1; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      for (var i = 0; i < this.attributes.n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let counter = 0;
      let index = majorDiagonalColumnIndexAtFirstRow;
      let rowCount = index >= 0 ? 0 : Math.abs(index);
      let colCount = index >= 0 ? index : 0;
      let diagSize = this.attributes.n - Math.abs(index);
      for (let diagCount = 0; diagCount < diagSize; diagCount++) {
        if (this.attributes[rowCount][colCount] === 1) {
          counter++;
        }
        rowCount++;
        colCount++;
      }
      
      if (counter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      for (let i = 0; i < this.attributes.n - 1; i++) {
        if (i !== 0) {
          if (this.hasMajorDiagonalConflictAt(-i)) {
            return true;
          }
        }
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let counter = 0;
      let idx = minorDiagonalColumnIndexAtFirstRow;
      let midPoint = this.attributes.n - 1;
      let rowCount = idx <= midPoint ? 0 : idx - midPoint;
      let colCount = idx <= midPoint ? idx : midPoint;
      let diagSize = idx <= midPoint ? idx + 1 : this.attributes.n - (idx - midPoint); //if index <= midpoint index : n - (index - midpoint)
      for (var diagCount = 0; diagCount < diagSize; diagCount++) {
        if (this.attributes[rowCount][colCount] === 1) {
          counter++;
        }
        rowCount++;
        colCount--;
      }
      if (counter > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      let midpoint = this.attributes.n * 2;
      let last = midpoint * 2;
      for (let i = 1; i < last; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
