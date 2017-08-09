
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  config = require('./config/main'),
  router  = require('./router/router'),
  cors = require('cors')


app.use(express.static('public'))

mongoose.connect(config.DATABASE, {
  server: {
    socketOptions: {
      socketTimeoutMS: 0,
      connectionTimeout: 0
    }
  }
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

router(app)

// Enable CORS from client-side
app.use(cors())

const server = app.listen(config.PORT)
console.log(`Your server is running on port ${config.PORT}.`)