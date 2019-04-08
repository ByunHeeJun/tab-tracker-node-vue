module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: DataTypes.STRING
    // name: DataTypes.STRING
  })
  return User
}

// sequelize를 통해서 User라는 테이블을 만들고 그 테이블안의 칼럼이나 제약조건을 걸어준 것이다.
// Npm joi = joi는 HTTP 요청과 json 포맷이 올바른지 검사하는 hapi 유틸리티이다. 입력의 유효성을 검사하여 문제가 있을 경우 Invalid Request라는 응답을 수행한다.
