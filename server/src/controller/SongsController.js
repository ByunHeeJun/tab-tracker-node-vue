/* eslint-disable no-unreachable */
/* eslint-disable no-use-before-define */
/* eslint-disable no-trailing-spaces */
/* eslint-disable no-unused-vars */
// eslint-disable-next-line no-unused-vars
const { Song } = require('../models')
// 종점을 만드는 곳. //models라는 폴더를 require하기 때문에 /models/index.js에서 connectionPool만든 다음에 여기서 가져다 쓰는 방식으로
module.exports = {
  async index (req, res) {
    try {
      // limit : 데이터베이스를 10개로 제한한 것.
      const songs = await Song.findAll({ // await 안써주면 오류도 안잡히고 찾기 힘들다. 함수에 async가 써져있으면 그 안의 실행부분에 await를 써줄 것.
        limit: 10 
      })
      res.send(songs)
    } catch (err) {
      res.status(500).send({
        error: `에러가 발생했습니다 다시 노래를 가져와보세요.`
      })
    }
  },
  async show (req, res) {
    try {
      const song = await Song.findByPk(req.params.songId)
      res.send(song)
    } catch (err) {
      console.log('err', err)
      res.status(500).send({
        error: `에러가 발생했습니다 노래를 불러올 수 없습니다.`
      })
    }
  },
  async post (req, res) {
    try {
      const song = await Song.create(req.body)
      res.send(song)
    } catch (err) {
      console.log('we are here', err)
      res.status(500).send({
        error: `에러 발생. 노래를 다시 만들어보세요..`
      })
    }
  },
  async put (req, res) {
    try {
      const song = await Song.update(req.body, {
        where: {
          id: req.params.songId
        }
      })
      res.send(req.body)
    } catch (err) {
      console.log('err', err)
      res.status(500).send({
        error: `에러가 발생했습니다 노래를 수정할 수 없습니다.`
      })
    }
  }
}
