
const path = require('path');
const helpers = require('../helpers/helper');

const uploadHandler = (req, res, next) => {
  const path = req.body.path;
  helpers.moveFiles(req.files, path, (success) => {
    if (success) {
      const fileNames = req.files.map(file => file.filename)
      res.status(200).send({
        sucs: true,
        msg: 'File uploaded successfully.',
        fileNames
      });
    } else {
      res.status(422).send({
        sucs: false,
        msg: 'File upload failed.'
      });
    }
  });
}


module.exports = {
  uploadHandler
}