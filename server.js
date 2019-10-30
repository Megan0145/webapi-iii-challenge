const express = require('express');
const userRouter = require('./users/userRouter');
const server = express();

server.use(express.json());
server.use(logger)
server.use('/api/users', userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//custom middleware

function logger(req, res, next) {
  console.log(`\n***NEW REQUEST*** \nRequest Method: ${req.method} \nRequest URL: ${req.url} \nRequest Timestamp: ${Date.now()}\n`);
  next();
};

module.exports = server;
