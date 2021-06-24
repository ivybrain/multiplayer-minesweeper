
const width = 50;
const height = 30;
const mines = 300;



exports.generate_board = function generate_board(width, height, mines) {
  mines = mines >= width*height ? width * height - 1 : mines;

  const chance = mines / (width * height);
  const board = new Array(height);


  // Initialise the board, and place mines according to chance, up to limit
  let laid = 0;
  for (let i=0; i<height; i++) {
    board[i] = new Array(width)

    for (let j=0; j<width; j++) {
      let is_mine = laid < mines && Math.random() < chance;
      laid += is_mine;
      board[i][j] = is_mine ? -1 : 0
    }

  }

  // If there are less mines than the specified amount, place rest randomly
  while (laid < mines) {
    const i = Math.floor(Math.random() * height);
    const j = Math.floor(Math.random() * width);

    if (board[i][j] == -1)
      continue;

    board[i][j] = -1;
    laid++;
  }

  return {width: width, height: height, mines: mines, cells: board};
}

exports.surrounds = function surrounds(cell, board) {
  const relative = [...Array(9).keys()].filter(x => x!=4).map(x => [Math.floor(x/3) - 1, x % 3 - 1])
  return relative.map(x => [cell[0] + x[0]], [cell[1] + x[1]])
}

exports.label_frees = function label_frees(board) {
  for (let i=0; i<board.height; i++) {
    for (let j=0; j<board.width; j++) {

    }
  }

}
