let board;


function connect_room() {

  const room = document.getElementById("room_field").value;
  const user = document.getElementById("user_field").value;

  document.getElementById("room_form").style.display = "none";

  const host = location.origin.replace(/^http/, 'ws')
  const ws = new WebSocket(host);

  ws.onopen = () => {
    ws.send(JSON.stringify({msg: "hello", room, user}));
  }

  ws.onmessage = function(e) {
    console.log(e);
    const msg = JSON.parse(e.data);

    document.getElementById("room_info").innerHTML = `Room: ${msg.name}, People: ${msg.people}, Users: ${msg.users}`

    board = msg.board;

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

    board_div.style.display = "block";

  };

  return false;

}

window.onload = () => {
  console.log("loaded");
  document.getElementById("room_form").onsubmit = connect_room;

}
