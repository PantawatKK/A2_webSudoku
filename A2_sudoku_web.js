let grid = Array.from({ length: 9 }, () => Array(9).fill(0));
let locked = Array.from({ length: 9 }, () => Array(9).fill(false));
let cell = 60;
let selected = null;
let button_y = 560;

function setup() {
  createCanvas(540, 620);
  textAlign(CENTER, CENTER);
  textSize(24);
  makePuzzle(10);
}

function draw() {
  background(255);
  drawGrid();
  drawNumbers();
  drawButtons();
}

function drawGrid() {
  for (let i = 0; i <= 9; i++) {
    if (i % 3 === 0) {
      strokeWeight(3);
    } else {
      strokeWeight(1);
    }
    line(0, i * cell, 9 * cell, i * cell);
    line(i * cell, 0, i * cell, 9 * cell);
  }

  if (selected) {
    let [r, c] = selected;
    noFill();
    strokeWeight(3);
    rect(c * cell, r * cell, cell, cell);
  }
}


function drawNumbers() {
  textSize(32);
  fill(0);
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] !== 0) {
        text(grid[r][c], c * cell + cell / 2, r * cell + cell / 2);
      }
    }
  }
}

function drawButtons() {
  textSize(20);
  for (let i = 0; i < 9; i++) {
    let x = i * 60;
    let y = button_y;
    fill(200);
    rect(x, y, 60, 50);
    fill(0);
    text(i + 1, x + 30, y + 25);
  }
}

function mousePressed() {
  if (mouseY < 540) {
    let c = floor(mouseX / cell);
    let r = floor(mouseY / cell);
    if (r >= 0 && r < 9 && c >= 0 && c < 9) {
      selected = [r, c];
    }
  } else if (mouseY >= button_y && mouseY <= button_y + 50) {
    let i = floor(mouseX / 60);
    if (i >= 0 && i < 9 && selected) {
      let [r, c] = selected;
      if (!locked[r][c]) {
        if (isValid(r, c, i + 1)) {
          grid[r][c] = i + 1;
        }
      }
    }
  }
}

function fillGrid() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (grid[i][j] === 0) {
        let nums = shuffle([...Array(9).keys()].map(x => x + 1));
        for (let num of nums) {
          if (isValid(i, j, num)) {
            grid[i][j] = num;
            if (fillGrid()) return true;
            grid[i][j] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function makePuzzle(removals = 40) {
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      grid[r][c] = 0;
      locked[r][c] = false;
    }
  }
  fillGrid();

  let cells = [];
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      cells.push([r, c]);
    }
  }
  shuffle(cells, true);
  let count = 0;
  for (let [r, c] of cells) {
    if (count >= removals) break;
    grid[r][c] = 0;
    locked[r][c] = false;
    count++;
  }
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      if (grid[r][c] !== 0) locked[r][c] = true;
    }
  }
}

function isValid(row, col, val) {
  for (let c = 0; c < 9; c++) {
    if (grid[row][c] === val) {
    return false;
    }
  }
  for (let r = 0; r < 9; r++) {
    if (grid[r][col] === val) {
      return false;
    }
  }
  let startRow = row - (row % 3);
  let startCol = col - (col % 3);
  for (let r = startRow; r < startRow + 3; r++) {
    for (let c = startCol; c < startCol + 3; c++) {
      if (grid[r][c] === val) {
        return false;
      }
    }
  }
  return true;
}
