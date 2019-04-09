/* eslint-disable no-unreachable */
/* eslint-disable no-useless-return */
const Promise = require('bluebird') // bluebird: Promise 비동기 패턴처리 프레임워크
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs')) // 사용자 비밀번호 암호화, 보안기능

function hashPassword (user, options) {
  const SALT_FACTOR = 8

  if (!user.changed('password')) { // 암호가 변경되었다면 해시 비밀번호 리턴.
    return
  }
  // 비밀번호 암호화 및 복호화 하는 곳.
  return bcrypt
    .genSaltAsync(SALT_FACTOR)
    .then(salt => bcrypt.hashAsync(user.password, salt, null))
    .then(hash => { // hash는 암호화된 비밀번호이다.
      user.setDataValue('password', hash) // password를 password2로 바꿔서 포스트맨으로 확인할 것.
    })
  // return bcrypt // 그렇지 않으면 bcrypt를 호출해야한다.
  //   .genSaltAsync(SALT_FACTOR)
  //   .then(function (salt) {
  //     bcrypt.hashAsync(user.password, salt, null) // 비밀번호 암호 해독 복화화
  //   })
  //   .then(function (hash) {
  //     user.setDataValue('password', hash) // 복화화된 비밀번호 업데이트?
  //   })
}

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
    // name: DataTypes.STRING
  }, {
    hooks: {
      beforeSave: hashPassword
    }
  })

  User.prototype.comparePassword = function (password) {
    // console.log(password, this.password)
    // console.log(bcrypt.compareAsync(password, this.password))
    return bcrypt.compareAsync(password, this.password) // 등록할 때 암호화된 비밀번호와 로그인해서 들어오는 비밀번호 비교하는 함수.
    // 암호화된 비밀번호를 복호화해서 비교하는건지, 로그인 시 입력하는 비밀번호가 암호화되어서 비교하는건지 알 수 없음.
  }
  return User
}

// sequelize를 통해서 User라는 테이블을 만들고 그 테이블안의 칼럼이나 제약조건을 걸어준 것이다.
// Npm joi = joi는 HTTP 요청과 json 포맷이 올바른지 검사하는 hapi 유틸리티이다. 입력의 유효성을 검사하여 문제가 있을 경우 Invalid Request라는 응답을 수행한다.
