let grid = [
  [5,3,0,0,7,0,0,0,0],
  [6,0,0,1,9,5,0,0,0],
  [0,9,8,0,0,0,0,6,0],
  [8,0,0,0,6,0,0,0,3],
  [4,0,0,8,0,3,0,0,1],
  [7,0,0,0,2,0,0,0,6],
  [0,6,0,0,0,0,2,8,0],
  [0,0,0,4,1,9,0,0,5],
  [0,0,0,0,8,0,0,7,9]
];

let locked = [];
let cell; 
let selected = null;
let buttonHeight;
let offsetX, offsetY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER, CENTER);

  cell = min(width, height - 100) / 9;
  buttonHeight = cell;
  offsetX = (width - 9 * cell) / 2;
  offsetY = (height - 9 * cell - buttonHeight - 20) / 2;

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
  Finish();
}

function drawGrid() {
  let i = 0;
  while (i <= 9) {
    if (i % 3 === 0) {
      strokeWeight(3);
    } else {
      strokeWeight(1);
    }

    line(offsetX, offsetY + i * cell, offsetX + 9 * cell, offsetY + i * cell);
    line(offsetX + i * cell, offsetY, offsetX + i * cell, offsetY + 9 * cell);
    i++;
  }

  if (selected) {
    let [r, c] = selected;
    noFill();
    strokeWeight(3);
    rect(offsetX + c * cell, offsetY + r * cell, cell, cell);
  }
}

function drawNumbers() {
  textSize(cell * 0.6);
  let r = 0;
  while (r < 9) {
    let c = 0;
    while (c < 9) {
      if (grid[r][c] !== 0) {
        if (locked[r][c]) {
          fill(0); 
        } else {
          if (isConflict(r, c, grid[r][c])) {
            fill(255, 0, 0); 
          } else {
            fill(0, 200, 0);
          }
        }

        text(grid[r][c], offsetX + c * cell + cell / 2, offsetY + r * cell + cell / 2);
      }
      c++;
    }
    r++;
  }
}


function drawButtons() {
  textSize(cell * 0.5);
  let i = 0;
  while (i < 9) {
    let x = offsetX + i * cell;
    let y = offsetY + 9 * cell + 20;
    fill(220);
    rect(x, y, cell, buttonHeight);
    fill(0);
    text(i + 1, x + cell / 2, y + buttonHeight / 2);
    i++;
  }
}

function mousePressed() {
  if (mouseX > offsetX && mouseX < offsetX + 9 * cell &&
      mouseY > offsetY && mouseY < offsetY + 9 * cell) {
    let c = floor((mouseX - offsetX) / cell);
    let r = floor((mouseY - offsetY) / cell);
    selected = [r, c];
  } 
  else if (mouseY > offsetY + 9 * cell + 20 &&
           mouseY < offsetY + 9 * cell + 20 + buttonHeight) {
    let i = floor((mouseX - offsetX) / cell);
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

function Finish() {
  let r = 0;
  while (r < 9) {
    let c = 0;
    while (c < 9) {
      if (grid[r][c] === 0) {
        return false;
      } else {
        if (isConflict(r, c, grid[r][c])) {
          return false;
        }
      }
      c++;
    }
    r++;
  }

  background(255);
  fill(0);
  textSize(50);
  textAlign(CENTER, CENTER);
  text("You Win!", width / 2, height / 2);
  noLoop();
  return true;
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  cell = min(width, height - 100) / 9;
  buttonHeight = cell;
  offsetX = (width - 9 * cell) / 2;
  offsetY = (height - 9 * cell - buttonHeight - 20) / 2;
}
