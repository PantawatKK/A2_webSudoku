let grid = [
  [5, 3, 0, 0, 7, 0, 0, 0, 0],
  [6, 0, 0, 1, 9, 5, 0, 0, 0],
  [0, 9, 8, 0, 0, 0, 0, 6, 0],
  [8, 0, 0, 0, 6, 0, 0, 0, 3],
  [4, 0, 0, 8, 0, 3, 0, 0, 1],
  [7, 0, 0, 0, 2, 0, 0, 0, 6],
  [0, 6, 0, 0, 0, 0, 2, 8, 0],
  [0, 0, 0, 4, 1, 9, 0, 0, 5],
  [0, 0, 0, 0, 8, 0, 0, 7, 9]
];

let cell = 60;
let selected = null;
let button_y = 560;
let locked = [];

function setup() {
  createCanvas(540, 620);
  textAlign(CENTER, CENTER);
  textSize(24);

  let r = 0;
  while (r < 9) {
    locked[r] = [];
    let c = 0;
    while (c < 9) {
      locked[r][c] = grid[r][c] !== 0;
      c++;
    }
    r++;
  }
}

function draw() {
  background(255);
  drawGrid();
  drawNumbers();
  drawButtons();
}

function drawGrid() {
  let i = 0;
  while (i < 10) {
    strokeWeight(i % 3 === 0 ? 3 : 1);
    line(0, i * cell, 9 * cell, i * cell);
    line(i * cell, 0, i * cell, 9 * cell);
    i++;
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
  let r = 0;
  while (r < 9) {
    let c = 0;
    while (c < 9) {
      if (grid[r][c] !== 0) {
        if (locked[r][c]) {
          fill(0);
        } else if (isConflict(r, c, grid[r][c])) {
          fill(255, 0, 0);
        } else {
          fill(0, 200, 0);
        }
        text(grid[r][c], c * cell + cell / 2, r * cell + cell / 2);
      }
      c++;
    }
    r++;
  }
}

function drawButtons() {
  textSize(20);
  let i = 0;
  while (i < 9) {
    let x = i * 60;
    let y = button_y;
    fill(200);
    rect(x, y, 60, 50);
    fill(0);
    text(i + 1, x + 30, y + 25);
    i++;
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
        grid[r][c] = i + 1;
      }
    }
  }
}

function isConflict(row, col, val) {
  let c = 0;
  while (c < 9) {
    if (c !== col && grid[row][c] === val) {
      return true;
    }
    c++;
  }

  let r = 0;
  while (r < 9) {
    if (r !== row && grid[r][col] === val) {
      return true;
    }
    r++;
  }

  let startRow = row - (row % 3);
  let startCol = col - (col % 3);
  r = startRow;
  while (r < startRow + 3) {
    c = startCol;
    while (c < startCol + 3) {
      if ((r !== row || c !== col) && grid[r][c] === val) {
        return true;
      }
      c++;
    }
    r++;
  }

  return false;
}
