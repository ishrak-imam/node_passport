

const setUserInfo = (request) => {
  return {
    _id: request._id,
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