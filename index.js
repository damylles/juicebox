const PORT = 3000;
const express = require('express');
const server = express();

const morgan = require('morgan');
server.use(morgan('dev'));

server.use(express.json());

const apiR = require('./api');
server.use('/api', apiR);

const { client } = require('./db');
client.connect();

server.listen(PORT, () => {
  // old stuff
  console.log('The server is up on port', PORT);
});

server.use((req, res, next) => {
  console.log('<____Body Logger START____>');
  console.log(req.body);
  console.log('<_____Body Logger END_____>');

  next();
});
