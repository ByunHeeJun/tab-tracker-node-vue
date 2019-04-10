const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const morgan = require('morgan')
const { sequelize } = require('./models')
const config = require('./config/config')

const app = express()
app.use(morgan('combine'))
app.use(bodyParser.json())
app.use(cors())

require('./routes')(app)

sequelize.sync({ force: false }) // { force: true } 데이터 베이스 초기화
  .then(function () {
    app.listen(config.port)
    console.log(`Server started on Port ${config.port}`)
  })
