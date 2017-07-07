

const
  User = require('../models/user'),
  helper = require('../helpers/helper')

const viewProfile = (req, res, next) => {
  const userId = req.params.userId
  if (req.user._id.toString() !== userId) {
    return res.status(401).send({
      sucs: false,
      msg: 'You are not authorized to view this user profile.'
    })
  }
  User.findById(userId, (err, user) => {
    if (err) {

      // response not needed, as it is already verifying
      // the used id in previous step.

      // res.status(400).send({
      //   sucs: false,
      //   msg: 'No user could be found for this ID.'
      // })

      return next(err)
    }
    const userToReturn = helper.setUserInfo(user)
    return res.status(200).send({ user: userToReturn })
  })
}

module.exports = {
  viewProfile
}
