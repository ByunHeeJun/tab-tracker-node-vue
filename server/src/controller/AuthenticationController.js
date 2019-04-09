/* eslint-disable no-unreachable */
/* eslint-disable no-use-before-define */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const { User } = require('../models')
const jwt = require('jsonwebtoken') // 회원 인증 시스템, config와 연동, 보안기능
const config = require('../config/config')

function jwtSignUser (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7 // 1주일??
  return jwt.sign(user, config.authentication.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}
module.exports = {
  async register (req, res) {
    try {
      // eslint-disable-next-line no-unused-vars
      const user = await User.create(req.body)
      console.log(user.toJSON()) 
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(400).send({
        error: `This email account is alerady in use.`
      })
    }
  },
  async login (req, res) {
    try {
      // eslint-disable-next-line no-unused-vars
      const { email, password } = req.body
      const user = await User.findOne({
        where: {  
          email: email
        }
      }) // where에서 email이 존재하지 않으면 user는 undefine가 된다.

      if (!user) {
        return res.status(403).send({ // 이메일이 존재하지 않으면
          error: `사용자 정보가 일치하지 않습니다.`
        })
      }
      console.log('1')
      console.log(password, user.password)
      // const isPasswordValid = password === user.password 
      // 'bcrypt-nodejs', 'bluebird' 보안 인증 NPM 쓰기 전 암 호화 코드
      const isPasswordValid = await user.comparePassword(password) // User.js모델에 comparePassword 함수가 존재한다. , await 안쓰면 안돌아간다. 에러도 안나온다.
      // console.log(isPasswordValid)
      if (!isPasswordValid) {
        return res.status(403).send({
          error: `비밀번호 정보가 일치하지 않습니다.`
        })
      }
      const userJson = user.toJSON()
      console.log(userJson)
      res.send({
        user: userJson,
        token: jwtSignUser(userJson)
      })
    } catch (err) {
      res.status(500).send({
        error: `로그인 시도 중 에러가 발생했습니다.`
      })
    }
  }
}
