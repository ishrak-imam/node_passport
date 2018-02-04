
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user');
const helper = require('../helpers/helper');
const config = require('../config/main');
const errMsgs = require('../utils/errMsgs');

const generateToken = (user) => {
  return jwt.sign(user, config.SECRET, {
    expiresIn: config.JWT_EXPIRE
  });
};

const login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (user) {
      const userInfo = helper.setUserInfo(user);
      res.status(200).send({
        sucs: true,
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
    }
    if (info) { res.status(422).send(info); }
  })(req, res, next);
};

const register = (req, res, next) => {
  const email = req.body.email;
  const userName = req.body.userName;
  // const firstName = req.body.firstName;
  // const lastName = req.body.lastName;
  const password = req.body.password;

  if (!email) {
    return res.status(422).send({
      sucs: false,
      msg: 'You must enter an email address.'
    });
  }

  // if (!firstName || !lastName) {
  //   return res.status(422).send({ error: 'You must enter your full name.'});
  // }

  if (!userName) {
    return res.status(422).send({
      sucs: false,
      msg: 'you must enter an user name.'
    });
  }

  if (!password) {
    return res.status(422).send({
      sucs: false,
      msg: 'You must enter a password.'
    });
  }

  User.findOne({ email: email }, function (err, existingUser) {
    if (err) { return next(err); }
    if (existingUser) {
      return res.status(422).send(errMsgs.regError.emailExists);
    }
    const user = new User({
      email: email,
      password: password,
      userName: userName
      // profile: { firstName: firstName, lastName: lastName }
    });
    user.save(function (err, user) {
      if (err) { return next(err); }
      const userInfo = helper.setUserInfo(user);
      res.status(201).send({
        sucs: true,
        token: `JWT ${generateToken(userInfo)}`,
        user: userInfo
      });
    });
  });
};

module.exports = {
  login,
  register
};
