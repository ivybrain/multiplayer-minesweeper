const rooms = {};

async function start(app) {

  const expressWs = require('express-ws')(app);

  const gen = await import('./modules/generator.mjs')

  app.ws('/', function connection(ws, req) {
    console.log("connected");

    ws.on('message', message => {
      console.log(message);

      msg = JSON.parse(message);
      if (msg.msg == "hello") {

        const room = msg.room;
        if (!rooms.room) {
          rooms.room = {name: room, board: gen.generate_board(50, 30, 300), people: 1, users: [msg.user]};
        } else {
          rooms.room.people++;
          rooms.room.users.push(msg.user);
        }

        ws.send(JSON.stringify(rooms.room));

        return;
      }

      ws.send("invalid message");

    });

  })
}

module.exports = start;
