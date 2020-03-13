require('dotenv/config');
const http = require('http');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const routes = require('./routes');

const server = http.createServer(app);

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Header',
    'Origin, x-Requrested-Woth, Content-Type, Accept, Authorization'
  );
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).send({});
  }
  next();
});

app.use((req, res, next) => {
  const erro = new Error('Not found');
  erro.status = 404;
  next(erro);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.send({
    erro: {
      message: error.message,
    },
  });
});

/**
 * Routes
 */
app.use('/admin', routes);

const port = process.env.PORT || 3001;
server.listen(port, () => {
  console.log('Back-end running on port ' + port);
});
