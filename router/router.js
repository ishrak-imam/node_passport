
const path = require('path');

const AuthenticationController = require('../controllers/authentication'),
  UserController = require('../controllers/user'),
  Upload = require('../controllers/upload'),
  express = require('express'),
  passport = require('passport'),
  passportService = require('../config/passport')
  helpers = require('../helpers/helper');

const requireAuth = passport.authenticate('jwt', { session: false });

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '../uploads'))
  },
  filename: function (req, file, cb) {
    var originalname = file.originalname;
    var extension = originalname.split(".");
    filename = `${file.fieldname}-${Date.now()}.${extension[extension.length-1]}`
    cb(null, filename);
  }
});
const uploadMiddleware = multer({ storage }).single('profileImage');



module.exports = (app) => {

  // Initializing route groups
  const apiRoutes = express.Router(),
    userRoutes = express.Router(),
    authRoutes = express.Router(),
    uploadRoutes = express.Router();

  // Auth Routes
  apiRoutes.use('/auth', authRoutes);
  authRoutes.post('/register', AuthenticationController.register);
  authRoutes.post('/login', AuthenticationController.login);


  // user routes
  apiRoutes.use('/user', userRoutes);
  userRoutes.get('/:userId', requireAuth, UserController.viewProfile);


  // upload routes
  apiRoutes.use('/upload', uploadRoutes);
  // uploadRoutes.post('/profileImage', requireAuth, uploadMiddleware, Upload.uploadHandler);
  uploadRoutes.post('/profileImage', uploadMiddleware, Upload.uploadHandler);


  // Set url for API group routes
  app.use('', apiRoutes);
}