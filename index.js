
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  config = require('./config/main'),
  router  = require('./router/router')

mongoose.connect(config.DATABASE)

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router(app)

// Enable CORS from client-side
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, ' +
    'Accept, Authorization, Access-Control-Allow-Credentials')
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})

const server = app.listen(config.PORT)
console.log(`Your server is running on port ${  config.PORT  }.`)