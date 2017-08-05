const fs = require('fs');

const setUserInfo = (request) => {
  return {
    _id: (request._id) ? request._id : request.id,
    // firstName: request.profile.firstName,
    // lastName: request.profile.lastName,
    email: request.email,
    userName: request.userName
    // role: request.role,
  }
}

const move = (oldPath, newPath, callback) => {

  // Todo
  // create directory if not already present

  fs.rename(oldPath, newPath, function (err) {
    if (err) {
      if (err.code === 'EXDEV') {
        copyAndDelete();
      } else {
        callback(err);
      }
      return;
    }
    callback();
  });

  function copyAndDelete() {
    var readStream = fs.createReadStream(oldPath);
    var writeStream = fs.createWriteStream(newPath);
    readStream.on('error', callback);
    writeStream.on('error', callback);
    readStream.on('close', function () {
      fs.unlink(oldPath, callback);
    });
    readStream.pipe(writeStream);
  }
}

module.exports = {
  setUserInfo,
  move
}