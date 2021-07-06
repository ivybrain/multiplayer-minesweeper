
function surrounds(cell, width, height) {
  const relative = [...Array(9).keys()].filter(x => x!=4)
    .map(x => [Math.floor(x/3) - 1, x % 3 - 1]);

  return relative.map(x => [cell[0] + x[0], cell[1] + x[1]])
    .filter(x => x.every(x=> x>=0) && x[0] < width && x[1] < height);
}

function label_frees(board) {
  for (let i=0; i<board.height; i++) {
    for (let j=0; j<board.width; j++) {
      if (board.cells[i][j] == -1)
        continue;

      board.cells[i][j] = surrounds([j, i], board.width, board.height)
        .filter(x => board.cells[x[1]][x[0]] == -1).length

    }
  }
}


function generate_board(width, height, mines) {
  mines = mines >= width*height ? width * height - 1 : mines;
  let cells_rem = width * height;

  const chance = mines / (width * height);
  const cells = new Array(height);


  // Initialise the board, and place mines according to chance, up to limit


  for (let i=0; i<height; i++) {
    cells[i] = new Array(width)

    for (let j=0; j<width; j++) {
      let is_mine = Math.random() < (mines / cells_rem);
      console.log(mines/cells_rem);
      mines -= is_mine;
      cells_rem--;
      cells[i][j] = is_mine ? -1 : 0
    }

  }

  const board = {width, height, mines, cells};
  label_frees(board);

  return board;
}

export {generate_board};
