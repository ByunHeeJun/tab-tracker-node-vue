// eslint-disable-next-line no-unused-vars
const { User } = require('../models')
console.log('User', User)
module.exports = {
  async register (req, res) {
    try {
      // eslint-disable-next-line no-unused-vars
      const user = await User.create(req.body)
      console.log(user.toJSON())
      res.send(user.toJSON())
    } catch (err) {
      res.status(400).send({
        error: `This email account is alerady in use.`
      })
    }
  }
}
