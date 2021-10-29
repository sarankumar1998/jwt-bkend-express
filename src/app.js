const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(passport.initialize());
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());

require('dotenv').config();
require('./auth/passport');
require('./models/user');
const middlewares = require('./middlewares');
const api = require('./api');



app.get('/name', (req, res) => {
  res.send({
      message: "hello aliens"
  });
});

app.use('/api/v1', api);
// this api router is from api folder i)register ii)login iii)payment

app.use(middlewares.notFound);
app.use(middlewares.errorHandler);

module.exports = app;