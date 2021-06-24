
const express = require('express');
const cors = require('cors');

const wss = require('./wsserver');

const app = express();

const PORT = process.env.PORT || 8080

app.use(cors());
app.use(express.static('public'));
wss(app).then(() => {
  app.listen(PORT, () => {
    console.log("listening on", PORT);

  })
});
