/* eslint-disable no-unused-vars */
const Joi = require('joi')

module.exports = {
  register (req, res, next) {
    const schema = {
      email: Joi.string().email(), // 이메일 형식의 구조를 검사한다.
      password: Joi.string().regex( // 지정한 형식의 비밀번호를 검사한다.
        new RegExp('^[a-zA-Z0-9]{8,32}$')
        // a~z , A~Z, 0~9 에 해당하는 문자만 사용할 수 있고, 8~32자리까지 만들수있는 제약조건을 만들었다
      )
    }
    // 스키마 정의 위의 스키마 조건대로 형식이 맞춰지지 않으면 error 발생.
    const { error, value } = Joi.validate(req.body, schema) // 유효성 검사
    if (error) {
      switch (error.details[0].context.key) {
        case 'email':
          res.status(400).send({
            error: 'You must provide a valid email address'
          })
          break
        case 'password':
          res.status(400).send({
            error: `The password provided failed to match the following rules:
                <br>
                1. It must contain ONLY the following characters: lower case, upper case, numerics
                <br>
                2. It must be at least 8 character in length and not greater than 32 character in the length
                `
          })
          break
        default:
          res.status(400).send({
            error: 'Invalid registration information'
          })
      }
    } else {
      next()
    }
  }
}
