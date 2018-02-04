
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/main');
const router = require('./router/router');

// CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, ' +
    'Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

app.use(express.static('public'));
mongoose.connect(config.DATABASE);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
router(app);
app.listen(config.PORT);
console.log(`Your server is running on port ${config.PORT}.`);
