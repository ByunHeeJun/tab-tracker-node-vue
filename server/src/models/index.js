/* eslint-disable no-unused-expressions */
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const config = require('../config/config')
const db = {}

const sequelize = new Sequelize(
  config.db.database,
  config.db.user,
  config.db.password, {
    dialect: 'sqlite'
  },
  config.db.options
)
// 밑 코드 이해 X.. => margonDB에 자동으로 쿼리문을 제작해주는데 거기에 영향이 있는 코드
// 잘못 쓰면 엉뚱한 쿼리문이 돈다.
// sequlize라는 모듈이 SQL이랑 연동시켜주는 모듈인듯함.
fs
  .readdirSync(__dirname)
  .filter((file) =>
    file !== 'index.js'
  )
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
    console.log('db', db)
  })

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
