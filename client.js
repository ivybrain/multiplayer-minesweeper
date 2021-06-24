
import {generate_board} from './modules/generator.mjs';


function populate() {
  const board_div = document.getElementById("board_div")
  const board = generate_board(50, 30, 300);

  for (let i=0; i < board.height; i++) {
    for (let j = 0; j < board.width; j++) {
      let cell = document.createElement("button")
      cell.className = "cell"
      cell.textContent = board.cells[i][j];
      board_div.appendChild(cell)
    }
    board_div.appendChild(document.createElement("br"))
  }
}
window.onload = populate;
