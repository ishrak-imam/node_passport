

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

module.exports = {
  setUserInfo
}