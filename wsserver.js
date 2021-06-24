const WebSocket = require('ws');



async function start() {

  const gen = await import('./public/scripts/modules/generator.mjs')

  const wss = new WebSocket.Server({
     port: 8081
  });

  wss.on('connection', function connection(ws) {
    console.log("connected");

    ws.on('message', message => {
      console.log(message);
      

      const board = gen.generate_board(50, 30, 300);
      ws.send(JSON.stringify(board))
    });

  })
}

module.exports = start;
