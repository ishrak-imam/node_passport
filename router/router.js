
const AuthenticationController = require('../controllers/authentication'),
  UserController = require('../controllers/user'),
  express = require('express'),
  passport = require('passport'),
  passportService = require('../config/passport')


const requireAuth = passport.authenticate('jwt', {session: false})


module.exports = (app) => {

  // Initializing route groups
  const apiRoutes = express.Router(),
    userRoutes = express.Router(),
    authRoutes = express.Router()

  // Auth Routes
  apiRoutes.use('/auth', authRoutes)
  authRoutes.post('/register', AuthenticationController.register)
  authRoutes.post('/login', AuthenticationController.login)


  // user routes
  apiRoutes.use('/user', userRoutes)
  userRoutes.get('/:userId', requireAuth, UserController.viewProfile)


  // Set url for API group routes
  app.use('/api', apiRoutes)
}