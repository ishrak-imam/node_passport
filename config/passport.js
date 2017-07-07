
const passport = require('passport'),
  User = require('../models/user'),
  config = require('./main'),
  JwtStrategy = require('passport-jwt').Strategy,
  ExtractJwt = require('passport-jwt').ExtractJwt,
  LocalStrategy = require('passport-local'),
  errMsgs = require('../utils/errMsgs')


const localOptions = {
  usernameField: 'email'
}


const localStrategy = new LocalStrategy(localOptions, (email, password, done) => {
  User.findOne({ email }, (err, user) => {
    if (err) { return done(err) }
    if (!user) { return done(null, false, errMsgs.loginErr.userNotFound) }
    user.comparePassword(password, (err, isMatch) => {
      if (err) { return done(err) }
      if (!isMatch) { return done(null, false, errMsgs.loginErr.wrongPass) }

      return done(null, user)
    })
  })
})


const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: config.SECRET
}


const jwtStrategy = new JwtStrategy(jwtOptions, (payload, done) => {
  User.findById(payload._id, (err, user) => {
    if (err) {
      console.log('here', err)
      return done(err, false)
    }
    if (user) {
      done(null, user)
    } else {
      done(null, false)
    }
  })
})

passport.use(jwtStrategy)
passport.use(localStrategy)