/* eslint-disable no-unreachable */
/* eslint-disable no-use-before-define */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const { Bookmark } = require('../models')
const { Op } = require('sequelize') // 이건 몽고 데이터 베이스 함수이기 때문에 oracle에서 찾아봐야된다.
// 종점을 만드는 곳. //models라는 폴더를 require하기 때문에 /models/index.js에서 connectionPool만든 다음에 여기서 가져다 쓰는 방식으로
module.exports = {
  async index (req, res) {
    try {
      console.log('Come function out?')
      const songId = req.query.SongId
      console.log(songId)
      const bookmark = await Bookmark.findOne({
        where: {
          SongId: songId
        }
      })
      res.send(bookmark)
    } catch (err) {
      res.status(500).send({
        error: `북마크를 가져올 수 없습니다.`
      })
    }
  }
}
