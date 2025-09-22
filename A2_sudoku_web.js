let table = Array.from({length: 9}, () => Array(9).fill(0));

function setup() {
  createCanvas(900, 900);
  background(255);
  
  generateSudoku();
  makePuzzle(40);
  drawGrid();
}

function drawGrid() {
  let cell = width / 9;
  
  for (let i = 0; i <= 9; i++) {
    if (i == 0 || i == 9) {
      strokeWeight(6);
    } else if (i % 3 == 0) {
      strokeWeight(3);
    } else {
      strokeWeight(1);
    }
    line(i*cell, 0, i*cell, height);
    line(0, i*cell, width, i*cell);
  }
  
  textAlign(CENTER, CENTER);
  textSize(cell * 0.6);
  fill(0);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (table[r][c] != 0) {
        text(table[r][c], c*cell + cell/2, r*cell + cell/2);
      }
    }
  }
}

function generateSudoku() {
  solve(0, 0);
}

function solve(row, col) {
  if (row == 9) return true;

  let nextRow, nextCol;
  if (col == 8) {
    nextRow = row + 1;
    nextCol = 0;
  } else {
    nextRow = row;
    nextCol = col + 1;
  }

  let nums = [1,2,3,4,5,6,7,8,9];
  shuffle(nums, true);

  for (let n of nums) {
    if (isSafe(row, col, n)) {
      table[row][col] = n;
      if (solve(nextRow, nextCol)) return true;
      table[row][col] = 0;
    }
  }
  return false;
}

function isSafe(row, col, n) {
  for (let c = 0; c < 9; c++) if (table[row][c] == n) return false;
  for (let r = 0; r < 9; r++) if (table[r][col] == n) return false;

  let startRow = Math.floor(row/3) * 3;
  let startCol = Math.floor(col/3) * 3;
  for (let r = startRow; r < startRow+3; r++) {
    for (let c = startCol; c < startCol+3; c++) {
      if (table[r][c] == n) return false;
    }
  }
  return true;
}

function makePuzzle(emptyCount) {
  let removed = 0;
  while (removed < emptyCount) {
    let r = floor(random(9));
    let c = floor(random(9));
    if (table[r][c] != 0) {
      table[r][c] = 0;
      removed++;
    }
  }
}
