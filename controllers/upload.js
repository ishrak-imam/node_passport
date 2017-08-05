
const path = require('path');

const uploadHandler = (req, res, next) => {
  const src = path.resolve(__dirname, '../uploads', req.file.filename);
  const dest = path.resolve(__dirname, '../public', req.body.path, req.file.filename);
  helpers.move(src, dest, (err) => {
    if (!err) {
      res.status(200).send({
        sucs: true,
        msg: 'File uploaded successfully.',
        fileInfo: {
          fileName: req.file.filename
        }
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