
import {generate_board} from './modules/generator.mjs';


function populate() {

  const ws = new WebSocket('ws://localhost:8081');

  ws.onopen = () => {
    ws.send("hello");
  }

  ws.onmessage = function(e) {
    console.log(e);
    let board = JSON.parse(e.data);

    const board_div = document.getElementById("board");

    const images = Array(9);

    for (let i = 0; i <= 8; i++) {
      images[i] = document.createElement("img");
      images[i].src = `/images/open${i}.gif`;
      images[i].className = "cell";
    }
    const mine_img = document.createElement("img");
    mine_img.src = '/images/bombrevealed.gif'
    mine_img.className = "cell"

    for (let i=0; i < board.height; i++) {
      for (let j = 0; j < board.width; j++) {

        let n = board.cells[i][j];
        n = n <= 8 && n >= -1 ? n : 0

        let cell = document.createElement("a");

        if(n == -1) {
          cell.appendChild(mine_img.cloneNode(true))

        } else {

          cell.appendChild(images[n].cloneNode(true));
        }


        board_div.appendChild(cell)
      }
      board_div.appendChild(document.createElement("br"))
    }

  };


}
window.onload = populate;
