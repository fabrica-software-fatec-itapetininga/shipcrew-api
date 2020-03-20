require('dotenv/config');
const http = require('http');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');

require('./database/index.js');

const app = express();

const routes = require('./routes');

const server = http.createServer(app);

app.use(cors());

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

/**
 * Routes
 */
app.use('/admin', routes);

app.use((req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  return res.json({
    success: false,
    message: error.message,
  });
});

const port = process.env.APP_PORT || 3001;
server.listen(port, () => {
  console.log('Back-end running on port ' + port);
});
