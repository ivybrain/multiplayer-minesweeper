
const express = require('express');
const cors = require('cors');

const wss = require('./wsserver');

const app = express();

app.use(cors());
app.use(express.static('public'));

app.listen(process.env.PORT || 8080, () => {
  console.log("listening on", process.env.PORT || 8080);
  wss();
})
