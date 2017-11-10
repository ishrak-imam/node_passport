
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  config = require('./config/main'),
  router = require('./router/router');

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, ' +
    'Accept, Authorization, Access-Control-Allow-Credentials')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
});


app.use(express.static('public'));

mongoose.connect(config.DATABASE, {
  server: {
    socketOptions: {
      socketTimeoutMS: 0,
      connectionTimeout: 0
    }
  }
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

router(app);

const server = app.listen(config.PORT);
console.log(`Your server is running on port ${config.PORT}.`);