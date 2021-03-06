const fs = require('fs');
const path = require('path');

const setUserInfo = (request) => {
  return {
    _id: (request._id) ? request._id : request.id,
    // firstName: request.profile.firstName,
    // lastName: request.profile.lastName,
    email: request.email,
    userName: request.userName
    // role: request.role,
  };
};

const move = (oldPath, newPath) => {
  return new Promise((resolve, reject) => {
    fs.rename(oldPath, newPath, function (err) {
      (err) ? reject(err) : resolve(err);
    });
  });
};

const moveFiles = (files, filePath, cb) => {
  /**
   * @todo
   * try to make directory creation async.
   */

  const dir = path.resolve(__dirname, '../public/images', filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  const promises = files.map((file) => {
    let src = path.resolve(__dirname, '../uploads', file.filename);
    let dest = path.resolve(__dirname, '../public/images', filePath, file.filename);
    return move(src, dest);
  });
  return Promise.all(promises);
};

module.exports = {
  setUserInfo,
  move,
  moveFiles
};
