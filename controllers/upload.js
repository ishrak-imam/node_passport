
const helpers = require('../helpers/helper');

function getUploadPath (type) {
  let path = '';
  switch (type) {
    case 'prim':
      path = 'profile-images';
      break;
    case 'cim':
      path = 'cover-images';
      break;
    default:
      path = '';
  }
  return path;
}

const uploadHandler = (req, res, next) => {
  const path = getUploadPath(req.body.type ? req.body.type : '');
  helpers.moveFiles(req.files, path).then(
    () => {
      const prefix = path ? `${path}/` : '';
      const fileNames = req.files.map(file => `${prefix}${file.filename}`);
      res.status(200).send({
        sucs: true,
        msg: 'File uploaded successfully.',
        fileNames
      });
    },
    () => {
      res.status(422).send({
        sucs: false,
        msg: 'File upload failed.'
      });
    }
  );
};

module.exports = {
  uploadHandler
};
